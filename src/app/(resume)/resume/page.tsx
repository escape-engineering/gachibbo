'use client';

import { createClient } from '@/utils/supabase/client';
import PaginationComponent from '@/app/_components/Pagination';
import React, { useEffect, useState } from 'react';
import { ResumeType } from '@/types/ResumeType';
import Link from 'next/link';
import '@/css/resumeList.css';
import useAuthStore from '@/store/useAuthStore';

const ResumePage = () => {
  const supabase = createClient();
  const [resumeList, setResumeList] = useState<ResumeType[]>([]);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(10);

  const total = resumeList.length;
  const limit = 10;
  const offset = (page - 1) * limit;

  const { userType, userUid } = useAuthStore();
  const isMento = userType === 'mento' ? true : false;
  //Tanstack Query를 사용하여 데이터 가져오기
  useEffect(() => {
    const getResumeList = async () => {
      const { data, error } = isMento
        ? await supabase.from('post_detail').select()
        : await supabase.from('post_detail').select().eq('user_uuid', userUid);
      if (error) {
        console.error('Error loading ResumeData:', error.message);
      } else if (data) {
        console.log('data', data);
        setResumeList(data);
      }
    };

    getResumeList();
  }, [page, isMento]);

  return (
    <div className="mainBox">
      <h1>테스트</h1>
      <div className="postBox">
        {resumeList.slice(items * (page - 1), items * (page - 1) + items).map((resume) => {
          return (
            <Link className="postEach" key={resume.post_id} href={`resume/${resume.post_id}`}>
              <p>{resume.portfolio_url}</p>
              <p>{resume.experience}</p>
              <p>{resume.region}</p>
              <p>{resume.post_title}</p>
              <p>{resume.isadopted === true ? '답변완료' : '답변중'}</p>
              <p>{resume.use_point}</p>
            </Link>
          );
        })}
      </div>
      <PaginationComponent total={total} page={page} limit={limit} setPage={setPage} />
    </div>
  );
};

export default ResumePage;
