## Material UI System - VisionOS Inspired

이 UI 시스템은 VisionOS의 스타일 가이드를 참고하여 웹에서 글래스모피즘 효과를 구현하기 위한 구성입니다.

### 📁 디렉토리 구조

```
app/components/materials
├── MaterialPreview.tsx   // 시각적 결과를 보여주는 미리보기 컴포넌트
├── MaterialControls.tsx  // blur, borderColor, backdropFilter 등을 제어하는 UI
└── MaterialCode.tsx      // 현재 설정 상태를 기반으로 TailwindCSS 코드 스니펫 출력
```

---

### 🎯 목표

- 글래스모피즘 UI 구성 요소를 시각적으로 미리 보고
- blur, backdrop-filter, border color를 실시간으로 조정
- 해당 조합을 코드로 제공

---

### 🖼️ 레이아웃 구성

전체 화면은 **CSS Grid**를 기반으로 다음과 같이 배치됩니다:

- **좌측 상단 (1열)**: `MaterialPreview`
- **우측 상단 (1열)**: `MaterialControls`
- **하단 (2열 span)**: `MaterialCode`

```plaintext
┌──────────────────┬──────────────────┐
│ MaterialPreview  │ MaterialControls │
├──────────────────┴──────────────────┤
│           MaterialCode              │
└─────────────────────────────────────┘
```

- 수직 스택 레이아웃 구성 예시:

```plaintext
┌────────────────────────────┐
│      MaterialPreview       │
├────────────────────────────┤
│     MaterialControls       │
├────────────────────────────┤
│       MaterialCode         │
└────────────────────────────┘
```

---

### 🧠 상태 관리

- Zustand 기반 상태 훅 `useMaterialSettings()` 사용
- 다음 속성들을 포함:
  - `backdrop`: `"none" | "saturate" | "contrast"`
  - `bgColor`: `"white" | "black" | "slate" | "blue"`
  - `bgOpacity`: `0` ~ `100` (percent 단위 투명도)
  - `borderColor`: `"white" | "gray" | "blue"`
  - `borderOpacity`: `0` ~ `100`
  - `borderRadius`: `"none" | "sm" | "md" | "lg" | "xl"`
  - `shadow`: `"none" | "sm" | "md" | "lg"`

이 상태는 `MaterialControls`에서 조정하고, `MaterialPreview`와 `MaterialCode`에서 동기화되어 사용됨.

---

### 💡 향후 확장 포인트

- radius, shadow, animation 등도 variants로 추가 가능
- 다양한 프리셋 저장 및 불러오기 기능 지원 예정
- Figma 플러그인 또는 Tailwind Play integration도 고려

### Material UI 시스템 구현 작업 순서

1. 상태 관리 설정

- [ ] Zustand 설치 (필요한 경우)
- [ ] `useMaterialSettings` 스토어 생성
- [ ] 상태 정의: `backdrop`, `bgColor`, `bgOpacity`, `borderColor`, `borderOpacity`, `borderRadius`, `shadow`
- [ ] 상태 업데이트 함수 구현

2. MaterialPreview 컴포넌트 개발

- [ ] 상태 연결 (`useMaterialSettings` 훅 사용)
- [ ] 동적 스타일링 구현 (상태 값에 따라 클래스 변경)
- [ ] 글래스모피즘 효과 적용 (`backdrop-filter`, `background-opacity` 등)
- [ ] 다양한 상태에 따른 시각적 피드백 추가

3. MaterialControls 컴포넌트 개발

- [ ] 상태 연결 (`useMaterialSettings` 훅 사용)
- [ ] 각 속성별 컨트롤 UI 구현:
  - [ ] `backdrop` 선택기 (`none`, `saturate`, `contrast`)
  - [ ] `bgColor` 선택기 (`white`, `black`, `slate`, `blue`)
  - [ ] `bgOpacity` 슬라이더 (0-100%)
  - [ ] `borderColor` 선택기 (`white`, `gray`, `blue`)
  - [ ] `borderOpacity` 슬라이더 (0-100%)
  - [ ] `borderRadius` 선택기 (`none`, `sm`, `md`, `lg`, `xl`)
  - [ ] `shadow` 선택기 (`none`, `sm`, `md`, `lg`)
- [ ] 사용자 친화적인 UI/UX 디자인 적용

4. MaterialCode 컴포넌트 개발

- [ ] 상태 연결 (`useMaterialSettings` 훅 사용)
- [ ] 현재 설정에 따른 Tailwind CSS 코드 생성 로직 구현
- [ ] 코드 하이라이팅 적용 (필요시 라이브러리 사용)
- [ ] 복사 기능 추가

5. 통합 및 테스트

- [ ] 모든 컴포넌트가 동일한 상태를 공유하는지 확인
- [ ] 상태 변경 시 실시간으로 모든 컴포넌트가 업데이트되는지 확인
- [ ] 다양한 화면 크기에서 레이아웃 테스트
- [ ] 엣지 케이스 테스트 (극단적인 값 설정 등)

6. 추가 기능 구현 (선택 사항)

- [ ] 프리셋 저장 및 불러오기 기능
- [ ] 테마 전환 (라이트/다크 모드)
- [ ] 애니메이션 효과 추가
- [ ] 코드 내보내기 기능

7. 최적화 및 리팩토링

- [ ] 성능 최적화 (불필요한 리렌더링 방지)
- [ ] 코드 구조 개선
- [ ] 접근성 검토 및 개선

### 문제 분석

> [!warning]
>
> - Tailwind CSS JIT은 **“소스 코드에 문자 그대로 써 둔 클래스”**만 스캔해 CSS를 만들기 때문에
> - safelist를 미리 정의해놓지 않은 이상 상당히 어렵다. 예를 들어 인풋에 컬러 팔레트를 만들고 임의의 값을 받는다고 하면
>   그대로 개발자가 그 값을 미리 정의 해놔야 JIT engine이 이걸 빌드 타임에 파싱해서 class를 만들어 놓는다.
> - 아예 사전에 정의한 몇개의 특정 컬러만 입력 받게하거나 한다면 가능
>   - 예를들어 핸드폰 컬러 선택, 자동차 외장 컬러 선택 이런 경우라면 상관없을듯.
> - 그게 아니라면 다른 방법을 찾는게 좋을거 같다. 인라인 스타일로 처리 라던지..

> [!TIP]
> `backdrop-filter: blur` 속성의 경우 뒤에 글자가 있으면 확실히 확인할수 있다.
