import HomeLinks from './_components/home/Links';

const Home = () => {
  return (
    <div className="pl-[92px] w-full flex flex-col justify-center items-center">
      <section className="flex flex-col justify-center items-center gap-[10px] h-[100vh]">
        <h1 className="text-[50px] font-bold">가취뽀</h1>
        <p className="text-[12px] font-medium">같이 취업 뽀개기</p>
        <HomeLinks />
      </section>
      <section className="h-[100vh] border-t-[1px] border-b-[1px] border-solid border-black flex flex-col justify-center px-[20px]">
        <h1 className="flex justify-center text-[20px] font-bold">
          기술면접 질문에 답을 하여 내 CS지식을 체크할 수 있습니다.
        </h1>
        <p className="flex justify-center">랜덤한 질문에 답을하고 채점을 해보며 내 CS지식을 체크해보세요!</p>
        <img className="w-[900px]" src="/assets/techInterviewPage.png" alt="기술면접 페이지 이미지" />
      </section>
      <section className="h-[100vh] border-t-[1px] border-b-[1px] border-solid border-black flex flex-col justify-center px-[20px]">
        <h1 className="flex justify-center text-[20px] font-bold">내 이력서에 대한 피드백을 받을 수 있습니다.</h1>
        <p className="flex justify-center">내 이력서를 공유하여 경력자들에게 피드백을 받아보세요!</p>
        <img className="w-[900px]" src="/assets/resumeDetailPage.png" alt="이력서 상세 페이지 이미지" />
      </section>
      <section className="h-[100vh] border-t-[1px] border-b-[1px] border-solid border-black flex flex-col justify-center px-[20px]">
        <h1 className="flex justify-center text-[20px] font-bold">포인트를 모아 기프티콘으로 공유할 수 있습니다.</h1>
        <p className="flex justify-center">이력서 피드백을 남기고 포인트를 모아 기프티콘을 구매해보세요!</p>
        <img className="w-[900px]" src="/assets/pointStorepage.png" alt="포인트 상점 이미지" />
      </section>
    </div>
  );
};

export default Home;
