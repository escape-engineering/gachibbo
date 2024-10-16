type Props = {
  children: React.ReactNode;
};

const SideBarByPage = ({ children }: Props) => {
  return (
    <aside className="fixed top-0 left-[92px] bg-[#06603B] w-[165px] justify-between h-[100vh] py-[100px] px-[20px]">
      {children}
    </aside>
  );
};

export default SideBarByPage;
