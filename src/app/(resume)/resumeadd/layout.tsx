type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-row">
      {/* <aside className="bg-[#06603B]">1</aside> */}
      <main>{children}</main>
    </div>
  );
}
