//! Command table, parser, autocomplete, route validation and prompt state.
//! Plain Rust with no browser dependencies, so it can be tested natively.

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Action {
    Route {
        path: &'static str,
        log: &'static [&'static str],
    },
    External,
    Help,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Command {
    pub name: &'static str,
    pub desc: &'static str,
    pub tag: &'static str,
    pub action: Action,
}

pub const COMMANDS: &[Command] = &[
    Command {
        name: "/home",
        desc: "Landing, system status",
        tag: "route",
        action: Action::Route {
            path: "/",
            log: &[
                "Resolving route /home",
                "Mounting /dev/community",
                "Rendering view ............ done",
            ],
        },
    },
    Command {
        name: "/about",
        desc: "man akademi(1)",
        tag: "man page",
        action: Action::Route {
            path: "/about",
            log: &[
                "Resolving route /about",
                "Loading man page akademi(1)",
                "Rendering view ............ done",
            ],
        },
    },
    Command {
        name: "/tools",
        desc: "Utilities",
        tag: "[MODULE_OFFLINE]",
        action: Action::Route {
            path: "/tools",
            log: &[
                "Resolving route /tools",
                "modprobe akademi-tools",
                "Module offline: showing status",
            ],
        },
    },
    Command {
        name: "/discord",
        desc: "Join the community",
        tag: "↗ external",
        action: Action::External,
    },
    Command {
        name: "/help",
        desc: "List all commands",
        tag: "builtin",
        action: Action::Help,
    },
];

const MAX_SUGGESTIONS: usize = 6;

pub fn find(name: &str) -> Option<&'static Command> {
    COMMANDS.iter().find(|c| c.name == name)
}

/// Prefix matches first, then fuzzy matches where every typed character
/// appears somewhere in the command name.
pub fn suggest(query: &str) -> Vec<&'static Command> {
    let q = query.trim().to_lowercase();
    if q.is_empty() || q == "/" {
        return COMMANDS.iter().collect();
    }
    let needle = q.strip_prefix('/').unwrap_or(&q);
    let prefix = format!("/{needle}");

    let (mut matches, rest): (Vec<&'static Command>, Vec<&'static Command>) =
        COMMANDS.iter().partition(|c| c.name.starts_with(&prefix));
    matches.extend(
        rest.into_iter()
            .filter(|c| needle.chars().all(|ch| c.name.contains(ch))),
    );
    matches.truncate(MAX_SUGGESTIONS);
    matches
}

/// The full command the ghost text should show, when the input is a strict prefix.
pub fn ghost(input: &str, selected: Option<&str>) -> Option<&'static str> {
    let command = find(selected?)?;
    (input.len() > 1 && input.len() < command.name.len() && command.name.starts_with(input))
        .then_some(command.name)
}

#[derive(Debug, PartialEq, Eq)]
pub enum Parsed {
    Empty,
    Known(&'static Command),
    NotFound(String),
}

/// Normalizes raw input. Enter runs an exact match first, then the highlighted
/// suggestion if something beyond "/" was typed, and otherwise reports the error.
pub fn parse(raw: &str, selected: Option<&str>) -> Parsed {
    let mut typed = raw.trim().to_lowercase();
    if typed.is_empty() || typed == "/" {
        return Parsed::Empty;
    }
    if !typed.starts_with('/') {
        typed.insert(0, '/');
    }
    if let Some(command) = find(&typed) {
        return Parsed::Known(command);
    }
    match selected.and_then(find) {
        Some(command) => Parsed::Known(command),
        None => Parsed::NotFound(typed),
    }
}

/// Maps a URL path to a page id. Only canonical paths are valid, so that `/home`
/// (a command, not a page) gets a 404 instead of duplicate content.
pub fn route_for_path(path: &str) -> &'static str {
    let path = path.split(['?', '#']).next().unwrap_or(path);
    let trimmed = path.trim_end_matches('/');
    match trimmed {
        "" | "/index.html" => "home",
        "/about" => "about",
        "/tools" => "tools",
        _ => "notfound",
    }
}

