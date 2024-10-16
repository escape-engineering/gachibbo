import React from 'react';
import Input from '../common/Input';
import { HandleInputType } from '@/hooks/useInput';

type Props = {
  title: string | number;
  handleTitle: HandleInputType;
  titleRef: React.MutableRefObject<HTMLInputElement | null>;
  point: string | number;
  handlePoint: HandleInputType;
  pointRef: React.MutableRefObject<HTMLInputElement | null>;
};

const ResumeTopSection = ({ title, handleTitle, titleRef, point, handlePoint, pointRef }: Props) => {
  return (
    <section id="resumeTitleSection" className="flex flex-row justify-center gap-[10px]">
      <Input placeholder="OOO님의 이력서" size="lg" value={title} onChange={handleTitle} ref={titleRef} />
      <Input
        isLabeled={true}
        labelText="*채택 포인트 : "
        value={point}
        onChange={handlePoint}
        ref={pointRef}
        size="sm"
      />
    </section>
  );
};

export default ResumeTopSection;
