'use client';

import Button from '@/app/_components/common/Button';
import Input from '@/app/_components/common/Input';
import { EMPTY_EDU_OBJ, EMPTY_EXP_OBJ, EMPTY_LIC_OBJ } from '@/constants/resumeConstants';
import useInput from '@/hooks/useInput';
import { EducationType, ExperienceType, LicenseType } from '@/types/ResumeType';
import React, { useState } from 'react';

const ResumeAddPage = () => {
  const [name, handleName] = useInput();
  const [gender, handleGender] = useInput();
  const [phoneNum, handlePhoneNum] = useInput();
  const [email, handleEmail] = useInput();
  const [address, handleAddress] = useInput();
  const [region, handleRegion] = useInput();
  const [expYears, handleExpYears] = useInput(0);

  const [eduArray, setEduArray] = useState<EducationType[]>([]);
  const [expArray, setExpArray] = useState<ExperienceType[]>([]);
  const [licArray, setLicArray] = useState<LicenseType[]>([]);

  const handleArray = <T,>(
    idx: number,
    name: string,
    setState: React.Dispatch<React.SetStateAction<T[]>>,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState((prev) => {
      const changedArray = [...prev];
      changedArray[idx] = {
        ...changedArray[idx],
        [name]: e.target.value
      };
      return changedArray;
    });
  };

  const addForm = (objName: string) => {
    switch (objName) {
      case 'education':
        setEduArray((prev) => [...prev, { ...EMPTY_EDU_OBJ, edu_id: crypto.randomUUID() }]);
        break;
      case 'experience':
        setExpArray((prev) => [...prev, { ...EMPTY_EXP_OBJ, exp_id: crypto.randomUUID() }]);
        break;
      case 'license':
        setLicArray((prev) => [...prev, { ...EMPTY_LIC_OBJ, lic_id: crypto.randomUUID() }]);
        break;
    }
  };

  return (
    <div>
      <div className="flex flex-row gap-[10px]">
        <Button onClick={() => {}}>미리보기</Button>
        <Button onClick={() => {}}>이력서 저장</Button>
        <Button onClick={() => {}}>이력서 PDF로 저장</Button>
      </div>
      <section id="resumeTitleSection"></section>
      <div className="flex flex-col justify-start items-center py-[5px]">
        <Input isLabeled={true} labelText="이름 : " name="name" value={name} onChange={handleName} />
        <Input isLabeled={true} labelText="성별 : " name="gender" value={gender} onChange={handleGender} />
        <Input isLabeled={true} labelText="전화번호 : " name="phoneNum" value={phoneNum} onChange={handlePhoneNum} />
        <Input isLabeled={true} labelText="이메일 : " name="email" value={email} onChange={handleEmail} />
        <Input isLabeled={true} labelText="주소 : " name="address" value={address} onChange={handleAddress} />
        <Input isLabeled={true} labelText="근무희망지 : " name="region" value={region} onChange={handleRegion} />
        <Input
          isLabeled={true}
          labelText="경력 : "
          name="experience"
          type="number"
          value={expYears}
          onChange={handleExpYears}
        />

        <section>
          <div className="flex flex-row gap-[5px] my-[5px]">
            <p className="flex justify-start items-center w-[552px] px-[10px] border-b-2 border-black border-solid">
              학력
            </p>
            <Button onClick={() => addForm('education')}>+</Button>
          </div>
          {eduArray.map((edu, idx) => {
            return (
              <div key={edu.edu_id} className="flex flex-col gap-[10px]">
                <Input
                  isLabeled={true}
                  labelText="졸업년월 : "
                  value={edu.graduated_at}
                  onChange={(e) => handleArray(idx, 'graduated_at', setEduArray, e)}
                />
                <Input
                  isLabeled={true}
                  labelText="학교명 : "
                  value={edu.school_name}
                  onChange={(e) => handleArray(idx, 'school_name', setEduArray, e)}
                />
                <Input
                  isLabeled={true}
                  labelText="전공 : "
                  value={edu.major}
                  onChange={(e) => handleArray(idx, 'major', setEduArray, e)}
                />
              </div>
            );
          })}
        </section>
        <section>
          <div className="flex flex-row gap-[5px] my-[5px]">
            <div className="flex justify-start items-center w-[552px] px-[10px] border-b-2 border-black border-solid">
              경력사항
            </div>
            <Button onClick={() => addForm('experience')}>+</Button>
          </div>
          {expArray.map((exp, idx) => {
            return (
              <div key={exp.exp_id} className="flex flex-col gap-[10px]">
                <Input
                  isLabeled={true}
                  labelText="기간 : "
                  value={exp.exp_period}
                  onChange={(e) => handleArray(idx, 'exp_period', setExpArray, e)}
                />
                <Input
                  isLabeled={true}
                  labelText="근무처 : "
                  value={exp.exp_region}
                  onChange={(e) => handleArray(idx, 'exp_region', setExpArray, e)}
                />
                <Input
                  isLabeled={true}
                  labelText="직위 : "
                  value={exp.exp_position}
                  onChange={(e) => handleArray(idx, 'exp_position', setExpArray, e)}
                />
                <Input
                  isLabeled={true}
                  labelText="업무내용 : "
                  value={exp.exp_desc}
                  onChange={(e) => handleArray(idx, 'exp_desc', setExpArray, e)}
                />
              </div>
            );
          })}
        </section>
        <section>
          <div className="flex flex-row gap-[5px] my-[5px]">
            <div className="flex justify-start items-center w-[552px] px-[10px] border-b-2 border-black border-solid">
              보유기술 / 자격증
            </div>
            <Button onClick={() => addForm('license')}>+</Button>
          </div>
          {licArray.map((lic, idx) => {
            return (
              <div key={lic.lic_id} className="flex flex-col gap-[10px]">
                <Input
                  isLabeled={true}
                  labelText="취득 년월일 : "
                  value={lic.lic_date}
                  onChange={(e) => handleArray(idx, 'lic_date', setLicArray, e)}
                />
                <Input
                  isLabeled={true}
                  labelText="자격/면허증 : "
                  value={lic.lic_title}
                  onChange={(e) => handleArray(idx, 'lic_title', setLicArray, e)}
                />
                <Input
                  isLabeled={true}
                  labelText="시행처 : "
                  value={lic.lic_agency}
                  onChange={(e) => handleArray(idx, 'lic_agency', setLicArray, e)}
                />
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default ResumeAddPage;
