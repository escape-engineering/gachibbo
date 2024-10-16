import useAuthStore from '@/store/useAuthStore';
import browserClient from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';

const LogoutButton = () => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const deleteAllCookies = () => {
    const cookies = document.cookie.split(';');
    cookies.forEach((cookie) => {
      const temp = cookie.indexOf('=');
      const name = temp > -1 ? cookie.substring(0, temp) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    });
  };

  const handleLogout = async () => {
    logout(); // 로그아웃
    deleteAllCookies();
    router.push('/');
    await browserClient.auth.signOut();
  };
  return (
    <button className="text-white flex flex-col items-center hover:text-green-300" onClick={handleLogout}>
      <FiLogOut size={24} />
      <span className="text-sm mt-1">로그아웃</span>
    </button>
  );
};

export default LogoutButton;
