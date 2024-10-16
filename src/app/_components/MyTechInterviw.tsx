'use client';

import useAuthStore from '@/store/useAuthStore';
import useInterviewStore from '@/store/useInterviewStore';
import { formatDate } from '@/utils/date/formatDate';
import { createClient } from '@/utils/supabase/client';
import React, { useEffect } from 'react';

const MyTechInterview = () => {
  const supabase = createClient();
  const { userUid } = useAuthStore();
  console.log(userUid);
  const { interviews, setInterviews, loading, setLoading, error, setError } = useInterviewStore();

  const fetchTechInterview = async (userUid: string | null) => {
    const { data, error } = await supabase.from('tech_sessions').select(`*`).eq('user_uuid', userUid);

    if (error) {
      throw error;
    } else {
      const filterData = data.filter(
        (interview) => interview.total_tech_question !== null && interview.tech_score !== null
      );
      return filterData;
    }
  };

  const culcScore = (total: number, score: number) => {
    const culc = (score / total) * 100;
    return culc;
  };

  useEffect(() => {
    const getInterviews = async () => {
      setLoading(true);
      console.log(userUid);
      // // userUid가 null이거나 undefined인 경우 조기 반환
      // if (!userUid) {
      //   setLoading(false);
      //   setError('유저 정보를 찾을 수 없습니다.'); // 에러 메시지 설정
      //   return;
      // }
      if (userUid) {
        try {
          const data = await fetchTechInterview(userUid);
          setInterviews(data); // 여기서 data가 유효한지 확인 필요
        } catch (err) {
          setError('인터뷰 데이터를 가져오는 중 오류가 발생했습니다.');
        } finally {
          setLoading(false);
        }
      }
    };

    getInterviews();
  }, [userUid]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="py-4 bg-[#efefef] w-full">
      <div className="flex flex-row gap-4 items-center mb-4">
        <h1 className="text-xl  mb-1">기술 면접 결과</h1>
      </div>

      {interviews.length > 0 ? (
        <ul className="grid grid-cols-2 gap-5 md:grid-cols-5">
          {interviews.map((interview, index) => {
            const fixScore = culcScore(interview.total_tech_questions, interview.tech_score);
            return (
              <li key={index} className="bg-white p-5 space-y-4">
                <p className="text-[#888]">총 질문 수: {interview.total_tech_questions}</p>
                <p className="text-[#35C52D] font-bold text-6xl">{fixScore}</p>
                <p className="text-[#888]">면접일: {formatDate(interview.tech_session_create_at)}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>인터뷰 기록이 없습니다.</p>
      )}
    </section>
  );
};

export default MyTechInterview;
