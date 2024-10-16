import { EducationType } from '@/type/resumeTypes';
import Button from '../common/Button';
import EducationBox from './EducationBox';

type Props = {
  addForm: (objName: string) => void;
  eduArray: EducationType[];
  deleteForm: (objName: string, id: string) => void;
  setEduArray: React.Dispatch<React.SetStateAction<EducationType[]>>;
};

const EducationSection = ({ addForm, eduArray, deleteForm, setEduArray }: Props) => {
  return (
    <section>
      <div className="flex flex-row gap-[5px] my-[10px]">
        <p className="flex justify-start items-center w-[500px] px-[10px] border-b-2 border-black border-solid">학력</p>
        <Button onClick={() => addForm('education')}>+</Button>
      </div>
      <ul className="flex flex-col items-center gap-[15px]">
        {eduArray.map((edu, idx) => {
          return (
            <EducationBox key={edu.edu_id} edu={edu} idx={idx} deleteForm={deleteForm} setEduArray={setEduArray} />
          );
        })}
      </ul>
    </section>
  );
};

export default EducationSection;
