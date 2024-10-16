import browserClient from '../supabase/client';
import { ResumeFormType } from '@/type/resumeTypes';

const getPostDetail = async (query_post_id: string) => {
  const { data, error } = await browserClient
    .from('post_detail')
    .select(
      'post_id,isadopted,experience,region,post_title,post_desc,name,gender,phoneNum,email,address, eduArray:post_detail_education(*), expArray:post_detail_experience(*), licArray:post_detail_license(*)'
    )
    .eq('post_id', query_post_id);
  return { data, error };
};

const uploadResumeData = async (resumeFormData: ResumeFormType) => {
  const { data, error } = await browserClient.from('post_detail').insert([resumeFormData]);
  return { data, error };
};

const updateResumeData = async (query_post_id: string, resumeFormData: ResumeFormType) => {
  const { data, error } = await browserClient.from('post_detail').update([resumeFormData]).eq('post_id', query_post_id);
  return { data, error };
};

const uploadTransformedData = async <T>(transformedFormData: T, tableName: string) => {
  console.log('tableName :>> ', tableName);
  const { data, error } = await browserClient.from(tableName).insert([transformedFormData]);
  return { data, error };
};

const updateTransformedData = async <T, K extends keyof T>(transformedFormData: T, tableName: string, equalWith: K) => {
  console.log('tableName :>> ', tableName);
  const { data, error } = await browserClient
    .from(tableName)
    .update([transformedFormData])
    .eq(equalWith as string, transformedFormData[equalWith]);
  return { data, error };
};

const uploadExpData = async (transformedFormData: any) => {
  const { data, error } = await browserClient.from('post_detail_experience').insert([transformedFormData]);
  return { data, error };
};

const getUserPoint = async (userId: string) => {
  const { data, error } = await browserClient.from('point').select('user_point').eq('user_id', userId);
  return { data, error };
};

const uploadPdfToStorage = async (postId: string, pdfFile: File) => {
  const { data, error } = await browserClient.storage.from('user_resume').upload(`${postId}_resume`, pdfFile);
  return { data, error };
};

const updatePdfToStorage = async (query_post_id: string, pdfFile: File) => {
  const { data, error } = await browserClient.storage.from('user_resume').update(`${query_post_id}_resume`, pdfFile, {
    cacheControl: '3600',
    upsert: true
  });
  return { data, error };
};

export {
  uploadExpData,
  getPostDetail,
  updateResumeData,
  uploadResumeData,
  uploadTransformedData,
  updateTransformedData,
  getUserPoint,
  updatePdfToStorage,
  uploadPdfToStorage
};
