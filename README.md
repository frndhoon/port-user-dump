## port-user-dump

> 덤프 이상탐지 및 기타 페이지 작업

### 개발 서버 실행 방법

> 패키지 매니저 : `pnpm`

```
pnpm install
pnpm dev
```

- `.env`는 노션 페이지에 별도 관리 (문의)

### naming convention

- 컴포넌트/페이지 변수명 : PascalCase (TContainerPage)
- 변수/함수: camelCase (getUserData)
- 상수: UPPER_SNAKE_CASE (API_URL)
- 타입/인터페이스: PascalCase (UserData, ApiResponse)

### commit convention

```
{커밋 타입}: {커밋 제목}

- {설명}
- ...


Ref: {참고 링크}
```

- 커밋 타입
  - `feat`: 새로운 기능 추가
  - `fix`: 버그 수정
  - `docs`: 문서 수정
  - `style`: 코드 포맷팅
  - `refactor`: 코드 리팩토링
  - `design`: UI 디자인 및 레이아웃 수정
  - `chore`: 작업 환경 세팅, 패키지 매니저 수정
