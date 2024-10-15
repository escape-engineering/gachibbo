'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '../../../utils/supabase/client';

const ResumePage = () => {
  const supabase = createClient();
  const [isAdopted, setIsAdopted] = useState(false);
  const [points, setPoints] = useState(0);
  const [usePoints, setUsePoints] = useState(0);

  useEffect(() => {
    const getPointAndIsAdopted = async () => {
      // const { data, error } = await supabase.from('auth').select('user_point');
      // console.log('슈퍼베이스 data', data);
      // const {
      //   data: { user }
      // } = await supabase.auth.getUser();
      // console.log('유저data', user);

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

  return (
    <div className="border-2">
      ResumePage{points}
      {isAdopted}
      {usePoints}
      <button onClick={() => handleAdoption()}> 채택 완료</button>
    </div>
  );
};

export default ResumePage;