/// Boot-log lines for a page id. Pages without a command, like `notfound`, have none.
pub fn log_for_route(route: &str) -> &'static [&'static str] {
    COMMANDS
        .iter()
        .find_map(|c| match c.action {
            Action::Route { log, .. } if c.name.strip_prefix('/') == Some(route) => Some(log),
            _ => None,
        })
        .unwrap_or(&[])
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum State {
    Idle,
    PromptOpen,
    Transitioning,
}

/// Prompt and transition state, plus shell history.
#[derive(Debug)]
pub struct Machine {
    state: State,
    history: Vec<String>,
    /// `None` means the live input, `Some(0)` the most recent history entry.
    cursor: Option<usize>,
}

impl Default for Machine {
    fn default() -> Self {
        Self::new()
    }
}

impl Machine {
    pub fn new() -> Self {
        Self {
            state: State::Idle,
            history: Vec::new(),
            cursor: None,
        }
    }

    pub fn state(&self) -> State {
        self.state
    }

    /// The prompt can't open over a running transition.
    pub fn open_prompt(&mut self) -> bool {
        if self.state != State::Idle {
            return false;
        }
        self.state = State::PromptOpen;
        self.cursor = None;
        true
    }

    pub fn close_prompt(&mut self) -> bool {
        if self.state != State::PromptOpen {
            return false;
        }
        self.state = State::Idle;
        true
    }

    /// Starting from an open prompt is allowed, because running a route closes it.
    pub fn begin_transition(&mut self) -> bool {
        if self.state == State::Transitioning {
            return false;
        }
        self.state = State::Transitioning;
        true
    }

    pub fn end_transition(&mut self) {
        if self.state == State::Transitioning {
            self.state = State::Idle;
        }
    }

    pub fn remember(&mut self, command: &str) {
        self.history.insert(0, command.to_string());
        self.cursor = None;
    }

    /// Older entry (Ctrl+P). Stays on the oldest once reached.
    pub fn history_prev(&mut self) -> Option<&str> {
        if self.history.is_empty() {
            return None;
        }
        let next = self.cursor.map_or(0, |i| (i + 1).min(self.history.len() - 1));
        self.cursor = Some(next);
        Some(&self.history[next])
    }

    /// Newer entry (Ctrl+N). `None` means back at the live input.
    pub fn history_next(&mut self) -> Option<&str> {
        match self.cursor {
            None | Some(0) => {
                self.cursor = None;
                None
            }
            Some(i) => {
                self.cursor = Some(i - 1);
                Some(&self.history[i - 1])
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn names(query: &str) -> Vec<&'static str> {
        suggest(query).iter().map(|c| c.name).collect()
    }

    #[test]
    fn empty_query_lists_every_command() {
        assert_eq!(names("").len(), COMMANDS.len());
        assert_eq!(names("/").len(), COMMANDS.len());
    }

    #[test]
    fn prefix_matches_come_before_fuzzy_matches() {
        // The Flow design's example: "/to" selects /tools, with /about as a fuzzy match.
        let result = names("/to");
        assert_eq!(result[0], "/tools");
        assert!(result.contains(&"/about"));
    }

    #[test]
    fn suggestions_are_case_insensitive_and_work_without_a_slash() {
        assert_eq!(names("/AB")[0], "/about");
        assert_eq!(names("ab")[0], "/about");
    }

    #[test]
    fn unmatched_query_has_no_suggestions() {
        assert!(names("/xyz").is_empty());
    }

    #[test]
    fn ghost_only_completes_a_strict_prefix() {
        assert_eq!(ghost("/to", Some("/tools")), Some("/tools"));
        assert_eq!(ghost("/", Some("/tools")), None);
        assert_eq!(ghost("/tools", Some("/tools")), None);
        assert_eq!(ghost("/ot", Some("/tools")), None);
        assert_eq!(ghost("/to", None), None);
    }

    #[test]
    fn parse_handles_empty_input() {
        assert_eq!(parse("  ", None), Parsed::Empty);
        assert_eq!(parse("/", Some("/home")), Parsed::Empty);
    }

    #[test]
    fn exact_match_beats_the_highlighted_suggestion() {
        assert_eq!(parse("/about", Some("/tools")), Parsed::Known(find("/about").unwrap()));
    }

    #[test]
    fn parse_normalizes_case_whitespace_and_missing_slash() {
        assert_eq!(parse("  ABOUT ", None), Parsed::Known(find("/about").unwrap()));
    }

    #[test]
    fn partial_input_runs_the_highlighted_suggestion() {
        assert_eq!(parse("/to", Some("/tools")), Parsed::Known(find("/tools").unwrap()));
    }

    #[test]
    fn unknown_input_reports_the_normalized_command() {
        assert_eq!(parse("rm -rf", None), Parsed::NotFound("/rm -rf".to_string()));
    }

    #[test]
    fn stale_selection_is_not_trusted() {
        assert_eq!(parse("/x", Some("/nope")), Parsed::NotFound("/x".to_string()));
    }

    #[test]
    fn routes_resolve_with_and_without_trailing_slash() {
        assert_eq!(route_for_path("/"), "home");
        assert_eq!(route_for_path("/index.html"), "home");
        assert_eq!(route_for_path("/about"), "about");
        assert_eq!(route_for_path("/about/"), "about");
        assert_eq!(route_for_path("/tools/?utm=x#top"), "tools");
    }

    #[test]
    fn commands_and_unknown_paths_are_not_pages() {
        assert_eq!(route_for_path("/home"), "notfound");
        assert_eq!(route_for_path("/discord"), "notfound");
        assert_eq!(route_for_path("/about/x"), "notfound");
    }

    #[test]
    fn every_route_command_has_a_valid_path_and_three_to_four_log_lines() {
        for command in COMMANDS {
            if let Action::Route { path, log } = command.action {
                assert_ne!(route_for_path(path), "notfound", "{}", command.name);
                assert!((3..=4).contains(&log.len()), "{}", command.name);
            }
        }
    }

    #[test]
    fn only_page_routes_have_a_boot_log() {
        assert_eq!(log_for_route("about")[0], "Resolving route /about");
        assert!(log_for_route("notfound").is_empty());
        assert!(log_for_route("discord").is_empty());
    }

    #[test]
    fn prompt_cannot_open_during_a_transition() {
        let mut m = Machine::new();
        assert!(m.begin_transition());
        assert!(!m.open_prompt());
        assert!(!m.begin_transition());
        m.end_transition();
        assert!(m.open_prompt());
        assert_eq!(m.state(), State::PromptOpen);
    }

    #[test]
    fn prompt_opens_once_and_closes_once() {
        let mut m = Machine::new();
        assert!(m.open_prompt());
        assert!(!m.open_prompt());
        assert!(m.close_prompt());
        assert!(!m.close_prompt());
        assert_eq!(m.state(), State::Idle);
    }

    #[test]
    fn running_a_route_from_the_prompt_starts_a_transition() {
        let mut m = Machine::new();
        m.open_prompt();
        assert!(m.begin_transition());
        assert_eq!(m.state(), State::Transitioning);
    }

    #[test]
    fn history_walks_back_and_returns_to_live_input() {
        let mut m = Machine::new();
        assert_eq!(m.history_prev(), None);
        m.remember("/about");
        m.remember("/tools");
        assert_eq!(m.history_prev(), Some("/tools"));
        assert_eq!(m.history_prev(), Some("/about"));
        assert_eq!(m.history_prev(), Some("/about"));
        assert_eq!(m.history_next(), Some("/tools"));
        assert_eq!(m.history_next(), None);
        assert_eq!(m.history_next(), None);
    }
}
