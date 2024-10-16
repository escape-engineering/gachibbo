'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { CommentType } from '@/types/ResumeType';
import browserClient from '@/utils/supabase/client';
import useAuthStore from '@/store/useAuthStore';

const recommend = ({ params, writerId, pageAdoped }: { params: string; writerId: string; pageAdoped: boolean }) => {
  const supabase = createClient();
  const [comment, setComment] = useState<CommentType[]>([]);
  const [contents, setContents] = useState('');

  const [userId, setUserId] = useState('');
  const { userName, userImg } = useAuthStore();

  //채택 관련 useState
  const [isAdopted, setIsAdopted] = useState(false);
  const [points, setPoints] = useState(0);
  const [usePoints, setUsePoints] = useState(0);
  const [isFeedbackAdopted, setIsFeedbackAdopted] = useState(false);

  useEffect(() => {
    const getUserId = async () => {
      const { data: userSession, error: userSessionError } = await browserClient.auth.getSession();
      if (userSessionError) {
        console.log('userSessionError :>> ', userSessionError);
      } else {
        userSession.session && setUserId(userSession.session?.user.id);
      }
    };
    getUserId();

    getComment();
    console.log('CommentDatasdddddddddds', comment);
  }, []);

  const getComment = async () => {
    const { data, error } = await supabase.from('post_feedback').select('*').eq('post_id', params);

    if (error) {
      console.error('Error loading commentData : ', error.message);
    } else if (data) {
      console.log('CommentData', data);
      setComment(data);
    }
  };

  const updateComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentData = {
      post_id: params,
      user_uuid: userId,
      feedback_desc: contents,
      user_name: userName,
      image_url: userImg
    };

    if (contents.length === 0) {
      alert('피드백이 없네요....?🤔');
    } else {
      const { data, error } = await supabase.from('post_feedback').insert([commentData]);
      getComment();
      setContents('');

      console.log('contents', contents);
      if (error) {
        console.error('Error update comment : ', error.message);
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const getPointAndIsAdopted = async () => {
      //포인트 데이터 가져오기
      const { data: pointData, error: pointError } = await supabase
        .from('point')
        .select('user_point')
        .eq('user_id', userId);
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
        .eq('post_id', params);
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
        .eq('post_id', params);
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
      .eq('user_id', userId)
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
  const handleAdoption = async (feedback_id: string) => {
    if (isAdopted === false) {
      const { data, error } = await supabase
        .from('post_detail')
        .update({ isadopted: true })
        .eq('post_id', params)
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

    const { data: feedbackData, error: feedbackError } = await supabase
      .from('post_feedback')
      .update({ feedback_isSelected: true })
      .eq('feedback_id', feedback_id)
      .select('feedback_isSelected');
    if (feedbackError) {
      console.error('Error updating data isadoptedData : ', feedbackError.message);
    } else if (feedbackData) {
      console.log('피드백 상태 변경 완료 : ', feedbackData);
    }
    console.log('updatefeedbackisadoptedData : ', feedbackData); // 함수 정상 작동
    setIsFeedbackAdopted(!isFeedbackAdopted);
    getComment();
  };
  //is
  useEffect(() => {
    if (isAdopted) {
      updateUserPointInResume(usePoints);
    }
  }, [isAdopted]);
  ////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <form onSubmit={updateComment} className="mb-[30px]">
        <div className="bg-[#14532d] rounded-[20px] p-10 flex flex-col justify-items-end items-end">
          <textarea
            className="textareaCss"
            name="tuterComment"
            placeholder="내용입력"
            value={contents}
            onChange={(e) => {
              setContents(e.target.value);
            }}
          ></textarea>
          <button
            type="submit"
            className="px-7 py-2 bg-[#ffa800] text-white rounded-[10px] hover:bg-green-600 text-[18px] mt-5"
          >
            제출
          </button>
        </div>
      </form>
      <div>
        {comment.map((comment) => {
          return (
            <div key={comment.feedback_id} className="commentEach">
              <div>
                <img src={`${comment.image_url}`} className="w-[40px] h-[40px] rounded-[25px] mr-5" />
              </div>
              <div>
                <p className="font-bold">{comment.user_name}</p>
                <p className="font-medium text-[12px]">
                  {comment.write_date?.slice(0, 16).replaceAll('-', '.').replaceAll('T', '  ')}
                </p>
                <p className="whitespace-pre mt-[4px]">{comment.feedback_desc}</p>

                {pageAdoped === true && comment.feedback_isSelected === true && (
                  <div className="px-5 py-2 bg-[#06603b] text-white rounded-[10px] text-[15px] mt-5">채택완료</div>
                )}

                {writerId === userId && pageAdoped === false && comment.feedback_isSelected === false && (
                  <div>
                    <button
                      className="px-5 py-2 bg-[#06603b] text-white rounded-[10px] hover:bg-[#ffa800] text-[15px] mt-5"
                      onClick={() => handleAdoption(comment.feedback_id)}
                    >
                      채택
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default recommend;
