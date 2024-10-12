'use client';

import React, { FormEvent, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Button from '@/app/_components/common/Button';
import { createClient } from '@/utils/supabase/client';
import Input from '@/app/_components/common/Input';
import useAuthStore from '@/store/useAuthStore';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    user_pw: ''
  });

  // zod
  const signInSchema = z.object({
    user_id: z.string().min(1, '아이디는 필수입니다.'),
    user_pw: z.string().min(6, '비밀번호는 최소 6자리 이상이어야 합니다.')
  });

  // 인풋에 입력한 값 실시간으로 확인
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 리액트 훅 폼으로 유효성 검사
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

    const { data: userData, error: userError } = await supabase
      .from('auth')
      .select('email')
      .eq('user_id', formData.user_id)
      .single();

    if (userError || !userData) {
      console.log('사용자정보가 없습니다. => ', userError);
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData?.email,
      password: formData.user_pw
    });
    if (error) console.error(error);
    if (data) {
      useAuthStore.setState({
        isLoggedIn: true,
        userId: formData.user_id
      });
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('user_id')}
          onChange={handleInputChange}
          type="text"
          name="user_id"
          value={formData.user_id}
          placeholder="아이디"
          required
        />
        {formState.errors.user_id && <span>{formState.errors.user_id.message}</span>}
        <input
          {...register('user_pw')}
          onChange={handleInputChange}
          type="password"
          name="user_pw"
          value={formData.user_pw}
          placeholder="비밀번호"
          required
        />
        {formState.errors.user_pw && <span>{formState.errors.user_pw.message}</span>}
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
