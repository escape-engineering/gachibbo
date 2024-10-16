import Link from 'next/link';
import Button from '../_components/common/Button';

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <aside className="w-60 bg-[#06603c] h-[100vh] py-[100px] px-[20px] ml-20">
        <Link href={'/mypage'}>마이 페이지</Link>
      </aside>
      {children}
    </>
  );
};

export default AuthLayout;
