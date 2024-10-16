import React from 'react';
import ProfileImgLabel from './ProfileImgLabel';
import Input from '../common/Input';
import { HandleInputType } from '@/hooks/useInput';

type Props = {
  profileImg?: File;
  handleProfileImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  expYears: string | number;
  handleExpYears: HandleInputType;
  expYearsRef: React.MutableRefObject<HTMLInputElement | null>;
  name: string | number;
  handleName: HandleInputType;
  nameRef: React.MutableRefObject<HTMLInputElement | null>;
  gender: string | number;
  handleGender: HandleInputType;
  genderRef: React.MutableRefObject<HTMLInputElement | null>;
  email: string | number;
  handleEmail: HandleInputType;
  emailRef: React.MutableRefObject<HTMLInputElement | null>;
  phoneNum: string | number;
  handlePhoneNum: HandleInputType;
  phoneNumRef: React.MutableRefObject<HTMLInputElement | null>;
  region: string | number;
  handleRegion: HandleInputType;
  regionRef: React.MutableRefObject<HTMLInputElement | null>;
  address: string | number;
  handleAddress: HandleInputType;
  addressRef: React.MutableRefObject<HTMLInputElement | null>;
};

const PersonalDataSection = ({
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
  addressRef
}: Props) => {
  return (
    <section className="flex flex-row gap-[30px] justify-center items-center">
      <div>
        <ProfileImgLabel profileImg={profileImg} />
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
  );
};

export default PersonalDataSection;
