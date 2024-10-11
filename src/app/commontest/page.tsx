'use client';

import Button from '../_components/common/Button';

const CommonComponentsTestPage = () => {
  const testOnclickHandler = () => console.log('test!');
  return (
    <div className="flex flex-col gap-[10px] px-[20px]">
      <h1>공통 컴포넌트 테스트 페이지</h1>
      <a href="https://msm1307.tistory.com/156" className="text-[30px] text-[#8793ff]">
        버튼 관련 자료 블로그 링크(클릭시 이동)
      </a>
      <div className="flex flex-row gap-[20px] flex-wrap">
        <Button onClick={testOnclickHandler}>default컬러, md크기</Button>
        <Button onClick={testOnclickHandler} color="default" size="md">
          default컬러, md크기
        </Button>
        <Button onClick={testOnclickHandler} color="white" size="sm">
          white컬러, sm크기
        </Button>
        <Button onClick={testOnclickHandler} color="white" size="full">
          white컬러, full크기
        </Button>
        <Button onClick={testOnclickHandler} color="red" size="full">
          red컬러, full크기
        </Button>
      </div>
    </div>
  );
};

export default CommonComponentsTestPage;
