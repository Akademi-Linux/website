import { discord, DISCORD_URL, LINKEDIN_URL, route, YOUTUBE_URL } from "../config";

const BANNER = String.raw` █████╗ ██╗  ██╗ █████╗ ██████╗ ███████╗███╗   ███╗██╗    ██╗     ██╗███╗   ██╗██╗   ██╗██╗  ██╗
██╔══██╗██║ ██╔╝██╔══██╗██╔══██╗██╔════╝████╗ ████║██║    ██║     ██║████╗  ██║██║   ██║╚██╗██╔╝
███████║█████╔╝ ███████║██║  ██║█████╗  ██╔████╔██║██║    ██║     ██║██╔██╗ ██║██║   ██║ ╚███╔╝
██╔══██║██╔═██╗ ██╔══██║██║  ██║██╔══╝  ██║╚██╔╝██║██║    ██║     ██║██║╚██╗██║██║   ██║ ██╔██╗
██║  ██║██║  ██╗██║  ██║██████╔╝███████╗██║ ╚═╝ ██║██║    ███████╗██║██║ ╚████║╚██████╔╝██╔╝ ██╗
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝     ╚═╝╚═╝    ╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝`;

// The two words are set separately so they can stack on phones.
const bannerColumns = (start: number, end?: number) =>
  BANNER.split("\n")
    .map((line) => line.slice(start, end))
    .join("\n");
const AKADEMI = bannerColumns(0, 54);
const LINUX = bannerColumns(58);

const TRACKS = [
  { name: "Linux", img: "linux", alt: "Linux (Tux) logo", w: 43, h: 52, text: "Shell, filesystems, users and permissions, systemd, networking, troubleshooting." },
  { name: "Docker", img: "docker", alt: "Docker logo", w: 46, h: 46, text: "Images, containers, volumes, networking, Compose, secure builds." },
  { name: "Kubernetes", img: "kubernetes", alt: "Kubernetes logo", w: 52, h: 50, text: "Pods, deployments, services, storage, RBAC, cluster operations." },
  { name: "OpenStack", img: "openstack", alt: "OpenStack logo", w: 45, h: 44, text: "Private cloud: Keystone, Nova, Neutron, Cinder, deployment and day-2 ops." },
  { name: "Ceph", img: "ceph", alt: "Ceph logo", w: 49, h: 48, text: "Software-defined storage: RADOS, RBD, CephFS, RGW, cluster operations." },
];

const FEATURES = [
  ["[01] KVM-based", "Real virtual machines with root access. Not a simulator."],
  ["[02] Real scenarios", "Broken boots, failing pods, full disks: the incidents you'll meet on the job."],
  ["[03] Live task checks", "Each task is verified against the lab's real state the moment you finish it."],
  ["[04] AI-assisted", "Ask for a hint, not the answer. The assistant sees your lab and nudges you forward."],
];

const track = (t: (typeof TRACKS)[number], i: number) => `
  <a class="card-link grid grid-cols-[56px_minmax(0,1fr)] gap-x-4 gap-y-1 p-4 sm:flex sm:gap-3.5 sm:p-[22px]" ${route("/about")}>
    <div class="row-span-3 flex h-14 w-14 items-center justify-center self-start border border-al-border bg-al-elevated sm:h-[72px] sm:w-[72px]">
      <img src="/assets/tech/${t.img}.png" alt="${t.alt}" width="${t.w}" height="${t.h}" loading="lazy" decoding="async" class="max-h-[72%] max-w-[72%] sm:max-h-none sm:max-w-none" />
    </div>
    <span class="eyebrow">TRACK 0${i + 1}</span>
    <span class="text-lg font-bold">${t.name}</span>
    <span class="small">${t.text}</span>
  </a>`;

const feature = ([title, text]: string[]) => `
  <div class="flex flex-col gap-1.5 border border-al-border p-4">
    <span class="text-sm text-al-term">${title}</span>
    <span class="small">${text}</span>
  </div>`;

const status = (label: string, value: string, classes: string) => `
  <div class="flex min-w-0 flex-col gap-1.5 p-4 sm:p-5 ${classes}">
    <span class="eyebrow">${label}</span>
    ${value}
  </div>`;

