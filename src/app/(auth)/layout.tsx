const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <aside className="w-60 bg-[#06603c] h-[100vh] py-[100px] px-[20px]">Auth페이지</aside>
      {children}
    </>
  );
};

export default AuthLayout;
