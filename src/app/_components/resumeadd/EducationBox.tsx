import { EducationType } from '@/type/resumeTypes';
import Input from '../common/Input';
import { handleArrayByData } from '@/utils/resume/handleArrayByData';

type Props = {
  edu: EducationType;
  idx: number;
  deleteForm: (objName: string, id: string) => void;
  setEduArray: React.Dispatch<React.SetStateAction<EducationType[]>>;
};

const EducationBox = ({ edu, idx, deleteForm, setEduArray }: Props) => {
  return (
    <li className="flex flex-col gap-[10px] border border-black border-solid w-[350px] p-[20px] rounded-[20px]">
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
          onChange={(e) => handleArrayByData(idx, 'graduated_at', setEduArray, e)}
          placeholder="2024.10.14"
        />
        <Input
          isLabeled={true}
          labelText="학교명 : "
          value={edu.school_name}
          onChange={(e) => handleArrayByData(idx, 'school_name', setEduArray, e)}
        />
        <Input
          isLabeled={true}
          labelText="전공 : "
          value={edu.major}
          onChange={(e) => handleArrayByData(idx, 'major', setEduArray, e)}
        />
      </div>
    </li>
  );
};

export default EducationBox;
