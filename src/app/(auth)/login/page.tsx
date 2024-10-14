'use client';

import React, { useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import Button from '@/app/_components/common/Button';
import { createClient } from '@/utils/supabase/client';
import Input from '@/app/_components/common/Input';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { isLoggedIn } = useAuthStore();
  // const router = useRouter();

  // // 이미 로그인한 사용자인지 구분해서 접근막기
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     router.replace('/');
  //   }
  // }, [isLoggedIn, router]);

  // zod
  const signInSchema = z.object({
    user_id: z.string().min(1, '아이디는 필수입니다.'),
    user_pw: z.string().min(6, '비밀번호는 최소 6자리 이상이어야 합니다.')
  });

  // 리액트 훅 폼으로 유효성 검사
  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
    defaultValues: {
      user_id: '',
      user_pw: '',
      email: '',
      user_type: '',
      user_name: '',
      image_url: '',
      mento_current: false,
      mento_work_experience: ''
    },
    resolver: zodResolver(signInSchema)
  });

  type FormData = {
    user_id: string;
    user_pw: string;
    email?: string;
  };

  type userData = {
    email: string;
  };

  // 폼 제출 함수
  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    const supabase = createClient();

    // auth 테이블에서 id와 일치하는 행의 이메일을 가져옴
    const { data: userData, error: userError } = await supabase
      .from('auth')
      .select('email')
      .eq('user_id', formData.user_id)
      .single();

    if (userError || !userData) {
      console.log('사용자정보가 없습니다. => ', userError);
      return;
    }

    // 위에서 가져온 이메일로 로그인
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: userData?.email,
      password: formData.user_pw
    });

    if (error) console.error(error);
    if (authData) {
      useAuthStore.setState({
        isLoggedIn: true,
        userId: formData.user_id
      });
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('user_id')} type="text" placeholder="아이디" required />
        {formState.errors.user_id && <span>{formState.errors.user_id.message}</span>}
        <input {...register('user_pw')} type="password" placeholder="비밀번호" required />
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
