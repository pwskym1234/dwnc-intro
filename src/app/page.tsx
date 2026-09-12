import Guestbook from "@/components/Guestbook";
import Reveal from "@/components/Reveal";
import ThemeToggle from "@/components/ThemeToggle";
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
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-800 dark:text-blue-400">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">{title}</h2>
    </div>
  );
}

const card =
  "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900";

export default async function Home() {
  const { entries, error } = await loadGuestbook();

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
          <a href="#top" className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
            {profile.name}
            <span className="ml-1.5 font-normal text-slate-400 dark:text-slate-500">/ {profile.englishName}</span>
          </a>
          <div className="flex items-center gap-5">
            <ul className="flex gap-5 text-sm text-slate-600 dark:text-slate-300">
              <li><a className="transition hover:text-blue-800 dark:hover:text-blue-400" href="#about">About</a></li>
              <li><a className="transition hover:text-blue-800 dark:hover:text-blue-400" href="#projects">Projects</a></li>
              <li><a className="transition hover:text-blue-800 dark:hover:text-blue-400" href="#guestbook">Guestbook</a></li>
            </ul>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto w-full max-w-5xl px-5">
        {/* Hero */}
        <section className="py-20 sm:py-28">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {profile.tags.map((t) => (
                <span key={t} className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl dark:text-white">
              안녕하세요,<br />
              <span className="text-blue-800 dark:text-blue-400">{profile.name}</span>입니다.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300">{profile.tagline}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#guestbook" className="rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-500">
                방명록 남기기
              </a>
              <a
                href={`https://github.com/${profile.github}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                GitHub ↗
              </a>
            </div>
          </Reveal>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-20 border-t border-slate-200 py-20 dark:border-slate-800">
          <Reveal><SectionTitle eyebrow="About" title="관심 있는 것들" /></Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {profile.interests.map((i, idx) => (
              <Reveal key={i.title} delay={idx * 80}>
                <div className={`${card} h-full transition hover:-translate-y-0.5 hover:shadow-md`}>
                  <div className="text-2xl">{i.emoji}</div>
                  <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{i.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{i.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-20 border-t border-slate-200 py-20 dark:border-slate-800">
          <Reveal><SectionTitle eyebrow="Projects" title="해온 것 / 만들어본 것" /></Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {profile.projects.map((p, idx) => (
              <Reveal key={p.title} delay={idx * 100} className="flex">
                <div className={`${card} flex flex-1 flex-col`}>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* DWNC + Contact */}
        <section className="border-t border-slate-200 py-20 dark:border-slate-800">
          <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
            <Reveal className="flex">
              <div className="flex-1 rounded-2xl bg-blue-800 p-8 text-white dark:bg-blue-700">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">DWNC</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight">{profile.dwncGoal.title}</h2>
                <p className="mt-4 leading-relaxed text-blue-50">{profile.dwncGoal.desc}</p>
              </div>
            </Reveal>
            <Reveal delay={100} className="flex">
              <div className={`${card} flex-1 p-8`}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-800 dark:text-blue-400">Contact</p>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <span className="block text-slate-400 dark:text-slate-500">Email</span>
                    <a className="font-medium text-slate-900 hover:text-blue-800 dark:text-white dark:hover:text-blue-400" href={`mailto:${profile.email}`}>{profile.email}</a>
                  </li>
                  <li>
                    <span className="block text-slate-400 dark:text-slate-500">GitHub</span>
                    <a className="font-medium text-slate-900 hover:text-blue-800 dark:text-white dark:hover:text-blue-400" href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer">
                      github.com/{profile.github}
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Guestbook */}
        <section id="guestbook" className="scroll-mt-20 border-t border-slate-200 py-20 dark:border-slate-800">
          <Reveal><SectionTitle eyebrow="Guestbook" title="방명록" /></Reveal>
          <Reveal delay={100}>
            <Guestbook entries={entries} loadError={error} />
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500">
        © {new Date().getFullYear()} {profile.name} · Built with Next.js + Supabase · DWNC 10기 1차 과제
      </footer>
    </>
  );
}
