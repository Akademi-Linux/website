(async () => {
  (function() {
    const a = document.createElement("link").relList;
    if (a && a.supports && a.supports("modulepreload")) return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]')) d(s);
    new MutationObserver((s) => {
      for (const r of s) if (r.type === "childList") for (const g of r.addedNodes) g.tagName === "LINK" && g.rel === "modulepreload" && d(g);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function t(s) {
      const r = {};
      return s.integrity && (r.integrity = s.integrity), s.referrerPolicy && (r.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? r.credentials = "include" : s.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r;
    }
    function d(s) {
      if (s.ep) return;
      s.ep = true;
      const r = t(s);
      fetch(s.href, r);
    }
  })();
  const b = Math.random, fe = 900, he = 1.5, ge = 160;
  function H(e) {
    const a = document.createElement("canvas");
    a.width = a.height = 32;
    const t = a.getContext("2d");
    if (t) {
      const d = t.createRadialGradient(16, 16, 0, 16, 16, 16);
      e.forEach(([s, r]) => d.addColorStop(s, r)), t.fillStyle = d, t.fillRect(0, 0, 32, 32);
    }
    return a;
  }
  function be(e, a) {
    const t = e.getContext("2d");
    if (!t) return {
      pause() {
      },
      resume() {
      }
    };
    const d = [
      H([
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
      H([
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
      H([
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
    let s = 0, r = 0, g = [], x = [], k = false, f = performance.now(), u = 0, h = 2.5;
    const i = {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0
    };
    function O(l) {
      l.clearRect(0, 0, s, r), l.globalCompositeOperation = "lighter";
      const m = (i.x - s / 2) * -0.014, $ = (i.y - r / 2) * -0.014;
      for (const o of g) {
        const n = 0.5 + 0.5 * Math.sin(u * o.sp + o.ph), p = n > 0.97 && o.k === 0 ? 1.6 : 1, c = o.r * (5 + 3 * n) * p;
        l.globalAlpha = o.a * (0.3 + 0.7 * n), l.drawImage(d[o.k], o.x + m * o.z - c / 2, o.y + $ * o.z - c / 2, c, c);
      }
      for (const o of x) {
        const n = Math.sin(Math.PI * o.life / o.max), p = Math.hypot(o.vx, o.vy), c = o.x - o.vx / p * o.len, v = o.y - o.vy / p * o.len;
        l.globalAlpha = 1, l.lineCap = "round";
        let w = l.createLinearGradient(c, v, o.x, o.y);
        w.addColorStop(0, "rgba(28,185,0,0)"), w.addColorStop(1, `rgba(74,222,128,${0.22 * n})`), l.strokeStyle = w, l.lineWidth = 6, l.beginPath(), l.moveTo(c, v), l.lineTo(o.x, o.y), l.stroke(), w = l.createLinearGradient(c, v, o.x, o.y), w.addColorStop(0, "rgba(28,185,0,0)"), w.addColorStop(0.7, `rgba(74,222,128,${0.45 * n})`), w.addColorStop(1, `rgba(230,255,230,${n})`), l.strokeStyle = w, l.lineWidth = 1.6, l.beginPath(), l.moveTo(c, v), l.lineTo(o.x, o.y), l.stroke(), l.globalAlpha = n, l.drawImage(d[0], o.x - 9, o.y - 9, 18, 18);
      }
      l.globalAlpha = 1, l.globalCompositeOperation = "source-over";
    }
    function L(l) {
      const m = Math.min(window.devicePixelRatio || 1, he);
      s = window.innerWidth, r = window.innerHeight, e.width = s * m, e.height = r * m, l.setTransform(m, 0, 0, m, 0, 0), i.x = i.tx = s / 2, i.y = i.ty = r / 2;
      const $ = Math.round(Math.min(fe, s * r / 1600));
      g = Array.from({
        length: $
      }, () => {
        const o = b() < 0.1 ? 0 : b() < 0.55 ? 1 : 2;
        return {
          x: b() * s,
          y: b() * r,
          z: b(),
          r: 0.35 + b() ** 3 * 1.5 + (o === 0 ? 0.4 : 0),
          a: 0.25 + b() * 0.6,
          sp: 0.3 + b() * 1.8,
          ph: b() * 6.283,
          k: o
        };
      }), a && O(l);
    }
    function E(l, m) {
      if (a) return;
      const $ = b() < 0.5 ? 1 : -1, o = (16 + b() * 24) * Math.PI / 180, n = 13 + b() * 9;
      x.push({
        x: l ?? s * (0.1 + b() * 0.8),
        y: m ?? r * b() * 0.45,
        vx: Math.cos(o) * n * $,
        vy: Math.sin(o) * n,
        len: 110 + b() * 170,
        life: 0,
        max: 40 + b() * 30
      });
    }
    function D(l) {
      u += l / 60, h -= l / 60, h <= 0 && (E(), h = b() < 0.18 ? 0.3 + b() * 0.5 : 3.5 + b() * 6);
      for (const m of x) m.x += m.vx * l, m.y += m.vy * l, m.life += l;
      x = x.filter((m) => m.life < m.max), i.x += (i.tx - i.x) * 0.04, i.y += (i.ty - i.y) * 0.04;
    }
    function P(l, m) {
      requestAnimationFrame((o) => P(l, o));
      const $ = Math.min(3, (m - f) / 16.67);
      f = m, !(k || document.hidden) && (D($), O(l));
    }
    let S;
    return window.addEventListener("resize", () => {
      window.innerWidth === s && Math.abs(window.innerHeight - r) < ge || (window.clearTimeout(S), S = window.setTimeout(() => L(t), 150));
    }), window.addEventListener("pointermove", (l) => {
      i.tx = l.clientX, i.ty = l.clientY;
    }, {
      passive: true
    }), document.addEventListener("pointerleave", () => {
      i.tx = s / 2, i.ty = r / 2;
    }), window.addEventListener("pointerdown", (l) => {
      var _a;
      ((_a = l.target) == null ? void 0 : _a.closest("a, button, input, label, .prompt, .gateway")) || E(l.clientX, l.clientY);
    }), L(t), a || requestAnimationFrame((l) => P(t, l)), {
      pause() {
        k = true;
      },
      resume() {
        k = false;
      }
    };
  }
  const R = "https://discord.com/", ee = "https://www.youtube.com/", le = "https://www.linkedin.com/", oe = {
    home: "Akademi Linux",
    about: "Akademi Linux \u2014 /about",
    tools: "Akademi Linux \u2014 /tools",
    notfound: "Akademi Linux \u2014 not found"
  }, y = (e) => `href="${e === "/home" ? "/" : e}" data-cmd="${e}"`, T = `href="${R}" target="_blank" rel="noopener" data-cmd="/discord"`, I = '<span aria-hidden="true" class="icon-[lucide--arrow-up-right] ml-[.2em] align-[-.125em]"></span>', q = (e, a, t) => `<a href="${e}" target="_blank" rel="noopener" aria-label="${a}" class="flex h-11 w-11 items-center justify-center text-[22px] text-al-bg hover:text-al-bg"><span aria-hidden="true" class="${t}"></span></a>`, ve = () => `
  <footer class="relative mt-6">
    <img src="/assets/art/footer-art.svg" width="1440" height="600" loading="lazy" decoding="async" alt="Engraved illustration: a temple whose columns are server racks with the Akademi Linux mark in its pediment, a satellite, a dish and power lines, overgrown with ferns that dissolve into the green footer" class="-mb-0.5 block h-auto w-full" />
    <div class="bg-al-brand text-al-bg">
      <div class="mx-auto flex max-w-[1280px] flex-col gap-10 px-4 pt-2 sm:px-6 md:gap-14">
        <div class="flex flex-wrap items-end justify-between gap-5 md:gap-8">
          <img src="/assets/brand/logo_primary-mono-dark.svg" alt="Akademi Linux" width="300" height="111" loading="lazy" class="h-20 w-[216px] max-w-full object-contain object-left sm:h-[111px] sm:w-[300px]" />
          <p class="m-0 max-w-[420px] text-[15px] font-medium leading-6">Open knowledge. Fair membership. Real infrastructure careers.</p>
        </div>

        <div class="grid-2-4 items-start !gap-8 md:!gap-10">
          <div class="flex flex-col gap-3">
            <span class="footer-tag">COMMUNITY</span>
            <p class="m-0 text-sm leading-[22px]">Free tutorials on YouTube.<br />Daily troubleshooting on Discord.</p>
          </div>
          <nav aria-label="Footer" class="flex flex-col text-sm font-medium">
            <span class="footer-tag mb-2.5">$ ls /</span>
            <a class="footer-link" ${y("/home")}>/home</a>
            <a class="footer-link" ${y("/about")}>/about</a>
            <a class="footer-link" ${y("/tools")}>/tools</a>
            <a class="footer-link" ${T}>/discord${I}</a>
          </nav>
          <div class="flex flex-col gap-3">
            <span class="footer-tag">ENTERPRISE TRAINING</span>
            <p class="m-0 text-sm leading-[22px]">We come to your office and train your team on-site.<br /><a href="mailto:[TRAINING EMAIL]" class="touch-link-coarse font-bold text-al-bg hover:text-al-bg">[TRAINING EMAIL]</a></p>
          </div>
          <div class="flex flex-col gap-3">
            <span class="text-sm font-bold">Socials:</span>
            <div class="flex gap-2">
              ${q(R, "Akademi Linux on Discord", "icon-[simple-icons--discord]")}
              ${q(ee, "Akademi Linux on YouTube", "icon-[simple-icons--youtube]")}
              ${q(le, "Akademi Linux on LinkedIn", "icon-[simple-icons--linkedin]")}
            </div>
          </div>
        </div>

        <div class="footer-end flex flex-col gap-2 pt-[18px] text-xs leading-[18px]" style="border-top:1.5px solid #0a0a0a">
          <div class="flex flex-wrap justify-between gap-3 font-bold"><span>Akademi Linux \xB7 \xA9 All rights reserved 2026</span><span>exit 0</span></div>
          <p class="m-0 text-xs leading-[18px] sm:text-[11px] sm:leading-[17px]">Linux\xAE is the registered trademark of Linus Torvalds. Docker, Kubernetes, OpenStack and Ceph logos are trademarks of their respective owners, shown to identify course topics.</p>
        </div>
      </div>
    </div>
  </footer>`, we = {
    home: '<span class="h-2 w-2 rounded-full bg-al-term shadow-[0_0_8px_#22c55e]"></span>SYSTEM ONLINE<span class="hidden sm:inline"> \xB7 tty1</span>',
    about: 'AKADEMI(1)<span class="hidden sm:inline"> \xB7 User Commands</span>',
    tools: '<span class="h-2 w-2 rounded-full bg-al-warn shadow-[0_0_8px_#f59e0b]"></span>DEGRADED<span class="hidden sm:inline"> \xB7 1 module offline</span>',
    notfound: '<span class="h-2 w-2 rounded-full bg-al-term shadow-[0_0_8px_#22c55e]"></span>SYSTEM ONLINE<span class="hidden sm:inline"> \xB7 tty1</span>'
  }, Y = (e, a) => {
    const t = e === `/${a}` ? ' aria-current="page"' : "";
    return `<a class="nav-link" ${y(e)}${t}>${e}</a>`;
  }, re = (e) => `
  <header id="header" class="relative border-b border-al-border bg-al-bg/80">
    <div class="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-6 md:py-[18px]">
      <a class="flex" ${y("/home")} aria-label="Akademi Linux home">
        <img src="/assets/brand/logo_primary-white.svg" alt="" width="119" height="44" class="h-11 w-[119px] object-contain drop-shadow-[0_0_8px_rgba(28,185,0,.4)]" />
      </a>
      <nav aria-label="Primary" class="order-3 flex w-full justify-between gap-1 whitespace-nowrap text-[13px] md:order-none md:w-auto md:gap-1.5">
        ${Y("/home", e)}
        ${Y("/about", e)}
        ${Y("/tools", e)}
        <a class="nav-link" ${T}>/discord${I}</a>
      </nav>
      <div class="flex items-center gap-2 whitespace-nowrap text-xs text-al-muted">${we[e]}</div>
    </div>
  </header>`, N = (e, a) => `<div class="flex items-baseline"><span class="inline-block w-[84px] shrink-0 text-al-term sm:w-[130px]">${e}</span><span class="min-w-0">${a}</span></div>`, B = (e, a, t, d = false) => `
  <div class="panel flex flex-col gap-2.5 p-6 ${d ? "!border-al-term" : ""}"${d ? ' style="box-shadow:0 0 20px rgba(34,197,94,.15)"' : ""}>
    <span class="text-xs tracking-[0.12em] text-al-muted lg:text-[11px]">${e}</span>
    <span class="glow text-[40px] font-bold leading-[48px]">[N]</span>
    <span class="small">${a}</span>
    ${t}
  </div>`, C = (e, a, t = false) => `
  <section class="grid gap-x-10 gap-y-4 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] border-b ${t ? "border-al-border" : "border-dashed border-al-border"}">
    <h2 class="m-0 text-base font-bold text-al-glow" style="text-shadow:0 0 4px rgba(74,222,128,.45)">${e}</h2>
    ${a}
  </section>`, U = (e, a = false) => `<p class="m-0 text-[15px] leading-[26px] ${a ? "text-al-muted" : ""}">${e}</p>`, G = (e, a) => `<div><span class="text-al-term">${e}</span><span class="block pl-8 text-al-muted">${a}</span></div>`, ye = [
    "#0a0a0a",
    "#1cb900",
    "#22c55e",
    "#4ade80",
    "#58a6ff",
    "#f59e0b",
    "#f85149",
    "#e6edf3"
  ], ke = () => `
  <div class="flex flex-col gap-10 pt-8 sm:gap-14 sm:pt-14">
    <h1 tabindex="-1" class="sr-only">About Akademi Linux</h1>
    <div class="shell-line">visitor@akademi:~$ neofetch</div>

    <section aria-label="System summary" class="panel flex flex-wrap items-center gap-6 p-5 sm:gap-12 sm:p-9">
      <img src="/assets/brand/logo_logomark-green-alphabg.svg" alt="Akademi Linux logomark" width="240" height="240" class="h-28 w-28 max-w-full sm:h-60 sm:w-60" style="filter:drop-shadow(0 0 10px rgba(28,185,0,.6)) drop-shadow(0 0 28px rgba(28,185,0,.25))" />
      <div class="flex min-w-0 flex-[1_1_min(420px,100%)] flex-col gap-1 text-[15px] leading-[27px]">
        <div><span class="font-bold text-al-glow text-glow-sm">visitor</span>@<span class="font-bold text-al-glow text-glow-sm">akademi-linux</span></div>
        <div class="overflow-hidden text-al-border" aria-hidden="true">---------------------------</div>
        ${N("OS", "Akademi Linux Community")}
        ${N("Mission", "[ONE-LINE MISSION STATEMENT]")}
        ${N("Founded", "[YEAR]")}
        ${N("Members", "[MEMBER COUNT]")}
        ${N("Language", "[e.g. Bahasa Indonesia, English]")}
        ${N("Focus", "[3 TOPICS, comma separated]")}
        ${N("Shell", `<a class="touch-link-coarse" ${T}>/discord</a>`)}
        <div class="mt-3.5 flex" aria-hidden="true">${ye.map((e, a) => `<span class="h-4 w-7${a === 0 ? " border border-al-border" : ""}" style="background:${e}"></span>`).join("")}</div>
      </div>
    </section>

    <div class="shell-line">visitor@akademi:~$ akademi --stats</div>

    <section aria-label="Akademi Linux in numbers" class="grid-2-4">
      ${B("YOUTUBE SUBSCRIBERS", "Free tutorials and walkthroughs on the channel.", `<a href="${ee}" target="_blank" rel="noopener" class="touch-link text-[13px]">Watch on YouTube${I}</a>`)}
      ${B("DISCORD MEMBERS", "Learners troubleshooting together every day.", `<a href="${R}" target="_blank" rel="noopener" class="touch-link text-[13px]">Join the server${I}</a>`)}
      ${B("WORK PLACEMENTS", "Learners placed into sysadmin, DevSecOps and cloud ops roles.", "")}
      ${B("ON-SITE / ENTERPRISE TRAINING", "Companies trained. We come to your office and teach your team on your stack.", '<a href="mailto:[TRAINING EMAIL]" class="touch-link text-[13px]">$ request --training</a>', true)}
    </section>

    <div class="shell-line">visitor@akademi:~$ man akademi</div>

    <article class="flex flex-col border-t border-al-border">
      <div class="flex justify-between gap-3 border-b border-al-border py-3.5 text-[13px] text-al-muted"><span>AKADEMI(1)</span><span class="hidden sm:inline">Akademi Linux Manual</span><span>AKADEMI(1)</span></div>
      ${C("NAME", U('akademi \u2014 [SHORT DESCRIPTION, e.g. "a community for learning Linux"]'))}
      ${C("SYNOPSIS", U('<b>akademi</b> <span class="whitespace-nowrap">[<span class="text-al-term">--learn</span>]</span> <span class="whitespace-nowrap">[<span class="text-al-term">--share</span>]</span> <span class="whitespace-nowrap">[<span class="text-al-term">--contribute</span>]</span> <span class="text-al-muted">&lt;you&gt;</span>'))}
      ${C("DESCRIPTION", U("[2\u20133 SENTENCES: what Akademi Linux is, who it serves, and how people take part. Keep it plain and specific \u2014 this is the paragraph search engines and new members read first.]"))}
      ${C("OPTIONS", `<div class="flex flex-col gap-[18px] text-[15px] leading-[26px]">
        ${G("--learn", "[What learners get \u2014 classes, guides, mentoring.]")}
        ${G("--share", "[How members share setups, notes, questions.]")}
        ${G("--contribute", "[How people give back \u2014 teaching, open-source, events.]")}
      </div>`)}
      ${C("EXIT STATUS", U(`<span class="text-al-text">0</span>  you learned something today.<br /><span class="text-al-text">1</span>  you have a question \u2014 ask it in <a ${T}>/discord</a>.`, true))}
      ${C("SEE ALSO", U(`<a class="touch-link-coarse" ${y("/home")}>home(1)</a>, <a class="touch-link-coarse" ${y("/tools")}>tools(8)</a>, <a class="touch-link-coarse" ${T}>discord(7)</a>`), true)}
      <div class="flex justify-between gap-3 py-3.5 text-[13px] text-al-muted"><span>Akademi Linux</span><span>[LAST UPDATED]</span><span class="hidden sm:inline">AKADEMI(1)</span></div>
    </article>
  </div>`, Ee = String.raw` █████╗ ██╗  ██╗ █████╗ ██████╗ ███████╗███╗   ███╗██╗    ██╗     ██╗███╗   ██╗██╗   ██╗██╗  ██╗
██╔══██╗██║ ██╔╝██╔══██╗██╔══██╗██╔════╝████╗ ████║██║    ██║     ██║████╗  ██║██║   ██║╚██╗██╔╝
███████║█████╔╝ ███████║██║  ██║█████╗  ██╔████╔██║██║    ██║     ██║██╔██╗ ██║██║   ██║ ╚███╔╝
██╔══██║██╔═██╗ ██╔══██║██║  ██║██╔══╝  ██║╚██╔╝██║██║    ██║     ██║██║╚██╗██║██║   ██║ ██╔██╗
██║  ██║██║  ██╗██║  ██║██████╔╝███████╗██║ ╚═╝ ██║██║    ███████╗██║██║ ╚████║╚██████╔╝██╔╝ ██╗
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝     ╚═╝╚═╝    ╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝`, ie = (e, a) => Ee.split(`
`).map((t) => t.slice(e, a)).join(`
`), $e = ie(0, 54), Le = ie(58), Ae = [
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
  ], Te = [
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
  ], Se = (e, a) => `
  <a class="card-link grid grid-cols-[56px_minmax(0,1fr)] gap-x-4 gap-y-1 p-4 sm:flex sm:gap-3.5 sm:p-[22px]" ${y("/about")}>
    <div class="row-span-3 flex h-14 w-14 items-center justify-center self-start border border-al-border bg-al-elevated sm:h-[72px] sm:w-[72px]">
      <img src="/assets/tech/${e.img}.png" alt="${e.alt}" width="${e.w}" height="${e.h}" loading="lazy" decoding="async" class="max-h-[72%] max-w-[72%] sm:max-h-none sm:max-w-none" />
    </div>
    <span class="eyebrow">TRACK 0${a + 1}</span>
    <span class="text-lg font-bold">${e.name}</span>
    <span class="small">${e.text}</span>
  </a>`, Ie = ([e, a]) => `
  <div class="flex flex-col gap-1.5 border border-al-border p-4">
    <span class="text-sm text-al-term">${e}</span>
    <span class="small">${a}</span>
  </div>`, F = (e, a, t) => `
  <div class="flex min-w-0 flex-col gap-1.5 p-4 sm:p-5 ${t}">
    <span class="eyebrow">${e}</span>
    ${a}
  </div>`, Oe = () => `
  <div class="flex flex-col gap-14 pt-8 md:gap-[72px] md:pt-16">
    <section aria-labelledby="hero-title" class="flex flex-col gap-7">
      <div class="text-[13px] text-al-muted">[ <span class="text-al-term">OK</span> ] Boot sequence complete \xB7 welcome, visitor</div>
      <div class="ascii" aria-hidden="true">
        <div class="ascii-banner text-al-glow" style="text-shadow:0 0 6px rgba(74,222,128,.55),0 0 26px rgba(28,185,0,.35)"><pre>${$e}</pre><pre>${Le}</pre></div>
      </div>
      <h1 id="hero-title" tabindex="-1" class="m-0 max-w-[900px] text-[clamp(28px,4vw,44px)] font-bold leading-[1.2]">Learn Linux the way it's meant to be used \u2014 <span class="glow">from the shell</span><span class="caret">\u258B</span></h1>
      <p class="m-0 max-w-[720px] text-base leading-[26px] text-al-muted">[HERO SUBLINE \u2014 one sentence on who Akademi Linux is for and what they'll get.] Every page here is a command. <span class="on-keys">Press <span class="border border-al-term px-1.5 text-al-text">/</span></span><span class="on-touch">Tap <span class="border border-al-term px-1.5 text-al-text">&gt;_</span></span> to start.</p>
      <div class="cta-row">
        <a class="btn-primary" ${T}>$ /discord \u2014 join the community</a>
        <a class="btn-ghost" ${y("/about")}>$ man akademi</a>
      </div>
    </section>

    <section aria-labelledby="topics-title" class="flex flex-col gap-5">
      <div class="flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="topics-title" class="section-title">## ls /courses</h2>
        <span class="text-[13px] text-al-muted">5 tracks \xB7 free to start</span>
      </div>
      <div class="track-grid">${Ae.map(Se).join("")}</div>
    </section>

    <section aria-labelledby="lab-title" class="auto-grid items-start gap-6 border border-al-term p-[clamp(16px,4vw,48px)] md:gap-8" style="--min:340px;background:rgba(13,17,23,.92);box-shadow:0 0 32px rgba(34,197,94,.12)">
      <div class="flex flex-col gap-[22px]">
        <span class="self-start border border-al-term px-2.5 py-1 text-xs tracking-[0.14em] text-al-glow lg:text-[11px]">LAB ENGINE</span>
        <h2 id="lab-title" class="glow m-0 text-[clamp(26px,3vw,34px)] font-bold leading-[1.2]">Aklin Lab Engine</h2>
        <p class="m-0 text-base leading-[26px]">Hands-on learning on real machines. Aklin builds a fresh KVM lab for every scenario, checks your work live as you complete each task, and gives you an AI assistant when you're stuck.</p>
        <div class="auto-grid gap-3.5" style="--min:220px">${Te.map(Ie).join("")}</div>
        <a class="btn-primary w-full sm:w-auto sm:self-start" ${T}>$ aklin lab start</a>
      </div>
      <div role="group" aria-label="Example Aklin lab session" class="min-w-0 border border-al-border bg-al-bg text-[13px] leading-[22px]">
        <div class="flex flex-wrap justify-between gap-2 border-b border-al-border px-4 py-2.5 text-xs text-al-muted"><span>aklin \xB7 lab: k8s-troubleshoot-01</span><span><span class="text-al-term">\u25CF</span> 3 VMs running</span></div>
        <div class="flex flex-col gap-1 border-b border-al-border p-3 sm:p-4">
          <div class="eyebrow mb-1">TASKS</div>
          <div><span class="text-al-term">[\u2714]</span> Find why the web pod is in CrashLoopBackOff</div>
          <div><span class="text-al-term">[\u2714]</span> Fix the ConfigMap and roll out the deployment</div>
          <div class="text-al-glow"><span class="animate-caret">[\u25B8]</span> Expose the service on NodePort 30080</div>
          <div class="text-al-muted">[ ] Confirm the app answers on worker-2</div>
        </div>
        <div tabindex="0" role="region" aria-label="Example terminal output" class="overflow-x-auto border-b border-al-border p-3 text-xs text-al-muted sm:p-4 sm:text-[13px]">
          <div class="whitespace-pre-wrap"><span class="text-al-term">student@cp-1</span>:~$ <span class="text-al-text">kubectl get pods -n shop</span></div>
          <div class="whitespace-pre">NAME                   READY   STATUS<span class="hidden sm:inline">    RESTARTS</span></div>
          <div class="whitespace-pre">web-7c9f8d6b5-x2kqp    1/1     <span class="text-al-term">Running</span><span class="hidden sm:inline">   3</span></div>
          <div class="whitespace-pre-wrap"><span class="text-al-info">aklin</span> \u2714 check passed: deployment/web healthy</div>
        </div>
        <div class="flex gap-3 p-3 sm:p-4">
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
            <div class="mt-1 flex flex-wrap gap-3.5 text-[13px]"><a class="touch-link" href="${ee}" target="_blank" rel="noopener">YouTube${I}</a><a class="touch-link" href="${le}" target="_blank" rel="noopener">LinkedIn${I}</a></div>
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
      <div class="grid-2-4">
        <a class="card-link min-h-[120px] gap-2.5 p-[22px]" ${y("/about")}><span class="eyebrow">[1] ROUTE</span><span class="text-lg text-al-term">/about</span><span class="small">Mission, programs and who runs this \u2014 as a man page.</span></a>
        <a class="card-link min-h-[120px] gap-2.5 p-[22px]" ${y("/tools")}><span class="eyebrow">[2] ROUTE</span><span class="text-lg text-al-term">/tools</span><span class="small">Utilities for learners. <span class="text-al-warn">[MODULE_OFFLINE]</span></span></a>
        <a class="card-link min-h-[120px] gap-2.5 !border-al-term p-[22px]" style="box-shadow:0 0 18px rgba(34,197,94,.15)" ${T}><span class="eyebrow">[3] EXTERNAL</span><span class="text-lg text-al-glow">/discord${I}</span><span class="small">Ask questions, share setups, find study buddies.</span></a>
        <div class="flex min-h-[120px] flex-col gap-2.5 border border-dashed border-al-border p-[22px]"><span class="eyebrow">[?] BUILTIN</span><span class="text-lg text-al-term">/help</span><span class="small">Lists every command. <span class="on-keys">Press /</span><span class="on-touch">Tap &gt;_</span> then type help.</span></div>
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
          ${F("COMMUNITY", '<span class="text-lg text-al-term sm:text-[22px]">\u25CF active</span>', "border-b border-r border-al-border")}
          ${F("ABOUT", '<span class="text-lg text-al-term sm:text-[22px]">\u25CF active</span>', "border-b border-al-border")}
          ${F("TOOLS", '<span class="text-lg text-al-warn sm:text-[22px]">\u25CB offline</span>', "border-r border-al-border")}
          ${F("UPTIME", '<span id="uptime" class="text-lg text-al-text sm:text-[22px]">--:--:--</span>', "")}
        </div>
      </div>
    </section>
  </div>`, Ne = () => `
  <div class="flex flex-col items-start gap-7 pt-8 md:pt-16">
    <div class="text-[13px] text-al-muted">[ <span class="text-al-error">FAIL</span> ] Could not resolve route</div>
    <h1 tabindex="-1" class="m-0 text-[clamp(28px,4vw,40px)] font-bold leading-[1.2]">bash: No such file or directory</h1>
    <a class="btn-ghost" ${y("/home")}>$ cd ~</a>
  </div>`, Me = String.raw` ██████╗ ███████╗███████╗██╗     ██╗███╗   ██╗███████╗
██╔═══██╗██╔════╝██╔════╝██║     ██║████╗  ██║██╔════╝
██║   ██║█████╗  █████╗  ██║     ██║██╔██╗ ██║█████╗
██║   ██║██╔══╝  ██╔══╝  ██║     ██║██║╚██╗██║██╔══╝
╚██████╔╝██║     ██║     ███████╗██║██║ ╚████║███████╗
 ╚═════╝ ╚═╝     ╚═╝     ╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝`, X = (e) => `
  <tr class="border-t border-al-border text-al-muted">
    <td class="px-3 py-3 text-al-text sm:px-4">${e}</td>
    <td class="px-3 py-3 text-al-warn sm:px-4">[LOCKED]</td>
    <td class="px-3 py-3 sm:px-4">[what it does]</td>
  </tr>`, Ce = () => `
  <div class="flex flex-col gap-8 pt-8 md:gap-10 md:pt-16">
    <div class="flex flex-col gap-1.5 text-[13px] leading-[22px] text-al-muted">
      <div class="text-al-text">visitor@akademi:~$ sudo modprobe akademi-tools</div>
      <div>[ <span class="text-al-term">OK</span> ] Checking dependencies</div>
      <div>[ <span class="text-al-term">OK</span> ] Verifying signatures</div>
      <div>[ <span class="text-al-warn">WARN</span> ] akademi-tools.ko: module is still being compiled</div>
      <div>[ <span class="text-al-error">FAIL</span> ] Could not load module \u2014 status: <span class="text-al-warn">MODULE_OFFLINE</span></div>
    </div>

    <section aria-labelledby="tools-title" class="flex flex-col items-start gap-7 border border-al-border p-[clamp(20px,5vw,56px)]" style="background:rgba(13,17,23,.92)">
      <div class="ascii" aria-hidden="true">
        <pre class="ascii-word text-al-warn" style="text-shadow:0 0 8px rgba(245,158,11,.4)">${Me}</pre>
      </div>
      <h1 id="tools-title" tabindex="-1" class="m-0 text-[clamp(28px,4vw,40px)] font-bold leading-[1.2]">/tools is initializing</h1>
      <span role="status" class="inline-flex animate-offline items-center gap-2.5 border border-al-warn px-4 py-2.5 text-[13px] tracking-[0.12em] text-al-warn"><span class="h-2 w-2 shrink-0 rounded-full bg-al-warn"></span>COMING SOON [MODULE_OFFLINE]</span>
      <p class="m-0 max-w-[640px] text-[15px] leading-[25px] text-al-muted">[ONE SENTENCE on what the tools will help learners do.] Want to know when it ships, or help build it? Ask in Discord.</p>
      <div class="flex w-full max-w-[640px] flex-col gap-2">
        <div class="flex justify-between text-xs text-al-muted"><span>make modules</span><span>building\u2026</span></div>
        <div class="h-3 border border-al-border" aria-hidden="true"><div class="h-full w-[38%] animate-load" style="background:repeating-linear-gradient(90deg,#f59e0b 0 6px,transparent 6px 9px)"></div></div>
      </div>
      <div class="cta-row w-full">
        <a class="btn-primary" ${T}>$ /discord \u2014 get notified</a>
        <a class="btn-ghost" ${y("/home")}>$ cd ~</a>
      </div>
    </section>

    <section aria-labelledby="mods-title" class="flex flex-col gap-4">
      <h2 id="mods-title" class="m-0 text-base font-bold text-al-muted">lsmod | grep akademi</h2>
      <div class="overflow-x-auto border border-al-border text-[13px]">
        <table class="w-full border-collapse text-left">
          <thead><tr class="text-xs tracking-[0.1em] text-al-muted lg:text-[11px]"><th scope="col" class="px-3 py-2.5 font-normal sm:px-4">MODULE</th><th scope="col" class="px-3 py-2.5 font-normal sm:px-4">STATE</th><th scope="col" class="px-3 py-2.5 font-normal sm:px-4">NOTE</th></tr></thead>
          <tbody>${X("[TOOL_01]")}${X("[TOOL_02]")}${X("[TOOL_03]")}</tbody>
        </table>
      </div>
    </section>
  </div>`, de = {
    home: Oe,
    about: ke,
    tools: Ce,
    notfound: Ne
  }, ce = (e) => e === "home" ? ve() : "", _e = (e) => `
  ${re(e)}
  <main id="view" tabindex="-1" class="relative mx-auto w-full max-w-[1280px] flex-1 px-4 pb-24 sm:px-6 md:pb-[120px]">${de[e]()}</main>
  <div id="footer">${ce(e)}</div>`, se = [
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
  ], Re = 180;
  let K = null;
  function V() {
    K == null ? void 0 : K.remove(), K = null;
  }
  function _(e, a) {
    const t = document.createElement("div");
    return t.className = "whitespace-pre-wrap", t.innerHTML = e, a.append(t), t;
  }
  function De(e) {
    const a = window.open(R, "_blank");
    a && (a.opener = null), V();
    const t = document.createElement("div");
    t.className = "gateway", t.setAttribute("role", "status");
    const d = t;
    K = t;
    const s = document.createElement("button");
    s.type = "button", s.className = "prompt-esc float-right", s.textContent = "close", s.setAttribute("aria-label", "Close Discord log"), s.addEventListener("click", V), t.append(s), _('<span class="text-al-text">visitor@akademi:~$ /discord</span>', t), _('<span class="text-al-glow text-glow-sm">CONNECTING TO DISCORD GATEWAY...</span>', t), document.body.append(t);
    const r = () => {
      var _a;
      if (K !== d) return;
      const x = `<a href="${R}" target="_blank" rel="noopener">open the invite${I}</a>`;
      a ? (_('<span class="text-al-text">Opening community invite in new tab \u25B8</span>', t), _(`Not opened? \u2192 ${x}`, t)) : (_(`<span class="text-al-text">Popup blocked \u2192</span> ${x}`, t), (_a = t.querySelector("a")) == null ? void 0 : _a.focus());
    }, g = e ? 0 : Re;
    se.forEach(([x, k], f) => {
      const u = () => {
        K === d && (_(`[ <span class="text-al-term">OK</span> ] ${x}  <span class="text-al-muted">${k}</span>`, t), f === se.length - 1 && r());
      };
      g === 0 ? u() : window.setTimeout(u, g * (f + 1));
    });
  }
  const Pe = "modulepreload", Ue = function(e) {
    return "/" + e;
  }, ne = {}, Ke = function(a, t, d) {
    let s = Promise.resolve();
    if (t && t.length > 0) {
      let g = function(f) {
        return Promise.all(f.map((u) => Promise.resolve(u).then((h) => ({
          status: "fulfilled",
          value: h
        }), (h) => ({
          status: "rejected",
          reason: h
        }))));
      };
      document.getElementsByTagName("link");
      const x = document.querySelector("meta[property=csp-nonce]"), k = (x == null ? void 0 : x.nonce) || (x == null ? void 0 : x.getAttribute("nonce"));
      s = g(t.map((f) => {
        if (f = Ue(f), f in ne) return;
        ne[f] = true;
        const u = f.endsWith(".css"), h = u ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${f}"]${h}`)) return;
        const i = document.createElement("link");
        if (i.rel = u ? "stylesheet" : Pe, u || (i.as = "script"), i.crossOrigin = "", i.href = f, k && i.setAttribute("nonce", k), document.head.appendChild(i), u) return new Promise((O, L) => {
          i.addEventListener("load", O), i.addEventListener("error", () => L(new Error(`Unable to preload CSS for ${f}`)));
        });
      }));
    }
    function r(g) {
      const x = new Event("vite:preloadError", {
        cancelable: true
      });
      if (x.payload = g, window.dispatchEvent(x), !x.defaultPrevented) throw g;
    }
    return s.then((g) => {
      for (const x of g || []) x.status === "rejected" && r(x.reason);
      return a().catch(r);
    });
  };
  let J = null, z = null;
  const M = () => J;
  function te() {
    return z ?? (z = Ke(() => import("./shell-zQ8sn7RX.js").then(async (m) => {
      await m.__tla;
      return m;
    }), []).then((e) => (J = new e.Shell(), J)).catch((e) => {
      throw z = null, e;
    })), z;
  }
  const A = (e) => document.getElementById(e);
  function Be(e, a) {
    const t = A("prompt"), d = A("scrim"), s = A("cmd"), r = A("ghost"), g = A("suggest-box"), x = A("suggest"), k = A("prompt-msg"), f = A("hint");
    let u = false, h = 0, i = [], O = null;
    const L = () => i[h];
    function E() {
      const n = M();
      if (!n) return;
      const p = n.suggest(s.value);
      i = p.map((c) => c.name), h = Math.min(h, Math.max(i.length - 1, 0)), x.replaceChildren(...p.map((c, v) => {
        const w = document.createElement("li");
        w.id = `opt-${v}`, w.setAttribute("role", "option"), w.setAttribute("aria-selected", String(v === h)), w.dataset.cmd = c.name;
        const ae = document.createElement("span");
        ae.textContent = c.name;
        const W = document.createElement("small");
        return W.textContent = c.tag, W.className = c.tag === "[MODULE_OFFLINE]" ? "text-[11.5px] text-al-warn" : "text-[11.5px]", w.append(ae, W), w;
      })), g.hidden = i.length === 0, s.setAttribute("aria-expanded", String(i.length > 0)), i.length > 0 ? s.setAttribute("aria-activedescendant", `opt-${h}`) : s.removeAttribute("aria-activedescendant"), r.textContent = n.ghost(s.value, L()) ?? "";
    }
    function D(n, p) {
      const c = document.createElement("span");
      c.className = p, c.textContent = n, k.replaceChildren(c);
    }
    function P() {
      if (u) return;
      const n = M();
      if (!(n && !n.open_prompt())) {
        if (u = true, O = document.activeElement instanceof HTMLElement ? document.activeElement : null, t.classList.add("is-on"), d.classList.add("is-on"), f.classList.add("is-hidden"), s.value = "/", k.replaceChildren(), h = 0, e.pause(), s.focus(), s.setSelectionRange(1, 1), n) {
          E();
          return;
        }
        g.hidden = true, te().then((p) => {
          u && (p.open_prompt(), E());
        }).catch(() => {
          u && D("Command shell failed to load. Use the links on the page instead.", "text-al-error");
        });
      }
    }
    function S(n = true) {
      var _a;
      u && (u = false, (_a = M()) == null ? void 0 : _a.close_prompt(), t.classList.remove("is-on"), d.classList.remove("is-on"), f.classList.remove("is-hidden"), e.resume(), s.blur(), n && (O == null ? void 0 : O.focus()));
    }
    function l(n, p) {
      const c = n.trim(), v = a.run(c, c.length > 1 ? p : void 0);
      if (!v.stayOpen) return S(false);
      v.error && D(v.error, "text-al-error"), v.info && (s.value = "/", h = 0, E(), D(v.info, "text-al-muted"));
    }
    document.addEventListener("keydown", (n) => {
      const p = n.target, c = p.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(p.tagName);
      n.key === "/" && !u && !c && !n.ctrlKey && !n.metaKey && !n.altKey ? (n.preventDefault(), P()) : n.key === "Escape" && u && (n.preventDefault(), S());
    }), s.addEventListener("input", () => {
      s.value && !s.value.startsWith("/") && (s.value = `/${s.value}`), h = 0, k.replaceChildren(), E();
    }), s.addEventListener("keydown", (n) => {
      const p = M(), c = i.length;
      if (n.key === "ArrowDown" || n.key === "ArrowUp") {
        if (n.preventDefault(), !c) return;
        h = (h + (n.key === "ArrowDown" ? 1 : c - 1)) % c, E();
      } else if (n.key === "Tab") n.preventDefault(), L() && (s.value = L(), E());
      else if (n.key === "Enter") n.preventDefault(), l(s.value, L());
      else if (n.ctrlKey && (n.key === "p" || n.key === "n") && p) {
        n.preventDefault();
        const v = n.key === "p" ? p.history_prev() : p.history_next();
        if (v === void 0 && n.key === "p") return;
        s.value = v ?? "/", h = 0, E();
      }
    }), t.addEventListener("focusout", (n) => {
      u && !t.contains(n.relatedTarget) && window.setTimeout(() => {
        u && s.focus();
      });
    }), x.addEventListener("mousedown", (n) => {
      const p = n.target.closest("li");
      (p == null ? void 0 : p.dataset.cmd) && (n.preventDefault(), l(p.dataset.cmd, void 0));
    }), d.addEventListener("click", () => S()), A("esc").addEventListener("click", () => S()), f.addEventListener("click", () => P());
    let m;
    const $ = () => {
      f.classList.remove("is-dim"), window.clearTimeout(m), m = window.setTimeout(() => f.classList.add("is-dim"), 6e3);
    };
    for (const n of [
      "pointermove",
      "keydown",
      "scroll"
    ]) window.addEventListener(n, $, {
      passive: true
    });
    $();
    const o = window.visualViewport;
    if (o) {
      const n = () => {
        const p = window.innerHeight - o.height - o.offsetTop;
        t.style.setProperty("--keyboard", `${Math.max(0, p)}px`), t.style.setProperty("--visible-height", `${o.height}px`);
      };
      o.addEventListener("resize", n), o.addEventListener("scroll", n), n();
    }
    return {
      close: S
    };
  }
  const pe = window.matchMedia("(prefers-reduced-motion: reduce)").matches, Fe = document.getElementById("app"), je = document.getElementById("announce"), We = be(document.getElementById("bg"), pe);
  let j = document.body.dataset.route, Q = false;
  function He(e) {
    var _a;
    j = e, document.body.dataset.route = e, document.title = oe[e], document.getElementById("header").outerHTML = re(e), document.getElementById("view").innerHTML = de[e](), document.getElementById("footer").innerHTML = ce(e), Z(), window.scrollTo(0, 0), (_a = document.querySelector("#view h1")) == null ? void 0 : _a.focus({
      preventScroll: true
    }), je.textContent = `Navigated to ${e === "notfound" ? "page not found" : e}`;
  }
  async function me(e, a, t, d, s) {
    const r = e.route_for_path(a);
    r === j || !e.begin_transition() || (V(), s && window.history.pushState({}, "", a), He(r), e.end_transition(), Q && (Q = false, xe(e)));
  }
  function xe(e) {
    const a = window.location.pathname, t = e.route_for_path(a);
    me(e, a, `/${t}`, e.log_for_route(t), false);
  }
  function ue(e, a, t) {
    const d = e.execute(a, t);
    switch (d.kind) {
      case "route":
        return me(e, d.path, d.command, d.log, true), {
          stayOpen: false
        };
      case "external":
        return De(pe), {
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
          error: `bash: ${d.command}: command not found \u2014 try /help`
        };
      default:
        return {
          stayOpen: true
        };
    }
  }
  const qe = Be(We, {
    run(e, a) {
      const t = M();
      return t ? ue(t, e, a) : {
        stayOpen: true
      };
    }
  });
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-cmd]"), t = M();
    !(a == null ? void 0 : a.dataset.cmd) || !t || e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || (e.preventDefault(), ue(t, a.dataset.cmd, void 0));
  });
  window.addEventListener("popstate", () => {
    const e = M();
    e && (qe.close(false), e.is_transitioning() ? Q = true : xe(e));
  });
  function Z() {
    const e = document.getElementById("uptime");
    if (!e) return;
    const a = (r) => String(r).padStart(2, "0"), t = Math.max(0, Math.floor((Date.now() - 1794039843961) / 1e3)), d = Math.floor(t / 86400), s = `${a(Math.floor(t / 3600) % 24)}:${a(Math.floor(t / 60) % 60)}:${a(t % 60)}`;
    e.textContent = d > 0 ? `${d}d ${s}` : s;
  }
  function Ye() {
    Z(), window.setInterval(() => {
      document.hidden || Z();
    }, 1e3);
  }
  async function Ge() {
    if (j) return;
    const a = (await te()).route_for_path(window.location.pathname);
    j = a, document.body.dataset.route = a, document.title = oe[a], Fe.innerHTML = _e(a);
  }
  function Xe() {
    const e = () => void te().catch(() => {
    });
    "requestIdleCallback" in window ? window.requestIdleCallback(e, {
      timeout: 3e3
    }) : setTimeout(e, 1500);
  }
  Ge();
  Ye();
  Xe();
})();
