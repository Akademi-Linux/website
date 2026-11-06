import { discord, DISCORD_URL, LINKEDIN_URL, route, YOUTUBE_URL } from "../config";

const icon = (paths: string) =>
  `<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

const social = (href: string, label: string, paths: string) =>
  `<a href="${href}" target="_blank" rel="noopener" aria-label="${label}" class="flex h-11 w-11 items-center justify-center text-al-bg hover:text-al-bg">${icon(paths)}</a>`;

export const renderFooter = (): string => `
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
            <a class="footer-link" ${route("/home")}>/home</a>
            <a class="footer-link" ${route("/about")}>/about</a>
            <a class="footer-link" ${route("/tools")}>/tools</a>
            <a class="footer-link" ${discord}>/discord ↗</a>
          </nav>
          <div class="flex flex-col gap-3">
            <span class="footer-tag">ENTERPRISE TRAINING</span>
            <p class="m-0 text-sm leading-[22px]">We come to your office and train your team on-site.<br /><a href="mailto:[TRAINING EMAIL]" class="font-bold text-al-bg hover:text-al-bg">[TRAINING EMAIL]</a></p>
          </div>
          <div class="flex flex-col gap-3">
            <span class="text-sm font-bold">Socials:</span>
            <div class="flex gap-2">
              ${social(DISCORD_URL, "Akademi Linux on Discord", `<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"></path><path d="M9 11h.01M15 11h.01"></path>`)}
              ${social(YOUTUBE_URL, "Akademi Linux on YouTube", `<rect x="2.5" y="5" width="19" height="14" rx="4"></rect><path d="M10 9.5v5l4.5-2.5z"></path>`)}
              ${social(LINKEDIN_URL, "Akademi Linux on LinkedIn", `<rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"></path>`)}
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2 pb-7 pt-[18px] text-xs leading-[18px]" style="border-top:1.5px solid #0a0a0a">
          <div class="flex flex-wrap justify-between gap-3 font-bold"><span>Akademi Linux · © All rights reserved [YEAR]</span><span>exit 0</span></div>
          <p class="m-0 text-[11px] leading-[17px]">Linux® is the registered trademark of Linus Torvalds. Docker, Kubernetes, OpenStack and Ceph logos are trademarks of their respective owners, shown to identify course topics.</p>
        </div>
      </div>
    </div>
  </footer>`;
