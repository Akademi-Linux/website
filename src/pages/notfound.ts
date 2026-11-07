import { route } from "../config";

export const renderNotFound = (): string => `
  <div class="flex flex-col items-start gap-7 pt-8 md:pt-16">
    <div class="text-[13px] text-al-muted">[ <span class="text-al-error">FAIL</span> ] Could not resolve route</div>
    <h1 tabindex="-1" class="m-0 text-[clamp(28px,4vw,40px)] font-bold leading-[1.2]">bash: No such file or directory</h1>
    <a class="btn-ghost" ${route("/home")}>$ cd ~</a>
  </div>`;
