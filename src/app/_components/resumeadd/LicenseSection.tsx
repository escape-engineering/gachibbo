import { LicenseType } from '@/type/resumeTypes';
import Button from '../common/Button';
import LicenseBox from './LicenseBox';

type Props = {
  addForm: (objName: string) => void;
  licArray: LicenseType[];
  deleteForm: (objName: string, id: string) => void;
  setLicArray: React.Dispatch<React.SetStateAction<LicenseType[]>>;
};

const LicenseSection = ({ addForm, licArray, deleteForm, setLicArray }: Props) => {
  return (
    <section>
      <div className="flex flex-row gap-[5px] my-[10px]">
        <div className="flex justify-start items-center w-[500px] px-[10px] border-b-2 border-black border-solid">
          보유기술 / 자격증
        </div>
        <Button onClick={() => addForm('license')}>+</Button>
      </div>
      <ul className="flex flex-col items-center gap-[15px]">
        {licArray.map((lic, idx) => {
          return <LicenseBox key={lic.lic_id} lic={lic} idx={idx} deleteForm={deleteForm} setLicArray={setLicArray} />;
        })}
      </ul>
    </section>
  );
};

export default LicenseSection;
