import { DISCORD_URL, externalIcon } from "../config";

const STEPS = [
  ["DNS resolve     discord.gg", "+180ms"],
  ["TLS handshake", "+360ms"],
  ["Invite token    [DISCORD_INVITE]", "+540ms"],
];
const STEP_MS = 180;

let panel: HTMLElement | null = null;

export function closeGateway() {
  panel?.remove();
  panel = null;
}

function line(html: string, into: HTMLElement) {
  const row = document.createElement("div");
  row.className = "whitespace-pre-wrap";
  row.innerHTML = html;
  into.append(row);
  return row;
}

/**
 * Must be called synchronously inside the click or Enter handler, or popup blockers
 * refuse the new tab. `noopener` isn't passed to window.open because it would make the
 * call return null even on success, which is indistinguishable from a blocked popup.
 */
export function openDiscord(reduceMotion: boolean) {
  const tab = window.open(DISCORD_URL, "_blank");
  if (tab) tab.opener = null;

  closeGateway();
  const box = document.createElement("div");
  box.className = "gateway";
  box.setAttribute("role", "status");
  const current = box;
  panel = box;

  const close = document.createElement("button");
  close.type = "button";
  close.className = "prompt-esc float-right";
  close.textContent = "close";
  close.setAttribute("aria-label", "Close Discord log");
  close.addEventListener("click", closeGateway);
  box.append(close);

  line(`<span class="text-al-text">visitor@akademi:~$ /discord</span>`, box);
  line(`<span class="text-al-glow text-glow-sm">CONNECTING TO DISCORD GATEWAY...</span>`, box);
  document.body.append(box);

  const finish = () => {
    if (panel !== current) return;
    const fallback = `<a href="${DISCORD_URL}" target="_blank" rel="noopener">open the invite${externalIcon}</a>`;
    if (tab) {
      line(`<span class="text-al-text">Opening community invite in new tab ▸</span>`, box);
      line(`Not opened? → ${fallback}`, box);
    } else {
      line(`<span class="text-al-text">Popup blocked →</span> ${fallback}`, box);
      box.querySelector<HTMLAnchorElement>("a")?.focus();
    }
  };

  const delay = reduceMotion ? 0 : STEP_MS;
  STEPS.forEach(([label, time], i) => {
    const addStep = () => {
      if (panel !== current) return;
      line(`[ <span class="text-al-term">OK</span> ] ${label}  <span class="text-al-muted">${time}</span>`, box);
      if (i === STEPS.length - 1) finish();
    };
    if (delay === 0) addStep();
    else window.setTimeout(addStep, delay * (i + 1));
  });
}
