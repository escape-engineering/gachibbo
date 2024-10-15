import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from 'react';

export type HandleInputType = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

//NOTE - initValue가 없다면 빈 문자열로 할당
const useInput = (
  initValue: string | number = ''
): [
  string | number,
  HandleInputType,
  MutableRefObject<HTMLInputElement | null>,
  Dispatch<SetStateAction<string | number>>
] => {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string | number>(initValue);
  const handleInputValue: HandleInputType = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  return [value, handleInputValue, ref, setValue];
};

export default useInput;
