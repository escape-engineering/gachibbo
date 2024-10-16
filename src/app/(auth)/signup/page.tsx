import Link from 'next/link';
import React from 'react';

const SignupPage = () => {
  return (
    <section className="p-4 bg-[#efefef] w-full ">
      <h1 className="text-2xl font-bold mb-4">회원가입</h1>

      <article className="flex flex-col items-center bg-white py-32 gap-8">
        <h1 className="text-3xl">회원가입 유형을 골라주세요.</h1>
        <div className="flex flex-row gap-16">
          <Link href={'/signup/mento'}>
            <div className=" bg-green-400 border-green-400 w-28 h-28 flex items-center justify-center rounded-full">
              <h3 className="text-white text-2xl text-center">멘토</h3>
            </div>
          </Link>
          <Link href={'/signup/mentee'}>
            <div className=" bg-green-400 border-green-400 w-28 h-28 flex items-center justify-center rounded-full">
              <h3 className="text-white text-2xl text-center">멘티</h3>
            </div>
          </Link>
        </div>
      </article>
    </section>
  );
};

export default SignupPage;
