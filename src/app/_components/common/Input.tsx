import React, { forwardRef, MutableRefObject } from 'react';

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
}

const Input = forwardRef<HTMLInputElement, InputType>(
  ({ isLabeled = false, placeholder = '', labelText = '', name = '', type = 'text', value, onChange }, ref) => {
    return (
      <>
        {isLabeled ? (
          <div className="flex flex-row justify-start min-w-[512px] ">
            <label htmlFor={name}>{labelText}</label>
            <input
              type={type}
              id={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              ref={ref}
              className="border border-black py-[5px] px-[10px]"
            />
          </div>
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            ref={ref}
            className="border border-black py-[5px] px-[10px]"
          />
        )}
      </>
    );
  }
);

export default Input;
