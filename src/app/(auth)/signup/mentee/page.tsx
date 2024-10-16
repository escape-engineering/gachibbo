'use client';

import Button from '@/app/_components/common/Button';
import useAuthStore from '@/store/useAuthStore';
import browserClient from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const MenteeSignUpPage = () => {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  // 이미 로그인한 사용자인지 구분해서 접근막기
  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/');
    }
  }, [isLoggedIn, router]);

  //zod
  const signUpSchema = z.object({
    user_id: z
      .string()
      .min(1, '아이디는 필수입니다.')
      .regex(/^[a-z0-9]{4,30}$/, '영문 소문자 또는 영문+숫자 조합 4~30자리를 입력해주세요.'),
    user_pw: z.string().min(6, '비밀번호는 최소 6자리 이상이어야 합니다.'),
    // .regex(
    //   /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
    //   "영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요."
    // ), // 여기까진 너무 엄격해서 테스트를 위해 주석처리했습니다
    email: z.string().email('유효한 이메일을 입력하세요.').min(1, '이메일은 필수입니다.'),
    user_name: z.string().min(1, '닉네임은 필수입니다.'),
    image_url: z.string().optional() // 이미지 URL은 선택 사항
  });

  // 리액트 훅 폼으로 유효성 검사
  const { register, handleSubmit, formState, watch, setValue } = useForm({
    mode: 'onChange',
    defaultValues: {
      user_id: '',
      user_pw: '',
      user_type: 'mentee',
      email: '',
      user_name: '',
      image_url: 'https://tjpmmmdahokzcxwqfsjn.supabase.co/storage/v1/object/public/user_image/avatar.png'
    },
    resolver: zodResolver(signUpSchema)
  });

  // 프로필 이미지 등록 핸들러
  const handleImgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      console.log('파일을 선택해 주세요.');
      return;
    }

    const userId = watch('user_id');

    const { data: imgData, error: imgError } = await browserClient.storage
      .from('user_image')
      .upload(`${userId}/${file.name}`, file, {
        cacheControl: '3600',
        upsert: false
      });
    if (imgError) {
      console.log('이미지 오류 => ', imgError);
    }

    // 업로드된 이미지의 URL 가져오기
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/user_image/${userId}/${file.name}`;

    setValue('image_url', imageUrl);
  };

  // 폼 제출 함수
  const onSubmit = async () => {
    // Supabase에 사용자 등록
    const { data, error: supabaseTableError } = await browserClient.auth.signUp({
      email: watch('email'),
      password: watch('user_pw')
    });
    console.log(data);
    if (supabaseTableError) {
      console.log('supabaseTableError =>', supabaseTableError);
      return;
    }

    if (!data.user) {
      console.error('이미 가입된 정보입니다.');
      return;
    }

    const { data: userData, error: updateError } = await browserClient
      .from('auth')
      .update({
        user_id: watch('user_id'),
        user_pw: watch('user_pw'),
        user_type: 'mentee',
        email: watch('email'),
        user_name: watch('user_name'),
        image_url: watch('image_url')
      })
      .eq('id', data.user.id);
    console.log(userData);

    if (updateError) {
      console.log('회원가입에 실패했습니다 => ', updateError);
    } else {
      console.log('회원가입에 성공했습니다 =>', userData);

      const { data: pointData, error: pointError } = await browserClient.from('point').insert({
        user_id: data.user.id,
        user_point: 200
      });

      if (pointError) {
        console.log('포인트 테이블 생성 실패 =>', pointError);
      } else {
        console.log('포인트 테이블 생성 성공 =>', pointData);
      }
    }
  };

  return (
    <section className="p-4 bg-[#efefef] w-full ">
      <h1 className="text-2xl font-bold mb-4">회원가입</h1>

      <article className="flex flex-col items-center bg-white py-32 gap-8">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-3xl">새로운 멘티님, 환영합니다!</h1>
          <h3 className="text-lx text-[#777]">아래에 가입정보를 작성해주세요.</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[500px] mb-5">
          <div className="flex flex-row items-center">
            <label htmlFor="user_id" className="w-24  text-xl">
              아이디
            </label>
            <input
              {...register('user_id')}
              className=" border border-gray-300 text-gray-900 text-sm  block p-2.5 w-full"
              id="user_id"
              type="text"
              required
            />
            {formState.errors.user_id && (
              <span className="text-sm text-[#e50000] -mt-2">{formState.errors.user_id.message}</span>
            )}
          </div>
          <div className="flex flex-row items-center">
            <label htmlFor="user_pw" className="w-24  text-xl">
              비밀번호
            </label>
            <input
              {...register('user_pw')}
              className=" border border-gray-300 text-gray-900 text-sm  block p-2.5 w-full"
              id="user_pw"
              type="password"
              required
            />
            {formState.errors.user_pw && (
              <span className="text-sm text-[#e50000] -mt-2">{formState.errors.user_pw.message}</span>
            )}
          </div>
          <div className="flex flex-row items-center ">
            <label htmlFor="user_name" className="w-24 text-xl">
              이름
            </label>
            <input
              {...register('user_name')}
              className=" border border-gray-300 text-gray-900 text-sm  block p-2.5 w-full"
              id="user_name"
              type="text"
              required
            />
            {formState.errors.user_name && (
              <span className="text-sm text-[#e50000] -mt-2">{formState.errors.user_name.message}</span>
            )}
          </div>
          <div className="flex flex-row items-center">
            <label htmlFor="email" className="w-24  text-xl">
              이메일
            </label>
            <input
              {...register('email')}
              className=" border border-gray-300 text-gray-900 text-sm  block p-2.5 w-full"
              id="email"
              type="email"
              required
            />
            {formState.errors.email && (
              <span className="text-sm text-[#e50000] -mt-2">{formState.errors.email.message}</span>
            )}
          </div>
          <div className="flex flex-col p-4 bg-[#efefef] gap-3">
            <label htmlFor="image_url" className="text-xl">
              프로필 이미지 등록
            </label>
            <input type="file" accept="image/*" onChange={handleImgUpload} />
          </div>
          <Button
            onClick={() => {
              console.log('회원가입 폼 제출됨');
            }}
            type="submit"
          >
            회원가입
          </Button>
        </form>
      </article>
    </section>
  );
};

export default MenteeSignUpPage;
