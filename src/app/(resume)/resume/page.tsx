'use client';

import { createClient } from '@/utils/supabase/client';
import PaginationComponent from '@/app/_components/Pagination';
import React, { useEffect, useState } from 'react';
import { ResumeType } from '@/types/ResumeType';
import Link from 'next/link';
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

  useEffect(() => {
    const getResumeList = async () => {
      const { data, error } = isMento
        ? await supabase.from('post_detail').select()
        : await supabase.from('post_detail').select().eq('user_uuid', userUid);
      if (error) {
        console.error('Error loading ResumeData:', error.message);
      } else if (data) {
        setResumeList(data);
      }
    };

    getResumeList();
  }, [page, isMento]);

  return (
    <div className="max-w-full my-[70px] mx-auto p-6 shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">이력서 목록</h1>
        <Link href="/resumeadd">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">이력서 추가</button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 border-b-2 border-gray-300">
              <th className="py-4 px-6 text-center text-lg">성별</th>
              <th className="py-4 px-6 text-center text-lg">제목</th>
              <th className="py-4 px-6 text-center text-lg">희망지역</th>
              <th className="py-4 px-6 text-center text-lg">전화번호</th>
              <th className="py-4 px-6 text-center text-lg">이메일</th>
              <th className="py-4 px-6 text-center text-lg">상태</th>
              <th className="py-4 px-6 text-center text-lg">포인트</th>
            </tr>
          </thead>
          <tbody>
            {resumeList.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-4 px-6 text-center text-gray-500">
                  등록된 이력서가 없습니다.
                </td>
              </tr>
            ) : (
              resumeList.slice(items * (page - 1), items * (page - 1) + items).map((resume) => (
                <tr key={resume.post_id} className="border-b-2 border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-6 text-center">{resume.gender}</td>
                  <td className="py-4 px-6 text-center">{resume.post_title}</td>
                  <td className="py-4 px-6 text-center">{resume.region}</td>
                  <td className="py-4 px-6 text-center">{resume.phoneNum}</td>
                  <td className="py-4 px-6 text-center">{resume.email}</td>
                  <td className="py-4 px-6 text-center">{resume.isadopted ? '답변 완료' : '답변 중'}</td>
                  <td className="py-4 px-6 text-center">{resume.use_point}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {resumeList.length > 0 && (
        <div className="mt-6">
          <PaginationComponent total={total} page={page} limit={limit} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default ResumePage;
