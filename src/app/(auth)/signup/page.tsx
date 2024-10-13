import Link from 'next/link';
import React from 'react';

const SignupPage = () => {
  return (
    <section>
      <h1>회원가입 유형을 골라주세요.</h1>
      <article>
        <Link href={'/signup/mento'}>
          <div>멘토</div>
        </Link>
        <Link href={'/signup/mentee'}>
          <div>멘티</div>
        </Link>
      </article>
    </section>
  );
};

export default SignupPage;
