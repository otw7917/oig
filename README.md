# OIG (Open Interface Guideline..)

OIG는 웹 인터페이스를 위한 **디자인 가이드라인(Design Guideline)** 구축을 목표로 하는 프로젝트입니다. 이 가이드라인 안에는 **레이아웃(Layout)**, **그리드 시스템(Grid System)**, 그리고 다양한 **UI 컴포넌트**들이 포함되어 있으며, 이들을 직접 설계하고 체계화하는 과정을 통해 실무에 적용 가능한 디자인 시스템을 실험합니다.

## 🎯 프로젝트 목적

- SwiftUI, Material Design, Tailwind CSS 등 다양한 디자인 철학에 기반한 **그리드 시스템 구현 연습**
- `Grid`, `GridRow`, `Container`, `Card`, `LayoutWrapper` 등의 핵심 레이아웃 컴포넌트를 직접 설계 및 사용
- 반응형 UI, 구성요소 재사용성, 스타일 일관성 등을 고려한 **프론트엔드 아키텍처 설계 능력 향상**
- Storybook 또는 `/examples` 페이지를 통한 **실제 UI 테스트 및 문서화**

## 🧱 주요 구성

- `components/layout` — 그리드, 컨테이너, FlexBox 등 레이아웃 요소
- `components/elements` — 버튼, 카드, 타이포그래피 등 UI 요소
- `app/examples` — 그리드/레이아웃 예제 페이지

## 🚀 사용 기술

- **Next.js**
- **Tailwind CSS**
- **TypeScript (Strict Mode)**
- **shadcn/ui**
- **class-variance-authority (CVA)**

## 📖 공부 및 연습 계획

- 주요 디자인 가이드라인(HIG, Material, Fluent 등) 아티클을 읽고 핵심 철학과 원칙을 정리
- 정리한 디자인 원칙을 내가 만든 컴포넌트에 적용해보며 경험 기반으로 이해 심화
- Safe Area, 스페이싱, 레이아웃 가이드 등의 개념을 코드 수준에서 추상적으로 실험
- 접근성, 스케일링, 반응형 디자인 철학을 프로젝트에 반영하는 작은 실습 반복
- Storybook이나 예제 페이지를 통해 적용 과정을 시각화하고 문서화

---

이 프로젝트는 단순한 UI 컴포넌트 연습을 넘어, **실제 제품에 적용 가능한 UI 설계 패턴**을 체득하는 데 목적이 있습니다.
디자이너와 개발자가 함께 이해할 수 있는 언어로 UI를 구성해보며, 프론트엔드 디자인 시스템의 근본을 실험합니다.

또한, 이 가이드라인의 다음 단계로서 AI 기반 기능은 물론, 다양한 입력(input) 인터페이스(예: 음성, 제스처, 자연어 명령)와 출력(output) 인터페이스(예: 시각화 대시보드, 음성 피드백, 증강현실 오버레이)에 대응하는 디자인 철학을 수립하고 실습할 예정입니다. 이에는 입력 방식에 따른 인터랙션 패턴 정의, 컨텍스트 인식 UI 컴포넌트 설계, 출력 매체별 정보 구조 및 시각화 원칙, 사용자 적응형 레이아웃 흐름, 오류 처리 및 피드백 메커니즘, 그리고 다양한 디바이스 환경에서 일관된 경험을 제공하기 위한 디자인 토큰 확장 전략 등이 포함됩니다. 이를 통해 차세대 인터페이스에 유연하게 대응하면서도 일관된 사용자 경험을 유지하는 디자인 시스템을 완성할 것입니다.

### Day1

> [!important] DEPTH, CONTEXT
>
> 그런데 Apple HIG에 의하면 **_Depth_**, **_Context_**를 표현함으로써 배경에 뭐가 있는지, 화면에 떠있는것을 표현함으로써 사용자에게 집중도를 높이는 설계를 하고 있었던것!

- 요즘 보면 반투명한 UI를 많이 쓰는걸 볼 수 있다.
- 테슬라 센터콘솔에 보면 여러 컴포넌트들이 반투명하게 떠있는걸

- 아무 생각 없이 볼때는 아 이제 이런 반투명한 요소들을 넣을 정도로 css, 이걸 구동하는 엔진의 영역이 좋아졌네 정도로만 생각했다.

### Day2

> [!important]
>
> - **cva** => “변화 가능한 class 조합”을 구조화하고 제어하려는 목적을 갖고 있음

- **cva**
- shadcn/ui를 설치하면 twMerge, cva가 제공되는데 맘에 든다

- **variants**
- 다양한 스타일을 조합할수 있다.
- 조절하고 싶은 속성들만 정의하면 된다.

```ts
const headerStyles = cva(
  "fixed w-full h-16 flex items-center justify-between border-b z-50",
  {
    variants: {
      blur: {
        none: "",
        sm: "backdrop-blur-sm",
        md: "backdrop-blur-md",
        lg: "backdrop-blur-lg",
      },
      bg: {
        light: "bg-white/30 dark:bg-black/30",
        dark: "bg-black/50",
      },
      px: {
        normal: "px-4",
        wide: "px-8",
      },
    },
    defaultVariants: {
      blur: "lg",
      bg: "light",
      px: "normal",
    },
  }
);
```

- 위에 코드 처럼 해놓으면 컴포넌트에서 스타일 설계도 처럼 볼 수 있다.
- 개발자는 -> blur, bg, px 를 내가 제어할수 있구나!
- 디자이너 -> 토큰을 여기다가 추가하기도 쉽고 가능함

### Day3

> [!TIP] 카카오톡 OG 초기화 팁
> **SEO 를 위한 메타데이터**
>
> 카카오톡의 경우 자체적으로 캐시처리를 하는데 이걸 확인해보고 싶으면
> https://developers.kakao.com/tool/debugger/sharing
> 여기 들어가서 본인 url을 입력 -> 카카오 OG 캐시 초기화

### Day4

> [!important] 디자인 토큰을 잘 활용해보자

- **oklch**

  - OKLCH는 색을 사람 눈의 지각(perception)에 더 가깝게 표현하도록 설계된 색 공간입니다.
  - 구성 요소:
  - O (Lightness) — 색의 밝기
  - C (Chroma) — 색의 채도(순도)
  - H (Hue) — 색상의 각도(색상환 상 위치)

- **디자인 토큰**
  - 일관성 유지
    - 동일한 역할(예: primary, accent, muted)에 이름 붙인 토큰을 쓰면, UI 전반에 일관된 색상·스페이싱·타이포그래피를 보장할 수 있다!
  - 유지보수 용이
    - 토큰 값만 :root에서 수정해주면 시스템 전반에 적용 가능
  - 테마 관리
    - 라이트/다크 모드, 브랜드별 커스텀 테마 등 여러 테마를 적용할 때, 토큰 맵(mapping)만 다르게 지정하면 전체 테마를 손쉽게 전환
      -> 결과적으로 개발자, 디자이너간 소통 용이 🫡
