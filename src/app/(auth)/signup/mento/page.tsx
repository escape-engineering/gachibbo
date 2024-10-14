'use client';

import Button from '@/app/_components/common/Button';
import { createClient } from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const MentoSignUpPage = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    user_pw: '',
    user_type: 'mentee',
    email: '',
    user_name: '',
    image_url: '',
    mento_current: false,
    mento_work_experience: ''
  });

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
    // ),
    email: z.string().email('유효한 이메일을 입력하세요.').min(1, '이메일은 필수입니다.'),
    user_name: z.string().min(1, '닉네임은 필수입니다.'),
    image_url: z.string().optional() // 이미지 URL은 선택 사항
  });

  // // 인풋에 입력한 값 실시간으로 확인
  // const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // // 경력 실시간 확인
  // const handleSelectChange = async (value: string) => {
  //   setFormData((prev) => ({ ...prev, mento_work_experience: value }));
  // };

  // // 현직여부 실시간 확인
  // const handleRadioChange = async (value: boolean) => {
  //   setFormData((prev) => ({ ...prev, mento_current: value }));
  // };

  // 리액트 훅 폼으로 유효성 검사
  const { register, handleSubmit, formState, setValue } = useForm({
    mode: 'onChange',
    defaultValues: {
      user_id: '',
      user_pw: '',
      user_type: 'mentee',
      email: '',
      user_name: '',
      image_url: '',
      mento_current: false,
      mento_work_experience: ''
    },
    resolver: zodResolver(signUpSchema)
  });

  type FormData = {
    user_id: string;
    user_pw: string;
    user_type: string;
    email: string;
    user_name: string;
    image_url: string;
    mento_current: boolean;
    mento_work_experience: string;
  };

  // 폼 제출 함수
  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    const supabase = createClient();

    // Supabase에 사용자 등록
    const { data, error: supabaseTableError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.user_pw
    });

    if (supabaseTableError) {
      console.log('supabaseTableError =>', supabaseTableError);
    }

    if (!data.user) {
      console.error('이미 가입된 정보입니다.');
      return;
    }

    const { error } = await supabase.from('auth').insert({
      user_id: formData.user_id,
      user_pw: formData.user_pw,
      user_type: 'mento',
      email: formData.email,
      user_name: formData.user_name,
      image_url: formData.image_url,
      id: data.user.id,
      mento_current: formData.mento_current,
      mento_work_experience: formData.mento_work_experience
    });

    if (error) {
      console.log('error => ', error);
    } else {
      console.log('success =>', data);
    }
  };

  return (
    <section>
      <h1>새로운 멘토님, 환영합니다!</h1>
      <h3>아래에 가입정보를 작성해주세요.</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="user_id">아이디</label>
          <input {...register('user_id')} id="user_id" type="text" required />
          {formState.errors.user_id && <span>{formState.errors.user_id.message}</span>}
        </div>
        <div>
          <label htmlFor="user_pw">비밀번호</label>
          <input {...register('user_pw')} id="user_pw" type="password" required />
          {formState.errors.user_pw && <span>{formState.errors.user_pw.message}</span>}
        </div>
        <div>
          <label htmlFor="user_name">닉네임</label>
          <input {...register('user_name')} id="user_name" type="text" required />
          {formState.errors.user_name && <span>{formState.errors.user_name.message}</span>}
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <input {...register('email')} id="email" type="email" required />
          {formState.errors.email && <span>{formState.errors.email.message}</span>}
        </div>
        <div>
          <label>경력</label>
          <Select onValueChange={(value) => setValue('mento_work_experience', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="경력을 선택해 주세요." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1~2">1~2 년</SelectItem>
              <SelectItem value="3~5">3~5 년</SelectItem>
              <SelectItem value="6~">6년 이상</SelectItem>
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

export default MentoSignUpPage;
