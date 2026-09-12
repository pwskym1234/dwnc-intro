"use client";

import { useActionState, useEffect, useRef } from "react";
import { addGuestbookEntry, type GuestbookState } from "@/app/actions";
import type { GuestbookEntry } from "@/lib/supabase";

const initialState: GuestbookState = { ok: false };

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Seoul",
  }).format(new Date(iso));
}

export default function Guestbook({
  entries,
  loadError,
}: {
  entries: GuestbookEntry[];
  loadError: boolean;
}) {
  const [state, formAction, pending] = useActionState(addGuestbookEntry, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok, state.submittedAt]);

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
      <form
        ref={formRef}
        action={formAction}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <label className="block text-sm font-medium text-slate-700" htmlFor="gb-name">
          이름
        </label>
        <input
          id="gb-name"
          name="name"
          maxLength={30}
          required
          placeholder="이름 또는 닉네임"
          className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
        />

        <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="gb-message">
          메시지
        </label>
        <textarea
          id="gb-message"
          name="message"
          maxLength={300}
          required
          rows={4}
          placeholder="한마디 남겨주세요 :)"
          className="mt-1.5 w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
        />

        <button
          type="submit"
          disabled={pending}
          className="mt-5 w-full rounded-lg bg-blue-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "남기는 중…" : "방명록 남기기"}
        </button>

        <p className="mt-3 min-h-5 text-sm" aria-live="polite">
          {state.error && <span className="text-red-600">{state.error}</span>}
          {state.ok && !state.error && (
            <span className="text-blue-800">남겨주셔서 고마워요!</span>
          )}
        </p>
      </form>

      <ul className="space-y-3">
        {loadError && (
          <li className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            방명록을 불러오지 못했어요. 잠시 후 다시 시도해주세요.
          </li>
        )}
        {!loadError && entries.length === 0 && (
          <li className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
            아직 아무도 없어요. 첫 번째 방명록을 남겨주세요!
          </li>
        )}
        {entries.map((e) => (
          <li key={e.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-semibold text-slate-900">{e.name}</span>
              <time className="shrink-0 text-xs text-slate-400" dateTime={e.created_at}>
                {formatDate(e.created_at)}
              </time>
            </div>
            <p className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-700">
              {e.message}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
