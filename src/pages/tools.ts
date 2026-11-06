import { discord, route } from "../config";

const OFFLINE = String.raw` ██████╗ ███████╗███████╗██╗     ██╗███╗   ██╗███████╗
██╔═══██╗██╔════╝██╔════╝██║     ██║████╗  ██║██╔════╝
██║   ██║█████╗  █████╗  ██║     ██║██╔██╗ ██║█████╗
██║   ██║██╔══╝  ██╔══╝  ██║     ██║██║╚██╗██║██╔══╝
╚██████╔╝██║     ██║     ███████╗██║██║ ╚████║███████╗
 ╚═════╝ ╚═╝     ╚═╝     ╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝`;

const moduleRow = (name: string) => `
  <tr class="border-t border-al-border text-al-muted">
    <td class="px-4 py-3 text-al-text">${name}</td>
    <td class="px-4 py-3 text-al-warn">[LOCKED]</td>
    <td class="px-4 py-3">[what it does]</td>
  </tr>`;

export const renderTools = (): string => `
  <div class="flex flex-col gap-10 pt-16">
    <div class="flex flex-col gap-1.5 text-[13px] leading-[22px] text-al-muted">
      <div class="text-al-text">visitor@akademi:~$ sudo modprobe akademi-tools</div>
      <div>[ <span class="text-al-term">OK</span> ] Checking dependencies</div>
      <div>[ <span class="text-al-term">OK</span> ] Verifying signatures</div>
      <div>[ <span class="text-al-warn">WARN</span> ] akademi-tools.ko: module is still being compiled</div>
      <div>[ <span class="text-al-error">FAIL</span> ] Could not load module — status: <span class="text-al-warn">MODULE_OFFLINE</span></div>
    </div>

    <section aria-labelledby="tools-title" class="flex flex-col items-start gap-7 border border-al-border p-[clamp(24px,5vw,56px)]" style="background:rgba(13,17,23,.92)">
      <div class="max-w-full overflow-x-auto">
        <pre aria-hidden="true" class="m-0 font-mono text-sm leading-[15px] text-al-warn" style="text-shadow:0 0 8px rgba(245,158,11,.4)">${OFFLINE}</pre>
      </div>
      <h1 id="tools-title" tabindex="-1" class="m-0 text-[clamp(28px,4vw,40px)] font-bold leading-[1.2]">/tools is initializing</h1>
      <span role="status" class="inline-flex animate-offline items-center gap-2.5 border border-al-warn px-4 py-2.5 text-[13px] tracking-[0.12em] text-al-warn"><span class="h-2 w-2 shrink-0 rounded-full bg-al-warn"></span>COMING SOON [MODULE_OFFLINE]</span>
      <p class="m-0 max-w-[640px] text-[15px] leading-[25px] text-al-muted">[ONE SENTENCE on what the tools will help learners do.] Want to know when it ships, or help build it? Ask in Discord.</p>
      <div class="flex w-full max-w-[640px] flex-col gap-2">
        <div class="flex justify-between text-xs text-al-muted"><span>make modules</span><span>building…</span></div>
        <div class="h-3 border border-al-border" aria-hidden="true"><div class="h-full w-[38%] animate-load" style="background:repeating-linear-gradient(90deg,#f59e0b 0 6px,transparent 6px 9px)"></div></div>
      </div>
      <div class="flex flex-wrap gap-3">
        <a class="btn-primary" ${discord}>$ /discord — get notified</a>
        <a class="btn-ghost" ${route("/home")}>$ cd ~</a>
      </div>
    </section>

    <section aria-labelledby="mods-title" class="flex flex-col gap-4">
      <h2 id="mods-title" class="m-0 text-base font-bold text-al-muted">lsmod | grep akademi</h2>
      <div class="overflow-x-auto border border-al-border text-[13px]">
        <table class="w-full min-w-[480px] border-collapse text-left">
          <thead><tr class="text-[11px] tracking-[0.1em] text-al-muted"><th scope="col" class="px-4 py-2.5 font-normal">MODULE</th><th scope="col" class="px-4 py-2.5 font-normal">STATE</th><th scope="col" class="px-4 py-2.5 font-normal">NOTE</th></tr></thead>
          <tbody>${moduleRow("[TOOL_01]")}${moduleRow("[TOOL_02]")}${moduleRow("[TOOL_03]")}</tbody>
        </table>
      </div>
    </section>
  </div>`;
