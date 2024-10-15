'use client';

// pages/mypage.tsx
import useAuthStore from '@/store/useAuthStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Mypage = () => {
  // const { isLoggedIn } = useAuthStore();
  // const router = useRouter();

  // // 이미 로그인한 사용자인지 구분해서 접근막기
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.replace('/login');
  //   }
  // }, [isLoggedIn, router]);

  const { userName, userType, userImg, mentoCurrent, mentoWorkExperience } = useAuthStore();

  return (
    <>
      <section className="p-4">
        <h1 className="text-2xl font-bold mb-4">마이 페이지</h1>

        <div>
          {/* 좌측 - 유저 정보(멘토멘티 여부, 이름, ) */}
          <div>
            <img
              src={`${userImg}`}
              alt={`${userName}의 프로필 이미지`}
              width={150}
              height={150}
              className="rounded-full"
            />{' '}
          </div>
          <div>
            {userType === 'mento' ? (
              <div>
                <span>{mentoCurrent || null}</span>
                <span>{mentoWorkExperience || null}</span>
              </div>
            ) : null}
            <div>
              <h5>{userType === 'mento' ? '멘토' : userType === 'mentee' ? '멘티' : '유형 없음'}</h5>
              <h3>{userName || '정보 없음'}</h3>
            </div>
          </div>
          {/* 우측 - 포인트 */}
          <div>
            <span>point</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Mypage;
