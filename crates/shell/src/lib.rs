//! WebAssembly bindings for the site's command shell. The logic lives in `core`.

pub mod core;

use crate::core::{Action, Machine, Parsed};
use wasm_bindgen::prelude::*;

#[wasm_bindgen(getter_with_clone)]
pub struct Suggestion {
    pub name: String,
    pub tag: String,
}

/// `kind` is one of: `empty`, `route`, `external`, `help`, `not_found`.
#[wasm_bindgen(getter_with_clone)]
pub struct Outcome {
    pub kind: String,
    pub command: String,
    pub path: String,
    pub log: Vec<String>,
}

#[wasm_bindgen]
pub struct Shell {
    machine: Machine,
}

impl Default for Shell {
    fn default() -> Self {
        Self::new()
    }
}

#[wasm_bindgen]
impl Shell {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Shell {
        Shell {
            machine: Machine::new(),
        }
    }

    pub fn suggest(&self, query: &str) -> Vec<Suggestion> {
        core::suggest(query)
            .into_iter()
            .map(|c| Suggestion {
                name: c.name.to_string(),
                tag: c.tag.to_string(),
            })
            .collect()
    }

    pub fn ghost(&self, input: &str, selected: Option<String>) -> Option<String> {
        core::ghost(input, selected.as_deref()).map(str::to_string)
    }

    /// Space-separated command names, for `/help`.
    pub fn command_list(&self) -> String {
        core::COMMANDS
            .iter()
            .map(|c| c.name)
            .collect::<Vec<_>>()
            .join("  ")
    }

    pub fn execute(&mut self, raw: &str, selected: Option<String>) -> Outcome {
        let outcome = |kind: &str, command: &str, path: &str, log: &[&str]| Outcome {
            kind: kind.to_string(),
            command: command.to_string(),
            path: path.to_string(),
            log: log.iter().map(|l| l.to_string()).collect(),
        };
        match core::parse(raw, selected.as_deref()) {
            Parsed::Empty => outcome("empty", "", "", &[]),
            Parsed::NotFound(typed) => outcome("not_found", &typed, "", &[]),
            Parsed::Known(command) => {
                self.machine.remember(command.name);
                match command.action {
                    Action::Route { path, log } => outcome("route", command.name, path, log),
                    Action::External => outcome("external", command.name, "", &[]),
                    Action::Help => outcome("help", command.name, "", &[]),
                }
            }
        }
    }

    pub fn route_for_path(&self, path: &str) -> String {
        core::route_for_path(path).to_string()
    }

    pub fn log_for_route(&self, route: &str) -> Vec<String> {
        core::log_for_route(route)
            .iter()
            .map(|line| line.to_string())
            .collect()
    }

    pub fn is_transitioning(&self) -> bool {
        self.machine.state() == core::State::Transitioning
    }

    pub fn open_prompt(&mut self) -> bool {
        self.machine.open_prompt()
    }

    pub fn close_prompt(&mut self) -> bool {
        self.machine.close_prompt()
    }

    pub fn begin_transition(&mut self) -> bool {
        self.machine.begin_transition()
    }

    pub fn end_transition(&mut self) {
        self.machine.end_transition();
    }

    pub fn history_prev(&mut self) -> Option<String> {
        self.machine.history_prev().map(str::to_string)
    }

    pub fn history_next(&mut self) -> Option<String> {
        self.machine.history_next().map(str::to_string)
    }
}
