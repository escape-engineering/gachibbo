# 취업 지원 통합 서비스 페이지 <가취뽀(같이 취업 뽀개기)>
+ 배포 URL : https://gachibbo.vercel.app/
+ test ID : gg1111
+ test PW : gg1111

## 프로젝트 소개
+ 가취뽀는 취업을 하고 싶은 멘티와, 취업을 돕고 그에 따른 작은 보상을 원하는 멘토로
  이루어져 있습니다. 멘토와 멘티가 같이 상부상조하여 성공적인 취업 지원을 이끄는 것이
  저희의 목표입니다.
+ 멘티는 멘토에게 이력서 피드백을 받을 수 있고, 예상 면접 질문을 풀고 채점할 수 있습니다.
+ 멘토는 이력서 피드백을 하여 포인트를 모아 포인트 상점에서 기프티콘을 구매할 수 있습니다.

## 팀원 구성, 맡은 작업
+ 홍연주 : 회원가입, 로그인, 마이페이지
+ 강수진 : 포인트 상점 페이지
+ 전상국 : 이력서 작성, 수정 페이지
+ 장성현 : 기술 면접, 기술면접 결과 페이지
+ 유현지 : 이력서 게시글 목록, 게시글 상세 페이지

## 1. 기술의사결정
+ `Zustand` : 클라이언트 상태 관리
+ `Tanstack Query` : 서버 상태 관리
+ `Next JS` : 데이터 캐싱 및 서버사이드 렌더링, SEO 최적화
+ `TypeScript` : 정적 타입 검사로 더욱 안전한 개발환경
+ `Supabase` : 간단한 세팅으로 관계형데이터베이스 사용
+ `Tailwind CSS` : 우수한 성능과 CSS유지보수 상승

