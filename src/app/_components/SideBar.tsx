'use client';

import useAuthStore from '@/store/useAuthStore';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import LogoutButton from './LogoutButton';

const SideBar = () => {
  const { isLoggedIn, logout, loading } = useAuthStore();

  const handleLogout = () => {
    logout(); // 로그아웃
    //cookies().delete('currentUser');
  };

  return (
    <aside>
      {loading && <span>로그인 처리 중</span>}
      {isLoggedIn ? <LogoutButton /> : <Link href={'/login'}>로그인</Link>}
      <Link href={'/'}>홈</Link>
    </aside>
  );
};

export default SideBar;
