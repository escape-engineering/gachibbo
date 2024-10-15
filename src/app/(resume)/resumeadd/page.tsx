'use client';

import Button from '@/app/_components/common/Button';
import Input from '@/app/_components/common/Input';
import { EMPTY_EDU_OBJ, EMPTY_EXP_OBJ, EMPTY_LIC_OBJ } from '@/constants/resumeConstants';
import useInput from '@/hooks/useInput';
import { EducationType, ExperienceType, LicenseType } from '@/types/ResumeType';
import browserClient from '@/utils/supabase/client';
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import '@/utils/resume/malgun-normal.js';
import { convertImgToBase64 } from '@/utils/resume/convertImgToBase64';

const ResumeAddPage = () => {
  const [title, handleTitle] = useInput('');
  const [name, handleName] = useInput('');
  const [gender, handleGender] = useInput('');
  const [phoneNum, handlePhoneNum] = useInput('');
  const [email, handleEmail] = useInput('');
  const [address, handleAddress] = useInput('');
  const [region, handleRegion] = useInput('');
  const [expYears, handleExpYears] = useInput(0);
  const [resumeDesc, handleResumeDesc] = useInput('');
  const [point, handlePoint] = useInput(0);
  const [profileImg, setProfileImg] = useState<File>();
  const handleProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files && e.target.files[0];
    if (targetFile) {
      setProfileImg(targetFile);
    } else {
      alert('파일을 업로드 해주세요!');
    }
  };

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

  const makeResumePdf = async () => {
    const doc = new jsPDF();
    doc.setFont('malgun');

    // 이미지가 있을 때 Base64로 변환
    if (profileImg) {
      const imageBase64: string = (await convertImgToBase64(profileImg)) as string;
      // 이미지 추가: 좌표(x, y), 크기(width, height) 설정
      doc.addImage(imageBase64, 'PNG', 150, 20, 30, 40); // x=150, y=10, width=40, height=40
    }

    // 이름, 직무, 연락처 등 기본 정보 추가
    doc.setFontSize(20);
    doc.text(`${name}`, 20, 30); // 이름

    doc.setFontSize(12);
    doc.text(`Front End`, 20, 40); // 직무
    doc.text(`연락처: ${phoneNum} | 이메일: ${email}`, 20, 50); // 연락처

    // 경력 섹션
    let yPosition = 65;
    doc.setFontSize(16);
    doc.text('경력', 20, yPosition); // 섹션 제목

    yPosition += 10;
    doc.setFontSize(12);
    expArray.forEach((exp, idx) => {
      doc.text(`${exp.exp_region} | ${exp.exp_position}`, 20, yPosition); // 회사명 및 직위
      doc.text(`${exp.exp_period}`, 150, yPosition); // 기간

      yPosition += 10;
      doc.text(`${exp.exp_desc}`, 20, yPosition); // 상세 설명

      yPosition += 15;
    });

    // 학력 섹션
    yPosition += 10;
    doc.setFontSize(16);
    doc.text('학력', 20, yPosition); // 섹션 제목

    yPosition += 10;
    eduArray.forEach((edu, idx) => {
      doc.text(`${edu.school_name} | ${edu.major}`, 20, yPosition); // 학교명 및 전공
      doc.text(`${edu.graduated_at}`, 150, yPosition); // 졸업일자

      yPosition += 15;
    });

    // 자격증 섹션
    yPosition += 10;
    doc.setFontSize(16);
    doc.text('기타 활동', 20, yPosition); // 섹션 제목

    yPosition += 10;
    licArray.forEach((lic, idx) => {
      doc.text(`${lic.lic_title} | ${lic.lic_agency}`, 20, yPosition); // 자격증명 및 발급기관
      doc.text(`${lic.lic_date}`, 150, yPosition); // 자격증 취득일

      yPosition += 15;
    });

    return doc;
  };
  const openNewTabForPdf = async () => {
    const doc = await makeResumePdf();
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  };
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
  const getSessionData = async () => {
    const { data: userSession, error: userSessionError } = await browserClient.auth.getSession();
    if (userSessionError) {
      console.log('userSessionError :>> ', userSessionError);
    } else {
      console.log('userSession :>> ', userSession);
    }
  };
  const uploadPdfToStorage = async () => {
    const doc = await makeResumePdf();
    const pdfDoc = doc.output('blob');
    const pdfFile = new File([pdfDoc], `${title}`, { type: 'application/pdf' });
    const postId = crypto.randomUUID();
    console.log(doc);
    const { data, error } = await browserClient.storage.from('user_resume').upload(`${postId}_resume`, pdfFile);
    if (error) {
      console.log('error :>> ', error);
      throw new Error(error.message);
    }
    const {
      data: { publicUrl }
    } = browserClient.storage.from('user_resume').getPublicUrl(`${postId}_resume`);

    console.log('data :>> ', data);
    const { data: userSession, error: userSessionError } = await browserClient.auth.getSession();
    if (userSessionError) {
      console.log('userSessionError :>> ', userSessionError);
    } else {
      console.log('userSession :>> ', userSession);
    }
    const resumeFormData = {
      post_id: postId,
      use_point: point,
      isadopted: false,
      experience: expYears,
      region: region,
      post_title: title,
      resume_url: publicUrl,
      portfolio_url: '',
      user_uuid: userSession.session?.user.id,
      post_desc: resumeDesc
    };

    const { data: resumePostData, error: resumePostError } = await browserClient
      .from('post_detail')
      .insert([resumeFormData]);
    if (resumePostError) {
      console.log('resumePostError :>> ', resumePostError);
      throw new Error(resumePostError.message);
    }
    console.log('resumePostData :>> ', resumePostData);

    !!eduArray.length &&
      eduArray.forEach(async (edu) => {
        const eduFormData = {
          post_id: postId,
          user_uuid: userSession.session?.user.id,
          ...edu
        };
        const { data: eduPostDtat, error: eduPostError } = await browserClient
          .from('post_detail_education')
          .insert([eduFormData]);
      });

    !!expArray.length &&
      expArray.forEach(async (exp) => {
        const expFormData = {
          post_id: postId,
          user_uuid: userSession.session?.user.id,
          ...exp
        };
        const { data: expPostDtat, error: expPostError } = await browserClient
          .from('post_detail_experience')
          .insert([expFormData]);
      });

    !!licArray.length &&
      licArray.forEach(async (lic) => {
        const licFormData = {
          post_id: postId,
          user_uuid: userSession.session?.user.id,
          ...lic
        };
        const { data: licPostDtat, error: licPostError } = await browserClient
          .from('post_detail_license')
          .insert([licFormData]);
      });
  };
  const savePdfToLocal = async () => {
    const doc = await makeResumePdf();
    doc.save(`${title ? title : '이력서'}`);
  };
  return (
    <div>
      <div className="flex flex-row gap-[10px]">
        <Button onClick={() => openNewTabForPdf()}>미리보기</Button>
        <Button onClick={() => uploadPdfToStorage()}>이력서게시글 등록</Button>
        <Button onClick={() => savePdfToLocal()}>이력서 PDF로 저장</Button>
        <Button onClick={() => testLogin()}>임시로그인</Button>
        <Button onClick={() => testLogout()}>임시로그아웃</Button>
        <Button onClick={() => getSessionData()}>getSession테스트</Button>
      </div>
      <section id="resumeTitleSection">
        <Input placeholder="OOO님의 이력서" value={title} onChange={handleTitle} />
        <Input isLabeled={true} labelText="채택 포인트 : " value={point} onChange={handlePoint} />
      </section>
      <div className="flex flex-col justify-start items-center py-[5px]">
        <section className="flex flex-row gap-[30px]">
          <div>
            <label htmlFor="profileImg">프로필 이미지 첨부</label>
            <input id="profileImg" type="file" className="hidden" onChange={(e) => handleProfileImg(e)} />
          </div>
          <div>
            <Input isLabeled={true} labelText="이름 : " name="name" value={name} onChange={handleName} />
            <Input isLabeled={true} labelText="성별 : " name="gender" value={gender} onChange={handleGender} />
            <Input
              isLabeled={true}
              labelText="전화번호 : "
              name="phoneNum"
              value={phoneNum}
              onChange={handlePhoneNum}
            />
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
          </div>
        </section>
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
        <section>
          <div>
            <label htmlFor="resumeDescription">내용 입력</label>
            <textarea
              id="resumeDescription"
              className="w-[800px] min-h-[600px] "
              placeholder="이력서 피드백관련 작성하고 싶은 내용을 적어주세요!"
              value={resumeDesc}
              onChange={handleResumeDesc}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResumeAddPage;
