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
  const router = useRouter();
  // const { isLoggedIn } = useAuthStore();
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
  const { register, handleSubmit, formState, watch } = useForm({
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
    isLoggedIn: boolean;
    userUid: string;
    userId: string;
    userName: string;
    userEmail: string;
    userImg: string;
    userType: string;
    mentoCurrent: boolean;
    mentoWorkExperience: string;
  };

  // 폼 제출 함수
  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    const supabase = createClient();

    // auth 테이블에서 id와 일치하는 행의 이메일을 가져옴
    const { data: userData, error: userError } = await supabase
      .from('auth')
      .select('id, email, user_id, user_name, user_type, image_url, mento_current, mento_work_experience')
      .eq('user_id', formData.user_id)
      .single();

    if (userError || !userData) {
      console.log('사용자정보가 없습니다. => ', userError);
      return;
    }

    // 위에서 가져온 이메일로 로그인
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: formData.user_pw
    });

    if (error) console.error(error);
    if (authData) {
      // // 로그인한 날짜랑 현재날짜를 비교해서
      // // 날짜가 같으면 적립하지 않고, (같은 날 로그인 한 적이 있는 것이므로)
      // // 날짜가 다르면 50포인트를 적립한다.(그날 처음 로그인 한 것이므로)

      // //현재날짜
      // const date = new Date(); // 날짜를 가져와서
      // const year = date.getFullYear(); // 년을 뽑고
      // const month = ('0' + (date.getMonth() + 1)).slice(-2); // 달을 뽑고
      // const day = ('0' + date.getDate()).slice(-2); // 일을 뽑고
      // const today = year + '-' + month + '-' + day; // 년,달,일을 yy-mm-dd 형식으로 붙임

      // //로그인한 날짜
      // const { user } = await supabase.auth.getUser();

      // const lastSignDate = user.last_sign_in_at;
      // const lastSignInDate = new Date(lastSignDate).toISOString().split('T')[0];

      // if (lastSignInDate !== today)

      useAuthStore.setState({
        isLoggedIn: true,
        userUid: userData.id,
        userId: userData.user_id,
        userName: userData.user_name,
        userEmail: userData.email,
        userImg: userData.image_url,
        userType: userData.user_type,
        mentoCurrent: userData.mento_current,
        mentoWorkExperience: userData.mento_work_experience
      } as userData);

      console.log(authData);
      router.push('/');
    }
  };

  return (
    <section className="p-4 bg-[#efefef] w-full">
      <h1 className="text-2xl font-bold mb-4">로그인</h1>

      <article className="flex flex-col items-center bg-white py-52">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-80 mb-5">
          <input
            {...register('user_id')}
            className=" border border-gray-300 text-gray-900 text-sm  block w-full p-2.5 "
            type="text"
            placeholder="아이디"
            required
          />
          {formState.errors.user_id && (
            <span className="text-sm text-[#e50000] -mt-2">{formState.errors.user_id.message}</span>
          )}
          <input
            {...register('user_pw')}
            className=" border border-gray-300 text-gray-900 text-sm  block w-full p-2.5 "
            type="password"
            placeholder="비밀번호"
            required
          />
          {formState.errors.user_pw && (
            <span className="text-sm text-[#e50000] -mt-2">{formState.errors.user_pw.message}</span>
          )}
          <Button
            onClick={() => {
              console.log('로그인 폼 제출됨');
            }}
            type="submit"
          >
            로그인
          </Button>
        </form>
        <div className="flex flex-row gap-4 text-sm">
          <p>아직 회원이 아니신가요?</p> <Link href={'/signup'}>회원가입</Link>
        </div>
      </article>
    </section>
  );
};

export default LoginPage;
