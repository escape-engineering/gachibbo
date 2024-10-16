'use client';

import Link from 'next/link';

type Props = {
  postId: string;
};

const MoveToResumeUpdate = ({ postId }: Props) => {
  return (
    <Link
      className="rounded-[10px] fixed right-[15px] bottom-[15px] p-[10px] bg-[#62c44e] text-white"
      href={`/resumeadd?query_post_id=${postId}`}
    >
      수정하기
    </Link>
  );
};

export default MoveToResumeUpdate;
