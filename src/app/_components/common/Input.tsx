import React from 'react';

interface InputType {
  isLabeled?: boolean;
  labelText?: string;
  placeholder?: string;
  name?: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | ((id: number) => void);
  required?: boolean;
}

const Input = ({
  isLabeled = false,
  placeholder = '',
  labelText = '',
  name = '',
  type = 'text',
  value,
  onChange
}: InputType) => {
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
            className="border border-black py-[5px] px-[10px]"
          />
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border border-black py-[5px] px-[10px]"
        />
      )}
    </>
  );
};

export default Input;
