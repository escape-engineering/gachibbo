'use client';

import useAuthStore from '@/store/useAuthStore';
import useFeedbackStore from '@/store/useFeedbackStore';
import { formatDate } from '@/utils/date/formatDate';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = () => {
  // 컴포넌트 이름은 대문자로 시작해야 합니다
  const supabase = createClient();
  const { userUid } = useAuthStore();
  const { feedbacks, loading, error, setFeedbacks, setLoading, setError } = useFeedbackStore();

  const fetchFeedbacks = async (userUid: string) => {
    const { data, error } = await supabase
      .from('post_feedback')
      .select(`user_uuid, post_id, feedback_desc, feedback_isSelected, post_detail (post_title)`)
      .eq('user_uuid', userUid);
    if (error) {
      console.error('error => ', error);
      throw error;
    }

    console.log(userUid);
    console.log(feedbacks);

    return data;
  };

  useEffect(() => {
    const getFeedbacks = async () => {
      setLoading(true);

      if (!userUid) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchFeedbacks(userUid);
        setFeedbacks(data); // 피드백 상태 업데이트
      } catch (err) {
        console.error(err);
        setError('err');
      } finally {
        setLoading(false);
      }
    };

    getFeedbacks();
  }, [userUid]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="p-4 bg-[#efefef] w-full">
      <div className="flex flex-row gap-4 items-center mb-4">
        <h1 className="text-2xl font-bold ">나의 피드백</h1>
      </div>

      {feedbacks.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {feedbacks.map((feedback, index) => (
            <li
              key={`${feedback.post_id}-${index}`}
              className="flex flex-row justify-between items-center bg-white p-6 "
            >
              {/* <Link href={}> */}
              {/* 우측: 게시글 제목 & 피드백 내용 */}
              <div>
                <h2 className="text-lg font-semibold">
                  {Array.isArray(feedback.post_detail)
                    ? feedback.post_detail[index].post_title
                    : feedback.post_detail.post_title}
                </h2>
                <p className="text-sm text-gray-600 mt-2">{feedback.feedback_desc}</p>
              </div>

              {/* 좌측: 피드백 작성 날짜와 채택 여부 */}
              <div>
                {/* <p className="text-sm text-gray-600">{formatDate(feedback.created_at)}</p> */}
                {feedback.feedback_isSelected ? (
                  <p className="text-sm text-gray-800">채택됨</p>
                ) : (
                  <p className="text-sm text-gray-800">채택안됨</p>
                )}
              </div>
              {/* </Link> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>피드백이 없습니다.</p>
      )}
    </section>
  );
};

export default Page;
