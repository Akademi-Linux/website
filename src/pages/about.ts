import { discord, DISCORD_URL, route, YOUTUBE_URL } from "../config";

const fact = (label: string, value: string) =>
  `<div class="flex items-baseline"><span class="inline-block w-[84px] shrink-0 text-al-term sm:w-[130px]">${label}</span><span class="min-w-0">${value}</span></div>`;

const stat = (label: string, text: string, link: string, featured = false) => `
  <div class="panel flex flex-col gap-2.5 p-6 ${featured ? "!border-al-term" : ""}"${featured ? ` style="box-shadow:0 0 20px rgba(34,197,94,.15)"` : ""}>
    <span class="text-xs tracking-[0.12em] text-al-muted lg:text-[11px]">${label}</span>
    <span class="glow text-[40px] font-bold leading-[48px]">[N]</span>
    <span class="small">${text}</span>
    ${link}
  </div>`;

const man = (title: string, body: string, last = false) => `
  <section class="grid gap-x-10 gap-y-4 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] border-b ${last ? "border-al-border" : "border-dashed border-al-border"}">
    <h2 class="m-0 text-base font-bold text-al-glow" style="text-shadow:0 0 4px rgba(74,222,128,.45)">${title}</h2>
    ${body}
  </section>`;

const body = (html: string, muted = false) =>
  `<p class="m-0 text-[15px] leading-[26px] ${muted ? "text-al-muted" : ""}">${html}</p>`;

const option = (flag: string, text: string) =>
  `<div><span class="text-al-term">${flag}</span><span class="block pl-8 text-al-muted">${text}</span></div>`;

const SWATCHES = ["#0a0a0a", "#1cb900", "#22c55e", "#4ade80", "#58a6ff", "#f59e0b", "#f85149", "#e6edf3"];

export const renderAbout = (): string => `
  <div class="flex flex-col gap-10 pt-8 sm:gap-14 sm:pt-14">
    <h1 tabindex="-1" class="sr-only">About Akademi Linux</h1>
    <div class="shell-line">visitor@akademi:~$ neofetch</div>

    <section aria-label="System summary" class="panel flex flex-wrap items-center gap-6 p-5 sm:gap-12 sm:p-9">
      <img src="/assets/brand/logo_logomark-green-alphabg.svg" alt="Akademi Linux logomark" width="240" height="240" class="h-28 w-28 max-w-full sm:h-60 sm:w-60" style="filter:drop-shadow(0 0 10px rgba(28,185,0,.6)) drop-shadow(0 0 28px rgba(28,185,0,.25))" />
      <div class="flex min-w-0 flex-[1_1_min(420px,100%)] flex-col gap-1 text-[15px] leading-[27px]">
        <div><span class="font-bold text-al-glow text-glow-sm">visitor</span>@<span class="font-bold text-al-glow text-glow-sm">akademi-linux</span></div>
        <div class="overflow-hidden text-al-border" aria-hidden="true">---------------------------</div>
        ${fact("OS", "Akademi Linux Community")}
        ${fact("Mission", "[ONE-LINE MISSION STATEMENT]")}
        ${fact("Founded", "[YEAR]")}
        ${fact("Members", "[MEMBER COUNT]")}
        ${fact("Language", "[e.g. Bahasa Indonesia, English]")}
        ${fact("Focus", "[3 TOPICS, comma separated]")}
        ${fact("Shell", `<a class="touch-link-coarse" ${discord}>/discord</a>`)}
        <div class="mt-3.5 flex" aria-hidden="true">${SWATCHES.map((c, i) => `<span class="h-4 w-7${i === 0 ? " border border-al-border" : ""}" style="background:${c}"></span>`).join("")}</div>
      </div>
    </section>

    <div class="shell-line">visitor@akademi:~$ akademi --stats</div>

    <section aria-label="Akademi Linux in numbers" class="grid-2-4">
      ${stat("YOUTUBE SUBSCRIBERS", "Free tutorials and walkthroughs on the channel.", `<a href="${YOUTUBE_URL}" target="_blank" rel="noopener" class="touch-link text-[13px]">Watch on YouTube ↗</a>`)}
      ${stat("DISCORD MEMBERS", "Learners troubleshooting together every day.", `<a href="${DISCORD_URL}" target="_blank" rel="noopener" class="touch-link text-[13px]">Join the server ↗</a>`)}
      ${stat("WORK PLACEMENTS", "Learners placed into sysadmin, DevSecOps and cloud ops roles.", "")}
      ${stat("ON-SITE / ENTERPRISE TRAINING", "Companies trained. We come to your office and teach your team on your stack.", `<a href="mailto:[TRAINING EMAIL]" class="touch-link text-[13px]">$ request --training</a>`, true)}
    </section>

    <div class="shell-line">visitor@akademi:~$ man akademi</div>

    <article class="flex flex-col border-t border-al-border">
      <div class="flex justify-between gap-3 border-b border-al-border py-3.5 text-[13px] text-al-muted"><span>AKADEMI(1)</span><span class="hidden sm:inline">Akademi Linux Manual</span><span>AKADEMI(1)</span></div>
      ${man("NAME", body(`akademi — [SHORT DESCRIPTION, e.g. "a community for learning Linux"]`))}
      ${man("SYNOPSIS", body(`<b>akademi</b> <span class="whitespace-nowrap">[<span class="text-al-term">--learn</span>]</span> <span class="whitespace-nowrap">[<span class="text-al-term">--share</span>]</span> <span class="whitespace-nowrap">[<span class="text-al-term">--contribute</span>]</span> <span class="text-al-muted">&lt;you&gt;</span>`))}
      ${man("DESCRIPTION", body("[2–3 SENTENCES: what Akademi Linux is, who it serves, and how people take part. Keep it plain and specific — this is the paragraph search engines and new members read first.]"))}
      ${man("OPTIONS", `<div class="flex flex-col gap-[18px] text-[15px] leading-[26px]">
        ${option("--learn", "[What learners get — classes, guides, mentoring.]")}
        ${option("--share", "[How members share setups, notes, questions.]")}
        ${option("--contribute", "[How people give back — teaching, open-source, events.]")}
      </div>`)}
      ${man("EXIT STATUS", body(`<span class="text-al-text">0</span>  you learned something today.<br /><span class="text-al-text">1</span>  you have a question — ask it in <a ${discord}>/discord</a>.`, true))}
      ${man("SEE ALSO", body(`<a class="touch-link-coarse" ${route("/home")}>home(1)</a>, <a class="touch-link-coarse" ${route("/tools")}>tools(8)</a>, <a class="touch-link-coarse" ${discord}>discord(7)</a>`), true)}
      <div class="flex justify-between gap-3 py-3.5 text-[13px] text-al-muted"><span>Akademi Linux</span><span>[LAST UPDATED]</span><span class="hidden sm:inline">AKADEMI(1)</span></div>
    </article>
  </div>`;
