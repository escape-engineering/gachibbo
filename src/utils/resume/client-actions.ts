import browserClient from '../supabase/client';

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

export { updatePdfToStorage, uploadPdfToStorage };
