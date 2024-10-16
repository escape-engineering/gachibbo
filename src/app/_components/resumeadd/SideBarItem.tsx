import useResumeAddpage from '@/hooks/useResumeAddpage';
import Button from '../common/Button';

type Props = {
  queryString?: string;
  openNewTabForPdf: () => Promise<void>;
  handleUploadPdf: (isUpdate: boolean) => Promise<void>;
  savePdfToLocal: () => Promise<void>;
};

const SideBarItem = ({ queryString, openNewTabForPdf, handleUploadPdf, savePdfToLocal }: Props) => {
  return (
    <div className="flex flex-col gap-[10px]">
      {/* <button onClick={testLogin}>임시로그인</button> */}
      <Button onClick={() => openNewTabForPdf()}>미리보기</Button>
      <Button onClick={() => handleUploadPdf(queryString ? true : false)}>이력서 등록</Button>
      <Button onClick={() => savePdfToLocal()}>이력서 저장</Button>
    </div>
  );
};

export default SideBarItem;
