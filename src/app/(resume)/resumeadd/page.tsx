'use client';

import Button from '@/app/_components/common/Button';
import Input from '@/app/_components/common/Input';
import { EMPTY_EDU_OBJ, EMPTY_EXP_OBJ, EMPTY_LIC_OBJ } from '@/constants/resumeConstants';
import useInput from '@/hooks/useInput';
import { EducationType, ExperienceType, LicenseType } from '@/types/ResumeType';
import browserClient from '@/utils/supabase/client';
import React, { useEffect, useRef, useState } from 'react';
import jsPDF from 'jspdf';
import '@/utils/resume/malgun-normal.js';
import { convertImgToBase64 } from '@/utils/resume/convertImgToBase64';
import SideBarByPage from '@/app/_components/common/SideBarByPage';
interface Props {
  searchParams: {
    query_post_id?: string;
  };
}

const ResumeAddPage = ({ searchParams: { query_post_id } }: Props) => {
  query_post_id && console.log('props :>> ', query_post_id);
  const [title, handleTitle, titleRef, setTitle] = useInput('');
  const [name, handleName, nameRef, setName] = useInput('');
  const [gender, handleGender, genderRef, setGender] = useInput('');
  const [phoneNum, handlePhoneNum, phoneNumRef, setPhoneNum] = useInput('');
  const [email, handleEmail, emailRef, setEmail] = useInput('');
  const [address, handleAddress, addressRef, setAddress] = useInput('');
  const [region, handleRegion, regionRef, setRegion] = useInput('');
  const [expYears, handleExpYears, expYearsRef, setExpYears] = useInput(0);
  const [resumeDesc, handleResumeDesc, _, setResumeDesc] = useInput('');
  const resumeDescRef = useRef<HTMLTextAreaElement>(null);
  const [point, handlePoint, pointRef, setPoint] = useInput(0);
  const [profileImg, setProfileImg] = useState<File>();
  const [postId, setPostId] = useState(crypto.randomUUID());
  const handleProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files && e.target.files[0];
    if (targetFile) {
      if (targetFile.type !== 'image/png') {
        alert('png 이미지만 첨부 가능합니다.');
        return;
      } else {
        setProfileImg(targetFile);
      }
    } else {
      alert('파일을 업로드 해주세요!');
      return;
    }
  };

  const [eduArray, setEduArray] = useState<EducationType[]>([]);
  const [expArray, setExpArray] = useState<ExperienceType[]>([]);
  const [licArray, setLicArray] = useState<LicenseType[]>([]);

  const [userId, setUserId] = useState('');
  const [resume_url, setResume_url] = useState('');
  const [portfolio_url, setPortfolio_url] = useState('');
  // const [use_point, setUse_point] = useState(0);
  const [isadopted, setIsadopted] = useState(false);

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
      const { data: postData, error: postDataError } = await browserClient
        .from('post_detail')
        .select(
          '*, eduArray:post_detail_education(*), expArray:post_detail_experience(*), licArray:post_detail_license(*)'
        )
        .eq('post_id', query_post_id);
      if (postDataError) {
        console.log('postDataError :>> ', postDataError);
        return;
      } else {
        const {
          eduArray,
          expArray,
          licArray,
          user_uuid,
          post_id,
          use_point,
          isadopted,
          experience,
          region,
          post_title,
          resume_url,
          portfolio_url,
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
        setResume_url(resume_url);
        setPortfolio_url(portfolio_url);
        // setUse_point(use_point);
        setIsadopted(isadopted);
        setEduArray(eduArray);
        setExpArray(expArray);
        setLicArray(licArray);
      }
    };
    query_post_id && getPostData();
  }, []);

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
  const deleteForm = (objName: string, id: string) => {
    switch (objName) {
      case 'education':
        setEduArray((prev) => prev.filter((edu) => edu.edu_id !== id));
        break;
      case 'experience':
        setExpArray((prev) => prev.filter((exp) => exp.exp_id !== id));
        break;
      case 'license':
        setLicArray((prev) => prev.filter((lic) => lic.lic_id !== id));
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
    !!expArray.length && doc.text('경력', 20, yPosition); // 섹션 제목

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
    !!eduArray.length && doc.text('학력', 20, yPosition); // 섹션 제목

    yPosition += 10;
    eduArray.forEach((edu, idx) => {
      doc.text(`${edu.school_name} | ${edu.major}`, 20, yPosition); // 학교명 및 전공
      doc.text(`${edu.graduated_at}`, 150, yPosition); // 졸업일자

      yPosition += 15;
    });

    // 자격증 섹션
    yPosition += 10;
    doc.setFontSize(16);
    !!licArray.length && doc.text('자격증 / 면허증', 20, yPosition); // 섹션 제목

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
  //NOTE - 포인트 초과 검사 로직
  const isUsablePoint = async (use_point: number | string) => {
    // const { data: userSession, error: userSessionError } = await browserClient.auth.getSession();
    // if (userSessionError) {
    //   console.log('userSessionError :>> ', userSessionError);
    // } else {
    //   // console.log('userSession :>> ', userSession);
    // }
    const { data: userPointData, error: userPointError } = await browserClient
      .from('point')
      .select('user_point')
      .eq('user_id', userId);
    if (userPointError) throw new Error(userPointError.message);
    const remainPoint = userPointData[0].user_point;
    console.log('remainPoint :>> ', remainPoint);
    console.log(+use_point > remainPoint);
    if (use_point > remainPoint) return false;
    return true;
  };
  const isValidToUpload = async () => {
    const titleValid = !!title;
    if (!titleValid) {
      alert('이력서 제목을 작성해주세요!');
      titleRef.current?.focus();
      return false;
    }
    const pointValid = !!(point + '');
    if (!pointValid) {
      alert('채택 포인트를 입력해주세요!');
      pointRef.current?.focus();
      return false;
    }
    //NOTE - 포인트 초과 검사
    const isPointUsable = await isUsablePoint(point);
    if (!isPointUsable) {
      console.log('1 :>> ', 1);
      alert('보유중인 포인트를 초과하는 양은 사용할 수 없습니다!');
      pointRef.current?.focus();
      return false;
    }
    const nameValid = !!name;
    if (!nameValid) {
      alert('이름을 작성해주세요!');
      nameRef.current?.focus();
      return false;
    }
    const genderValid = !!gender;
    if (!genderValid) {
      alert('성별을 작성해주세요!');
      genderRef.current?.focus();
      return false;
    }
    const phoneNumValid = !!phoneNum;
    if (!phoneNumValid) {
      alert('번호를 작성해주세요!');
      phoneNumRef.current?.focus();
      return false;
    }
    const emailValid = !!email;
    if (!emailValid) {
      alert('이메일을 작성해주세요!');
      emailRef.current?.focus();
      return false;
    }
    const addressValid = !!address;
    if (!addressValid) {
      alert('주소를 작성해주세요!');
      addressRef.current?.focus();
      return false;
    }
    const regionValid = !!region;
    if (!regionValid) {
      alert('근무 희망 지역을 작성해주세요!');
      regionRef.current?.focus();
      return false;
    }
    const expYearsValid = !!(expYears + '');
    if (!expYearsValid) {
      alert('경력을 작성해주세요! 신입인 경우 0을 입력해주세요!');
      expYearsRef.current?.focus();
      return false;
    }
    const resumeDescValid = !!resumeDesc;
    if (!resumeDescValid) {
      alert('이력서 관련 내용을 작성해주세요!');
      resumeDescRef.current?.focus();
      return false;
    }
    return true;
  };
  const uploadPdfToStorage = async () => {
    const isValidToUploadData = await isValidToUpload();
    if (!isValidToUploadData) return;
    const doc = await makeResumePdf();
    const pdfDoc = doc.output('blob');
    const pdfFile = new File([pdfDoc], `${title}`, { type: 'application/pdf' });
    // const postId = crypto.randomUUID();
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
    // const { data: userSession, error: userSessionError } = await browserClient.auth.getSession();
    // if (userSessionError) {
    //   console.log('userSessionError :>> ', userSessionError);
    // } else {
    //   console.log('userSession :>> ', userSession);
    // }
    const resumeFormData = {
      user_uuid: userId,
      post_id: postId,
      use_point: point,
      isadopted: false,
      experience: expYears,
      region: region,
      post_title: title,
      resume_url: publicUrl,
      portfolio_url: '',
      post_desc: resumeDesc,
      name,
      gender,
      phoneNum,
      email,
      address
    };

    const { data: resumePostData, error: resumePostError } = await browserClient
      .from('post_detail')
      .insert([resumeFormData]);
    if (resumePostError) {
      console.log('resumePostError :>> ', resumePostError);
      throw new Error(resumePostError.message);
    }
    console.log('resumePostData :>> ', resumePostData);

    // const a =
    !!eduArray.length &&
      eduArray.forEach(async (edu) => {
        const eduFormData = {
          post_id: postId,
          user_uuid: userId,
          ...edu
        };
        const { data: eduPostDtat, error: eduPostError } = await browserClient
          .from('post_detail_education')
          .insert([eduFormData]);
      });

    // const b =
    !!expArray.length &&
      expArray.forEach(async (exp) => {
        const expFormData = {
          post_id: postId,
          user_uuid: userId,
          ...exp
        };
        const { data: expPostDtat, error: expPostError } = await browserClient
          .from('post_detail_experience')
          .insert([expFormData]);
      });

    // const c =
    !!licArray.length &&
      licArray.forEach(async (lic) => {
        const licFormData = {
          post_id: postId,
          user_uuid: userId,
          ...lic
        };
        const { data: licPostDtat, error: licPostError } = await browserClient
          .from('post_detail_license')
          .insert([licFormData]);
      });
    // const d = new Promise((reject) => {
    //   setTimeout(() => reject('실패!'), 5000);
    // });
    // Promise.all([a, b, c, d])
    //   .then((res) => console.log('res :>> ', res))
    //   .catch((err) => console.log('err :>> ', err));
  };
  const updatePdfToStorage = async () => {
    const isValidToUploadData = await isValidToUpload();
    if (!isValidToUploadData) return;
    const doc = await makeResumePdf();
    const pdfDoc = doc.output('blob');
    const pdfFile = new File([pdfDoc], `${title}`, { type: 'application/pdf' });

    const { data, error } = await browserClient.storage.from('user_resume').update(`${query_post_id}_resume`, pdfFile, {
      cacheControl: '3600',
      upsert: true
    });
    if (error) {
      console.log('error :>> ', error);
      throw new Error(error.message);
    }
    const {
      data: { publicUrl }
    } = browserClient.storage.from('user_resume').getPublicUrl(`${query_post_id}_resume`);

    const resumeFormData = {
      user_uuid: userId,
      post_id: query_post_id,
      use_point: point,
      isadopted,
      experience: expYears,
      region,
      post_title: title,
      resume_url: publicUrl,
      portfolio_url: '',
      post_desc: resumeDesc,
      name,
      gender,
      phoneNum,
      email,
      address
    };

    const { data: resumePostData, error: resumePostError } = await browserClient
      .from('post_detail')
      .update([resumeFormData])
      .eq('post_id', query_post_id);
    if (resumePostError) {
      console.log('resumePostError :>> ', resumePostError);
      throw new Error(resumePostError.message);
    }

    !!eduArray.length &&
      eduArray.forEach(async (edu) => {
        const eduFormData = {
          post_id: query_post_id,
          user_uuid: userId,
          ...edu
        };
        const { data: eduPostDtat, error: eduPostError } = await browserClient
          .from('post_detail_education')
          .update([eduFormData])
          .eq('edu_id', edu.edu_id);
      });

    !!expArray.length &&
      expArray.forEach(async (exp) => {
        const expFormData = {
          post_id: query_post_id,
          user_uuid: userId,
          ...exp
        };
        const { data: expPostDtat, error: expPostError } = await browserClient
          .from('post_detail_experience')
          .update([expFormData])
          .eq('exp_id', exp.exp_id);
      });

    !!licArray.length &&
      licArray.forEach(async (lic) => {
        const licFormData = {
          post_id: query_post_id,
          user_uuid: userId,
          ...lic
        };
        const { data: licPostDtat, error: licPostError } = await browserClient
          .from('post_detail_license')
          .update([licFormData])
          .eq('lic_id', lic.lic_id);
      });
  };
  const savePdfToLocal = async () => {
    const doc = await makeResumePdf();
    doc.save(`${title ? title : '이력서'}`);
  };
  return (
    <div className="flex flex-row pl-[257px]">
      <SideBarByPage>
        <div className="flex flex-col gap-[10px]">
          {/* <button
            onClick={async () => {
              await browserClient.auth.signInWithPassword({
                email: 'yt@yt.com',
                password: 'ytytyt'
              });
            }}
          >
            임시로그인
          </button> */}
          <Button onClick={() => openNewTabForPdf()}>미리보기</Button>
          <Button onClick={() => (query_post_id ? updatePdfToStorage() : uploadPdfToStorage())}>이력서 등록</Button>
          <Button onClick={() => savePdfToLocal()}>이력서 저장</Button>
        </div>
      </SideBarByPage>
      <div className=" border border-solid border-black flex flex-col justify-center items-center gap-[20px] py-[20px] w-[calc(100vw-303px)]">
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
        <section className="flex flex-row gap-[30px] justify-center items-center">
          <div>
            <label htmlFor="profileImg">
              {profileImg ? (
                <img
                  src={`${URL.createObjectURL(profileImg)}`}
                  className="flex justify-center items-center rounded-[20px] w-[200px] h-[267px] border-[2px] border-black border-solid"
                />
              ) : (
                <div className="flex justify-center items-center rounded-[20px] px-[5px] w-[200px] h-[267px] bg-[#e6e6e6] border-[5px] border-black border-dashed">
                  <p>프로필 이미지 첨부</p>
                </div>
              )}
            </label>
            <input
              id="profileImg"
              type="file"
              className="hidden"
              onChange={(e) => handleProfileImg(e)}
              accept="image/png" //NOTE - pdf설정때문에 png만 가능하게 했음, 추가방식 고민해보겠음
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-[10px]">
            <Input
              isLabeled={true}
              labelText="*경력 : "
              name="experience"
              size="sm"
              value={expYears}
              onChange={handleExpYears}
              ref={expYearsRef}
            />
            <Input isLabeled={true} labelText="*이름 : " name="name" value={name} onChange={handleName} ref={nameRef} />
            <Input
              isLabeled={true}
              labelText="*성별 : "
              name="gender"
              value={gender}
              onChange={handleGender}
              ref={genderRef}
              placeholder="남성/여성"
            />
            <Input
              isLabeled={true}
              labelText="*이메일 : "
              name="email"
              value={email}
              onChange={handleEmail}
              ref={emailRef}
              placeholder="example@ex.com"
            />
            <Input
              isLabeled={true}
              labelText="*전화번호 : "
              name="phoneNum"
              value={phoneNum}
              onChange={handlePhoneNum}
              ref={phoneNumRef}
              placeholder="010-0000-0000"
            />
            <Input
              isLabeled={true}
              labelText="*근무희망지 : "
              name="region"
              value={region}
              onChange={handleRegion}
              ref={regionRef}
            />
            <Input
              isLabeled={true}
              labelText="*주소 : "
              size="long"
              name="address"
              value={address}
              onChange={handleAddress}
              ref={addressRef}
            />
          </div>
        </section>
        <section>
          <div className="flex flex-row gap-[5px] my-[10px]">
            <p className="flex justify-start items-center w-[500px] px-[10px] border-b-2 border-black border-solid">
              학력
            </p>
            <Button onClick={() => addForm('education')}>+</Button>
          </div>
          <ul className="flex flex-col items-center gap-[15px]">
            {eduArray.map((edu, idx) => {
              return (
                <li
                  key={edu.edu_id}
                  className="flex flex-col gap-[10px] border border-black border-solid w-[350px] p-[20px] rounded-[20px]"
                >
                  <div className="flex justify-end">
                    <button className="w-[13px]" onClick={() => deleteForm('education', edu.edu_id)}>
                      <img src="/assets/modalCloseButton.png" alt="X" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <Input
                      isLabeled={true}
                      labelText="졸업년월 : "
                      value={edu.graduated_at}
                      onChange={(e) => handleArray(idx, 'graduated_at', setEduArray, e)}
                      placeholder="2024.10.14"
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
                </li>
              );
            })}
          </ul>
        </section>
        <section>
          <div className="flex flex-row gap-[5px] my-[10px]">
            <div className="flex justify-start items-center w-[500px] px-[10px] border-b-2 border-black border-solid">
              경력사항
            </div>
            <Button onClick={() => addForm('experience')}>+</Button>
          </div>
          <ul className="flex flex-col items-center gap-[15px]">
            {expArray.map((exp, idx) => {
              return (
                <li
                  key={exp.exp_id}
                  className="flex flex-col gap-[10px] border border-black border-solid w-[350px] p-[20px] rounded-[20px]"
                >
                  <div className="flex justify-end">
                    <button className="w-[13px]" onClick={() => deleteForm('experience', exp.exp_id)}>
                      <img src="/assets/modalCloseButton.png" alt="X" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <Input
                      isLabeled={true}
                      labelText="기간 : "
                      value={exp.exp_period}
                      onChange={(e) => handleArray(idx, 'exp_period', setExpArray, e)}
                      placeholder="2020.10.14~2024.10.14"
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
                      placeholder="ex) PM"
                    />
                    <Input
                      isLabeled={true}
                      labelText="업무내용 : "
                      value={exp.exp_desc}
                      onChange={(e) => handleArray(idx, 'exp_desc', setExpArray, e)}
                      placeholder="내일배움캠프 클라이언트 DB관리"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <section>
          <div className="flex flex-row gap-[5px] my-[10px]">
            <div className="flex justify-start items-center w-[500px] px-[10px] border-b-2 border-black border-solid">
              보유기술 / 자격증
            </div>
            <Button onClick={() => addForm('license')}>+</Button>
          </div>
          <ul className="flex flex-col items-center gap-[15px]">
            {licArray.map((lic, idx) => {
              return (
                <li
                  key={lic.lic_id}
                  className="flex flex-col gap-[10px] border border-black border-solid w-[350px] p-[20px] rounded-[20px]"
                >
                  <div className="flex justify-end">
                    <button className="w-[13px]" onClick={() => deleteForm('license', lic.lic_id)}>
                      <img src="/assets/modalCloseButton.png" alt="X" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <Input
                      isLabeled={true}
                      labelText="취득 년월일 : "
                      value={lic.lic_date}
                      onChange={(e) => handleArray(idx, 'lic_date', setLicArray, e)}
                      placeholder="2024.10.14"
                    />
                    <Input
                      isLabeled={true}
                      labelText="자격/면허증 : "
                      value={lic.lic_title}
                      onChange={(e) => handleArray(idx, 'lic_title', setLicArray, e)}
                      placeholder="정보처리기사"
                    />
                    <Input
                      isLabeled={true}
                      labelText="시행처 : "
                      value={lic.lic_agency}
                      onChange={(e) => handleArray(idx, 'lic_agency', setLicArray, e)}
                      placeholder="한국산업인력공단"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <section>
          <div className="flex flex-col justify-start">
            {/* <label htmlFor="resumeDescription">*내용 입력</label> */}
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
      </div>
    </div>
  );
};

export default ResumeAddPage;
