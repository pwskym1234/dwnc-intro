// 자기소개 콘텐츠. 여기만 고치면 페이지 전체에 반영됩니다.
export const profile = {
  name: "방우식",
  englishName: "Woosik Bang",
  tagline: "아이디어를 빠르게 굴러가는 것으로 만드는 걸 좋아합니다.",
  tags: ["서울대 자유전공학부", "DWNC 10기", "와플스튜디오 24.5기"],
  email: "pwskym@snu.ac.kr",
  github: "pwskym1234",

  interests: [
    { emoji: "🤖", title: "AI 에이전트", desc: "Claude·Codex 같은 코딩 에이전트에게 일을 잘 시키는 방법을 실험합니다." },
    { emoji: "📊", title: "데이터 수집·분석", desc: "웹에서 데이터를 긁어와 구조화하고 인사이트를 뽑아내는 일." },
    { emoji: "📚", title: "학습 자동화", desc: "강의 자료를 정리된 학습 사이트로 바꾸는 파이프라인 만들기." },
    { emoji: "🏃", title: "짧게 만들고 바로 확인", desc: "완벽한 설계보다 동작하는 프로토타입을 먼저 봅니다." },
  ],

  projects: [
    {
      title: "네이버 부동산 중개사 데이터 크롤러",
      desc: "지역별 중개사무소 정보를 수집하는 크롤러. 세션 관리와 봇 탐지 우회까지 다뤘습니다.",
      tags: ["Python", "크롤링", "API 분석"],
    },
    {
      title: "PDF 강의자료 → 학습 사이트 파이프라인",
      desc: "강의 PDF를 챕터 단위 MDX 콘텐츠·퀴즈·복습 프롬프트로 변환하는 자동화 워크플로우.",
      tags: ["Next.js", "MDX", "에이전트 스킬"],
    },
    {
      title: "Spring 백엔드 세미나 (와플스튜디오)",
      desc: "JDK 21 기반 Spring Boot 과제를 매주 구현하고 PR로 제출 중.",
      tags: ["Java", "Spring Boot", "Git"],
    },
  ],

  dwncGoal: {
    title: "DWNC에서 만들고 싶은 것",
    desc: "외부 API(날씨·AI)를 붙여 실제로 매일 쓸 수 있는 작은 서비스 하나를 끝까지 배포해보는 것. 그리고 해커톤에서 팀원들과 에이전트를 병렬로 굴려보는 경험.",
  },
};
