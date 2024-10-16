'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import browserClient from '@/utils/supabase/client';
import Modal from '@/app/_components/common/Modal';
import { formatDate } from '@/utils/date/formatDate';
import Button from '@/app/_components/common/Button';

const TechInterviewGranage = () => {
  const [responses, setResponses] = useState<MappedResponse[]>([]); // 사용자 답변과 기술질문을 엮은 객체의 배열
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [gradedResponses, setGradedResponses] = useState<{ [key: string]: boolean | null }>({}); // 각 문제별 채점 결과
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [sessionDate, setSessionDate] = useState<string | null>(null);
  const userId = '2cc0b3c7-661a-4631-a6f8-6a204b89976c'; // TODO: 대체 필요
  const supabase = browserClient;
  const [sessionId, setSessionId] = useState<string | null>(null);

  // 사용자별 최신 세션 1개 가져오기
  useEffect(() => {
    const fetchLastSession = async () => {
      const { data: lastSession, error: sessionError } = await supabase
        .from('tech_sessions')
        .select('tech_session_id, tech_session_create_at')
        .eq('user_uuid', userId)
        .order('tech_session_create_at', { ascending: false }) // tech_session_create_at가 timestamp이고 그걸 이용해 최신 순으로 정렬
        .limit(1)
        .single();

      const formattedCreateDate = formatDate(lastSession?.tech_session_create_at);
      setSessionDate(formattedCreateDate);

      if (sessionError || !lastSession) {
        console.error('최근 세션을 찾을 수 없습니다:', sessionError);
        setLoading(false);
        return;
      }

      setSessionId(lastSession.tech_session_id); // 세션 ID 저장

      // 해당 세션의 기술문제 목록과 사용자 답변 목록 가져오기
      const { data: responseList, error: responsesError } = await supabase
        .from('tech_responses')
        .select('tech_question_id, tech_user_answer')
        .eq('tech_session_id', lastSession.tech_session_id);

      if (responsesError) {
        console.error('응답을 불러오는 중 오류가 발생했습니다:', responsesError);
        setLoading(false);
        return;
      }

      // 모든 기술문제 목록 가져오기
      const { data: questionList, error: questionsError } = await supabase
        .from('tech_questions')
        .select('tech_question_id, tech_question_text, tech_question_answer');

      if (questionsError) {
        console.error('질문을 불러오는 중 오류가 발생했습니다:', questionsError);
        setLoading(false);
        return;
      }

      // 사용자 답변과 기술문제를 묶어 객체로 정리
      const mappedResponses = responseList.map((response) => {
        const question = questionList.find((q) => q.tech_question_id === response.tech_question_id); // 해당 기술문제를 찾기
        return {
          ...response,
          tech_question_text: question?.tech_question_text,
          tech_question_answer: question?.tech_question_answer
        };
      });

      setResponses(mappedResponses);

      // 각 기술질문의 tech_question_id가 키로 사용
      // true는 사용자가 o 버튼 눌렀을 때, false는 사용자가 x 버튼 눌렀을 때, null은 채점 안했을 때
      // 처음은 비어있는 객체
      const initialGrad: Record<string, boolean | null> = {};

      // mappedResponses를 반복하며 각 기술질문의 tech_question_id를 키로 하고, 값을 null로 설정
      mappedResponses.forEach((response) => {
        initialGrad[response.tech_question_id] = null;
      });

      setGradedResponses(initialGrad);
      setLoading(false);
    };

    fetchLastSession();
  }, [userId]);

  // O/X 버튼 클릭 시 점수 계산 및 채점 상태 업데이트
  const handleGrade = (questionId: string, isCorrect: boolean) => {
    const currentGrade = gradedResponses[questionId];

    // 채점 상태가 변경될 때 점수 조정
    if (currentGrade === null) {
      setScore((prevScore) => prevScore + (isCorrect ? 1 : 0)); // 처음은 null이니까 1이거나 0
    } else if (currentGrade !== isCorrect) {
      setScore((prevScore) => prevScore + (isCorrect ? 1 : -1)); // 다음부터는 x면 -1, o면 +1
    }

    setGradedResponses((prev) => ({
      ...prev,
      [questionId]: isCorrect
    }));
  };

  // 결과를 세션에 저장하고 모달 열기
  const handleSaveResultAndShowModal = async () => {
    if (!sessionId) return;

    const { error } = await supabase
      .from('tech_sessions')
      .update({
        tech_score: score,
        total_tech_questions: responses.length
      })
      .eq('tech_session_id', sessionId);

    if (error) {
      console.error('결과 저장 중 오류가 발생했습니다:', error);
      return;
    }

    setIsModalOpen(true);
  };

  if (loading) {
    return <div className="text-center mt-10">로딩 중입니다...</div>;
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
            <span className="font-semibold">정답 :</span> {response.tech_question_answer}
          </p>
          <p className="mb-6">
            <span className="font-semibold">내 답변 :</span> {response.tech_user_answer}
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

      <div className="flex flex-row-reverse justify-around mt-4">
        <Button onClick={handleSaveResultAndShowModal} color="default" size="md">
          결과 보기
        </Button>
      </div>

      <Modal isOpen={isModalOpen} handleIsOpen={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">채점 결과</h2>
        <p className="text-lg mb-4">
          총 점수: {score} / {responses.length}
        </p>
        <p className="text-lg mb-4">기술 면접 생성일: {sessionDate || '날짜 정보가 없습니다.'}</p>
        <div className="mt-4 text-center">
          <Link href="/" className="px-4 py-2 mt-4 bg-green-500 text-white rounded-md">
            메인으로 돌아가기
          </Link>
        </div>
      </Modal>
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
