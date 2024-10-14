'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import browserClient from '@/utils/supabase/client';

const TechInterviewGranage = () => {
  const [responses, setResponses] = useState<MappedResponse[]>([]);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [gradedResponses, setGradedResponses] = useState<{
    [key: string]: boolean | null;
  }>({});
  const userId = '2cc0b3c7-661a-4631-a6f8-6a204b89976c'; // TODO: 대체 필요
  const supabase = browserClient;

  // 사용자별 최신 세션 1개 가져오기
  useEffect(() => {
    const fetchLastSession = async () => {
      const { data: lastSession, error: sessionError } = await supabase
        .from('tech_sessions')
        .select('tech_session_id')
        .eq('user_uuid', userId)
        .order('tech_session_create_at', { ascending: false })
        .limit(1)
        .single();

      if (sessionError || !lastSession) {
        console.error('최근 세션을 찾을 수 없습니다.', sessionError);
        setLoading(false);
        return;
      }

      // 해당 세션의 기술문제와 사용자 답변 가져오기
      const { data: responseList, error: responsesError } = await supabase
        .from('tech_responses')
        .select('tech_question_id, tech_user_answer')
        .eq('tech_session_id', lastSession.tech_session_id);

      if (responsesError) {
        console.error('응답을 불러오는 중 오류가 발생했습니다.', responsesError);
        setLoading(false);
        return;
      }

      // 모든 기술문제 목록 가져오기
      const { data: questionList, error: questionsError } = await supabase
        .from('tech_questions')
        .select('tech_question_id, tech_question_text, tech_question_answer');

      if (questionsError) {
        console.error('질문을 불러오는 중 오류가 발생했습니다.', questionsError);
        setLoading(false);
        return;
      }

      // 사용자 답변과 질문을 묶어 객체로 정리
      const mappedResponses = responseList.map((response) => {
        const question = questionList.find((q) => q.tech_question_id === response.tech_question_id);
        return {
          ...response,
          tech_question_text: question?.tech_question_text,
          tech_question_answer: question?.tech_question_answer
        };
      });

      setResponses(mappedResponses);

      // 각 질문의 채점 상태를 null로 초기화
      const initialGradedResponses = mappedResponses.reduce(
        (acc, response) => ({
          ...acc,
          [response.tech_question_id]: null
        }),
        {}
      );

      setGradedResponses(initialGradedResponses);
      setLoading(false);
    };

    fetchLastSession();
  }, [userId]);

  // ox 버튼 클릭 시 점수 조정하기
  const handleGrade = (questionId: string, isCorrect: boolean) => {
    const currentGrade = gradedResponses[questionId];

    // 현재 상태에 따라 증가 또는 감소
    if (currentGrade === null) {
      setScore((prevScore) => prevScore + (isCorrect ? 1 : 0));
    } else if (currentGrade !== isCorrect) {
      setScore((prevScore) => prevScore + (isCorrect ? 1 : -1));
    }

    setGradedResponses((prev) => ({
      ...prev,
      [questionId]: isCorrect
    }));
  };

  if (loading) {
    return <div className="text-center mt-10">로딩중입니다...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-2xl font-bold text-center mb-6">채점</h1>

      {responses.map((response) => (
        <div key={response.tech_question_id} className="mb-8 border shadow-md p-4">
          <p className="mb-6">
            <span className="font-semibold">문제 :</span> {response.tech_question_text}
          </p>
          <p className="mb-6">
            <span className="font-semibold">정답:</span> {response.tech_question_answer}
          </p>
          <p className="mb-6">
            <span className="font-semibold">내 답변:</span> {response.tech_user_answer}
          </p>

          <div className="mt-2 space-x-4 flex justify-end">
            <button
              className={`px-4 py-2 rounded ${
                gradedResponses[response.tech_question_id] === true ? 'bg-green-500 text-white' : 'bg-gray-300'
              }`}
              onClick={() => handleGrade(response.tech_question_id, true)}
            >
              O
            </button>
            <button
              className={`px-4 py-2 rounded ${
                gradedResponses[response.tech_question_id] === false ? 'bg-red-500 text-white' : 'bg-gray-300'
              }`}
              onClick={() => handleGrade(response.tech_question_id, false)}
            >
              X
            </button>
          </div>
        </div>
      ))}

      <div className="flex flex-row-reverse justify-around">
        <p className="mt-2 text-lg font-bold">
          총 점수: {score} / {responses.length}
        </p>

        <div className="mt-4 text-center">
          <Link href="/" className="px-4 py-2 bg-green-500 text-white rounded-md">
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TechInterviewGranage;

type MappedResponse = {
  tech_question_id: string;
  tech_user_answer: string;
  tech_question_text: string;
  tech_question_answer: string;
};
