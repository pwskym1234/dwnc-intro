"use server";

import { revalidatePath } from "next/cache";
import { getSupabase } from "@/lib/supabase";

export type GuestbookState = {
  ok: boolean;
  error?: string;
  submittedAt?: number;
};

const NAME_MAX = 30;
const MESSAGE_MAX = 300;

export async function addGuestbookEntry(
  _prev: GuestbookState,
  formData: FormData,
): Promise<GuestbookState> {
  const name = String(formData.get("name") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !message) {
    return { ok: false, error: "이름과 메시지를 모두 입력해주세요." };
  }
  if (name.length > NAME_MAX) {
    return { ok: false, error: `이름은 ${NAME_MAX}자 이내로 적어주세요.` };
  }
  if (message.length > MESSAGE_MAX) {
    return { ok: false, error: `메시지는 ${MESSAGE_MAX}자 이내로 적어주세요.` };
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("guestbook").insert({ name, message });
    if (error) {
      console.error("guestbook insert failed:", error);
      return { ok: false, error: "저장에 실패했어요. 잠시 후 다시 시도해주세요." };
    }
  } catch (e) {
    console.error(e);
    return { ok: false, error: "저장에 실패했어요. 잠시 후 다시 시도해주세요." };
  }

  revalidatePath("/");
  return { ok: true, submittedAt: Date.now() };
}
