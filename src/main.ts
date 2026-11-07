import "./styles.css";
import { startStarfield } from "./background/starfield";
import type { RouteId } from "./config";
import { footerFor, renderApp, renderHeader, renderPage, TITLES } from "./render";
import { closeGateway, openDiscord } from "./shell/discord";
import { setupPrompt } from "./shell/prompt";
import { playBootLog } from "./shell/transition";
import { currentShell, loadShell } from "./wasm";
import type { Shell } from "./wasm/pkg/shell";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
// The boot-log page transition is off for now. Set to true to bring it back.
const BOOT_LOG_TRANSITION = false;
const app = document.getElementById("app") as HTMLElement;
const announce = document.getElementById("announce") as HTMLElement;

const background = startStarfield(document.getElementById("bg") as HTMLCanvasElement, reduceMotion);

let current: RouteId | undefined = document.body.dataset.route as RouteId | undefined;
let queuedPop = false;

function paint(route: RouteId) {
  current = route;
  document.body.dataset.route = route;
  document.title = TITLES[route];
  (document.getElementById("header") as HTMLElement).outerHTML = renderHeader(route);
  (document.getElementById("view") as HTMLElement).innerHTML = renderPage[route]();
  (document.getElementById("footer") as HTMLElement).innerHTML = footerFor(route);
  showUptime();
  window.scrollTo(0, 0);
  document.querySelector<HTMLElement>("#view h1")?.focus({ preventScroll: true });
  announce.textContent = `Navigated to ${route === "notfound" ? "page not found" : route}`;
}

async function goTo(shell: Shell, path: string, command: string, log: string[], push: boolean) {
  const route = shell.route_for_path(path) as RouteId;
  if (route === current || !shell.begin_transition()) return;
  closeGateway();
  if (BOOT_LOG_TRANSITION && !reduceMotion && log.length > 0) {
    await playBootLog(document.getElementById("view") as HTMLElement, command, log);
  }
  if (push) window.history.pushState({}, "", path);
  paint(route);
  shell.end_transition();
  if (queuedPop) {
    queuedPop = false;
    syncWithUrl(shell);
  }
}

/** Handles back and forward. These aren't typed commands, so they skip shell history. */
function syncWithUrl(shell: Shell) {
  const path = window.location.pathname;
  const route = shell.route_for_path(path);
  void goTo(shell, path, `/${route}`, shell.log_for_route(route), false);
}

function execute(shell: Shell, raw: string, selected: string | undefined) {
  const outcome = shell.execute(raw, selected);
  switch (outcome.kind) {
    case "route":
      void goTo(shell, outcome.path, outcome.command, outcome.log, true);
      return { stayOpen: false };
    case "external":
      openDiscord(reduceMotion);
      return { stayOpen: false };
    case "help":
      return { stayOpen: true, info: `available: ${shell.command_list()}` };
    case "not_found":
      return { stayOpen: true, error: `bash: ${outcome.command}: command not found — try /help` };
    default:
      return { stayOpen: true };
  }
}

const prompt = setupPrompt(background, {
  run(raw, selected) {
    const shell = currentShell();
    return shell ? execute(shell, raw, selected) : { stayOpen: true };
  },
});

// Internal and /discord links are real links. They're only taken over once the shell
// has loaded, so the site keeps working with plain page loads if the WASM fails.
document.addEventListener("click", (event) => {
  const link = (event.target as Element).closest<HTMLAnchorElement>("a[data-cmd]");
  const shell = currentShell();
  if (!link?.dataset.cmd || !shell) return;
  if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  execute(shell, link.dataset.cmd, undefined);
});

window.addEventListener("popstate", () => {
  const shell = currentShell();
  if (!shell) return;
  prompt.close(false);
  if (shell.is_transitioning()) queuedPop = true;
  else syncWithUrl(shell);
});

/** Time since this build went out, so it's the same for every visitor and survives a refresh. */
function showUptime() {
  const el = document.getElementById("uptime");
  if (!el) return;
  const pad = (n: number) => String(n).padStart(2, "0");
  // A visitor's clock can be behind the build machine's.
  const s = Math.max(0, Math.floor((Date.now() - Number(import.meta.env.VITE_BUILT_AT)) / 1000));
  const days = Math.floor(s / 86400);
  const clock = `${pad(Math.floor(s / 3600) % 24)}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`;
  el.textContent = days > 0 ? `${days}d ${clock}` : clock;
}

function startUptime() {
  showUptime();
  window.setInterval(() => {
    if (!document.hidden) showUptime();
  }, 1000);
}

/** Builds that skip the prerender (the dev server) have to render on the client. */
async function renderIfNeeded() {
  if (current) return;
  const shell = await loadShell();
  const route = shell.route_for_path(window.location.pathname) as RouteId;
  current = route;
  document.body.dataset.route = route;
  document.title = TITLES[route];
  app.innerHTML = renderApp(route);
}

function loadWhenIdle() {
  const start = () => void loadShell().catch(() => {});
  if ("requestIdleCallback" in window) window.requestIdleCallback(start, { timeout: 3000 });
  else setTimeout(start, 1500);
}

void renderIfNeeded();
startUptime();
loadWhenIdle();
