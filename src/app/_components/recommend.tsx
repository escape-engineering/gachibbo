'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { CommentType } from '@/types/ResumeType';
import browserClient from '@/utils/supabase/client';
import useAuthStore from '@/store/useAuthStore';

const recommend = ({ params }: { params: string }) => {
  const supabase = createClient();
  const [comment, setComment] = useState<CommentType[]>([]);
  const [contents, setContents] = useState('');

  const [userId, setUserId] = useState('');
  const { userName } = useAuthStore();

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
      user_name: userName
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

  return (
    <>
      <div>
        {comment.map((comment) => {
          return (
            <div key={comment.feedback_id}>
              <p>{comment.feedback_desc}</p>
              <p>{comment.user_name}</p>
              <p>{comment.feedback_isSelected}</p>
            </div>
          );
        })}
      </div>
      <form onSubmit={updateComment}>
        <textarea
          className="textareaCss"
          name="tuterComment"
          placeholder="내용입력"
          value={contents}
          onChange={(e) => {
            setContents(e.target.value);
          }}
        ></textarea>
        <button type="submit">제출</button>
      </form>
    </>
  );
};

export default recommend;