export const renderHome = (): string => `
  <div class="flex flex-col gap-14 pt-8 md:gap-[72px] md:pt-16">
    <section aria-labelledby="hero-title" class="flex flex-col gap-7">
      <div class="text-[13px] text-al-muted">[ <span class="text-al-term">OK</span> ] Boot sequence complete · welcome, visitor</div>
      <div class="ascii" aria-hidden="true">
        <div class="ascii-banner text-al-glow" style="text-shadow:0 0 6px rgba(74,222,128,.55),0 0 26px rgba(28,185,0,.35)"><pre>${AKADEMI}</pre><pre>${LINUX}</pre></div>
      </div>
      <h1 id="hero-title" tabindex="-1" class="m-0 max-w-[900px] text-[clamp(28px,4vw,44px)] font-bold leading-[1.2]">Learn Linux the way it's meant to be used — <span class="glow">from the shell</span><span class="caret">▋</span></h1>
      <p class="m-0 max-w-[720px] text-base leading-[26px] text-al-muted">[HERO SUBLINE — one sentence on who Akademi Linux is for and what they'll get.] Every page here is a command. <span class="on-keys">Press <span class="border border-al-term px-1.5 text-al-text">/</span></span><span class="on-touch">Tap <span class="border border-al-term px-1.5 text-al-text">&gt;_</span></span> to start.</p>
      <div class="cta-row">
        <a class="btn-primary" ${discord}>$ /discord — join the community</a>
        <a class="btn-ghost" ${route("/about")}>$ man akademi</a>
      </div>
    </section>

    <section aria-labelledby="topics-title" class="flex flex-col gap-5">
      <div class="flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="topics-title" class="section-title">## ls /courses</h2>
        <span class="text-[13px] text-al-muted">5 tracks · free to start</span>
      </div>
      <div class="track-grid">${TRACKS.map(track).join("")}</div>
    </section>

    <section aria-labelledby="lab-title" class="auto-grid items-start gap-6 border border-al-term p-[clamp(16px,4vw,48px)] md:gap-8" style="--min:340px;background:rgba(13,17,23,.92);box-shadow:0 0 32px rgba(34,197,94,.12)">
      <div class="flex flex-col gap-[22px]">
        <span class="self-start border border-al-term px-2.5 py-1 text-xs tracking-[0.14em] text-al-glow lg:text-[11px]">LAB ENGINE</span>
        <h2 id="lab-title" class="glow m-0 text-[clamp(26px,3vw,34px)] font-bold leading-[1.2]">Aklin Lab Engine</h2>
        <p class="m-0 text-base leading-[26px]">Hands-on learning on real machines. Aklin builds a fresh KVM lab for every scenario, checks your work live as you complete each task, and gives you an AI assistant when you're stuck.</p>
        <div class="auto-grid gap-3.5" style="--min:220px">${FEATURES.map(feature).join("")}</div>
        <a class="btn-primary w-full sm:w-auto sm:self-start" ${discord}>$ aklin lab start</a>
      </div>
      <div role="group" aria-label="Example Aklin lab session" class="min-w-0 border border-al-border bg-al-bg text-[13px] leading-[22px]">
        <div class="flex flex-wrap justify-between gap-2 border-b border-al-border px-4 py-2.5 text-xs text-al-muted"><span>aklin · lab: k8s-troubleshoot-01</span><span><span class="text-al-term">●</span> 3 VMs running</span></div>
        <div class="flex flex-col gap-1 border-b border-al-border p-3 sm:p-4">
          <div class="eyebrow mb-1">TASKS</div>
          <div><span class="text-al-term">[✔]</span> Find why the web pod is in CrashLoopBackOff</div>
          <div><span class="text-al-term">[✔]</span> Fix the ConfigMap and roll out the deployment</div>
          <div class="text-al-glow"><span class="animate-caret">[▸]</span> Expose the service on NodePort 30080</div>
          <div class="text-al-muted">[ ] Confirm the app answers on worker-2</div>
        </div>
        <div tabindex="0" role="region" aria-label="Example terminal output" class="overflow-x-auto border-b border-al-border p-3 text-xs text-al-muted sm:p-4 sm:text-[13px]">
          <div class="whitespace-pre-wrap"><span class="text-al-term">student@cp-1</span>:~$ <span class="text-al-text">kubectl get pods -n shop</span></div>
          <div class="whitespace-pre">NAME                   READY   STATUS<span class="hidden sm:inline">    RESTARTS</span></div>
          <div class="whitespace-pre">web-7c9f8d6b5-x2kqp    1/1     <span class="text-al-term">Running</span><span class="hidden sm:inline">   3</span></div>
          <div class="whitespace-pre-wrap"><span class="text-al-info">aklin</span> ✔ check passed: deployment/web healthy</div>
        </div>
        <div class="flex gap-3 p-3 sm:p-4">
          <span class="h-[18px] shrink-0 bg-al-glow px-1.5 text-[11px] font-bold leading-[18px] text-al-bg">AI</span>
          <span>Hint: a Service picks pods by label. Compare the selector with the labels on your pods.</span>
        </div>
      </div>
    </section>

    <section aria-labelledby="mentors-title" class="flex flex-col gap-5">
      <div class="flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="mentors-title" class="section-title">## who -m  <span class="text-sm font-normal text-al-muted">· mentors</span></h2>
        <span class="text-[13px] text-al-muted">1 mentor online</span>
      </div>
      <div class="auto-grid gap-4" style="--min:300px">
        <article class="panel flex flex-wrap items-start gap-5 p-6">
          <div role="img" aria-label="Photo of Aji Arya (placeholder)" class="flex h-24 w-24 shrink-0 items-center justify-center border border-al-term bg-al-elevated text-[30px] font-bold text-al-glow" style="text-shadow:0 0 6px rgba(74,222,128,.6);box-shadow:0 0 18px rgba(34,197,94,.2)">AA</div>
          <div class="flex min-w-[200px] flex-1 flex-col gap-2">
            <span class="eyebrow">uid=1000 · FOUNDER &amp; MENTOR</span>
            <h3 class="m-0 text-xl font-bold">Aji Arya</h3>
            <p class="small m-0">[SHORT BIO: current role, years in infrastructure, what you love teaching.]</p>
            <div class="flex flex-wrap gap-1.5 text-xs">
              <span class="border border-al-border px-2 py-[3px]">[EXPERTISE 1]</span>
              <span class="border border-al-border px-2 py-[3px]">[EXPERTISE 2]</span>
              <span class="border border-al-border px-2 py-[3px]">[EXPERTISE 3]</span>
            </div>
            <div class="mt-1 flex flex-wrap gap-3.5 text-[13px]"><a class="touch-link" href="${YOUTUBE_URL}" target="_blank" rel="noopener">YouTube ↗</a><a class="touch-link" href="${LINKEDIN_URL}" target="_blank" rel="noopener">LinkedIn ↗</a></div>
          </div>
        </article>
        <a href="${DISCORD_URL}" target="_blank" rel="noopener" class="flex min-h-36 flex-col justify-center gap-2 border border-dashed border-al-border p-6 no-underline">
          <span class="text-lg text-al-term">[ + ] useradd mentor</span>
          <span class="small">Work in infrastructure and want to teach? Join us as a mentor. Say hi in Discord.</span>
        </a>
      </div>
    </section>

    <section aria-labelledby="qs-title" class="flex flex-col gap-5">
      <h2 id="qs-title" class="section-title">## quick-start</h2>
      <div class="grid-2-4">
        <a class="card-link min-h-[120px] gap-2.5 p-[22px]" ${route("/about")}><span class="eyebrow">[1] ROUTE</span><span class="text-lg text-al-term">/about</span><span class="small">Mission, programs and who runs this — as a man page.</span></a>
        <a class="card-link min-h-[120px] gap-2.5 p-[22px]" ${route("/tools")}><span class="eyebrow">[2] ROUTE</span><span class="text-lg text-al-term">/tools</span><span class="small">Utilities for learners. <span class="text-al-warn">[MODULE_OFFLINE]</span></span></a>
        <a class="card-link min-h-[120px] gap-2.5 !border-al-term p-[22px]" style="box-shadow:0 0 18px rgba(34,197,94,.15)" ${discord}><span class="eyebrow">[3] EXTERNAL</span><span class="text-lg text-al-glow">/discord ↗</span><span class="small">Ask questions, share setups, find study buddies.</span></a>
        <div class="flex min-h-[120px] flex-col gap-2.5 border border-dashed border-al-border p-[22px]"><span class="eyebrow">[?] BUILTIN</span><span class="text-lg text-al-term">/help</span><span class="small">Lists every command. <span class="on-keys">Press /</span><span class="on-touch">Tap &gt;_</span> then type help.</span></div>
      </div>
    </section>

    <section class="auto-grid gap-6" style="--min:320px">
      <div class="panel min-w-0">
        <div class="flex justify-between gap-3 border-b border-al-border px-4 py-2.5 text-xs text-al-muted"><span>journalctl -u akademi --follow</span><span class="flex items-center gap-1.5" aria-hidden="true"><span class="h-2.5 w-2.5 rounded-full border border-al-border"></span><span class="h-2.5 w-2.5 rounded-full border border-al-border"></span><span class="h-2.5 w-2.5 rounded-full bg-al-term"></span></span></div>
        <div class="px-5 py-[18px] text-[13px] leading-6 text-al-muted">
          <div>[ 0.0012 ] kernel: akademi-linux <span class="text-al-text">v[VERSION]</span> booting</div>
          <div>[ <span class="text-al-term">OK</span> ] Started community.service</div>
          <div>[ <span class="text-al-term">OK</span> ] Mounted /dev/discord → <span class="text-al-text">[MEMBER COUNT] members</span></div>
          <div>[ <span class="text-al-term">OK</span> ] Reached target learning.target</div>
          <div>[ <span class="text-al-warn">WARN</span> ] tools.service: module offline (coming soon)</div>
          <div>[ <span class="text-al-info">INFO</span> ] Next event: [EVENT NAME · DATE]</div>
          <div class="caret" aria-hidden="true">▋</div>
        </div>
      </div>
      <div class="panel flex min-w-0 flex-col">
        <div class="border-b border-al-border px-4 py-2.5 text-xs text-al-muted">systemctl status</div>
        <div class="grid flex-1 grid-cols-2">
          ${status("COMMUNITY", `<span class="text-lg text-al-term sm:text-[22px]">● active</span>`, "border-b border-r border-al-border")}
          ${status("ABOUT", `<span class="text-lg text-al-term sm:text-[22px]">● active</span>`, "border-b border-al-border")}
          ${status("TOOLS", `<span class="text-lg text-al-warn sm:text-[22px]">○ offline</span>`, "border-r border-al-border")}
          ${status("UPTIME", `<span id="uptime" class="text-lg text-al-text sm:text-[22px]">00:00:00</span>`, "")}
        </div>
      </div>
    </section>
  </div>`;
