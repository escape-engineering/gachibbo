import { useRef, useState } from 'react';
import useInput from './useInput';
import { EducationType, EduFormType, ExperienceType, ExpFormType, LicenseType, LicFormType } from '@/type/resumeTypes';
import { EMPTY_EDU_OBJ, EMPTY_EXP_OBJ, EMPTY_LIC_OBJ } from '@/constants/resumeConstants';
import { makeResumePdf } from '@/utils/resume/makeResumePdf';
import {
  getUserPoint,
  updateResumeData,
  updateTransformedData,
  uploadResumeData,
  uploadTransformedData
} from '@/utils/resume/server-action';
import { updatePdfToStorage, uploadPdfToStorage } from '@/utils/resume/client-actions';
import browserClient from '@/utils/supabase/client';
import { transformResumeData } from '@/services/resumeadd/resumeaddServices';

const useResumeAddpage = () => {
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
  const [isadopted, setIsadopted] = useState(false);

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
  const openNewTabForPdf = async () => {
    const doc = await makeResumePdf(profileImg, name, phoneNum, email, expArray, eduArray, licArray);
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  };
  //NOTE - 포인트 초과 검사 로직
  const isUsablePoint = async (use_point: number | string) => {
    const { data: userPointData, error: userPointError } = await getUserPoint(userId);
    if (userPointError) throw new Error(userPointError.message);
    const remainPoint = userPointData ? userPointData[0].user_point : Infinity;
    if (use_point > remainPoint) return false;
    return true;
  };
  const isValueValid = (
    value: string | number,
    message: string,
    ref: React.MutableRefObject<HTMLInputElement | null> | React.RefObject<HTMLTextAreaElement>
  ) => {
    if (!(value + '')) {
      alert(message);
      ref.current?.focus();
      return false;
    }
    return true;
  };
  const isValidToUpload = async () => {
    if (!isValueValid(title, '이력서 제목을 작성해주세요.', titleRef)) return false;
    if (!isValueValid(point, '채택 포인트를 입력해주세요.', pointRef)) return false;
    //NOTE - 포인트 초과 검사
    const isPointUsable = await isUsablePoint(point);
    if (!isPointUsable) {
      console.log('1 :>> ', 1);
      alert('보유중인 포인트를 초과하는 양은 사용할 수 없습니다!');
      pointRef.current?.focus();
      return false;
    }
    if (!isValueValid(expYears, '경력을 작성해주세요. 신입인 경우 0을 입력해주세요.', expYearsRef)) return false;
    if (!isValueValid(name, '이름을 작성해주세요.', nameRef)) return false;
    if (!isValueValid(gender, '성별을 작성해주세요.', genderRef)) return false;
    if (!isValueValid(email, '이메일을 작성해주세요.', emailRef)) return false;
    if (!isValueValid(phoneNum, '번호를 작성해주세요.', phoneNumRef)) return false;
    if (!isValueValid(region, '근무 희망 지역을 작성해주세요.', regionRef)) return false;
    if (!isValueValid(address, '주소를 작성해주세요.', addressRef)) return false;
    if (!isValueValid(resumeDesc, '이력서 관련 내용을 작성해주세요.', resumeDescRef)) return false;
  };
  const handleUploadPdf = async (isUpdate: boolean) => {
    const isValidToUploadData = await isValidToUpload();
    if (!isValidToUploadData) return;
    const doc = await makeResumePdf(profileImg, name, phoneNum, email, expArray, eduArray, licArray);
    const pdfDoc = doc.output('blob');
    const pdfFile = new File([pdfDoc], `${title}`, { type: 'application/pdf' });

    const { data: pdfData, error: pdfError } = isUpdate
      ? await updatePdfToStorage(postId, pdfFile)
      : await uploadPdfToStorage(postId, pdfFile);

    if (pdfError) {
      console.log('pdfError :>> ', pdfError);
      throw new Error(pdfError.message);
    }
    const {
      data: { publicUrl }
    } = browserClient.storage.from('user_resume').getPublicUrl(`${postId}_resume`);

    const resumeFormData = {
      user_uuid: userId,
      post_id: postId,
      use_point: point,
      isadopted,
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

    const { data: resumePostData, error: resumePostError } = isUpdate
      ? await updateResumeData(postId, resumeFormData)
      : await uploadResumeData(resumeFormData);

    if (resumePostError) {
      console.log('resumePostError :>> ', resumePostError);
      throw new Error(resumePostError.message);
    }

    !!eduArray.length &&
      eduArray.forEach(async (edu) => {
        const eduFormData: EduFormType = transformResumeData<EducationType>(postId, userId, edu);
        const { data: eduPostDtat, error: eduPostError } = isUpdate
          ? await updateTransformedData<EduFormType, keyof EduFormType>(eduFormData, 'post_detail_education', 'edu_id')
          : await uploadTransformedData(eduFormData, 'post_detail_education');
      });

    !!expArray.length &&
      expArray.forEach(async (exp) => {
        const expFormData: ExpFormType = transformResumeData<ExperienceType>(postId, userId, exp);
        const { data: expPostData, error: expPostError } = isUpdate
          ? await updateTransformedData<ExpFormType, keyof ExpFormType>(expFormData, 'post_detail_experience', 'exp_id')
          : await uploadTransformedData(expFormData, 'post_detail_experience');
      });

    !!licArray.length &&
      licArray.forEach(async (lic) => {
        const licFormData = transformResumeData<LicenseType>(postId, userId, lic);
        const { data: licPostData, error: licPostError } = isUpdate
          ? await updateTransformedData<LicFormType, keyof LicFormType>(licFormData, 'post_detail_license', 'lic_id')
          : await uploadTransformedData(licFormData, 'post_detail_license');
      });
  };

  const savePdfToLocal = async () => {
    const doc = await makeResumePdf(profileImg, name, phoneNum, email, expArray, eduArray, licArray);
    doc.save(`${title ? title : '이력서'}`);
  };
  return {
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
  };
};

export default useResumeAddpage;
