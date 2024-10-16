import React from 'react';

type Props = {
  profileImg?: File;
};

const ProfileImgLabel = ({ profileImg }: Props) => {
  return (
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
  );
};

export default ProfileImgLabel;
