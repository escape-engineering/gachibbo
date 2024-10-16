import React, { forwardRef, MutableRefObject } from 'react';

type Size = 'sm' | 'md' | 'long' | 'lg' | 'full';

interface InputType {
  isLabeled?: boolean;
  labelText?: string;
  placeholder?: string;
  name?: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | ((id: number) => void);
  required?: boolean;
  fref?: MutableRefObject<HTMLInputElement | null>;
  size?: Size;
}

const inputTheme = {
  size: {
    sm: 'px-[10px] py-[5px] w-[50px] h-[30px] rounded-[5px]',
    md: 'px-[10px] py-[5px] w-[200px] h-[40px] rounded-[7px]',
    long: 'px-[10px] py-[5px] w-[300px] h-[40px] rounded-[7px]',
    lg: 'px-[15px] py-[10px] w-[500px] h-[50px] rounded-[10px]',
    full: 'px-[15px] py-[10px] w-[800px] h-[70px] rounded-[30px]'
  }
};

const Input = forwardRef<HTMLInputElement, InputType>(
  (
    { size = 'md', isLabeled = false, placeholder = '', labelText = '', name = '', type = 'text', value, onChange },
    ref
  ) => {
    return (
      <>
        {isLabeled ? (
          <div className="flex flex-row justify-start items-center border-b-[1px] border-black border-solid">
            <label htmlFor={name}>{labelText}</label>
            <input
              type={type}
              id={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              ref={ref}
              className={`${inputTheme.size[size]} focus:outline-none`}
            />
          </div>
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            ref={ref}
            className={`${inputTheme.size[size]} border border-black focus:outline-none`}
          />
        )}
      </>
    );
  }
);

export default Input;
