'use client';

import useAuthStore from '@/store/useAuthStore';
import Link from 'next/link';
import React from 'react';

const SideBar = () => {
  const { isLoggedIn, logout, loading, userId } = useAuthStore();

  // const handleLogout = () => {
  //   logout(); // 로그아웃
  // };

  return (
    <aside className="flex flex-col justify-between h-[100vh] bg-[#064F32] py-[100px] px-[20px]">
      <div className="flex flex-col justify-center items-center gap-[20px]">
        <Link className="writingMode-vertical-lr text-white" href={'/'}>
          홈
        </Link>
        <Link className="writingMode-vertical-lr text-white" href={'/tech_interview'}>
          기술면접
        </Link>
        <Link className="writingMode-vertical-lr text-white" href={'/resume'}>
          이력서
        </Link>
      </div>
      <div>
        <img className="border border-black border-solid w-[40px] h-[40px]" src="" alt="" />
      </div>
    </aside>
    // <aside>
    //   {loading ? (
    //     <span>로그인 처리 중</span>
    //   ) : isLoggedIn ? (
    //     <button onClick={handleLogout}>로그아웃</button>
    //   ) : (
    //     <Link href={'/login'}>로그인</Link>
    //   )}
    //   <Link href={'/'}>홈</Link>
    // </aside>
  );
};

export default SideBar;
