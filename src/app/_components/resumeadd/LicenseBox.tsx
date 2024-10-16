import { LicenseType } from '@/type/resumeTypes';
import Input from '../common/Input';
import { handleArrayByData } from '@/utils/resume/handleArrayByData';

type Props = {
  lic: LicenseType;
  idx: number;
  deleteForm: (objName: string, id: string) => void;
  setLicArray: React.Dispatch<React.SetStateAction<LicenseType[]>>;
};

function LicenseBox({ lic, idx, deleteForm, setLicArray }: Props) {
  return (
    <li className="flex flex-col gap-[10px] border border-black border-solid w-[350px] p-[20px] rounded-[20px]">
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
          onChange={(e) => handleArrayByData(idx, 'lic_date', setLicArray, e)}
          placeholder="2024.10.14"
        />
        <Input
          isLabeled={true}
          labelText="자격/면허증 : "
          value={lic.lic_title}
          onChange={(e) => handleArrayByData(idx, 'lic_title', setLicArray, e)}
          placeholder="정보처리기사"
        />
        <Input
          isLabeled={true}
          labelText="시행처 : "
          value={lic.lic_agency}
          onChange={(e) => handleArrayByData(idx, 'lic_agency', setLicArray, e)}
          placeholder="한국산업인력공단"
        />
      </div>
    </li>
  );
}

export default LicenseBox;
