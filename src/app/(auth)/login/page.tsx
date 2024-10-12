'use client';

import React, { FormEvent, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Button from '@/app/_components/common/Button';
import { createClient } from '@/utils/supabase/client';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    user_pw: ''
  });

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
  const onSubmit = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.user_id,
      password: formData.user_pw
    });
    if (error) console.error(error);
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('user_id')} type="text" name="id" placeholder="아이디" required />
        <input {...register('user_pw')} type="password" name="password" placeholder="비밀번호" required />
        <Button
          onClick={() => {
            console.log('로그인 폼 제출됨');
          }}
          type="submit"
        >
          로그인
        </Button>
      </form>
      <div>
        <p>아직 회원이 아니신가요?</p> <Link href={'/signup'}>회원가입</Link>
      </div>
    </section>
  );
};

export default LoginPage;
