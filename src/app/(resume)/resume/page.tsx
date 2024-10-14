'use client'

import {createC}
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const ResumePage = () => {
  const supabase = 
  //Tanstack Query를 사용하여 데이터 가져오기
  const { isLoading, isError, data } = useQuery({
    queryKey: ['resume'],
    queryFn: async () => {
      const { data: post_detail, error } = await supabase.from('post_detail').select();
    }
  });

  return <div>ResumePage</div>;
};

export default ResumePage;
