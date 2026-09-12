# dwnc-intro

DWNC 10기 1차 과제 — 방우식 자기소개 페이지 (Supabase 방명록 포함).

- 스택: Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Supabase · Vercel
- 기획 문서: [PRD.md](./PRD.md)
- 콘텐츠 수정: `src/content/profile.ts`

## 로컬 실행

```bash
cp .env.example .env.local   # Supabase URL / anon key 입력
npm install
npm run dev
```

## 방명록 테이블

`supabase/migrations/` 참고. RLS로 익명 사용자는 읽기·쓰기만 가능하고 수정·삭제는 막혀 있습니다.
