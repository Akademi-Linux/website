// Pure HTML rendering, shared by the browser and the build-time prerender.
import { renderFooter } from "./components/footer";
import { renderHeader } from "./components/header";
import { TITLES, type RouteId } from "./config";
import { renderAbout } from "./pages/about";
import { renderHome } from "./pages/home";
import { renderNotFound } from "./pages/notfound";
import { renderTools } from "./pages/tools";

export const renderPage: Record<RouteId, () => string> = {
  home: renderHome,
  about: renderAbout,
  tools: renderTools,
  notfound: renderNotFound,
};

// The approved designs only show the footer on Home.
export const footerFor = (route: RouteId): string => (route === "home" ? renderFooter() : "");

export { renderHeader, TITLES };

export const renderApp = (route: RouteId): string => `
  ${renderHeader(route)}
  <main id="view" tabindex="-1" class="relative mx-auto w-full max-w-[1280px] flex-1 px-6 pb-[120px]">${renderPage[route]()}</main>
  <div id="footer">${footerFor(route)}</div>`;
