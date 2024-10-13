'use client';

import useAuthStore from '@/store/useAuthStore';
import Link from 'next/link';
import React from 'react';

const SideBar = () => {
  const { isLoggedIn, logout, loading } = useAuthStore(); // 로그아웃 함수 가져오기

  const handleLogout = () => {
    logout(); // 로그아웃 함수 호출
  };

  return (
    <aside>
      {loading ? (
        <span>로그인 처리 중</span>
      ) : isLoggedIn ? (
        <button onClick={handleLogout}>로그아웃</button>
      ) : (
        <Link href={'/login'}>로그인</Link>
      )}
      <Link href={'/'}>홈</Link>
    </aside>
  );
};

export default SideBar;
