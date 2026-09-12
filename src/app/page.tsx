import Guestbook from "@/components/Guestbook";
import { profile } from "@/content/profile";
import { getSupabase, type GuestbookEntry } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function loadGuestbook(): Promise<{ entries: GuestbookEntry[]; error: boolean }> {
  try {
    const { data, error } = await getSupabase()
      .from("guestbook")
      .select("id, name, message, created_at")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) {
      console.error("guestbook load failed:", error);
      return { entries: [], error: true };
    }
    return { entries: data ?? [], error: false };
  } catch (e) {
    console.error(e);
    return { entries: [], error: true };
  }
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-800">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
    </div>
  );
}

export default async function Home() {
  const { entries, error } = await loadGuestbook();

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
          <a href="#top" className="text-sm font-bold tracking-tight text-slate-900">
            {profile.name}
            <span className="ml-1.5 font-normal text-slate-400">/ {profile.englishName}</span>
          </a>
          <ul className="flex gap-5 text-sm text-slate-600">
            <li><a className="transition hover:text-blue-800" href="#about">About</a></li>
            <li><a className="transition hover:text-blue-800" href="#projects">Projects</a></li>
            <li><a className="transition hover:text-blue-800" href="#guestbook">Guestbook</a></li>
          </ul>
        </nav>
      </header>

      <main id="top" className="mx-auto w-full max-w-5xl px-5">
        {/* Hero */}
        <section className="py-20 sm:py-28">
          <div className="flex flex-wrap gap-2">
            {profile.tags.map((t) => (
              <span key={t} className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">
                {t}
              </span>
            ))}
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl">
            안녕하세요,<br />
            <span className="text-blue-800">{profile.name}</span>입니다.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">{profile.tagline}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#guestbook" className="rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900">
              방명록 남기기
            </a>
            <a
              href={`https://github.com/${profile.github}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              GitHub ↗
            </a>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-20 border-t border-slate-200 py-20">
          <SectionTitle eyebrow="About" title="관심 있는 것들" />
          <div className="grid gap-4 sm:grid-cols-2">
            {profile.interests.map((i) => (
              <div key={i.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="text-2xl">{i.emoji}</div>
                <h3 className="mt-3 font-semibold text-slate-900">{i.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{i.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-20 border-t border-slate-200 py-20">
          <SectionTitle eyebrow="Projects" title="해온 것 / 만들어본 것" />
          <div className="grid gap-4 md:grid-cols-3">
            {profile.projects.map((p) => (
              <div key={p.title} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DWNC + Contact */}
        <section className="border-t border-slate-200 py-20">
          <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
            <div className="rounded-2xl bg-blue-800 p-8 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">DWNC</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">{profile.dwncGoal.title}</h2>
              <p className="mt-4 leading-relaxed text-blue-50">{profile.dwncGoal.desc}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-800">Contact</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <span className="block text-slate-400">Email</span>
                  <a className="font-medium text-slate-900 hover:text-blue-800" href={`mailto:${profile.email}`}>{profile.email}</a>
                </li>
                <li>
                  <span className="block text-slate-400">GitHub</span>
                  <a className="font-medium text-slate-900 hover:text-blue-800" href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer">
                    github.com/{profile.github}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Guestbook */}
        <section id="guestbook" className="scroll-mt-20 border-t border-slate-200 py-20">
          <SectionTitle eyebrow="Guestbook" title="방명록" />
          <Guestbook entries={entries} loadError={error} />
        </section>
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {profile.name} · Built with Next.js + Supabase · DWNC 10기 1차 과제
      </footer>
    </>
  );
}
