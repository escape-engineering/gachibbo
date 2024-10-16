'use client';

import Button from '@/app/_components/common/Button';
import Input from '@/app/_components/common/Input';
import { EMPTY_EDU_OBJ, EMPTY_EXP_OBJ, EMPTY_LIC_OBJ } from '@/constants/resumeConstants';
import useInput from '@/hooks/useInput';
import browserClient from '@/utils/supabase/client';
import React, { useEffect, useRef, useState } from 'react';
import '@/utils/resume/malgun-normal.js';
import SideBarByPage from '@/app/_components/common/SideBarByPage';
import { updatePdfToStorage, uploadPdfToStorage } from '@/utils/resume/client-actions';
import {
  getPostDetail,
  getUserPoint,
  updateResumeData,
  updateTransformedData,
  uploadResumeData,
  uploadTransformedData
} from '@/utils/resume/server-action';
import { makeResumePdf } from '@/utils/resume/makeResumePdf';
import { transformResumeData } from '@/services/resumeadd/resumeaddServices';
import { EducationType, EduFormType, ExperienceType, ExpFormType, LicenseType, LicFormType } from '@/type/resumeTypes';
import ProfileImgLabel from '@/app/_components/resumeadd/ProfileImgLabel';
import EducationBox from '@/app/_components/resumeadd/EducationBox';
import ExperienceBox from '@/app/_components/resumeadd/ExperienceBox';
import LicenseBox from '@/app/_components/resumeadd/LicenseBox';
import useResumeAddpage from '@/hooks/useResumeAddpage';
import SideBarItem from '@/app/_components/resumeadd/SideBarItem';
import ResumeTopSection from '@/app/_components/resumeadd/ResumeTopSection';
import PersonalDataSection from '@/app/_components/resumeadd/PersonalDataSection';
import EducationSection from '@/app/_components/resumeadd/EducationSection';
import ExperienceSection from '@/app/_components/resumeadd/ExperienceSection';
import LicenseSection from '@/app/_components/resumeadd/LicenseSection';
import ResumeDescSection from '@/app/_components/resumeadd/ResumeDescSection';
interface Props {
  searchParams: {
    query_post_id?: string;
  };
}

const ResumeAddPage = ({ searchParams: { query_post_id } }: Props) => {
  const {
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
    setUserId,
    setTitle,
    setName,
    setGender,
    setPhoneNum,
    setEmail,
    setAddress,
    setRegion,
    setExpYears,
    setResumeDesc,
    setPoint,
    setPostId,
    setIsadopted,
    setEduArray,
    setExpArray,
    setLicArray
  } = useResumeAddpage();
  useEffect(() => {
    const getUserId = async () => {
      const { data: userSession, error: userSessionError } = await browserClient.auth.getSession();
      if (userSessionError) {
        console.log('userSessionError :>> ', userSessionError);
      } else {
        userSession.session && setUserId(userSession.session?.user.id);
      }
    };
    getUserId();
    const getPostData = async () => {
      const { data: postData, error: postDataError } = await getPostDetail(query_post_id as string);
      if (postDataError) {
        console.log('postDataError :>> ', postDataError);
        return;
      } else if (postData) {
        const {
          eduArray,
          expArray,
          licArray,
          post_id,
          isadopted,
          experience,
          region,
          post_title,
          post_desc,
          name,
          gender,
          phoneNum,
          email,
          address
        } = postData[0];
        //NOTE - state합치거나 하는 리팩토링 필요
        setTitle(post_title);
        setName(name);
        setGender(gender);
        setPhoneNum(phoneNum);
        setEmail(email);
        setAddress(address);
        setRegion(region);
        setExpYears(experience);
        setResumeDesc(post_desc);
        setPoint(point);
        setPostId(post_id);
        setIsadopted(isadopted);
        setEduArray(eduArray);
        setExpArray(expArray);
        setLicArray(licArray);
      }
    };
    !!query_post_id && getPostData();
  }, []);
  const testLogin = async () => {
    const { data, error } = await browserClient.auth.signInWithPassword({
      email: 'yt@yt.com',
      password: 'ytytyt'
    });
    if (error) {
      console.log('error :>> ', error);
    } else {
      console.log('data :>> ', data);
    }
  };
  const testLogout = async () => {
    const { error } = await browserClient.auth.signOut();
    if (error) {
      console.log('error :>> ', error);
    } else {
      console.log('로그아웃 됨');
    }
  };
  return (
    <div className="flex flex-row pl-[257px]">
      <SideBarByPage>
        <SideBarItem
          queryString={query_post_id && query_post_id}
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
        <ResumeDescSection resumeDesc={resumeDesc} handleResumeDesc={handleResumeDesc} resumeDescRef={resumeDescRef} />
      </div>
    </div>
  );
};

export default ResumeAddPage;
