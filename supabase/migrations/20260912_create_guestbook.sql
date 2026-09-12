create table if not exists public.guestbook (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 30),
  message text not null check (char_length(trim(message)) between 1 and 300),
  created_at timestamptz not null default now()
);

create index if not exists guestbook_created_at_idx on public.guestbook (created_at desc);

alter table public.guestbook enable row level security;

-- 공개 방명록: 누구나 읽기/쓰기 가능, 수정·삭제는 불가
create policy "guestbook_public_read" on public.guestbook
  for select to anon, authenticated using (true);

create policy "guestbook_public_insert" on public.guestbook
  for insert to anon, authenticated with check (true);
