'use client';

import React from 'react';
import Link from 'next/link';
import { FiBookOpen, FiHome, FiLogOut, FiFileText } from 'react-icons/fi';
import useAuthStore from '@/store/useAuthStore';
import LogoutButton from './LogoutButton';

const SideBar = () => {
  const { userImg, userName, isLoggedIn } = useAuthStore();

  return (
    <div className="fixed flex h-[100vh]">
      <div className="w-[92px] bg-green-900 flex flex-col justify-between items-center h-full py-10">
        <nav className="flex flex-col items-center gap-6">
          <Link href="/" className="text-white flex flex-col items-center mb-2 hover:text-green-300">
            <FiHome size={24} />
            <span className="text-sm mt-1">홈</span>
          </Link>

          <Link href="/tech_interview" className="text-white flex flex-col items-center mb-2 hover:text-green-300">
            <FiBookOpen size={24} />
            <span className="text-sm mt-1">기술면접</span>
          </Link>

          <Link href="/resume" className="text-white flex flex-col items-center mb-2 hover:text-green-300">
            <FiFileText size={24} />
            <span className="text-sm mt-1">이력서</span>
          </Link>
        </nav>

        <div className="flex flex-col items-center gap-6">
          {isLoggedIn ? (
            <div className="flex flex-col items-center">
              <div className="text-white flex flex-col items-center hover:text-green-300 cursor-pointer">
                <LogoutButton />
              </div>
              <hr className="border-t-[2px] border-white w-full mt-4" />
              <Link href={'/mypage'} className="flex flex-col items-center">
                <img
                  className="border border-black border-solid w-[40px] h-[40px] mt-4 rounded-full"
                  src={`${userImg}`}
                  alt={`${userName}`}
                />
                <span className="text-white text-sm mt-1">{userName}</span>
              </Link>
            </div>
          ) : (
            <Link href="/login" className="text-white flex flex-col items-center hover:text-green-300">
              <FiLogOut size={24} />
              <span className="text-sm mt-1">로그인</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
