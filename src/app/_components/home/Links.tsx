'use client';

import Link from 'next/link';

const HomeLinks = () => {
  return (
    <div className="flex flex-row gap-[20px]">
      <Link
        className="w-[225px] flex justify-center bg-black text-white font-extrabold text-[23px] p-[15px] rounded-[15px]"
        href={'/tech_interview'}
      >
        기술면접 준비하기
      </Link>
      <Link
        className="w-[225px] flex justify-center bg-black text-white font-extrabold text-[23px] p-[15px] rounded-[15px]"
        href={'/resume'}
      >
        이력서 작성하기
      </Link>
    </div>
  );
};

export default HomeLinks;
