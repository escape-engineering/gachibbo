'use client';

import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';
import { ResumeType } from '@/types/ResumeType';
import { Document, Page, pdfjs } from 'react-pdf';
import Recommend from '@/app/_components/recommend';
import 'core-js/full/promise/with-resolvers.js';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import '@/css/resumeList.css';
import useAuthStore from '@/store/useAuthStore';
import MoveToResumeUpdate from '@/app/_components/resumeDetail/MoveToResumeUpdate';

// workerSrc 정의 하지 않으면 pdf 보여지지 않습니다.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

type Props = {
  params: {
    id: string;
  };
};

const resumeDetail = ({ params }: Props) => {
  const supabase = createClient();
  const [resumeList, setResumeList] = useState<ResumeType[]>([]);
  const [numPages, setNumPages] = useState(0); // 총 페이지수
  const [pageNumber, setPageNumber] = useState(1); // 현재 페이지
  const [pageScale, setPageScale] = useState(1); // 페이지 스케일

  //멘토인지 확인하기 위한 userType, mento인지 비교하여 boolean으로 isMento지정
  const { userType } = useAuthStore();
  const isMento = userType === 'mento' ? true : false;

  useEffect(() => {
    const getResumeList = async () => {
      const { data, error } = await supabase.from('post_detail').select('*').eq('post_id', params.id);

      if (error) {
        console.error('Error loading ResumeData:', error.message);
      } else if (data) {
        console.log('data', data);
        setResumeList(data);
      }
    };

    console.log('params', params);
    getResumeList();
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    console.log(`numPages ${numPages}`);
    setNumPages(numPages);
  }

  return (
    <div className="max-w-full my-[70px] mx-auto bg-white px-20 pb-20 pt-10 rounded-[20px]">
      <h1 className="font-bold text-4xl m-10">{resumeList[0]?.post_title}</h1>
      {/* 멘티라면 수정버튼 보이도록 */}
      {isMento ? <></> : <MoveToResumeUpdate postId={params.id} />}
      <div className="postDetailMainBox">
        {/* pdf 크기가 1280 * 720이 넘는 경우, overflow 처리 */}
        <div style={{ width: '70vw', height: '1080px', overflow: 'auto' }} className="pdfviewer">
          <Document file={`${resumeList[0]?.resume_url}`} onLoadSuccess={onDocumentLoadSuccess}>
            <Page width={980} height={720} scale={pageScale} pageNumber={pageNumber} />
          </Document>
        </div>
        <div>
          <div className="my-[25px] py-[25px] pl-[25px] bg-[#E2EBEB] rounded-[15px]">
            <p>
              Page {pageNumber} of {numPages}
            </p>
            <div className="flex flex-row items-center mb-[10px]">
              <p>페이지 이동 버튼</p>
              {/* 버튼을 누르면 setPageNumber가 바뀌는데, 만약 numPages과 pageNumber가 같으면 pageNumber, 아니면 pageNumber에 +1인 것. */}
              <button
                className="px-[12px] py-[6px] bg-[#14532d] text-white rounded-[5px] ml-[7px]"
                onClick={() => {
                  setPageNumber(numPages === pageNumber ? pageNumber : pageNumber + 1);
                }}
              >
                {' '}
                +
              </button>
              <button
                className="px-[14px] py-[6px] bg-[#14532d] text-white rounded-[5px] ml-[7px]"
                onClick={() => {
                  setPageNumber(pageNumber === 1 ? pageNumber : pageNumber - 1);
                }}
              >
                {' '}
                -
              </button>
            </div>
            <div className="flex flex-row items-center">
              <p>페이지 스케일</p>
              <button
                className="px-[12px] py-[6px] bg-[#14532d] text-white rounded-[5px] ml-[7px]"
                onClick={() => {
                  setPageScale(pageScale === 3 ? 3 : pageScale + 0.1);
                }}
              >
                {' '}
                +
              </button>
              <button
                className="px-[14px] py-[6px] bg-[#14532d] text-white rounded-[5px] ml-[7px]"
                onClick={() => {
                  setPageScale(pageScale - 1 < 1 ? 1 : pageScale - 1);
                }}
              >
                {' '}
                -
              </button>
            </div>
          </div>
          <div className="border-2">
            <Recommend params={params.id} writerId={resumeList[0]?.user_uuid} pageAdoped={resumeList[0]?.isadopted} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default resumeDetail;
