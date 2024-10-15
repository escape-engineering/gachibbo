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
import { useRouter } from 'next/navigation';

const MentoSignUpPage = () => {
  const router = useRouter();
  const { userUid, userId, userName, userType, userImg, mentoCurrent, mentoWorkExperience } = useAuthStore();

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
    const { data: userData, error: updateError } = await browserClient
      .from('auth')
      .update({
        user_name: watch('user_name'),
        image_url: watch('image_url'),
        mento_current: watch('mento_current'),
        mento_work_experience: watch('mento_work_experience')
      })
      .eq('id', userUid);
    console.log(userData);

    if (updateError) {
      console.log('회원가입에 실패했습니다 => ', updateError);
    } else {
      console.log('회원가입에 성공했습니다 =>', userData);

      router.push('/');
    }

    return (
      <section>
        <h1>새로운 멘토님, 환영합니다!</h1>
        <h3>아래에 가입정보를 작성해주세요.</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="user_name">닉네임</label>
            <input {...register('user_name')} id="user_name" type="text" required />
            {formState.errors.user_name && <span>{formState.errors.user_name.message}</span>}
          </div>
          {userType === 'mento' ? (
            <>
              <div>
                <label>경력</label>
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
              <div>
                <label>현직에서 일하고 계신가요?</label>
                <RadioGroup onValueChange={(value) => setValue('mento_current', value === 'yes')} defaultValue="no">
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
          <div>
            <label htmlFor="image_url">프로필 이미지 업로드</label>
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
      </section>
    );
  };
};
export default MentoSignUpPage;
