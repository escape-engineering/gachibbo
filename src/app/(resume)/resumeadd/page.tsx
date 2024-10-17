'use client';

import React, { useEffect } from 'react';
import '@/utils/resume/malgun-normal.js';
import SideBarByPage from '@/app/_components/common/SideBarByPage';
import useResumeAddpage from '@/hooks/useResumeAddpage';
import SideBarItem from '@/app/_components/resumeadd/SideBarItem';
import ResumeTopSection from '@/app/_components/resumeadd/ResumeTopSection';
import PersonalDataSection from '@/app/_components/resumeadd/PersonalDataSection';
import EducationSection from '@/app/_components/resumeadd/EducationSection';
import ExperienceSection from '@/app/_components/resumeadd/ExperienceSection';
import LicenseSection from '@/app/_components/resumeadd/LicenseSection';
import ResumeDescSection from '@/app/_components/resumeadd/ResumeDescSection';
import CSRLoading from '@/app/_components/common/CSRLoading';
interface Props {
  searchParams: {
    query_post_id?: string;
  };
}

const ResumeAddPage = ({ searchParams: { query_post_id } }: Props) => {
  const {
    isLoading,
    openNewTabForPdf,
    handleUploadPdf,
    savePdfToLocal,
    point,
    handlePoint,
    pointRef,
    title,
    handleTitle,
    titleRef,
    profileImg,
    handleProfileImg,
    expYears,
    handleExpYears,
    expYearsRef,
    name,
    handleName,
    nameRef,
    gender,
    handleGender,
    genderRef,
    email,
    handleEmail,
    emailRef,
    phoneNum,
    handlePhoneNum,
    phoneNumRef,
    region,
    handleRegion,
    regionRef,
    address,
    handleAddress,
    addressRef,
    addForm,
    eduArray,
    deleteForm,
    expArray,
    licArray,
    resumeDesc,
    handleResumeDesc,
    resumeDescRef,
    setEduArray,
    setExpArray,
    setLicArray,
    getPostData,
    getUserId
  } = useResumeAddpage();
  useEffect(() => {
    getUserId();
    !!query_post_id && getPostData(query_post_id);
  }, []);

  return (
    <>
      <CSRLoading isLoading={isLoading} />
      <div className="flex flex-row pl-[257px]">
        <SideBarByPage>
          <SideBarItem
            queryString={query_post_id ? query_post_id : undefined}
            openNewTabForPdf={openNewTabForPdf}
            handleUploadPdf={handleUploadPdf}
            savePdfToLocal={savePdfToLocal}
          />
        </SideBarByPage>
        <div className="flex flex-col justify-center items-center gap-[20px] py-[20px] w-[calc(100vw-303px)]">
          <ResumeTopSection
            title={title}
            handleTitle={handleTitle}
            titleRef={titleRef}
            point={point}
            handlePoint={handlePoint}
            pointRef={pointRef}
          />
          <PersonalDataSection
            profileImg={profileImg && profileImg}
            handleProfileImg={handleProfileImg}
            expYears={expYears}
            handleExpYears={handleExpYears}
            expYearsRef={expYearsRef}
            name={name}
            handleName={handleName}
            nameRef={nameRef}
            gender={gender}
            handleGender={handleGender}
            genderRef={genderRef}
            email={email}
            handleEmail={handleEmail}
            emailRef={emailRef}
            phoneNum={phoneNum}
            handlePhoneNum={handlePhoneNum}
            phoneNumRef={phoneNumRef}
            region={region}
            handleRegion={handleRegion}
            regionRef={regionRef}
            address={address}
            handleAddress={handleAddress}
            addressRef={addressRef}
          />
          <EducationSection addForm={addForm} eduArray={eduArray} deleteForm={deleteForm} setEduArray={setEduArray} />
          <ExperienceSection addForm={addForm} expArray={expArray} deleteForm={deleteForm} setExpArray={setExpArray} />
          <LicenseSection addForm={addForm} licArray={licArray} deleteForm={deleteForm} setLicArray={setLicArray} />
          <ResumeDescSection
            resumeDesc={resumeDesc}
            handleResumeDesc={handleResumeDesc}
            resumeDescRef={resumeDescRef}
          />
        </div>
      </div>
    </>
  );
};

export default ResumeAddPage;
