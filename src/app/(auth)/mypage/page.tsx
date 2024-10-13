'use client';

import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Mypage = () => {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  // 이미 로그인한 사용자인지 구분해서 접근막기
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoggedIn, router]);

  // 로그인한 사용자만 마이페이지 내용을 렌더링
  if (!isLoggedIn) {
    return null; // 리다이렉트 중이므로 컴포넌트를 렌더링하지 않음
  }

  return (
    <>
      <section>
        <div>
          <div>
            <span>멘티</span>
            <p>홍길동</p>
          </div>
          <div>
            <h2>99</h2>
            <span>point</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Mypage;
