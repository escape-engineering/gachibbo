'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import browserClient from '@/utils/supabase/client';
import Button from '@/app/_components/common/Button';

const TestPage = () => {
  const [questions, setQuestions] = useState<TechQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = '2cc0b3c7-661a-4631-a6f8-6a204b89976c'; // TODO: 실제 인증 시스템으로 대체 필요
  const supabase = browserClient;

  // 한 사이클을 tech_sessions 테이블에 저장하기 위해 초기화
  useEffect(() => {
    const initializeTest = async () => {
      const { data: sessionData, error: sessionError } = await supabase
        .from('tech_sessions')
        .insert({ user_uuid: userId })
        .select()
        .single();

      if (sessionError) {
        console.error('세션 생성 중 오류가 발생했습니다:', sessionError);
        setLoading(false);
        return;
      }

      // 답변 제출 함수에서 tech_responses 테이블에 세션id를 같이 저장하기 위해 추출
      setSessionId(sessionData.tech_session_id);

      // 모든 테스트 문항 전부 불러오기
      const { data: allQuestions, error: questionsError } = await supabase.from('tech_questions').select('*');

      if (questionsError) {
        console.error('질문을 불러오는 중 오류가 발생했습니다:', questionsError);
        setLoading(false);
        return;
      }

      // 모두 불러온 테스트 문항을 랜덤하게 섞고 5개만 뽑아내기
      const randomQuestions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);

      setQuestions(randomQuestions);
      setLoading(false);
    };

    initializeTest();
  }, [supabase]);

  // 사용자 답변 저장
  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // 사용자 답변 제출
  const handleSubmit = async () => {
    if (!sessionId) return;

    const unansweredQuestions = questions.filter(
      (q) => !answers[q.tech_question_id] || answers[q.tech_question_id].trim() === ''
    );

    if (unansweredQuestions.length > 0) {
      alert('모든 질문에 대해 답변을 입력해 주세요.');
      return;
    }

    for (const question of questions) {
      const userAnswer = answers[question.tech_question_id];

      const { error } = await supabase.from('tech_responses').insert({
        tech_session_id: sessionId,
        tech_question_id: question.tech_question_id,
        tech_user_answer: userAnswer
      });

      if (error) {
        console.error('응답 저장 중 오류가 발생했습니다:', error);
        return;
      }
    }

    alert('답변이 성공적으로 제출되었습니다!');
  };

  if (loading) {
    return <div className="text-center mt-10">로딩중입니다...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-2xl font-bold text-center mb-6">기술 면접 질문</h1>
      {questions.map((q) => (
        <div key={q.tech_question_id} className="mb-8">
          <p className="font-semibold">{q.tech_question_text}</p>
          <textarea
            className="w-full mt-2 p-2 border rounded h-32"
            placeholder={`답변을 입력하세요.\n\n\n(만약 모르는 문제가 있다면 '모르겠습니다' 라고 입력해주세요)`}
            onChange={(e) => handleAnswerChange(q.tech_question_id, e.target.value)}
          />
        </div>
      ))}
      <div className="mt-4 flex space-x-4 justify-end">
        <Button onClick={handleSubmit} color="default" size="md" type="button">
          제출하기
        </Button>
        <Link
          href="/tech_interview_grading"
          className="px-3 py-2 text-base text-white bg-green-400 border-green-400 rounded-md"
        >
          채점하러 가기
        </Link>
      </div>
    </div>
  );
};

export default TestPage;

type TechQuestion = {
  tech_question_id: string;
  tech_question_text: string;
  tech_question_answer: string;
};
