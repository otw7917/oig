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
