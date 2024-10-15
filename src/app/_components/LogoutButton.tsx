import useAuthStore from '@/store/useAuthStore';
import React from 'react';
// import { useCookies } from 'next-client-cookies';

const LogoutButton = () => {
  const { logout } = useAuthStore();
  // const cookies = useCookies();
  const deleteAllCookies = () => {
    const cookies = document.cookie.split(';');
    cookies.forEach((cookie) => {
      const temp = cookie.indexOf('=');
      const name = temp > -1 ? cookie.substring(0, temp) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    });
  };

  const handleLogout = () => {
    logout(); // 로그아웃
    deleteAllCookies();
  };
  return <button onClick={handleLogout}>로그아웃</button>;
};

export default LogoutButton;
