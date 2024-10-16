'use client';

import useAuthStore from '@/store/useAuthStore';
import useFeedbackStore from '@/store/useFeedbackStore';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Button from './common/Button';

const MyFeedbackPage = () => {
  const [visibleFeedback, setVisibleFeedback] = useState(5);

  const supabase = createClient();
  const { userUid } = useAuthStore();
  const { feedbacks, loading, error, setFeedbacks, setLoading, setError } = useFeedbackStore();

  const fetchFeedbacks = async (userUid: string) => {
    const { data, error } = await supabase
      .from('post_feedback')
      .select(`user_uuid, post_id, feedback_desc, feedback_isSelected,  post_detail(post_title)`)
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

  const displayedFeedbacks = feedbacks.slice(0, visibleFeedback);
  const handleLoadMore = () => {
    setVisibleFeedback((prev) => prev + 8); // 8개 더 보이도록 상태 업데이트
  };
  return (
    <section className="p-4 bg-[#efefef] w-full">
      <div className="flex flex-row gap-4 items-center mb-4">
        <h1 className="text-xl  mb-1">나의 피드백</h1>
      </div>

      {feedbacks.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {feedbacks.slice(0, visibleFeedback).map((feedback, index) => (
            <Link href={`/resume/${feedback.post_id} `} key={`${feedback.post_id}-${index}`}>
              <li
                key={`${feedback.post_id}-${index}`}
                className="flex flex-row justify-between items-center bg-white p-6 gap-4 hover:shadow-lg"
              >
                {/* 우측: 게시글 제목 & 피드백 내용 */}
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">
                    {Array.isArray(feedback.post_detail)
                      ? feedback.post_detail[index].post_title
                      : feedback.post_detail.post_title}
                  </h2>
                  {/* <p className="text-sm text-gray-600 mt-2">
                  {feedback.feedback_desc.length > 300
                    ? `${feedback.feedback_desc.slice(0, 300)}...`
                    : feedback.feedback_desc}
                </p> */}
                  <p className="text-sm text-gray-600 mt-2">{feedback.feedback_desc}</p>
                </div>

                {/* 좌측: 피드백 작성 날짜와 채택 여부 */}
                <div className="flex-none">
                  {feedback.feedback_isSelected ? (
                    <p className="text-[#35C52D] font-bold text-2xl">채택됨</p>
                  ) : (
                    <p className="text-[#cf3d32] font-bold text-xl">채택안됨</p>
                  )}
                </div>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>피드백이 없습니다.</p>
      )}
      {feedbacks.length > visibleFeedback && (
        <button
          onClick={handleLoadMore}
          className="flex flex-row justify-between items-center bg-[#14532d] text-white p-6 gap-4 hover:shadow-lg w-full mt-10 text-xl text-center"
        >
          더보기
        </button>
      )}
    </section>
  );
};

export default MyFeedbackPage;
