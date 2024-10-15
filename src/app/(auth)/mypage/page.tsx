'use client';

// pages/mypage.tsx
import useAuthStore from '@/store/useAuthStore';
import { getPoint } from '@/utils/getpoint';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Mypage = () => {
  const { userUid, userId, userName, userType, userImg, mentoCurrent, mentoWorkExperience } = useAuthStore();
  const [points, setPoints] = useState<number | null>(0);

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
      <h1 className="text-2xl font-bold mb-4">마이 페이지</h1>

      <div className="flex flex-row justify-between items-center bg-white p-6">
        {/* 좌측 - 유저 정보(멘토멘티 여부, 이름, ) */}
        <div className="flex flex-row items-center gap-5">
          <img
            src={`${userImg}`}
            alt={`${userName}의 프로필 이미지`}
            width={145}
            height={145}
            className="rounded-full"
          />{' '}
          <div>
            {userType === 'mento' ? (
              <div>
                <span className="text-[#777] text-xl">{mentoCurrent || null}</span>
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
      </div>

      {userType === 'mento' ? (
        <article>
          <div>
            <h2 className="text-xl  mb-4">최근 나의 피드백</h2>
          </div>
        </article>
      ) : (
        <article>
          <div>
            <h2 className="text-xl  mb-4">최근 나의 면접</h2>
          </div>
          <div>
            <h1 className="text-xl  mb-4">최근 나의 이력서</h1>
          </div>
        </article>
      )}
    </section>
  );
};

export default Mypage;
