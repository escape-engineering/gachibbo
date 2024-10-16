'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { CommentType } from '@/types/ResumeType';
import browserClient from '@/utils/supabase/client';

const recommend = ({ params }: { params: string }) => {
  const supabase = createClient();
  const [comment, setComment] = useState<CommentType[]>([]);
  const [contents, setContents] = useState('');

  const [userId, setUserId] = useState('');
  // console.log('recommend', params);

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

    const getComment = async () => {
      const { data: isCommentData, error: isCommentError } = await supabase
        .from('post_feedback')
        .select('*')
        .eq('post_id', params);
      if (isCommentError) {
        console.error('Error loading commentData : ', isCommentError.message);
      } else if (isCommentData) {
        console.log('CommentData', isCommentData);
        setComment(isCommentData);
      }
    };

    getComment();
  }, []);

  const updateComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentData = {
      post_id: params,
      user_uuid: userId,
      feedback_desc: contents
    };

    if (contents.length === 0) {
      alert('피드백이 없네요....?🤔');
    } else {
      const { data, error } = await supabase.from('post_feedback').update([commentData]).eq('post_id', params);
      console.log(contents);
      if (error) {
        console.error('Error update comment : ', error.message);
      }
    }
  };

  return (
    <>
      <form onSubmit={updateComment}>
        <textarea
          name="tuterComment"
          placeholder="내용입력"
          value={contents}
          onChange={(e) => {
            setContents(e.target.value);
          }}
        ></textarea>
        <button>제출</button>
      </form>
    </>
  );
};

export default recommend;
