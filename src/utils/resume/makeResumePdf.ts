import { jsPDF } from 'jspdf';
import { convertImgToBase64 } from './convertImgToBase64';
import { EducationType, ExperienceType, LicenseType } from '@/type/resumeTypes';

export const makeResumePdf = async (
  profileImg: File | undefined,
  name: string | number,
  phoneNum: string | number,
  email: string | number,
  expArray: ExperienceType[],
  eduArray: EducationType[],
  licArray: LicenseType[]
) => {
  const doc = new jsPDF();
  doc.setFont('malgun');

  // 이미지가 있을 때 Base64로 변환
  if (profileImg) {
    const imageBase64: string = (await convertImgToBase64(profileImg)) as string;
    doc.addImage(imageBase64, 'PNG', 150, 20, 30, 40); // x=150, y=10, width=40, height=40
  }

  // 이름, 직무, 연락처 등 기본 정보 추가
  doc.setFontSize(20);
  doc.text(`${name}`, 20, 30); // 이름

  doc.setFontSize(12);
  doc.text(`Front End`, 20, 40); // 직무
  doc.text(`연락처: ${phoneNum} | 이메일: ${email}`, 20, 50); // 연락처

  let yPosition = 65;
  const margin = 20;
  const pageHeight = doc.internal.pageSize.height;
  const addNewPageIfNecessary = () => {
    if (yPosition > pageHeight - margin) {
      doc.addPage();
      yPosition = 20; // 새 페이지의 시작 위치
    }
  };

  // 경력 섹션
  doc.setFontSize(16);
  !!expArray.length && doc.text('경력', 20, yPosition); // 섹션 제목

  yPosition += 10;
  doc.setFontSize(12);
  expArray.forEach((exp) => {
    addNewPageIfNecessary();
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
  eduArray.forEach((edu) => {
    addNewPageIfNecessary();
    doc.text(`${edu.school_name} | ${edu.major}`, 20, yPosition); // 학교명 및 전공
    doc.text(`${edu.graduated_at}`, 150, yPosition); // 졸업일자

    yPosition += 15;
  });

  // 자격증 섹션
  yPosition += 10;
  doc.setFontSize(16);
  !!licArray.length && doc.text('자격증 / 면허증', 20, yPosition); // 섹션 제목

  yPosition += 10;
  licArray.forEach((lic) => {
    addNewPageIfNecessary();
    doc.text(`${lic.lic_title} | ${lic.lic_agency}`, 20, yPosition); // 자격증명 및 발급기관
    doc.text(`${lic.lic_date}`, 150, yPosition); // 자격증 취득일

    yPosition += 15;
  });

  return doc;
};
