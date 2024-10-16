import { handleArrayByData } from '@/utils/resume/handleArrayByData';
import Input from '../common/Input';
import { ExperienceType } from '@/type/resumeTypes';

type Props = {
  exp: ExperienceType;
  idx: number;
  deleteForm: (objName: string, id: string) => void;
  setExpArray: React.Dispatch<React.SetStateAction<ExperienceType[]>>;
};

const ExperienceBox = ({ exp, idx, deleteForm, setExpArray }: Props) => {
  return (
    <li className="flex flex-col gap-[10px] border border-black border-solid w-[350px] p-[20px] rounded-[20px]">
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
          onChange={(e) => handleArrayByData(idx, 'exp_period', setExpArray, e)}
          placeholder="2020.10.14~2024.10.14"
        />
        <Input
          isLabeled={true}
          labelText="근무처 : "
          value={exp.exp_region}
          onChange={(e) => handleArrayByData(idx, 'exp_region', setExpArray, e)}
        />
        <Input
          isLabeled={true}
          labelText="직위 : "
          value={exp.exp_position}
          onChange={(e) => handleArrayByData(idx, 'exp_position', setExpArray, e)}
          placeholder="ex) PM"
        />
        <Input
          isLabeled={true}
          labelText="업무내용 : "
          value={exp.exp_desc}
          onChange={(e) => handleArrayByData(idx, 'exp_desc', setExpArray, e)}
          placeholder="내일배움캠프 클라이언트 DB관리"
        />
      </div>
    </li>
  );
};

export default ExperienceBox;
