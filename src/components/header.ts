import { discord, route, type RouteId } from "../config";

const status: Record<RouteId, string> = {
  home: `<span class="h-2 w-2 rounded-full bg-al-term shadow-[0_0_8px_#22c55e]"></span>SYSTEM ONLINE<span class="hidden sm:inline"> · tty1</span>`,
  about: `AKADEMI(1)<span class="hidden sm:inline"> · User Commands</span>`,
  tools: `<span class="h-2 w-2 rounded-full bg-al-warn shadow-[0_0_8px_#f59e0b]"></span>DEGRADED<span class="hidden sm:inline"> · 1 module offline</span>`,
  notfound: `<span class="h-2 w-2 rounded-full bg-al-term shadow-[0_0_8px_#22c55e]"></span>SYSTEM ONLINE<span class="hidden sm:inline"> · tty1</span>`,
};

const navLink = (command: "/home" | "/about" | "/tools", current: RouteId) => {
  const active = command === `/${current}` ? ` aria-current="page"` : "";
  return `<a class="nav-link" ${route(command)}${active}>${command}</a>`;
};

export const renderHeader = (current: RouteId): string => `
  <header id="header" class="relative border-b border-al-border bg-al-bg/80">
    <div class="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-6 md:py-[18px]">
      <a class="flex" ${route("/home")} aria-label="Akademi Linux home">
        <img src="/assets/brand/logo_primary-white.svg" alt="" width="119" height="44" class="h-11 w-[119px] object-contain drop-shadow-[0_0_8px_rgba(28,185,0,.4)]" />
      </a>
      <nav aria-label="Primary" class="order-3 flex w-full justify-between gap-1 whitespace-nowrap text-[13px] md:order-none md:w-auto md:gap-1.5">
        ${navLink("/home", current)}
        ${navLink("/about", current)}
        ${navLink("/tools", current)}
        <a class="nav-link" ${discord}>/discord ↗</a>
      </nav>
      <div class="flex items-center gap-2 whitespace-nowrap text-xs text-al-muted">${status[current]}</div>
    </div>
  </header>`;
