import React from 'react';

const MenteeSignUpPage = () => {
  return (
    <section>
      <h1>새로운 멘티님, 환영합니다!</h1>
      <h3>아래에 가입정보를 작성해주세요.</h3>
      <form>
        <label>아이디</label>
        <input type="text" />
        <label>비밀번호</label>
        <input type="password" />
        <label>이메일</label>
        <input type="email" />
        <button>회원가입</button>
      </form>
    </section>
  );
};

export default MenteeSignUpPage;
