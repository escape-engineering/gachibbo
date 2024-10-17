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
+ `Next JS` : 데이터 캐싱 및 서버사이드 렌더링, SEO 최적화
+ `TypeScript` : 정적 타입 검사로 더욱 안전한 개발환경
+ `Supabase` : 간단한 세팅으로 관계형데이터베이스 사용
+ `Tailwind CSS` : 우수한 성능과 CSS유지보수 상승
![기술선택](https://github.com/user-attachments/assets/ee36080d-be12-4bb0-a50d-ce2694434809)

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

## 3. ERD
![ERD](https://github.com/user-attachments/assets/c51e2095-2f66-4f3f-b122-1ea2bb9dab60)

## 4. 개발 기간 및 작업 관리
### 개발 기간
+ 전체 개발 기간 : 2024-10-10 ~ 2024-10-17
+ UI 구현 : 2024-10-17
+ 기능 구현 : 2024-10-10 ~ 2024-10-17

### 작업 관리
+ GitHub Project와 Notion, Slack을 통해 진행 상황을 공유했습니다.
+ 매일 오전, 오후 스크럼을 진행하여 진행 상황을 공유하고 각 팀원들의
  역할 조율을 진행하였습니다.

## 5. 페이지별 기능
### [홈페이지]
+ 서비스 접속 화면으로 페이지의 소개와 핵심 기능인 기술 면접, 이력서
  피드백, 포인트 상점 기능을 소개했습니다.
+ 홈 페이지 좌측 사이드바로 홈, 기술 면접, 이력서, 로그아웃 페이지로 쉽게
  이동할 수 있습니다. 멘토인 경우에는 포인트 상점도 이동할 수 있습니다.

### [회원가입]
+ 멘토/멘티 유형을 먼저 선택합니다. 유형에 따라 가입 정보가 달라집니다.
+ 아이디와 비밀번호를 입력하면 입력창에서 바로 유효성 검사가 진행되고
  적합하지 않은 경우 각 경고 문구가 입력창 하단에 표시됩니다.
+ 이메일 주소의 형식이 유효하지 않거나 이미 가입된 이메일일 경우 또는
  비밀번호가 6자 미만일 경우에는 각 입력창 하단에 경구 문구가 나타납니다.
+ 프로필 사진은 등록하지 않을 경우 기본 이미지가 등록됩니다.
  
### [로그인]
+ 아이디와 비밀번호를 입력하면 입력창에서 바로 유효성 검사가 진행되고
  통과하지 못한 경우 각 경고 문구가 입력창 하단에 표시됩니다.
+ 이메일 주소의 형식이 유효하지 않거나 비밀번호가 6자 미만일 경우에는
  각 입력창 하단에 경고 문구가 나타납니다.

### [로그아웃]
+ 좌측 사이드바 아래쪽 로그아웃 버튼을 클릭하면 로그아웃됩니다.

### [기술면접]
+ 로그인 되지 않은 경우 로그인 페이지로 이동합니다.
+ 무작위로 선정된 기술 면접 질문 5가지와 답변을 적을 수 있는 칸이 나타납니다.
+ 제출하기를 누르면 제출이 완료되었다는 창이 뜨고, 채점하기 페이지 버튼을 누르면
  채점 페이지로 이동됩니다.

### [기술면접 채점]
+ 문제와 정답이 표시되고, 내 답변이 표시됩니다. o와 x중 한 가지를 선택하고 결과 보기를
  클릭하면 채점 결과와 점수가 표시된 모달 창이 나타납니다. 문제를 다시 풀 수도 있고,
  마이페이지로 이동할 수도 있습니다.

### [마이페이지]
+ 내 상태(멘티, 멘토) 와 가진 포인트를 볼 수 있습니다. 최근 나의 면접과 최근 이력서도
  표시됩니다.
+ 편집 버튼을 누르면 회원 정보를 편집할 수 있습니다.

### [이력서 상세]
+ 내가 적은 이력서가 화면에 출력되어 확인할 수 있습니다.
+ 멘토가 피드백을 달면 채택하여 채택 포인트를 멘토에게 전달할 수 있습니다.
+ 수정하기 버튼을 눌러 이력서 수정페이지로 이동할 수 있습니다.

### [이력서 추가/수정]
+ 이름, 성별, 학력, 경력 등 다양한 정보를 입력하여 이력서 데이터를 채울 수 있습니다. 
+ 미리보기로 현재 이력서가 어떤 모습인지 확인할 수 있습니다.
+ 이력서 다운로드로 내 로컬환경에 이력서를 pdf로 저장할 수 있습니다.
+ 이력서 저장으로 DB에 내 이력서 파일을 업로드하고, 게시글을 생성하여 피드백을 받을 수 있습니다.
+ 이력서 수정기능으로 진입할 시 이전에 작성해두었던 데이터가 입력되어있어 원하는 데이터만 수정할 수 있습니다.

### [이력서 게시글 목록]
+ 멘토에게만 이력서 게시글 목록이 표시됩니다.
+ 이력서 목록에 있는 게시글을 클릭하면 멘티가 작성한 이력서 상세 페이지로 이동하고, 댓글
  형식으로 피드백을 작성할 수 있습니다.
+ 피드백이 채택되면 채택 포인트를 받습니다.

### [포인트 상점]
+ 멘토만 들어갈 수 있습니다.
+ 가지고 있는 포인트를 구매하기를 눌러 기프티콘을 구매할 수 있습니다.
+ 내 포인트가 표시되고, 가지고 있는 포인트보다 구매 포인트가 크면 alert 창이 뜹니다.
  

## 6. 트러블 슈팅
### 강수진
  
  ![image](https://github.com/user-attachments/assets/ecaf8601-1ba3-436e-9b57-7195f88862e3)

 Supabase를 사용하는 도중 업데이트가 안되는 문제가 발생했다. console을 찍어가며 확인했
는데 data가 계속 빈 배열을 뱉어내고 있었다. 구글링을 하다가 RLS 정책을 바꾸면 된다는 것
을 확인하고 auth의 정책을 바꾸려다 point가 auth 테이블에 있는 것 보단 따로 table을 만드
는 것이 좋을 것 같다는 피드백을 받았어서, 이번 기회에 그냥 point 테이블을 새로 만들기로 했다.
새로 테이블을 만들고 user_id를 연결, 이 값과 point 값 등을 새로 넣어주니 해결됐다. 


### 전상국
- [리액트 리스트 매핑에서 key가 중요한 이유](https://codingpracticenote.tistory.com/344)
- [supabase, promise.all, transaction](https://codingpracticenote.tistory.com/345)
<br/>

### 홍연주
- zustand의 persist를 잘 이해하지 못해 로그인/회원가입에 사용했던 auth store구조를 그대로 가져다 쓰면서도
  전역으로 상태를 관리하면서 언제든 꺼내쓸 수 있으면 당연히 좋은거 아닌가? 어차피 set함수를 만들어 초기화도
  시켜주는데? 라고 생각했는데. 에러까지 스토리지에 들어가서 나 여기서 에러났었는데 하고 튀어 나올 줄은 상상도 못했다.
  persist를 빼니 정상적으로 작동됐다.
<br/>


### 장성현
- [strict mode: false 대신 useRef, 타입 오류](https://jjangsh.tistory.com/78)

### 유현지
- supabase의 policy로 인해 꽤 많은 애를 먹었던 것 같다. 
  select, update, insert을 입력할 때마다 동작을 하지 않아 왜 그렇지? 싶어서 각 항목마다 적어도 1시간씩 썼던 것 같다.
  구글링을 해보니 policy 문제라는데 혼자서 해보다가 도저히 안 될 것 같아서 결국 도움을 요청했다.
- pdf라이브러리를 가져오는데 있어서 많은 충돌과 warning이 떴다. 터미널에도 마찬가지로 길게 에러가 떴었다.
  이를 해결하기 위해 공식문서를 찾아보며 import하고 주소값을 변경했다.
<br/>


## 7. 개선 목표

### 전상국
- CSR페이지 에러 핸들링 고도화
- state와 로직코드 리팩토링
- tanstack query를 사용한 서버상태관리

### 강수진
- 로직 코드 리팩토링
- tanstack query를 사용한 서버 상태관리


### 홍연주
- 페이지별로 렌더링 알맞게 사용 (미들웨어를 제외하고 전부 csr 사용)
- 로그인/로그아웃 로직 개선 (로그아웃을 해도 쿠키에 로그인정보가 남아있으면 로그인페이지에 접근할 수 없는 문제)

### 장성현
- 유효성 검사 강화
- 로딩 UX 개선
- 반복된 API 호출 로직을 커스텀 훅으로 분리
- JOIN을 사용한 DB 쿼리 개선

### 유현지
- 수정, 삭제 기능 추가
- css수정
- pdf를 로딩함에 있어서 가끔 서버 오류가 나는 것
- 시간 데이터를 20:58이런 식이 아니라 am, pm으로 나누는 것, 2시간 전 으로 입력할 수 있도록



## 8. 프로젝트 후기
+ 강수진 : 스케일이 너무너무 커서 이걸 일주일만에 다 할 수 있을까 걱정했는데 역시 다 하긴
  무리였네요! 그렇지만 충분히 진심으로, 열심히 했고 멋진 프로젝트 만들었다고 생각합니다
  코딩을 잘 할 수 있는 방법은 역시 계속해서 익숙하게 하기인가봐요 supabase insert는 눈
  감고도 할 수 있을 것 같네요. 불평 한 마디 없이 같이 협업해주신 팀원들 너무 감사합니다!
  이번 프로젝트를 토대로 더 멋진 걸 해내 보일 계획입니다!!

+ 전상국 : mvp를 너무 크게 잡았나라는 생각에 여러 기능을 쳐냈지만, 그래도 많았던 것 같습니다. 
  MVP를 적절한 크기로 설정하여 마감기한을 정해두고, 구체적인 계획으로 조금 더 알찬 팀프로젝트를 
  할 수 있지 않았을까 라는 생각도 듭니다. 하지만 항상 작은 크기의 도전과제만 잡고 기한을 지키는 것은 
  짧은시간에 배우고  많은 프로젝트를 경험해봐야하는 커리큘럼에 조금 부적합하지 않나라는 생각으로 
  달렸던 것 같습니다. 밤낮 가리지 않고 열심히 참여해주신 팀원분들께 감사한 말씀 드리고싶습니다!

+ 홍연주 : 사실 처음엔 썩 어렵지 않을 거라 생각해 로그인/회원가입/마이페이지를 자신있게 가져왔는데
  수파베이스 메서드들이 많이 낯설기도 했고 미들웨어 설정에서 너무많은 시간을 잡아먹어 리팩토링은 커녕 마이페이지나 css는 
  미흡하게 마쳐서  아쉬움이 많이 남았습니다. 마지막날 정말 늦은 시간까지 기다려주신 팀원분들과 
  튜터님께 정말 감사합니다!

+ 장성현 : Supabase를 활용한 데이터베이스 설계와 API 통신에서 많은 것을 배웠습니다.
  아무래도 많은 것을 하려다 보니 시간이 부족해서 Lighthouse를 이용한 성능 측정이나 여러 기능 등
  하지 못한 것도 많지만 배운 게 많은 프로젝트였습니다.
  이번 프로젝트를 계기로 기획 단계에서 볼륨을 적절히 조절해야 하는 것도 중요하다는 걸 느꼈습니다.
  많은 시간 프로젝트에 힘써주신 팀원분들 감사합니다.
  
+ 유현지 : supabase를 분명 배웠음에도 불구하고 초반에는 기억이 잘 나지 않아 헤맸던 것 같습니다.
  야심차게 게시글 부분을 가져왔는데, 그에 따른 결과물을 내지 못한 부분들이 많이 아쉬웠습니다.
  또한 코딩을 하면서도 내가 잘 하고 있나 싶은 생각과 여긴 뭘 써야하는지에 대해 조금이나마 아는 것에 대해 발전했나 싶은 생각이 동시에 들었습니다.
  여러 일들이 겹쳐서 기능 구현을 많이 진행하지 못했는데 팀원들이 잘 도와주고 알려줘서 여기까지 올 수 있었습니다.
  팀프가 끝나면 자기반성시간과 개인 공부 시간을 많이 가져야겠다는 생각이 들었습니다.