## 2. 프로젝트 구조
```
src
 ┣ app
 ┃ ┣ (auth)
 ┃ ┃ ┣ login
 ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┣ mypage
 ┃ ┃ ┃ ┣ edit
 ┃ ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┃ ┣ feedback
 ┃ ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┃ ┣ resume
 ┃ ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┃ ┣ tech_interview
 ┃ ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┣ signup
 ┃ ┃ ┃ ┣ mentee
 ┃ ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┃ ┣ mento
 ┃ ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┗ layout.tsx
 ┃ ┣ (resume)
 ┃ ┃ ┣ resume
 ┃ ┃ ┃ ┣ [id]
 ┃ ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┗ resumeadd
 ┃ ┃ ┃ ┣ error.tsx
 ┃ ┃ ┃ ┣ layout.tsx
 ┃ ┃ ┃ ┗ page.tsx
 ┃ ┣ (tech_interview)
 ┃ ┃ ┣ tech_interview
 ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┗ tech_interview_grading
 ┃ ┃ ┃ ┗ page.tsx
 ┃ ┣ commontest
 ┃ ┃ ┗ page.tsx
 ┃ ┣ fonts
 ┃ ┃ ┣ GeistMonoVF.woff
 ┃ ┃ ┗ GeistVF.woff
 ┃ ┣ pointstore
 ┃ ┃ ┗ page.tsx
 ┃ ┣ _components
 ┃ ┃ ┣ common
 ┃ ┃ ┃ ┣ Button.tsx
 ┃ ┃ ┃ ┣ CSRLoading.tsx
 ┃ ┃ ┃ ┣ Input.tsx
 ┃ ┃ ┃ ┣ Modal.tsx
 ┃ ┃ ┃ ┗ SideBarByPage.tsx
 ┃ ┃ ┣ resumeadd
 ┃ ┃ ┃ ┣ EducationBox.tsx
 ┃ ┃ ┃ ┣ EducationSection.tsx
 ┃ ┃ ┃ ┣ ExperienceBox.tsx
 ┃ ┃ ┃ ┣ ExperienceSection.tsx
 ┃ ┃ ┃ ┣ LicenseBox.tsx
 ┃ ┃ ┃ ┣ LicenseSection.tsx
 ┃ ┃ ┃ ┣ PersonalDataSection.tsx
 ┃ ┃ ┃ ┣ ProfileImgLabel.tsx
 ┃ ┃ ┃ ┣ ResumeDescSection.tsx
 ┃ ┃ ┃ ┣ ResumeTopSection.tsx
 ┃ ┃ ┃ ┗ SideBarItem.tsx
 ┃ ┃ ┣ resumeDetail
 ┃ ┃ ┃ ┗ MoveToResumeUpdate.tsx
 ┃ ┃ ┣ LogoutButton.tsx
 ┃ ┃ ┣ Pagination.tsx
 ┃ ┃ ┣ recommend.tsx
 ┃ ┃ ┗ SideBar.tsx
 ┃ ┣ favicon.ico
 ┃ ┣ globals.css
 ┃ ┣ layout.tsx
 ┃ ┗ page.tsx
 ┣ components
 ┃ ┗ ui
 ┃ ┃ ┣ label.tsx
 ┃ ┃ ┣ radio-group.tsx
 ┃ ┃ ┗ select.tsx
 ┣ constants
 ┃ ┗ resumeConstants.ts
 ┣ css
 ┃ ┗ resumeList.css
 ┣ hooks
 ┃ ┣ useInput.tsx
 ┃ ┣ useIsOpen.tsx
 ┃ ┗ useResumeAddpage.tsx
 ┣ lib
 ┃ ┗ utils.ts
 ┣ services
 ┃ ┗ resumeadd
 ┃ ┃ ┗ resumeaddServices.ts
 ┣ store
 ┃ ┣ AuthContext.tsx
 ┃ ┣ AuthProvider.tsx
 ┃ ┣ queryProvider.tsx
 ┃ ┣ useAuthStore.tsx
 ┃ ┗ useFeedbackStore.tsx
 ┣ type
 ┃ ┣ PointTypes.ts
 ┃ ┗ resumeTypes.ts
 ┣ types
 ┃ ┗ ResumeType.ts
 ┣ utils
 ┃ ┣ date
 ┃ ┃ ┗ formatDate.ts
 ┃ ┣ resume
 ┃ ┃ ┣ client-actions.ts
 ┃ ┃ ┣ convertImgToBase64.ts
 ┃ ┃ ┣ handleArrayByData.ts
 ┃ ┃ ┣ makeResumePdf.ts
 ┃ ┃ ┗ malgun-normal.js
 ┃ ┣ supabase
 ┃ ┃ ┣ client.ts
 ┃ ┃ ┗ server.ts
 ┃ ┗ getpoint.ts
 ┣ middleware.ts
 ┗ supabase.ts
```

## 3. 개발 기간 및 작업 관리
### 개발 기간
+ 전체 개발 기간 : 2024-10-10 ~ 2024-10-17
+ UI 구현 : 2024-10-17
+ 기능 구현 : 2024-10-10 ~ 2024-10-17

### 작업 관리
+ GitHub Project와 Notion, Slack을 통해 진행 상황을 공유했습니다.
+ 매일 오전, 오후 스크럼을 진행하여 진행 상황을 공유하고 각 팀원들의
  역할 조율을 진행하였습니다.

## 4. 페이지별 기능
###[홈페이지]
+ 서비스 접속 화면으로 페이지의 소개와 핵심 기능인 기술 면접, 이력서
  피드백, 포인트 상점 기능을 소개했습니다.
+ 홈 페이지 좌측 사이드바로 홈, 기술 면접, 이력서, 로그아웃 페이지로 쉽게
  이동할 수 있습니다. 멘토인 경우에는 포인트 상점도 이동할 수 있습니다.

###[회원가입]
+ 멘토/멘티 유형을 먼저 선택합니다. 유형에 따라 가입 정보가 달라집니다.
+ 아이디와 비밀번호를 입력하면 입력창에서 바로 유효성 검사가 진행되고
  적합하지 않은 경우 각 경고 문구가 입력창 하단에 표시됩니다.
