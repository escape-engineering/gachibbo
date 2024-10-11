import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const signInSchema = z.object({
  email: z.string().email({ message: 'invalid email' }),
  password: z.string()
});

const LoginPage = () => {
  return (
    <section>
      <form>
        <input type="text" name="id" placeholder="아이디" required />
        <input type="password" name="password" placeholder="비밀번호" required />
        <button>로그인</button>
      </form>
    </section>
  );
};

export default LoginPage;
