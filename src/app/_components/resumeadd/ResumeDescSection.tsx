import { HandleInputType } from '@/hooks/useInput';

type Props = {
  resumeDesc: string | number;
  handleResumeDesc: HandleInputType;
  resumeDescRef: React.RefObject<HTMLTextAreaElement>;
};

const ResumeDescSection = ({ resumeDesc, handleResumeDesc, resumeDescRef }: Props) => {
  return (
    <section>
      <div className="flex flex-col justify-start">
        <textarea
          id="resumeDescription"
          className="rounded-[20px] border border-[#919191] py-[15px] px-[10px] border-solid w-[800px] min-h-[150px] focus:outline-none"
          placeholder="이력서 피드백 혹은 추가자료 관련 작성하고 싶은 내용을 적어주세요."
          value={resumeDesc}
          onChange={handleResumeDesc}
          ref={resumeDescRef}
        />
      </div>
    </section>
  );
};

export default ResumeDescSection;
