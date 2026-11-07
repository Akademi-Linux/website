import type { Starfield } from "../background/starfield";
import { currentShell, loadShell } from "../wasm";

export interface PromptActions {
  /** Runs a command. Returns text to display when the prompt should stay open. */
  run(raw: string, selected: string | undefined): { stayOpen: boolean; error?: string; info?: string };
}

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

export function setupPrompt(background: Starfield, actions: PromptActions) {
  const dialog = byId("prompt");
  const scrim = byId("scrim");
  const input = byId<HTMLInputElement>("cmd");
  const ghost = byId("ghost");
  const box = byId("suggest-box");
  const list = byId("suggest");
  const message = byId("prompt-msg");
  const hint = byId("hint");

  let isOpen = false;
  let selection = 0;
  let matches: string[] = [];
  let opener: HTMLElement | null = null;

  const selected = () => matches[selection];

  function render() {
    const shell = currentShell();
    if (!shell) return;
    const suggestions = shell.suggest(input.value);
    matches = suggestions.map((s) => s.name);
    selection = Math.min(selection, Math.max(matches.length - 1, 0));

    list.replaceChildren(
      ...suggestions.map((suggestion, i) => {
        const item = document.createElement("li");
        item.id = `opt-${i}`;
        item.setAttribute("role", "option");
        item.setAttribute("aria-selected", String(i === selection));
        item.dataset.cmd = suggestion.name;
        const name = document.createElement("span");
        name.textContent = suggestion.name;
        const tag = document.createElement("small");
        tag.textContent = suggestion.tag;
        tag.className = suggestion.tag === "[MODULE_OFFLINE]" ? "text-[11.5px] text-al-warn" : "text-[11.5px]";
        item.append(name, tag);
        return item;
      }),
    );

    box.hidden = matches.length === 0;
    input.setAttribute("aria-expanded", String(matches.length > 0));
    if (matches.length > 0) input.setAttribute("aria-activedescendant", `opt-${selection}`);
    else input.removeAttribute("aria-activedescendant");
    ghost.textContent = shell.ghost(input.value, selected()) ?? "";
  }

  function showMessage(text: string, className: string) {
    const span = document.createElement("span");
    span.className = className;
    span.textContent = text;
    message.replaceChildren(span);
  }

  function open() {
    if (isOpen) return;
    const shell = currentShell();
    if (shell && !shell.open_prompt()) return; // A transition is running.
    isOpen = true;
    opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog.classList.add("is-on");
    scrim.classList.add("is-on");
    hint.classList.add("is-hidden");
    input.value = "/";
    message.replaceChildren();
    selection = 0;
    background.pause();
    input.focus();
    input.setSelectionRange(1, 1);

    if (shell) {
      render();
      return;
    }
    box.hidden = true;
    loadShell()
      .then((loaded) => {
        if (!isOpen) return;
        loaded.open_prompt();
        render();
      })
      .catch(() => {
        if (isOpen) showMessage("Command shell failed to load. Use the links on the page instead.", "text-al-error");
      });
  }

  function close(restoreFocus = true) {
    if (!isOpen) return;
    isOpen = false;
    currentShell()?.close_prompt();
    dialog.classList.remove("is-on");
    scrim.classList.remove("is-on");
    hint.classList.remove("is-hidden");
    background.resume();
    // Without this the hidden input keeps focus and swallows the next "/" press.
    input.blur();
    if (restoreFocus) opener?.focus();
  }

  function run(raw: string, choice: string | undefined) {
    const typed = raw.trim();
    const result = actions.run(typed, typed.length > 1 ? choice : undefined);
    if (!result.stayOpen) return close(false);
    if (result.error) showMessage(result.error, "text-al-error");
    if (result.info) {
      input.value = "/";
      selection = 0;
      render();
      showMessage(result.info, "text-al-muted");
    }
  }

  document.addEventListener("keydown", (event) => {
    const target = event.target as HTMLElement;
    const editable = target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
    if (event.key === "/" && !isOpen && !editable && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      open();
    } else if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      close();
    }
  });

  input.addEventListener("input", () => {
    if (input.value && !input.value.startsWith("/")) input.value = `/${input.value}`;
    selection = 0;
    message.replaceChildren();
    render();
  });

  input.addEventListener("keydown", (event) => {
    const shell = currentShell();
    const count = matches.length;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!count) return;
      selection = (selection + (event.key === "ArrowDown" ? 1 : count - 1)) % count;
      render();
    } else if (event.key === "Tab") {
      event.preventDefault();
      if (selected()) {
        input.value = selected();
        render();
      }
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(input.value, selected());
    } else if (event.ctrlKey && (event.key === "p" || event.key === "n") && shell) {
      event.preventDefault();
      const entry = event.key === "p" ? shell.history_prev() : shell.history_next();
      if (entry === undefined && event.key === "p") return;
      input.value = entry ?? "/";
      selection = 0;
      render();
    }
  });

  // Keeps focus inside the dialog while it's open.
  dialog.addEventListener("focusout", (event) => {
    if (isOpen && !dialog.contains(event.relatedTarget as Node | null)) {
      window.setTimeout(() => {
        if (isOpen) input.focus();
      });
    }
  });

  list.addEventListener("mousedown", (event) => {
    const item = (event.target as Element).closest<HTMLElement>("li");
    if (item?.dataset.cmd) {
      event.preventDefault();
      run(item.dataset.cmd, undefined);
    }
  });

  scrim.addEventListener("click", () => close());
  byId("esc").addEventListener("click", () => close());
  hint.addEventListener("click", () => open());

  // The chip dims after 6s without interaction.
  let idleTimer: number | undefined;
  const wake = () => {
    hint.classList.remove("is-dim");
    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(() => hint.classList.add("is-dim"), 6000);
  };
  for (const type of ["pointermove", "keydown", "scroll"]) {
    window.addEventListener(type, wake, { passive: true });
  }
  wake();

  // Fixed elements don't move for the on-screen keyboard, so lift the prompt above it.
  const viewport = window.visualViewport;
  if (viewport) {
    const fitToKeyboard = () => {
      const covered = window.innerHeight - viewport.height - viewport.offsetTop;
      dialog.style.setProperty("--keyboard", `${Math.max(0, covered)}px`);
      dialog.style.setProperty("--visible-height", `${viewport.height}px`);
    };
    viewport.addEventListener("resize", fitToKeyboard);
    viewport.addEventListener("scroll", fitToKeyboard);
    fitToKeyboard();
  }

  return { close };
}
