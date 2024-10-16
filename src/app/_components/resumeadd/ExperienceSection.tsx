import { ExperienceType } from '@/type/resumeTypes';
import Button from '../common/Button';
import ExperienceBox from './ExperienceBox';

type Props = {
  addForm: (objName: string) => void;
  expArray: ExperienceType[];
  deleteForm: (objName: string, id: string) => void;
  setExpArray: React.Dispatch<React.SetStateAction<ExperienceType[]>>;
};

const ExperienceSection = ({ addForm, expArray, deleteForm, setExpArray }: Props) => {
  return (
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
            <ExperienceBox key={exp.exp_id} exp={exp} idx={idx} deleteForm={deleteForm} setExpArray={setExpArray} />
          );
        })}
      </ul>
    </section>
  );
};

export default ExperienceSection;
