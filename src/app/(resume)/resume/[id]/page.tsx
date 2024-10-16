'use client';

import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';
import { ResumeType } from '@/types/ResumeType';
import { Document, Page, pdfjs } from 'react-pdf';
import 'core-js/full/promise/with-resolvers.js';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import '@/css/resumeList.css';

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
  //채택 관련 useState
  const [isAdopted, setIsAdopted] = useState(false);
  const [points, setPoints] = useState(0);
  const [usePoints, setUsePoints] = useState(0);

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
  //////////////////////////////////////////////////////////////// 채택함수 //////////////////////////////////////////////////////////
  useEffect(() => {
    const getPointAndIsAdopted = async () => {
      //포인트 데이터 가져오기
      const { data: pointData, error: pointError } = await supabase
        .from('point')
        .select('user_point')
        .eq('user_id', '2cc0b3c7-661a-4631-a6f8-6a204b89976c');
      if (pointError) {
        console.error('Error fetching data getPoint : ', pointError.message);
      } else if (pointData) {
        console.log('유저 test', pointData[0]?.user_point);
        setPoints(pointData[0]?.user_point);
      }
      //adopted 데이터 가져오기
      const { data: isAdoptedData, error: isAdoptedError } = await supabase
        .from('post_detail')
        .select('isadopted')
        .eq('post_id', 'ed6fb1c8-9ea9-492c-b7d7-3911d74cf56a');
      if (isAdoptedError) {
        console.error('Error fetching data getPoint : ', isAdoptedError.message);
      } else if (isAdoptedData) {
        console.log('채택 test', isAdoptedData[0]?.isadopted);
        setIsAdopted(isAdoptedData[0]?.isadopted);
      }
      //usePoint 값 가져오기
      const { data: usePointData, error: usePointError } = await supabase
        .from('post_detail')
        .select('use_point')
        .eq('post_id', 'ed6fb1c8-9ea9-492c-b7d7-3911d74cf56a');
      if (usePointError) {
        console.error('Error fetching data getPoint : ', usePointError.message);
      } else if (usePointData) {
        console.log('usePoint test', usePointData[0]?.use_point);
        setUsePoints(usePointData[0]?.use_point);
      }
    };

    getPointAndIsAdopted();
  }, []);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    console.log(`numPages ${numPages}`);
    setNumPages(numPages);
  }
  //////////////////////////////////////////////////////////////// 채택함수 //////////////////////////////////////////////////////////
  //건 포인트 차감
  const updateUserPointInResume = async (adoptionPoint: number) => {
    const { data, error } = await supabase
      .from('point')
      .update({ user_point: points - adoptionPoint })
      .eq('user_id', '2cc0b3c7-661a-4631-a6f8-6a204b89976c')
      .select('user_point');
    if (error) {
      console.error('Error updating data updateUserPointInResume : ', error.message);
    } else if (data) {
      console.log('채택 포인트만큼 차감 완료 : ', data);
    }
    console.log('updateUserPointInResume data : ', data); // 함수 정상 작동
    console.log('Current points:', typeof points, points);
    const buyProduct = (adoptionPoint: number) => {
      setPoints(points - adoptionPoint);
    };
    buyProduct(adoptionPoint);
  };
  //채택 함수
  const handleAdoption = async () => {
    if (isAdopted === false) {
      const { data, error } = await supabase
        .from('post_detail')
        .update({ isadopted: true })
        .eq('post_id', 'ed6fb1c8-9ea9-492c-b7d7-3911d74cf56a')
        .select('isadopted');
      if (error) {
        console.error('Error updating data isadoptedData : ', error.message);
      } else if (data) {
        console.log('채택 상태 변경 완료 : ', data);
      }
      console.log('updateisadoptedData : ', data); // 함수 정상 작동
      setIsAdopted(!isAdopted);
    } else {
      alert('동작 그만 밑장빼기냐?');
    }
  };
  //is
  useEffect(() => {
    if (isAdopted) {
      updateUserPointInResume(usePoints);
    }
  }, [isAdopted]);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className='postDetailMainBox'>
        {/* pdf 크기가 1280 * 720이 넘는 경우, overflow 처리 */}
        <div style={{ width: '1280px', height: '720px', overflow: 'auto' }}>
          <Document file={`${resumeList[0]?.resume_url}`} onLoadSuccess={onDocumentLoadSuccess}>
            <Page width={1180} height={720} scale={pageScale} pageNumber={pageNumber} />
          </Document>
        </div>
        <div>
          <p>
            Page {pageNumber} of {numPages}
          </p>

          <p>페이지 이동 버튼</p>
          {/* 버튼을 누르면 setPageNumber가 바뀌는데, 만약 numPages과 pageNumber가 같으면 pageNumber, 아니면 pageNumber에 +1인 것. */}
          <button
            onClick={() => {
              setPageNumber(numPages === pageNumber ? pageNumber : pageNumber + 1);
            }}
          >
            {' '}
            +
          </button>
          <button
            onClick={() => {
              setPageNumber(pageNumber === 1 ? pageNumber : pageNumber - 1);
            }}
          >
            {' '}
            -
          </button>

          <p>페이지 스케일</p>
          <button
            onClick={() => {
              setPageScale(pageScale === 3 ? 3 : pageScale + 0.1);
            }}
          >
            {' '}
            +
          </button>
          <button
            onClick={() => {
              setPageScale(pageScale - 1 < 1 ? 1 : pageScale - 1);
            }}
          >
            {' '}
            -
          </button>
        </div>
        <hr />
        
        <div className="border-2">
          ResumePage{points}
          {isAdopted}<br/>
          {usePoints}
          <button onClick={() => handleAdoption()}> 채택 완료</button>
        </div>
      </div>
    </>
  );
};

export default resumeDetail;
