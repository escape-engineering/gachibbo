'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

const MentoSignUpPage = () => {
  return (
    <section>
      <h1>새로운 멘토님, 환영합니다!</h1>
      <h3>아래에 가입정보를 작성해주세요.</h3>
      <form>
        <div>
          <label>아이디</label>
          <input type="text" required />
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" required />
        </div>
        <div>
          <label>이메일</label>
          <input type="email" required />
        </div>
        <div>
          <label>경력</label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="경력을 선택해 주세요." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">1~2 년</SelectItem>
              <SelectItem value="dark">3~5 년</SelectItem>
              <SelectItem value="system">6년 이상</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <button>회원가입</button>
      </form>
    </section>
  );
};

export default MentoSignUpPage;
