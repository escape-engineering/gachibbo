'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import browserClient from '@/utils/supabase/client';
import Button from '@/app/_components/common/Button';
import useAuthStore from '@/store/useAuthStore';

const TestPage = () => {
  const [questions, setQuestions] = useState<TechQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false); // 제출 했을 때만 채점페이지로 이동 가능하게 하기 위해 상태관리
  const { userId } = useAuthStore();
  const sessionCreated = useRef(false); // 세션이 한번에 한개만 생성되도록 관리
  const supabase = browserClient;

  useEffect(() => {
    const initializeTest = async () => {
      // 한번에 세션 아이디가 두개씩 생기는걸 방지
      if (sessionCreated.current) return;
      sessionCreated.current = true;

      // 한 사이클을 tech_sessions (세션)테이블에 저장하기 위해 생성
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

      // tech_responses 테이블에 session_id도 저장이 필요하기 때문에
      // 위에서 sessionData를 생성하면서 응답으로 받은 session_id를 관리
      setSessionId(sessionData.tech_session_id);

      // 모든 기술문제 가져오기
      const { data: allQuestions, error: questionsError } = await supabase.from('tech_questions').select('*');

      if (questionsError) {
        console.error('질문을 불러오는 중 오류가 발생했습니다:', questionsError);
        setLoading(false);
        return;
      }

      // 기술문제 전체에서 랜덤으로 정렬하고 5개만 뽑아내기
      // 0.5에서 0과 1사이의 난수를 빼서 양수, 0, 음수가 무작위로 나오고 sort로 섞어짐
      const randomQuestions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);

      setQuestions(randomQuestions);
      setLoading(false);
    };

    initializeTest();
  }, [userId]);

  // 사용자 답변 상태 관리
  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // 사용자 답변 제출
  const handleSubmit = async () => {
    if (!sessionId) return;

    if (isSubmitted) {
      alert('이미 제출하였습니다.');
      return;
    }

    // 답변이 없는 문항이 있는지 확인
    const unAnsweredQuestions = questions.filter(
      (question) => !answers[question.tech_question_id] || answers[question.tech_question_id].trim() === ''
    );

    // 해당 기술문제에 대한 사용자 답변이 비어있거나 공백이면 걸러짐
    if (unAnsweredQuestions.length > 0) {
      alert('모든 질문에 대해 답변을 입력해 주세요.');
      return;
    }

    // 각 기술문제에 대한 사용자 답변 tech_responses 테이블에 저장
    for (const question of questions) {
      const userAnswer = answers[question.tech_question_id]; // 해당 질문에 대한 사용자 답변

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
    setIsSubmitted(true); // 제출 완료 상태로 설정, 채점하러가기 버튼이 활성화 됨
  };

  if (loading) {
    return <div className="text-center mt-10">로딩 중입니다...</div>;
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
            readOnly={isSubmitted}
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
          className={`px-3 py-2 text-base rounded-md font-semibold ${
            isSubmitted ? 'bg-green-400 text-white border-green-400' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          style={{ pointerEvents: isSubmitted ? 'auto' : 'none' }} // 비활성화 처리
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
