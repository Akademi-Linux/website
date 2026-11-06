import { discord, route, type RouteId } from "../config";

const status: Record<RouteId, string> = {
  home: `<span class="h-2 w-2 rounded-full bg-al-term shadow-[0_0_8px_#22c55e]"></span>SYSTEM ONLINE · tty1`,
  about: `AKADEMI(1) · User Commands`,
  tools: `<span class="h-2 w-2 rounded-full bg-al-warn shadow-[0_0_8px_#f59e0b]"></span>DEGRADED · 1 module offline`,
  notfound: `<span class="h-2 w-2 rounded-full bg-al-term shadow-[0_0_8px_#22c55e]"></span>SYSTEM ONLINE · tty1`,
};

const navLink = (command: "/home" | "/about" | "/tools", current: RouteId) => {
  const active = command === `/${current}` ? ` aria-current="page"` : "";
  return `<a class="nav-link" ${route(command)}${active}>${command}</a>`;
};

export const renderHeader = (current: RouteId): string => `
  <header id="header" class="relative border-b border-al-border bg-al-bg/80">
    <div class="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-6 py-[18px]">
      <a class="flex" ${route("/home")} aria-label="Akademi Linux home">
        <img src="/assets/brand/logo_primary-white.svg" alt="" width="119" height="44" class="h-11 w-[119px] object-contain drop-shadow-[0_0_8px_rgba(28,185,0,.4)]" />
      </a>
      <nav aria-label="Primary" class="flex flex-wrap gap-1.5 text-[13px]">
        ${navLink("/home", current)}
        ${navLink("/about", current)}
        ${navLink("/tools", current)}
        <a class="nav-link" ${discord}>/discord ↗</a>
      </nav>
      <div class="flex items-center gap-2 text-xs text-al-muted">${status[current]}</div>
    </div>
  </header>`;
