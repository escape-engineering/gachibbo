'use client';

import { createClient } from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const MenteeSignUpPage = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    user_pw: '',
    user_type: 'mentee',
    email: '',
    user_name: '',
    image_url: ''
  });

  //zod
  const signUpSchema = z.object({
    user_id: z.string().min(1, '아이디는 필수입니다.'),
    user_pw: z.string().min(6, '비밀번호는 최소 6자리 이상이어야 합니다.'),
    email: z.string().email('유효한 이메일을 입력하세요.').min(1, '이메일은 필수입니다.'),
    user_name: z.string().min(1, '닉네임은 필수입니다.'),
    image_url: z.string().optional() // 이미지 URL은 선택 사항
  });

  // 인풋에 입력한 값 실시간으로 확인
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 리액트 훅 폼으로 유효성 검사
  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
    defaultValues: formData,
    resolver: zodResolver(signUpSchema)
  });

  // 폼 제출 함수
  const onSubmit = async () => {
    const supabase = createClient();

    // Supabase에 사용자 등록
    const { data, error: supabaseTableError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.user_pw
    });

    if (supabaseTableError) {
      console.log('supabaseTableError =>', supabaseTableError);
    }

    const { error } = await supabase.from('auth').insert({
      user_id: formData.user_id,
      user_pw: formData.user_pw,
      user_type: 'mentee',
      email: formData.email,
      user_name: formData.user_name,
      image_url: formData.image_url
    });

    if (error) {
      console.log('error => ', error);
    } else {
      console.log('success =>', data);
    }
  };

  return (
    <section>
      <h1>새로운 멘티님, 환영합니다!</h1>
      <h3>아래에 가입정보를 작성해주세요.</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>아이디</label>
          <input
            {...register('user_id')}
            type="text"
            name="user_id"
            value={formData.user_id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            {...register('user_pw')}
            type="password"
            name="user_pw"
            value={formData.user_pw}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>닉네임</label>
          <input
            {...register('user_name')}
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>이메일</label>
          <input
            {...register('email')}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {formState.errors.email && <span>{formState.errors.email.message}</span>}
        </div>
        <button type="submit">회원가입</button>
      </form>
    </section>
  );
};

export default MenteeSignUpPage;
