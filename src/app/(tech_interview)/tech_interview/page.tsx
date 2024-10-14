'use client';

import Button from '@/app/_components/common/Button';
import browserClient from '@/utils/supabase/client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const TechInterviewPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer>({});
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = browserClient;

  // 테스트 문항을 전부 불러오기
  useEffect(() => {
    const fetchQuestions = async () => {
      const { data: questionsData, error } = await supabase.from('questions').select('*');

      if (error) {
        console.error('질문을 불러오는 중 오류가 발생했습니다.', error);
        return;
      }

      // 문항을 랜덤하게 정렬시키고 5개만 자르기
      const randomFiveQuestions = questionsData?.sort(() => 0.5 - Math.random()).slice(0, 5);
      setQuestions(randomFiveQuestions as Question[]);
      setLoading(false);
    };

    fetchQuestions();
  }, [supabase]);

  // 답변 입력 시 상태 업데이트
  const handleAnswerChange = (questionId: string, newAnswer: string) => {
    setAnswers({
      ...answers,
      [questionId]: newAnswer
    });
  };

  // 답변 저장하는 함수
  const handleSubmit = async () => {
    const userId = '2cc0b3c7-661a-4631-a6f8-6a204b89976c'; // TODO 나중에 변경해야함

    for (const questionId in questions) {
      const answer = answers[questions[questionId].question_id];

      if (!answer || answer.trim() === '') {
        alert('모든 답변을 입력해주세요.');
        return;
      }
    }

    // 각 질문의 답변을 DB에 저장
    for (const questionId in answers) {
      const answer = answers[questionId];

      const { error } = await supabase.from('response').insert({
        user_uuid: userId,
        questions_id: questionId,
        user_answer: answer
      });

      if (error) {
        console.error('답변 저장 중 오류가 발생했습니다.', error);
        return;
      }
    }

    alert('답변이 저장되었습니다!');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-2xl font-bold text-center mb-6">기술 면접 질문</h1>
      <div className="space-y-8">
        {questions?.map((question) => (
          <div key={question.question_id} className="bg-slate-100 p-6">
            <div className="text-lg font-semibold mb-4">{question.question_text}</div>
            <textarea
              className="w-full h-24 p-3 border rounded-lg"
              placeholder={`답변을 입력하세요.\n\n모르는 문제는 '모르겠습니다' 라고 입력해주세요.`}
              onChange={(e) => handleAnswerChange(question.question_id, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="text-center mt-8 flex justify-evenly">
        <Button onClick={handleSubmit} color="default" size="md" type="button">
          답변저장하기
        </Button>
        <Link
          className="text-center rounded-md font-semibold border text-white bg-green-400 border-green-400 px-3 py-3"
          href={'/tech_interview_grading'}
        >
          채점하러가기
        </Link>
      </div>
    </div>
  );
};

export default TechInterviewPage;

export type Question = {
  question_id: string;
  question_text: string;
};

export type Answer = {
  [key: string]: string;
};
