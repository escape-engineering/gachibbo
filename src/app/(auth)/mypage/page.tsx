'use client';

import MyFeedbackPage from '@/app/_components/MyFeedbackPage';
import MyTechInterview from '@/app/_components/MyTechInterviw';
// pages/mypage.tsx
import useAuthStore from '@/store/useAuthStore';
import { getPoint } from '@/utils/getpoint';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Mypage = () => {
  const { userUid, userName, userType, userImg, mentoCurrent, mentoWorkExperience } = useAuthStore();
  const [points, setPoints] = useState<number | null>(0);
  const [visibleFeedback, setVisibleFeedback] = useState(8);

  useEffect(() => {
    const fetchPoint = async () => {
      console.log('userUid', userUid);
      if (userUid !== null) {
        const userPoints = await getPoint(userUid);

        if (userPoints !== null) {
          setPoints(userPoints);
        }
      }
    };
    fetchPoint();
  }, [userUid]);

  return (
    <section className="p-4 bg-[#efefef] w-full">
      <div className="flex flex-row gap-4 items-center mb-4">
        <h1 className="text-2xl font-bold ">마이 페이지</h1>
        <Link href={'/mypage/edit'} className="bg-[#ddd] py-2 px-3">
          편집
        </Link>
      </div>

      <article className="flex flex-row justify-between items-center bg-white p-6 mb-5">
        {/* 좌측 - 유저 정보(멘토멘티 여부, 이름, ) */}
        <div className="flex flex-row items-center gap-5">
          <div>
            <img
              src={userImg !== null ? `${userImg}?rev=${Date.now()} ` : ``}
              alt={`${userName}의 프로필 이미지`}
              className="rounded-full w-32 h-32 object-cover"
            />{' '}
          </div>
          <div>
            {userType === 'mento' ? (
              <div className=" flex flex-row gap-2">
                <span className="text-[#777] text-xl">{mentoCurrent || null ? '현직' : null}</span>
                <span className="text-[#777] text-xl">{mentoWorkExperience || null}</span>
              </div>
            ) : null}
            <div className="flex flex-row gap-2 items-center">
              <h5 className="text-[#777] text-2xl">
                {userType === 'mento' ? '멘토' : userType === 'mentee' ? '멘티' : '유형 없음'}
              </h5>
              <h3 className="text-3xl">{userName || '정보 없음'}</h3>
            </div>
          </div>
        </div>
        {/* 우측 - 포인트 */}
        <div className="flex flex-row items-end gap-2">
          <h5 className="text-[#35C52D] font-bold text-6xl">{points !== null ? points : '0'}</h5>
          <span className="text-[#777]  mb-2">point</span>
        </div>
      </article>

      {userType === 'mento' ? (
        <article>
          <MyFeedbackPage />
        </article>
      ) : (
        <article>
          <MyTechInterview />
        </article>
      )}
    </section>
  );
};

export default Mypage;
