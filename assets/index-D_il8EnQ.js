(async () => {
  (function() {
    const a = document.createElement("link").relList;
    if (a && a.supports && a.supports("modulepreload")) return;
    for (const n of document.querySelectorAll('link[rel="modulepreload"]')) i(n);
    new MutationObserver((n) => {
      for (const o of n) if (o.type === "childList") for (const b of o.addedNodes) b.tagName === "LINK" && b.rel === "modulepreload" && i(b);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function s(n) {
      const o = {};
      return n.integrity && (o.integrity = n.integrity), n.referrerPolicy && (o.referrerPolicy = n.referrerPolicy), n.crossOrigin === "use-credentials" ? o.credentials = "include" : n.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o;
    }
    function i(n) {
      if (n.ep) return;
      n.ep = true;
      const o = s(n);
      fetch(n.href, o);
    }
  })();
  const g = Math.random, pe = 900, me = 1.5;
  function W(e) {
    const a = document.createElement("canvas");
    a.width = a.height = 32;
    const s = a.getContext("2d");
    if (s) {
      const i = s.createRadialGradient(16, 16, 0, 16, 16, 16);
      e.forEach(([n, o]) => i.addColorStop(n, o)), s.fillStyle = i, s.fillRect(0, 0, 32, 32);
    }
    return a;
  }
  function ue(e, a) {
    const s = e.getContext("2d");
    if (!s) return {
      pause() {
      },
      resume() {
      }
    };
    const i = [
      W([
        [
          0,
          "rgba(240,255,240,1)"
        ],
        [
          0.18,
          "rgba(134,239,172,.9)"
        ],
        [
          0.45,
          "rgba(34,197,94,.25)"
        ],
        [
          1,
          "rgba(28,185,0,0)"
        ]
      ]),
      W([
        [
          0,
          "rgba(187,247,208,1)"
        ],
        [
          0.2,
          "rgba(74,222,128,.8)"
        ],
        [
          0.5,
          "rgba(28,185,0,.2)"
        ],
        [
          1,
          "rgba(28,185,0,0)"
        ]
      ]),
      W([
        [
          0,
          "rgba(74,222,128,.9)"
        ],
        [
          0.25,
          "rgba(28,185,0,.6)"
        ],
        [
          0.6,
          "rgba(21,128,61,.15)"
        ],
        [
          1,
          "rgba(21,128,61,0)"
        ]
      ])
    ];
    let n = 0, o = 0, b = [], m = [], w = false, u = performance.now(), x = 0, f = 2.5;
    const r = {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0
    };
    function I(l) {
      l.clearRect(0, 0, n, o), l.globalCompositeOperation = "lighter";
      const c = (r.x - n / 2) * -0.014, $ = (r.y - o / 2) * -0.014;
      for (const t of b) {
        const d = 0.5 + 0.5 * Math.sin(x * t.sp + t.ph), p = d > 0.97 && t.k === 0 ? 1.6 : 1, h = t.r * (5 + 3 * d) * p;
        l.globalAlpha = t.a * (0.3 + 0.7 * d), l.drawImage(i[t.k], t.x + c * t.z - h / 2, t.y + $ * t.z - h / 2, h, h);
      }
      for (const t of m) {
        const d = Math.sin(Math.PI * t.life / t.max), p = Math.hypot(t.vx, t.vy), h = t.x - t.vx / p * t.len, y = t.y - t.vy / p * t.len;
        l.globalAlpha = 1, l.lineCap = "round";
        let k = l.createLinearGradient(h, y, t.x, t.y);
        k.addColorStop(0, "rgba(28,185,0,0)"), k.addColorStop(1, `rgba(74,222,128,${0.22 * d})`), l.strokeStyle = k, l.lineWidth = 6, l.beginPath(), l.moveTo(h, y), l.lineTo(t.x, t.y), l.stroke(), k = l.createLinearGradient(h, y, t.x, t.y), k.addColorStop(0, "rgba(28,185,0,0)"), k.addColorStop(0.7, `rgba(74,222,128,${0.45 * d})`), k.addColorStop(1, `rgba(230,255,230,${d})`), l.strokeStyle = k, l.lineWidth = 1.6, l.beginPath(), l.moveTo(h, y), l.lineTo(t.x, t.y), l.stroke(), l.globalAlpha = d, l.drawImage(i[0], t.x - 9, t.y - 9, 18, 18);
      }
      l.globalAlpha = 1, l.globalCompositeOperation = "source-over";
    }
    function L(l) {
      const c = Math.min(window.devicePixelRatio || 1, me);
      n = window.innerWidth, o = window.innerHeight, e.width = n * c, e.height = o * c, l.setTransform(c, 0, 0, c, 0, 0), r.x = r.tx = n / 2, r.y = r.ty = o / 2;
      const $ = Math.round(Math.min(pe, n * o / 1600));
      b = Array.from({
        length: $
      }, () => {
        const t = g() < 0.1 ? 0 : g() < 0.55 ? 1 : 2;
        return {
          x: g() * n,
          y: g() * o,
          z: g(),
          r: 0.35 + g() ** 3 * 1.5 + (t === 0 ? 0.4 : 0),
          a: 0.25 + g() * 0.6,
          sp: 0.3 + g() * 1.8,
          ph: g() * 6.283,
          k: t
        };
      }), a && I(l);
    }
    function E(l, c) {
      if (a) return;
      const $ = g() < 0.5 ? 1 : -1, t = (16 + g() * 24) * Math.PI / 180, d = 13 + g() * 9;
      m.push({
        x: l ?? n * (0.1 + g() * 0.8),
        y: c ?? o * g() * 0.45,
        vx: Math.cos(t) * d * $,
        vy: Math.sin(t) * d,
        len: 110 + g() * 170,
        life: 0,
        max: 40 + g() * 30
      });
    }
    function _(l) {
      x += l / 60, f -= l / 60, f <= 0 && (E(), f = g() < 0.18 ? 0.3 + g() * 0.5 : 3.5 + g() * 6);
      for (const c of m) c.x += c.vx * l, c.y += c.vy * l, c.life += l;
      m = m.filter((c) => c.life < c.max), r.x += (r.tx - r.x) * 0.04, r.y += (r.ty - r.y) * 0.04;
    }
    function D(l, c) {
      requestAnimationFrame((t) => D(l, t));
      const $ = Math.min(3, (c - u) / 16.67);
      u = c, !(w || document.hidden) && (_($), I(l));
    }
    let T;
    return window.addEventListener("resize", () => {
      window.clearTimeout(T), T = window.setTimeout(() => L(s), 150);
    }), window.addEventListener("pointermove", (l) => {
      r.tx = l.clientX, r.ty = l.clientY;
    }, {
      passive: true
    }), document.addEventListener("pointerleave", () => {
      r.tx = n / 2, r.ty = o / 2;
    }), window.addEventListener("pointerdown", (l) => {
      var _a;
      ((_a = l.target) == null ? void 0 : _a.closest("a, button, input, label, .prompt, .gateway")) || E(l.clientX, l.clientY);
    }), L(s), a || requestAnimationFrame((l) => D(s, l)), {
      pause() {
        w = true;
      },
      resume() {
        w = false;
      }
    };
  }
  const R = "https://discord.com/", Q = "https://www.youtube.com/", ae = "https://www.linkedin.com/", se = {
    home: "Akademi Linux",
    about: "Akademi Linux \u2014 /about",
    tools: "Akademi Linux \u2014 /tools",
    notfound: "Akademi Linux \u2014 not found"
  }, v = (e) => `href="${e === "/home" ? "/" : e}" data-cmd="${e}"`, S = `href="${R}" target="_blank" rel="noopener" data-cmd="/discord"`, xe = (e) => `<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${e}</svg>`, q = (e, a, s) => `<a href="${e}" target="_blank" rel="noopener" aria-label="${a}" class="flex h-11 w-11 items-center justify-center text-al-bg hover:text-al-bg">${xe(s)}</a>`, fe = () => `
  <footer class="relative mt-6">
    <img src="/assets/art/footer-art.svg" width="1440" height="600" loading="lazy" decoding="async" alt="Engraved illustration: a temple whose columns are server racks with the Akademi Linux mark in its pediment, a satellite, a dish and power lines, overgrown with ferns that dissolve into the green footer" class="-mb-0.5 block h-auto w-full" />
    <div class="bg-al-brand text-al-bg">
      <div class="mx-auto flex max-w-[1280px] flex-col gap-14 px-6 pt-2">
        <div class="flex flex-wrap items-end justify-between gap-8">
          <img src="/assets/brand/logo_primary-mono-dark.svg" alt="Akademi Linux" width="300" height="111" loading="lazy" class="h-[111px] w-[300px] max-w-full object-contain object-left" />
          <p class="m-0 max-w-[420px] text-[15px] font-medium leading-6">Open knowledge. Fair membership. Real infrastructure careers.</p>
        </div>

        <div class="auto-grid items-start gap-10" style="--min:220px">
          <div class="flex flex-col gap-3">
            <span class="footer-tag">COMMUNITY</span>
            <p class="m-0 text-sm leading-[22px]">Free tutorials on YouTube.<br />Daily troubleshooting on Discord.</p>
          </div>
          <nav aria-label="Footer" class="flex flex-col text-sm font-medium">
            <span class="footer-tag mb-2.5">$ ls /</span>
            <a class="footer-link" ${v("/home")}>/home</a>
            <a class="footer-link" ${v("/about")}>/about</a>
            <a class="footer-link" ${v("/tools")}>/tools</a>
            <a class="footer-link" ${S}>/discord \u2197</a>
          </nav>
          <div class="flex flex-col gap-3">
            <span class="footer-tag">ENTERPRISE TRAINING</span>
            <p class="m-0 text-sm leading-[22px]">We come to your office and train your team on-site.<br /><a href="mailto:[TRAINING EMAIL]" class="font-bold text-al-bg hover:text-al-bg">[TRAINING EMAIL]</a></p>
          </div>
          <div class="flex flex-col gap-3">
            <span class="text-sm font-bold">Socials:</span>
            <div class="flex gap-2">
              ${q(R, "Akademi Linux on Discord", '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"></path><path d="M9 11h.01M15 11h.01"></path>')}
              ${q(Q, "Akademi Linux on YouTube", '<rect x="2.5" y="5" width="19" height="14" rx="4"></rect><path d="M10 9.5v5l4.5-2.5z"></path>')}
              ${q(ae, "Akademi Linux on LinkedIn", '<rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"></path>')}
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2 pb-7 pt-[18px] text-xs leading-[18px]" style="border-top:1.5px solid #0a0a0a">
          <div class="flex flex-wrap justify-between gap-3 font-bold"><span>Akademi Linux \xB7 \xA9 All rights reserved [YEAR]</span><span>exit 0</span></div>
          <p class="m-0 text-[11px] leading-[17px]">Linux\xAE is the registered trademark of Linus Torvalds. Docker, Kubernetes, OpenStack and Ceph logos are trademarks of their respective owners, shown to identify course topics.</p>
        </div>
      </div>
    </div>
  </footer>`, he = {
    home: '<span class="h-2 w-2 rounded-full bg-al-term shadow-[0_0_8px_#22c55e]"></span>SYSTEM ONLINE \xB7 tty1',
    about: "AKADEMI(1) \xB7 User Commands",
    tools: '<span class="h-2 w-2 rounded-full bg-al-warn shadow-[0_0_8px_#f59e0b]"></span>DEGRADED \xB7 1 module offline',
    notfound: '<span class="h-2 w-2 rounded-full bg-al-term shadow-[0_0_8px_#22c55e]"></span>SYSTEM ONLINE \xB7 tty1'
  }, H = (e, a) => {
    const s = e === `/${a}` ? ' aria-current="page"' : "";
    return `<a class="nav-link" ${v(e)}${s}>${e}</a>`;
  }, ne = (e) => `
  <header id="header" class="relative border-b border-al-border bg-al-bg/80">
    <div class="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-6 py-[18px]">
      <a class="flex" ${v("/home")} aria-label="Akademi Linux home">
        <img src="/assets/brand/logo_primary-white.svg" alt="" width="119" height="44" class="h-11 w-[119px] object-contain drop-shadow-[0_0_8px_rgba(28,185,0,.4)]" />
      </a>
      <nav aria-label="Primary" class="flex flex-wrap gap-1.5 text-[13px]">
        ${H("/home", e)}
        ${H("/about", e)}
        ${H("/tools", e)}
        <a class="nav-link" ${S}>/discord \u2197</a>
      </nav>
      <div class="flex items-center gap-2 text-xs text-al-muted">${he[e]}</div>
    </div>
  </header>`, O = (e, a) => `<div class="flex"><span class="inline-block w-[110px] shrink-0 text-al-term sm:w-[130px]">${e}</span><span class="min-w-0">${a}</span></div>`, K = (e, a, s, i = false) => `
  <div class="panel flex flex-col gap-2.5 p-6 ${i ? "!border-al-term" : ""}"${i ? ' style="box-shadow:0 0 20px rgba(34,197,94,.15)"' : ""}>
    <span class="text-[11px] tracking-[0.12em] text-al-muted">${e}</span>
    <span class="glow text-[40px] font-bold leading-[48px]">[N]</span>
    <span class="small">${a}</span>
    ${s}
  </div>`, M = (e, a, s = false) => `
  <section class="grid gap-x-10 gap-y-4 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] border-b ${s ? "border-al-border" : "border-dashed border-al-border"}">
    <h2 class="m-0 text-base font-bold text-al-glow" style="text-shadow:0 0 4px rgba(74,222,128,.45)">${e}</h2>
    ${a}
  </section>`, P = (e, a = false) => `<p class="m-0 text-[15px] leading-[26px] ${a ? "text-al-muted" : ""}">${e}</p>`, Y = (e, a) => `<div><span class="text-al-term">${e}</span><span class="block pl-8 text-al-muted">${a}</span></div>`, be = [
    "#0a0a0a",
    "#1cb900",
    "#22c55e",
    "#4ade80",
    "#58a6ff",
    "#f59e0b",
    "#f85149",
    "#e6edf3"
  ], ge = () => `
  <div class="flex flex-col gap-14 pt-14">
    <h1 tabindex="-1" class="sr-only">About Akademi Linux</h1>
    <div class="shell-line">visitor@akademi:~$ neofetch</div>

    <section aria-label="System summary" class="panel flex flex-wrap items-center gap-12 p-6 sm:p-9">
      <img src="/assets/brand/logo_logomark-green-alphabg.svg" alt="Akademi Linux logomark" width="240" height="240" class="h-60 w-60 max-w-full" style="filter:drop-shadow(0 0 10px rgba(28,185,0,.6)) drop-shadow(0 0 28px rgba(28,185,0,.25))" />
      <div class="flex min-w-0 flex-[1_1_min(420px,100%)] flex-col gap-1 text-[15px] leading-[27px]">
        <div><span class="font-bold text-al-glow text-glow-sm">visitor</span>@<span class="font-bold text-al-glow text-glow-sm">akademi-linux</span></div>
        <div class="overflow-hidden text-al-border" aria-hidden="true">---------------------------</div>
        ${O("OS", "Akademi Linux Community")}
        ${O("Mission", "[ONE-LINE MISSION STATEMENT]")}
        ${O("Founded", "[YEAR]")}
        ${O("Members", "[MEMBER COUNT]")}
        ${O("Language", "[e.g. Bahasa Indonesia, English]")}
        ${O("Focus", "[3 TOPICS, comma separated]")}
        ${O("Shell", `<a ${S}>/discord</a>`)}
        <div class="mt-3.5 flex" aria-hidden="true">${be.map((e, a) => `<span class="h-4 w-7${a === 0 ? " border border-al-border" : ""}" style="background:${e}"></span>`).join("")}</div>
      </div>
    </section>

    <div class="shell-line">visitor@akademi:~$ akademi --stats</div>

    <section aria-label="Akademi Linux in numbers" class="auto-grid gap-4" style="--min:240px">
      ${K("YOUTUBE SUBSCRIBERS", "Free tutorials and walkthroughs on the channel.", `<a href="${Q}" target="_blank" rel="noopener" class="touch-link text-[13px]">Watch on YouTube \u2197</a>`)}
      ${K("DISCORD MEMBERS", "Learners troubleshooting together every day.", `<a href="${R}" target="_blank" rel="noopener" class="touch-link text-[13px]">Join the server \u2197</a>`)}
      ${K("WORK PLACEMENTS", "Learners placed into sysadmin, DevSecOps and cloud ops roles.", "")}
      ${K("ON-SITE / ENTERPRISE TRAINING", "Companies trained. We come to your office and teach your team on your stack.", '<a href="mailto:[TRAINING EMAIL]" class="touch-link text-[13px]">$ request --training</a>', true)}
    </section>

    <div class="shell-line">visitor@akademi:~$ man akademi</div>

    <article class="flex flex-col border-t border-al-border">
      <div class="flex justify-between gap-3 border-b border-al-border py-3.5 text-[13px] text-al-muted"><span>AKADEMI(1)</span><span class="hidden sm:inline">Akademi Linux Manual</span><span>AKADEMI(1)</span></div>
      ${M("NAME", P('akademi \u2014 [SHORT DESCRIPTION, e.g. "a community for learning Linux"]'))}
      ${M("SYNOPSIS", P('<b>akademi</b> [<span class="text-al-term">--learn</span>] [<span class="text-al-term">--share</span>] [<span class="text-al-term">--contribute</span>] <span class="text-al-muted">&lt;you&gt;</span>'))}
      ${M("DESCRIPTION", P("[2\u20133 SENTENCES: what Akademi Linux is, who it serves, and how people take part. Keep it plain and specific \u2014 this is the paragraph search engines and new members read first.]"))}
      ${M("OPTIONS", `<div class="flex flex-col gap-[18px] text-[15px] leading-[26px]">
        ${Y("--learn", "[What learners get \u2014 classes, guides, mentoring.]")}
        ${Y("--share", "[How members share setups, notes, questions.]")}
        ${Y("--contribute", "[How people give back \u2014 teaching, open-source, events.]")}
      </div>`)}
      ${M("EXIT STATUS", P(`<span class="text-al-text">0</span>  you learned something today.<br /><span class="text-al-text">1</span>  you have a question \u2014 ask it in <a ${S}>/discord</a>.`, true))}
      ${M("SEE ALSO", P(`<a ${v("/home")}>home(1)</a>, <a ${v("/tools")}>tools(8)</a>, <a ${S}>discord(7)</a>`), true)}
      <div class="flex justify-between gap-3 py-3.5 text-[13px] text-al-muted"><span>Akademi Linux</span><span>[LAST UPDATED]</span><span>AKADEMI(1)</span></div>
    </article>
  </div>`, ve = String.raw` █████╗ ██╗  ██╗ █████╗ ██████╗ ███████╗███╗   ███╗██╗    ██╗     ██╗███╗   ██╗██╗   ██╗██╗  ██╗
██╔══██╗██║ ██╔╝██╔══██╗██╔══██╗██╔════╝████╗ ████║██║    ██║     ██║████╗  ██║██║   ██║╚██╗██╔╝
███████║█████╔╝ ███████║██║  ██║█████╗  ██╔████╔██║██║    ██║     ██║██╔██╗ ██║██║   ██║ ╚███╔╝
██╔══██║██╔═██╗ ██╔══██║██║  ██║██╔══╝  ██║╚██╔╝██║██║    ██║     ██║██║╚██╗██║██║   ██║ ██╔██╗
██║  ██║██║  ██╗██║  ██║██████╔╝███████╗██║ ╚═╝ ██║██║    ███████╗██║██║ ╚████║╚██████╔╝██╔╝ ██╗
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝     ╚═╝╚═╝    ╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝`, we = [
    {
      name: "Linux",
      img: "linux",
      alt: "Linux (Tux) logo",
      w: 43,
      h: 52,
      text: "Shell, filesystems, users and permissions, systemd, networking, troubleshooting."
    },
    {
      name: "Docker",
      img: "docker",
      alt: "Docker logo",
      w: 46,
      h: 46,
      text: "Images, containers, volumes, networking, Compose, secure builds."
    },
    {
      name: "Kubernetes",
      img: "kubernetes",
      alt: "Kubernetes logo",
      w: 52,
      h: 50,
      text: "Pods, deployments, services, storage, RBAC, cluster operations."
    },
    {
      name: "OpenStack",
      img: "openstack",
      alt: "OpenStack logo",
      w: 45,
      h: 44,
      text: "Private cloud: Keystone, Nova, Neutron, Cinder, deployment and day-2 ops."
    },
    {
      name: "Ceph",
      img: "ceph",
      alt: "Ceph logo",
      w: 49,
      h: 48,
      text: "Software-defined storage: RADOS, RBD, CephFS, RGW, cluster operations."
    }
  ], ye = [
    [
      "[01] KVM-based",
      "Real virtual machines with root access. Not a simulator."
    ],
    [
      "[02] Real scenarios",
      "Broken boots, failing pods, full disks: the incidents you'll meet on the job."
    ],
    [
      "[03] Live task checks",
      "Each task is verified against the lab's real state the moment you finish it."
    ],
    [
      "[04] AI-assisted",
      "Ask for a hint, not the answer. The assistant sees your lab and nudges you forward."
    ]
  ], ke = (e, a) => `
  <a class="card-link gap-3.5 p-[22px]" ${v("/about")}>
    <div class="flex h-[72px] w-[72px] items-center justify-center border border-al-border bg-al-elevated">
      <img src="/assets/tech/${e.img}.png" alt="${e.alt}" width="${e.w}" height="${e.h}" loading="lazy" decoding="async" />
    </div>
    <span class="eyebrow">TRACK 0${a + 1}</span>
    <span class="text-lg font-bold">${e.name}</span>
    <span class="small">${e.text}</span>
  </a>`, Ee = ([e, a]) => `
  <div class="flex flex-col gap-1.5 border border-al-border p-4">
    <span class="text-sm text-al-term">${e}</span>
    <span class="small">${a}</span>
  </div>`, F = (e, a, s) => `
  <div class="flex flex-col gap-1.5 p-5 ${s}">
    <span class="eyebrow">${e}</span>
    ${a}
  </div>`, $e = () => `
  <div class="flex flex-col gap-[72px] pt-16">
    <section aria-labelledby="hero-title" class="flex flex-col gap-7">
      <div class="text-[13px] text-al-muted">[ <span class="text-al-term">OK</span> ] Boot sequence complete \xB7 welcome, visitor</div>
      <div class="overflow-x-auto pb-1">
        <pre aria-hidden="true" class="m-0 font-mono text-[13px] leading-[14px] text-al-glow" style="text-shadow:0 0 6px rgba(74,222,128,.55),0 0 26px rgba(28,185,0,.35)">${ve}</pre>
      </div>
      <h1 id="hero-title" tabindex="-1" class="m-0 max-w-[900px] text-[clamp(28px,4vw,44px)] font-bold leading-[1.2]">Learn Linux the way it's meant to be used \u2014 <span class="glow">from the shell</span><span class="caret">\u258B</span></h1>
      <p class="m-0 max-w-[720px] text-base leading-[26px] text-al-muted">[HERO SUBLINE \u2014 one sentence on who Akademi Linux is for and what they'll get.] Every page here is a command. Press <span class="border border-al-term px-1.5 text-al-text">/</span> to start.</p>
      <div class="flex flex-wrap gap-3">
        <a class="btn-primary" ${S}>$ /discord \u2014 join the community</a>
        <a class="btn-ghost" ${v("/about")}>$ man akademi</a>
      </div>
    </section>

    <section aria-labelledby="topics-title" class="flex flex-col gap-5">
      <div class="flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="topics-title" class="section-title">## ls /courses</h2>
        <span class="text-[13px] text-al-muted">5 tracks \xB7 free to start</span>
      </div>
      <div class="auto-grid gap-4" style="--min:200px">${we.map(ke).join("")}</div>
    </section>

    <section aria-labelledby="lab-title" class="auto-grid items-start gap-8 border border-al-term p-[clamp(24px,4vw,48px)]" style="--min:340px;background:rgba(13,17,23,.92);box-shadow:0 0 32px rgba(34,197,94,.12)">
      <div class="flex flex-col gap-[22px]">
        <span class="self-start border border-al-term px-2.5 py-1 text-[11px] tracking-[0.14em] text-al-glow">LAB ENGINE</span>
        <h2 id="lab-title" class="glow m-0 text-[clamp(26px,3vw,34px)] font-bold leading-[1.2]">Aklin Lab Engine</h2>
        <p class="m-0 text-base leading-[26px]">Hands-on learning on real machines. Aklin builds a fresh KVM lab for every scenario, checks your work live as you complete each task, and gives you an AI assistant when you're stuck.</p>
        <div class="auto-grid gap-3.5" style="--min:220px">${ye.map(Ee).join("")}</div>
        <a class="btn-primary self-start" ${S}>$ aklin lab start</a>
      </div>
      <div role="group" aria-label="Example Aklin lab session" class="min-w-0 border border-al-border bg-al-bg text-[13px] leading-[22px]">
        <div class="flex flex-wrap justify-between gap-2 border-b border-al-border px-4 py-2.5 text-xs text-al-muted"><span>aklin \xB7 lab: k8s-troubleshoot-01</span><span><span class="text-al-term">\u25CF</span> 3 VMs running</span></div>
        <div class="flex flex-col gap-1 border-b border-al-border p-4">
          <div class="eyebrow mb-1">TASKS</div>
          <div><span class="text-al-term">[\u2714]</span> Find why the web pod is in CrashLoopBackOff</div>
          <div><span class="text-al-term">[\u2714]</span> Fix the ConfigMap and roll out the deployment</div>
          <div class="text-al-glow"><span class="animate-caret">[\u25B8]</span> Expose the service on NodePort 30080</div>
          <div class="text-al-muted">[ ] Confirm the app answers on worker-2</div>
        </div>
        <div class="overflow-x-auto border-b border-al-border p-4 text-al-muted">
          <div class="whitespace-pre"><span class="text-al-term">student@cp-1</span>:~$ <span class="text-al-text">kubectl get pods -n shop</span></div>
          <div class="whitespace-pre">NAME                   READY   STATUS    RESTARTS</div>
          <div class="whitespace-pre">web-7c9f8d6b5-x2kqp    1/1     <span class="text-al-term">Running</span>   3</div>
          <div class="whitespace-pre"><span class="text-al-info">aklin</span> \u2714 check passed: deployment/web healthy</div>
        </div>
        <div class="flex gap-3 p-4">
          <span class="h-[18px] shrink-0 bg-al-glow px-1.5 text-[11px] font-bold leading-[18px] text-al-bg">AI</span>
          <span>Hint: a Service picks pods by label. Compare the selector with the labels on your pods.</span>
        </div>
      </div>
    </section>

    <section aria-labelledby="mentors-title" class="flex flex-col gap-5">
      <div class="flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="mentors-title" class="section-title">## who -m  <span class="text-sm font-normal text-al-muted">\xB7 mentors</span></h2>
        <span class="text-[13px] text-al-muted">1 mentor online</span>
      </div>
      <div class="auto-grid gap-4" style="--min:300px">
        <article class="panel flex flex-wrap items-start gap-5 p-6">
          <div role="img" aria-label="Photo of Aji Arya (placeholder)" class="flex h-24 w-24 shrink-0 items-center justify-center border border-al-term bg-al-elevated text-[30px] font-bold text-al-glow" style="text-shadow:0 0 6px rgba(74,222,128,.6);box-shadow:0 0 18px rgba(34,197,94,.2)">AA</div>
          <div class="flex min-w-[200px] flex-1 flex-col gap-2">
            <span class="eyebrow">uid=1000 \xB7 FOUNDER &amp; MENTOR</span>
            <h3 class="m-0 text-xl font-bold">Aji Arya</h3>
            <p class="small m-0">[SHORT BIO: current role, years in infrastructure, what you love teaching.]</p>
            <div class="flex flex-wrap gap-1.5 text-xs">
              <span class="border border-al-border px-2 py-[3px]">[EXPERTISE 1]</span>
              <span class="border border-al-border px-2 py-[3px]">[EXPERTISE 2]</span>
              <span class="border border-al-border px-2 py-[3px]">[EXPERTISE 3]</span>
            </div>
            <div class="mt-1 flex flex-wrap gap-3.5 text-[13px]"><a class="touch-link" href="${Q}" target="_blank" rel="noopener">YouTube \u2197</a><a class="touch-link" href="${ae}" target="_blank" rel="noopener">LinkedIn \u2197</a></div>
          </div>
        </article>
        <a href="${R}" target="_blank" rel="noopener" class="flex min-h-36 flex-col justify-center gap-2 border border-dashed border-al-border p-6 no-underline">
          <span class="text-lg text-al-term">[ + ] useradd mentor</span>
          <span class="small">Work in infrastructure and want to teach? Join us as a mentor. Say hi in Discord.</span>
        </a>
      </div>
    </section>

    <section aria-labelledby="qs-title" class="flex flex-col gap-5">
      <h2 id="qs-title" class="section-title">## quick-start</h2>
      <div class="auto-grid gap-4" style="--min:240px">
        <a class="card-link min-h-[120px] gap-2.5 p-[22px]" ${v("/about")}><span class="eyebrow">[1] ROUTE</span><span class="text-lg text-al-term">/about</span><span class="small">Mission, programs and who runs this \u2014 as a man page.</span></a>
        <a class="card-link min-h-[120px] gap-2.5 p-[22px]" ${v("/tools")}><span class="eyebrow">[2] ROUTE</span><span class="text-lg text-al-term">/tools</span><span class="small">Utilities for learners. <span class="text-al-warn">[MODULE_OFFLINE]</span></span></a>
        <a class="card-link min-h-[120px] gap-2.5 !border-al-term p-[22px]" style="box-shadow:0 0 18px rgba(34,197,94,.15)" ${S}><span class="eyebrow">[3] EXTERNAL</span><span class="text-lg text-al-glow">/discord \u2197</span><span class="small">Ask questions, share setups, find study buddies.</span></a>
        <div class="flex min-h-[120px] flex-col gap-2.5 border border-dashed border-al-border p-[22px]"><span class="eyebrow">[?] BUILTIN</span><span class="text-lg text-al-term">/help</span><span class="small">Lists every command. Press / then type help.</span></div>
      </div>
    </section>

    <section class="auto-grid gap-6" style="--min:320px">
      <div class="panel min-w-0">
        <div class="flex justify-between gap-3 border-b border-al-border px-4 py-2.5 text-xs text-al-muted"><span>journalctl -u akademi --follow</span><span class="flex items-center gap-1.5" aria-hidden="true"><span class="h-2.5 w-2.5 rounded-full border border-al-border"></span><span class="h-2.5 w-2.5 rounded-full border border-al-border"></span><span class="h-2.5 w-2.5 rounded-full bg-al-term"></span></span></div>
        <div class="px-5 py-[18px] text-[13px] leading-6 text-al-muted">
          <div>[ 0.0012 ] kernel: akademi-linux <span class="text-al-text">v[VERSION]</span> booting</div>
          <div>[ <span class="text-al-term">OK</span> ] Started community.service</div>
          <div>[ <span class="text-al-term">OK</span> ] Mounted /dev/discord \u2192 <span class="text-al-text">[MEMBER COUNT] members</span></div>
          <div>[ <span class="text-al-term">OK</span> ] Reached target learning.target</div>
          <div>[ <span class="text-al-warn">WARN</span> ] tools.service: module offline (coming soon)</div>
          <div>[ <span class="text-al-info">INFO</span> ] Next event: [EVENT NAME \xB7 DATE]</div>
          <div class="caret" aria-hidden="true">\u258B</div>
        </div>
      </div>
      <div class="panel flex min-w-0 flex-col">
        <div class="border-b border-al-border px-4 py-2.5 text-xs text-al-muted">systemctl status</div>
        <div class="grid flex-1 grid-cols-2">
          ${F("COMMUNITY", '<span class="text-[22px] text-al-term">\u25CF active</span>', "border-b border-r border-al-border")}
          ${F("ABOUT", '<span class="text-[22px] text-al-term">\u25CF active</span>', "border-b border-al-border")}
          ${F("TOOLS", '<span class="text-[22px] text-al-warn">\u25CB offline</span>', "border-r border-al-border")}
          ${F("UPTIME", '<span id="uptime" class="text-[22px] text-al-text">00:00:00</span>', "")}
        </div>
      </div>
    </section>
  </div>`, Le = () => `
  <div class="flex flex-col items-start gap-7 pt-16">
    <div class="text-[13px] text-al-muted">[ <span class="text-al-error">FAIL</span> ] Could not resolve route</div>
    <h1 tabindex="-1" class="m-0 text-[clamp(28px,4vw,40px)] font-bold leading-[1.2]">bash: No such file or directory</h1>
    <a class="btn-ghost" ${v("/home")}>$ cd ~</a>
  </div>`, Ae = String.raw` ██████╗ ███████╗███████╗██╗     ██╗███╗   ██╗███████╗
██╔═══██╗██╔════╝██╔════╝██║     ██║████╗  ██║██╔════╝
██║   ██║█████╗  █████╗  ██║     ██║██╔██╗ ██║█████╗
██║   ██║██╔══╝  ██╔══╝  ██║     ██║██║╚██╗██║██╔══╝
╚██████╔╝██║     ██║     ███████╗██║██║ ╚████║███████╗
 ╚═════╝ ╚═╝     ╚═╝     ╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝`, G = (e) => `
  <tr class="border-t border-al-border text-al-muted">
    <td class="px-4 py-3 text-al-text">${e}</td>
    <td class="px-4 py-3 text-al-warn">[LOCKED]</td>
    <td class="px-4 py-3">[what it does]</td>
  </tr>`, Se = () => `
  <div class="flex flex-col gap-10 pt-16">
    <div class="flex flex-col gap-1.5 text-[13px] leading-[22px] text-al-muted">
      <div class="text-al-text">visitor@akademi:~$ sudo modprobe akademi-tools</div>
      <div>[ <span class="text-al-term">OK</span> ] Checking dependencies</div>
      <div>[ <span class="text-al-term">OK</span> ] Verifying signatures</div>
      <div>[ <span class="text-al-warn">WARN</span> ] akademi-tools.ko: module is still being compiled</div>
      <div>[ <span class="text-al-error">FAIL</span> ] Could not load module \u2014 status: <span class="text-al-warn">MODULE_OFFLINE</span></div>
    </div>

    <section aria-labelledby="tools-title" class="flex flex-col items-start gap-7 border border-al-border p-[clamp(24px,5vw,56px)]" style="background:rgba(13,17,23,.92)">
      <div class="max-w-full overflow-x-auto">
        <pre aria-hidden="true" class="m-0 font-mono text-sm leading-[15px] text-al-warn" style="text-shadow:0 0 8px rgba(245,158,11,.4)">${Ae}</pre>
      </div>
      <h1 id="tools-title" tabindex="-1" class="m-0 text-[clamp(28px,4vw,40px)] font-bold leading-[1.2]">/tools is initializing</h1>
      <span role="status" class="inline-flex animate-offline items-center gap-2.5 border border-al-warn px-4 py-2.5 text-[13px] tracking-[0.12em] text-al-warn"><span class="h-2 w-2 shrink-0 rounded-full bg-al-warn"></span>COMING SOON [MODULE_OFFLINE]</span>
      <p class="m-0 max-w-[640px] text-[15px] leading-[25px] text-al-muted">[ONE SENTENCE on what the tools will help learners do.] Want to know when it ships, or help build it? Ask in Discord.</p>
      <div class="flex w-full max-w-[640px] flex-col gap-2">
        <div class="flex justify-between text-xs text-al-muted"><span>make modules</span><span>building\u2026</span></div>
        <div class="h-3 border border-al-border" aria-hidden="true"><div class="h-full w-[38%] animate-load" style="background:repeating-linear-gradient(90deg,#f59e0b 0 6px,transparent 6px 9px)"></div></div>
      </div>
      <div class="flex flex-wrap gap-3">
        <a class="btn-primary" ${S}>$ /discord \u2014 get notified</a>
        <a class="btn-ghost" ${v("/home")}>$ cd ~</a>
      </div>
    </section>

    <section aria-labelledby="mods-title" class="flex flex-col gap-4">
      <h2 id="mods-title" class="m-0 text-base font-bold text-al-muted">lsmod | grep akademi</h2>
      <div class="overflow-x-auto border border-al-border text-[13px]">
        <table class="w-full min-w-[480px] border-collapse text-left">
          <thead><tr class="text-[11px] tracking-[0.1em] text-al-muted"><th scope="col" class="px-4 py-2.5 font-normal">MODULE</th><th scope="col" class="px-4 py-2.5 font-normal">STATE</th><th scope="col" class="px-4 py-2.5 font-normal">NOTE</th></tr></thead>
          <tbody>${G("[TOOL_01]")}${G("[TOOL_02]")}${G("[TOOL_03]")}</tbody>
        </table>
      </div>
    </section>
  </div>`, le = {
    home: $e,
    about: ge,
    tools: Se,
    notfound: Le
  }, oe = (e) => e === "home" ? fe() : "", Te = (e) => `
  ${ne(e)}
  <main id="view" tabindex="-1" class="relative mx-auto w-full max-w-[1280px] flex-1 px-6 pb-[120px]">${le[e]()}</main>
  <div id="footer">${oe(e)}</div>`, ee = [
    [
      "DNS resolve     discord.gg",
      "+180ms"
    ],
    [
      "TLS handshake",
      "+360ms"
    ],
    [
      "Invite token    [DISCORD_INVITE]",
      "+540ms"
    ]
  ], Ie = 180;
  let U = null;
  function X() {
    U == null ? void 0 : U.remove(), U = null;
  }
  function C(e, a) {
    const s = document.createElement("div");
    return s.className = "whitespace-pre-wrap", s.innerHTML = e, a.append(s), s;
  }
  function Oe(e) {
    const a = window.open(R, "_blank");
    a && (a.opener = null), X();
    const s = document.createElement("div");
    s.className = "gateway", s.setAttribute("role", "status");
    const i = s;
    U = s;
    const n = document.createElement("button");
    n.type = "button", n.className = "prompt-esc float-right", n.textContent = "close", n.setAttribute("aria-label", "Close Discord log"), n.addEventListener("click", X), s.append(n), C('<span class="text-al-text">visitor@akademi:~$ /discord</span>', s), C('<span class="text-al-glow text-glow-sm">CONNECTING TO DISCORD GATEWAY...</span>', s), document.body.append(s);
    const o = () => {
      var _a;
      if (U !== i) return;
      const m = `<a href="${R}" target="_blank" rel="noopener">open the invite \u2197</a>`;
      a ? (C('<span class="text-al-text">Opening community invite in new tab \u25B8</span>', s), C(`Not opened? \u2192 ${m}`, s)) : (C(`<span class="text-al-text">Popup blocked \u2192</span> ${m}`, s), (_a = s.querySelector("a")) == null ? void 0 : _a.focus());
    }, b = e ? 0 : Ie;
    ee.forEach(([m, w], u) => {
      const x = () => {
        U === i && (C(`[ <span class="text-al-term">OK</span> ] ${m}  <span class="text-al-muted">${w}</span>`, s), u === ee.length - 1 && o());
      };
      b === 0 ? x() : window.setTimeout(x, b * (u + 1));
    });
  }
  const Ne = "modulepreload", Me = function(e) {
    return "/" + e;
  }, te = {}, Ce = function(a, s, i) {
    let n = Promise.resolve();
    if (s && s.length > 0) {
      let b = function(u) {
        return Promise.all(u.map((x) => Promise.resolve(x).then((f) => ({
          status: "fulfilled",
          value: f
        }), (f) => ({
          status: "rejected",
          reason: f
        }))));
      };
      document.getElementsByTagName("link");
      const m = document.querySelector("meta[property=csp-nonce]"), w = (m == null ? void 0 : m.nonce) || (m == null ? void 0 : m.getAttribute("nonce"));
      n = b(s.map((u) => {
        if (u = Me(u), u in te) return;
        te[u] = true;
        const x = u.endsWith(".css"), f = x ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${u}"]${f}`)) return;
        const r = document.createElement("link");
        if (r.rel = x ? "stylesheet" : Ne, x || (r.as = "script"), r.crossOrigin = "", r.href = u, w && r.setAttribute("nonce", w), document.head.appendChild(r), x) return new Promise((I, L) => {
          r.addEventListener("load", I), r.addEventListener("error", () => L(new Error(`Unable to preload CSS for ${u}`)));
        });
      }));
    }
    function o(b) {
      const m = new Event("vite:preloadError", {
        cancelable: true
      });
      if (m.payload = b, window.dispatchEvent(m), !m.defaultPrevented) throw b;
    }
    return n.then((b) => {
      for (const m of b || []) m.status === "rejected" && o(m.reason);
      return a().catch(o);
    });
  };
  let V = null, z = null;
  const N = () => V;
  function Z() {
    return z ?? (z = Ce(() => import("./shell-zQ8sn7RX.js").then(async (m) => {
      await m.__tla;
      return m;
    }), []).then((e) => (V = new e.Shell(), V)).catch((e) => {
      throw z = null, e;
    })), z;
  }
  const A = (e) => document.getElementById(e);
  function Re(e, a) {
    const s = A("prompt"), i = A("scrim"), n = A("cmd"), o = A("ghost"), b = A("suggest-box"), m = A("suggest"), w = A("prompt-msg"), u = A("hint");
    let x = false, f = 0, r = [], I = null;
    const L = () => r[f];
    function E() {
      const t = N();
      if (!t) return;
      const d = t.suggest(n.value);
      r = d.map((p) => p.name), f = Math.min(f, Math.max(r.length - 1, 0)), m.replaceChildren(...d.map((p, h) => {
        const y = document.createElement("li");
        y.id = `opt-${h}`, y.setAttribute("role", "option"), y.setAttribute("aria-selected", String(h === f)), y.dataset.cmd = p.name;
        const k = document.createElement("span");
        k.textContent = p.name;
        const j = document.createElement("small");
        return j.textContent = p.tag, j.className = p.tag === "[MODULE_OFFLINE]" ? "text-[11.5px] text-al-warn" : "text-[11.5px]", y.append(k, j), y;
      })), b.hidden = r.length === 0, n.setAttribute("aria-expanded", String(r.length > 0)), r.length > 0 ? n.setAttribute("aria-activedescendant", `opt-${f}`) : n.removeAttribute("aria-activedescendant"), o.textContent = t.ghost(n.value, L()) ?? "";
    }
    function _(t, d) {
      const p = document.createElement("span");
      p.className = d, p.textContent = t, w.replaceChildren(p);
    }
    function D() {
      if (x) return;
      const t = N();
      if (!(t && !t.open_prompt())) {
        if (x = true, I = document.activeElement instanceof HTMLElement ? document.activeElement : null, s.classList.add("is-on"), i.classList.add("is-on"), u.classList.add("is-hidden"), n.value = "/", w.replaceChildren(), f = 0, e.pause(), n.focus(), n.setSelectionRange(1, 1), t) {
          E();
          return;
        }
        b.hidden = true, Z().then((d) => {
          x && (d.open_prompt(), E());
        }).catch(() => {
          x && _("Command shell failed to load. Use the links on the page instead.", "text-al-error");
        });
      }
    }
    function T(t = true) {
      var _a;
      x && (x = false, (_a = N()) == null ? void 0 : _a.close_prompt(), s.classList.remove("is-on"), i.classList.remove("is-on"), u.classList.remove("is-hidden"), e.resume(), n.blur(), t && (I == null ? void 0 : I.focus()));
    }
    function l(t, d) {
      const p = t.trim(), h = a.run(p, p.length > 1 ? d : void 0);
      if (!h.stayOpen) return T(false);
      h.error && _(h.error, "text-al-error"), h.info && (n.value = "/", f = 0, E(), _(h.info, "text-al-muted"));
    }
    document.addEventListener("keydown", (t) => {
      const d = t.target, p = d.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(d.tagName);
      t.key === "/" && !x && !p && !t.ctrlKey && !t.metaKey && !t.altKey ? (t.preventDefault(), D()) : t.key === "Escape" && x && (t.preventDefault(), T());
    }), n.addEventListener("input", () => {
      n.value && !n.value.startsWith("/") && (n.value = `/${n.value}`), f = 0, w.replaceChildren(), E();
    }), n.addEventListener("keydown", (t) => {
      const d = N(), p = r.length;
      if (t.key === "ArrowDown" || t.key === "ArrowUp") {
        if (t.preventDefault(), !p) return;
        f = (f + (t.key === "ArrowDown" ? 1 : p - 1)) % p, E();
      } else if (t.key === "Tab") t.preventDefault(), L() && (n.value = L(), E());
      else if (t.key === "Enter") t.preventDefault(), l(n.value, L());
      else if (t.ctrlKey && (t.key === "p" || t.key === "n") && d) {
        t.preventDefault();
        const h = t.key === "p" ? d.history_prev() : d.history_next();
        if (h === void 0 && t.key === "p") return;
        n.value = h ?? "/", f = 0, E();
      }
    }), s.addEventListener("focusout", (t) => {
      x && !s.contains(t.relatedTarget) && window.setTimeout(() => {
        x && n.focus();
      });
    }), m.addEventListener("mousedown", (t) => {
      const d = t.target.closest("li");
      (d == null ? void 0 : d.dataset.cmd) && (t.preventDefault(), l(d.dataset.cmd, void 0));
    }), i.addEventListener("click", () => T()), A("esc").addEventListener("click", () => T()), u.addEventListener("click", () => D());
    let c;
    const $ = () => {
      u.classList.remove("is-dim"), window.clearTimeout(c), c = window.setTimeout(() => u.classList.add("is-dim"), 6e3);
    };
    for (const t of [
      "pointermove",
      "keydown",
      "scroll"
    ]) window.addEventListener(t, $, {
      passive: true
    });
    return $(), window.matchMedia("(pointer: coarse)").matches && (u.innerHTML = "Tap <kbd>&gt;_</kbd> for commands"), {
      close: T
    };
  }
  const re = window.matchMedia("(prefers-reduced-motion: reduce)").matches, _e = document.getElementById("app"), De = document.getElementById("announce"), Pe = ue(document.getElementById("bg"), re);
  let B = document.body.dataset.route, J = false;
  function Ue(e) {
    var _a;
    B = e, document.body.dataset.route = e, document.title = se[e], document.getElementById("header").outerHTML = ne(e), document.getElementById("view").innerHTML = le[e](), document.getElementById("footer").innerHTML = oe(e), window.scrollTo(0, 0), (_a = document.querySelector("#view h1")) == null ? void 0 : _a.focus({
      preventScroll: true
    }), De.textContent = `Navigated to ${e === "notfound" ? "page not found" : e}`;
  }
  async function ie(e, a, s, i, n) {
    const o = e.route_for_path(a);
    o === B || !e.begin_transition() || (X(), n && window.history.pushState({}, "", a), Ue(o), e.end_transition(), J && (J = false, de(e)));
  }
  function de(e) {
    const a = window.location.pathname, s = e.route_for_path(a);
    ie(e, a, `/${s}`, e.log_for_route(s), false);
  }
  function ce(e, a, s) {
    const i = e.execute(a, s);
    switch (i.kind) {
      case "route":
        return ie(e, i.path, i.command, i.log, true), {
          stayOpen: false
        };
      case "external":
        return Oe(re), {
          stayOpen: false
        };
      case "help":
        return {
          stayOpen: true,
          info: `available: ${e.command_list()}`
        };
      case "not_found":
        return {
          stayOpen: true,
          error: `bash: ${i.command}: command not found \u2014 try /help`
        };
      default:
        return {
          stayOpen: true
        };
    }
  }
  const Ke = Re(Pe, {
    run(e, a) {
      const s = N();
      return s ? ce(s, e, a) : {
        stayOpen: true
      };
    }
  });
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-cmd]"), s = N();
    !(a == null ? void 0 : a.dataset.cmd) || !s || e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || (e.preventDefault(), ce(s, a.dataset.cmd, void 0));
  });
  window.addEventListener("popstate", () => {
    const e = N();
    e && (Ke.close(false), e.is_transitioning() ? J = true : de(e));
  });
  function Fe() {
    const e = Date.now(), a = (s) => String(s).padStart(2, "0");
    window.setInterval(() => {
      const s = document.getElementById("uptime");
      if (!s) return;
      const i = Math.floor((Date.now() - e) / 1e3);
      s.textContent = `${a(Math.floor(i / 3600))}:${a(Math.floor(i / 60) % 60)}:${a(i % 60)}`;
    }, 1e3);
  }
  async function Be() {
    if (B) return;
    const a = (await Z()).route_for_path(window.location.pathname);
    B = a, document.body.dataset.route = a, document.title = se[a], _e.innerHTML = Te(a);
  }
  function je() {
    const e = () => void Z().catch(() => {
    });
    "requestIdleCallback" in window ? window.requestIdleCallback(e, {
      timeout: 3e3
    }) : setTimeout(e, 1500);
  }
  Be();
  Fe();
  je();
})();
