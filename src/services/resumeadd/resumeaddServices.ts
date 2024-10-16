const transformResumeData = <T>(
  postId: string,
  userId: string,
  data: T
): T & { post_id: string; user_uuid: string } => {
  return {
    post_id: postId,
    user_uuid: userId,
    ...data
  };
};

export { transformResumeData };