+ 이메일 주소의 형식이 유효하지 않거나 이미 가입된 이메일일 경우 또는
  비밀번호가 6자 미만일 경우에는 각 입력창 하단에 경구 문구가 나타납니다.
+ 프로필 사진은 등록하지 않을 경우 기본 이미지가 등록됩니다.
  
###[로그인]
+ 아이디와 비밀번호를 입력하면 입력창에서 바로 유효성 검사가 진행되고
  통과하지 못한 경우 각 경고 문구가 입력창 하단에 표시됩니다.
+ 이메일 주소의 형식이 유효하지 않거나 비밀번호가 6자 미만일 경우에는
  각 입력창 하단에 경고 문구가 나타납니다.

###[로그아웃]
+ 좌측 사이드바 아래쪽 로그아웃 버튼을 클릭하면 로그아웃됩니다.

###[기술면접]
+ 로그인 되지 않은 경우 로그인 페이지로 이동합니다.
+ 무작위로 선정된 기술 면접 질문 5가지와 답변을 적을 수 있는 칸이 나타납니다.
+ 제출하기를 누르면 제출이 완료되었다는 창이 뜨고, 채점하기 페이지 버튼을 누르면
  채점 페이지로 이동됩니다.

###[기술면접 채점]
+ 문제와 정답이 표시되고, 내 답변이 표시됩니다. o와 x중 한 가지를 선택하고 결과 보기를
  클릭하면 채점 결과와 점수가 표시된 모달 창이 나타납니다. 문제를 다시 풀 수도 있고,
  마이페이지로 이동할 수도 있습니다.

###[마이페이지]
+ 내 상태(멘티, 멘토) 와 가진 포인트를 볼 수 있습니다. 최근 나의 면접과 최근 이력서도
  표시됩니다.
+ 편집 버튼을 누르면 회원 정보를 편집할 수 있습니다.

###[이력서, 이력서 추가]
+ 멘티에게만 나의 이력서 목록이 표시됩니다.
+ 내가 적은 이력서 목록이 표시되고 이력서를 추가할 수 있는 버튼이 나타납니다.
+ 이력서 추가 버튼을 누르면 이력서를 적을 수 있는 폼이 나타납니다. 채택 포인트, 경력,
  이름, 성별 등을 입력할 수 있습니다.
+ 미리보기를 클릭하면 pdf 창이 뜨고 다운로드, 인쇄가 가능합니다.
+ 이력서 등록을 클릭하면 이력서 목록에 이력서가 추가됩니다.
+ 멘토가 피드백을 달면 채택하여 채택 포인트를 멘토에게 전달할 수 있습니다.

###[이력서 게시글 목록]
+ 멘토에게만 이력서 게시글 목록이 표시됩니다.
+ 이력서 목록에 있는 게시글을 클릭하면 멘티가 작성한 이력서 상세 페이지로 이동하고, 댓글
  형식으로 피드백을 작성할 수 있습니다.
+ 피드백이 채택되면 채택 포인트를 받습니다.

###[포인트 상점]
+ 멘토만 들어갈 수 있습니다.
+ 가지고 있는 포인트를 구매하기를 눌러 기프티콘을 구매할 수 있습니다.
+ 내 포인트가 표시되고, 가지고 있는 포인트보다 구매 포인트가 크면 alert 창이 뜹니다.
  

##5. 트러블 슈팅

##6. 개선 목표

##7. 프로젝트 후기
+ 강수진 : 스케일이 너무너무 커서 이걸 일주일만에 다 할 수 있을까 걱정했는데 역시 다 하긴
  무리였네요! 그렇지만 충분히 진심으로, 열심히 했고 멋진 프로젝트 만들었다고 생각합니다
  코딩을 잘 할 수 있는 방법은 역시 계속해서 익숙하게 하기인가봐요 supabase insert는 눈
  감고도 할 수 있을 것 같네요. 불평 한 마디 없이 같이 협업해주신 팀원들 너무 감사합니다!
  이번 프로젝트를 토대로 더 멋진 걸 해내 보일 계획입니다!!
