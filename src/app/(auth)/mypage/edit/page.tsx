'use client';

import Button from '@/app/_components/common/Button';
import browserClient, { createClient } from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import useAuthStore from '@/store/useAuthStore';
import { redirect, useRouter } from 'next/navigation';

const MentoSignUpPage = () => {
  const router = useRouter();
  const {
    userUid,
    userId,
    userName,
    userType,
    userImg,
    mentoCurrent,
    mentoWorkExperience,
    setUserImg,
    setUserName,
    setMentoWorkExperience,
    setMentoCurrent
  } = useAuthStore();

  //zod
  const signUpSchema = z.object({
    user_name: z.string().min(2, '닉네임은 필수입니다.'),
    image_url: z.string().optional() // 이미지 URL은 선택 사항
  });

  // 리액트 훅 폼으로 유효성 검사
  const { register, handleSubmit, formState, setValue, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      user_name: '',
      image_url: 'https://tjpmmmdahokzcxwqfsjn.supabase.co/storage/v1/object/public/user_image/avatar.png',
      mento_current: false,
      mento_work_experience: ''
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

    const profile_image_name = userUid;

    const { data: imgData, error: imgError } = await browserClient.storage
      .from('user_image')
      .upload(`${userId}/${profile_image_name}`, file, {
        cacheControl: '3600',
        upsert: true
      });
    if (imgError) {
      console.log('이미지 오류 => ', imgError);
    }

    // 업로드된 이미지의 URL 가져오기
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/user_image/${userId}/${profile_image_name}`;

    //setValue('image_url', imageUrl);
    setUserImg(imageUrl);
    console.log(imageUrl);
  };

  // 폼 제출 함수
  const onSubmit = async () => {
    const { data: userData, error: updateError } = await browserClient
      .from('auth')
      .update({
        user_name: watch('user_name'),
        image_url: watch('image_url'),
        mento_current: watch('mento_current'),
        mento_work_experience: watch('mento_work_experience')
      })
      .eq('id', userUid);

    if (updateError) {
      console.log('회원정보 수정에 실패했습니다 => ', updateError);
    } else {
      console.log('회원정보 수정에 성공했습니다 =>', userData);

      setUserName(watch('user_name'));
      //setUserImg(watch('image_url'));
      setMentoCurrent(watch('mento_current'));
      setMentoWorkExperience(watch('mento_work_experience'));

      console.log(watch('image_url'));

      router.push('/mypage');
      // redirect('/mypage');
    }
  };
  return (
    <section className="p-4 bg-[#efefef] w-full ">
      <h1 className="text-2xl font-bold mb-4">회원정보 편집</h1>

      <article className="flex flex-col items-center bg-white py-32 gap-8">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[500px] mb-5">
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

          {userType === 'mento' ? (
            <>
              <div className="flex flex-row items-center">
                <label className="w-24  text-xl">경력</label>
                <Select onValueChange={(value) => setValue('mento_work_experience', value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="경력을 선택해 주세요." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1~2 년차 주니어">1~2 년차 주니어</SelectItem>
                    <SelectItem value="3~5 년차 시니어">3~5 년차 시니어</SelectItem>
                    <SelectItem value="6년 이상 리더">6년 이상 리더</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className=" flex flex-row justify-between">
                <label className="  text-xl">현직에서 일하고 계신가요?</label>
                <RadioGroup
                  onValueChange={(value) => setValue('mento_current', value === 'yes')}
                  defaultValue="no"
                  className="flex flex-row gap-10"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">예</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">아니오</Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          ) : null}
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
            회원정보 수정
          </Button>
        </form>
      </article>
    </section>
  );
};
export default MentoSignUpPage;
