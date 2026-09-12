import { createClient } from "@supabase/supabase-js";

export type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase 환경변수(NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)가 없습니다.");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
