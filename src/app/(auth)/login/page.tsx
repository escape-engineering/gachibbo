'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

const LoginPage = () => {
  const signInSchema = z.object({
    user_id: z.string().min(1, {
      message: '아이디는 필수입니다.'
    }),

    user_pw: z.string().min(6, {
      message: '비밀번호는 최소 6자리 이상이어야 합니다.'
    })
  });

  const { register, handleSubmit, formState, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      user_id: '',
      user_pw: ''
    },
    resolver: zodResolver(signInSchema)
  });

  // 폼 제출 함수
  const onSubmit = async () => {};

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('user_id')} type="text" name="id" placeholder="아이디" required />
        <input {...register('user_pw')} type="password" name="password" placeholder="비밀번호" required />
        <button disabled={!formState.isValid}>로그인</button>
      </form>
      <div>
        <p>아직 회원이 아니신가요?</p> <Link href={'/signup'}>회원가입</Link>
      </div>
    </section>
  );
};

export default LoginPage;
