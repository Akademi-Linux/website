// Generic service homepages from the approved designs, so links work until the
// real values are supplied. Replace before launch: [DISCORD_INVITE], [YOUTUBE_URL],
// [LINKEDIN_URL]. On-page placeholders are the bracketed strings in src/pages and
// src/components.
export const DISCORD_URL = "https://discord.com/";
export const YOUTUBE_URL = "https://www.youtube.com/";
export const LINKEDIN_URL = "https://www.linkedin.com/";

export type RouteId = "home" | "about" | "tools" | "notfound";

export const TITLES: Record<RouteId, string> = {
  home: "Akademi Linux",
  about: "Akademi Linux — /about",
  tools: "Akademi Linux — /tools",
  notfound: "Akademi Linux — not found",
};

/** Attributes for an internal link. Works as a normal link until the shell loads. */
export const route = (command: "/home" | "/about" | "/tools"): string =>
  `href="${command === "/home" ? "/" : command}" data-cmd="${command}"`;

/** Attributes for a link that plays the /discord log when the shell is loaded. */
export const discord = `href="${DISCORD_URL}" target="_blank" rel="noopener" data-cmd="/discord"`;

/** Arrow shown after a link that leaves the site. */
export const externalIcon = `<span aria-hidden="true" class="icon-[lucide--arrow-up-right] ml-[.2em] align-[-.125em]"></span>`;
