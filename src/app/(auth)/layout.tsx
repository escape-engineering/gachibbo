const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="bg-[#efefef] w-full h-[100vh] py-[10px] pl-24">{children}</div>;
};

export default AuthLayout;
