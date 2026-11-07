import { discord, DISCORD_URL, externalIcon, LINKEDIN_URL, route, YOUTUBE_URL } from "../config";

// Tailwind only generates icon classes it finds written out in full, so pass the whole class.
const social = (href: string, label: string, iconClass: string) =>
  `<a href="${href}" target="_blank" rel="noopener" aria-label="${label}" class="flex h-11 w-11 items-center justify-center text-[22px] text-al-bg hover:text-al-bg"><span aria-hidden="true" class="${iconClass}"></span></a>`;

export const renderFooter = (): string => `
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
            <a class="footer-link" ${route("/home")}>/home</a>
            <a class="footer-link" ${route("/about")}>/about</a>
            <a class="footer-link" ${route("/tools")}>/tools</a>
            <a class="footer-link" ${discord}>/discord${externalIcon}</a>
          </nav>
          <div class="flex flex-col gap-3">
            <span class="footer-tag">ENTERPRISE TRAINING</span>
            <p class="m-0 text-sm leading-[22px]">We come to your office and train your team on-site.<br /><a href="mailto:[TRAINING EMAIL]" class="touch-link-coarse font-bold text-al-bg hover:text-al-bg">[TRAINING EMAIL]</a></p>
          </div>
          <div class="flex flex-col gap-3">
            <span class="text-sm font-bold">Socials:</span>
            <div class="flex gap-2">
              ${social(DISCORD_URL, "Akademi Linux on Discord", "icon-[simple-icons--discord]")}
              ${social(YOUTUBE_URL, "Akademi Linux on YouTube", "icon-[simple-icons--youtube]")}
              ${social(LINKEDIN_URL, "Akademi Linux on LinkedIn", "icon-[simple-icons--linkedin]")}
            </div>
          </div>
        </div>

        <div class="footer-end flex flex-col gap-2 pt-[18px] text-xs leading-[18px]" style="border-top:1.5px solid #0a0a0a">
          <div class="flex flex-wrap justify-between gap-3 font-bold"><span>Akademi Linux · © All rights reserved 2026</span><span>exit 0</span></div>
          <p class="m-0 text-xs leading-[18px] sm:text-[11px] sm:leading-[17px]">Linux® is the registered trademark of Linus Torvalds. Docker, Kubernetes, OpenStack and Ceph logos are trademarks of their respective owners, shown to identify course topics.</p>
        </div>
      </div>
    </div>
  </footer>`;
