type Props = {
  isOpen: boolean;
  handleIsOpen: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, handleIsOpen, children }: Props) => {
  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } absolute z-10 top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-[#c5c5c5] bg-opacity-30`}
    >
      {/* NOTE - 모달 background */}
      <div className="absolute top-0 left-0 z-20 w-full h-full" onClick={handleIsOpen}></div>
      {/* NOTE - 모달 body */}
      <div className="bg-white rounded-lg z-50 flex flex-col justify-center items-center gap-[10px] w-auto h-auto py-[20px] px-[15px]">
        <div className="flex justify-end items-center w-full">
          {/* NOTE - 모달 내부 좌상단 닫기버튼 */}
          <button className="w-[15px] h-[15px]" onClick={handleIsOpen}>
            <img src="/assets/modalCloseButton.png" alt="X" />
          </button>
        </div>
        {/* NOTE - 모달에서 보여주고자 하는 부분 */}
        <div className="mx-[10px]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
