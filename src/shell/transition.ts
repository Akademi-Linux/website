// Route transition, timed to the Flow design's roughly 620ms timeline:
// 120ms fade out, then 3 lines at 140ms each (typing + line pause), then 80ms before render.
const FADE_OUT_MS = 120;
const TYPE_MS_PER_LINE = 50;
const LINE_PAUSE_MS = 90;
const SETTLE_MS = 80;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Reveals text over a fixed duration, however long the line is. */
async function typeLine(target: HTMLElement, text: string) {
  const start = performance.now();
  for (;;) {
    const progress = Math.min(1, (performance.now() - start) / TYPE_MS_PER_LINE);
    target.textContent = text.slice(0, Math.ceil(text.length * progress));
    if (progress === 1) return;
    await sleep(8);
  }
}

export async function playBootLog(view: HTMLElement, command: string, lines: string[]) {
  view.classList.add("view-out");
  await sleep(FADE_OUT_MS);
  view.classList.remove("view-out");

  const log = document.createElement("div");
  log.className = "pt-16 text-[15px] leading-6 text-al-muted";
  const echo = document.createElement("div");
  echo.className = "text-al-text";
  echo.textContent = `visitor@akademi:~$ ${command}`;
  log.append(echo);
  view.replaceChildren(log);

  for (const line of lines) {
    const row = document.createElement("div");
    const ok = document.createElement("span");
    ok.className = "text-al-term";
    ok.textContent = "OK";
    const text = document.createElement("span");
    row.append("[ ", ok, " ] ", text);
    log.append(row);
    await typeLine(text, line);
    await sleep(LINE_PAUSE_MS);
  }
  await sleep(SETTLE_MS);
}
