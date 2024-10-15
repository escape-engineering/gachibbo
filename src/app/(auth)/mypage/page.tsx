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

  const { userId, userName, userType, userImg, mentoCurrent, mentoWorkExperience } = useAuthStore();
  console.log(userId, userName, userType, userImg, mentoCurrent, mentoWorkExperience);
  console.log(useAuthStore);
  return (
    <>
      <section className="p-4">
        <h1 className="text-2xl font-bold mb-4">마이 페이지</h1>

        <div>
          {/* 좌측 - 유저 정보(멘토멘티 여부, 이름, ) */}
          <div>{/* <Image src={userImg} /> */}</div>
          <div>
            {userType === 'mento' ? (
              <div>
                <span>{mentoCurrent || null}</span>
                <span>{mentoWorkExperience || null}</span>
              </div>
            ) : null}
            <div>
              <h5>{userType || null}</h5>
              <h3>{userId || '정보 없음'}</h3>
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
