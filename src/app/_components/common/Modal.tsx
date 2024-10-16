type Props = {
  isOpen: boolean;
  handleIsOpen: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, handleIsOpen, children }: Props) => {
  return (
    <div
      className={`${
        isOpen ? 'flex' : 'hidden'
      } fixed z-10 top-0 left-0 w-full h-full justify-center items-center bg-[#c5c5c5] bg-opacity-30`}
    >
      {/* NOTE - 모달 배경 클릭 시 닫힘 */}
      <div className="absolute top-0 left-0 z-20 w-full h-full" onClick={handleIsOpen}></div>

      {/* NOTE - 모달 본문 */}
      <div className="bg-white rounded-lg z-50 flex flex-col justify-center items-center gap-[10px] py-[20px] px-[15px]">
        <div className="flex justify-end items-center w-full">
          {/* NOTE - 닫기 버튼 */}
          <button className="w-[15px] h-[15px]" onClick={handleIsOpen}>
            <img src="/assets/modalCloseButton.png" alt="X" />
          </button>
        </div>

        {/* NOTE - 모달 내용 */}
        <div className="mx-[10px]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
