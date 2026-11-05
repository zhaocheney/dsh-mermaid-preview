/*! dsh-mermaid-preview v0.2.0 | MIT */
window.__ModuleLoader__.load({
  id: "dsh-mermaid-preview",
  factory(require) {
    var module = { exports: {} };
    var exports = module.exports;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client.jsx
var client_exports = {};
__export(client_exports, {
  createPlugin: () => createPlugin
});
module.exports = __toCommonJS(client_exports);
var React2 = __toESM(require("react"), 1);
var import_react_dom = require("react-dom");

// locale/en.json
var en_default = {
  meta: {
    title: "Mermaid preview",
    description: "Adds a preview button to Mermaid code blocks and opens the rendered diagram in a zoomable, pannable window."
  },
  ui: {
    preview: "Preview Mermaid diagram",
    dialogTitle: "Mermaid preview",
    close: "Close",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    fit: "Fit to window",
    zoomLevel: "Zoom level",
    loading: "Rendering diagram\u2026",
    errorTitle: "Could not render this Mermaid diagram",
    retry: "Retry",
    hint: "Drag to pan \xB7 Scroll or pinch to zoom",
    empty: "No Mermaid code found.",
    resize: "Drag to resize the window"
  }
};

// locale/zh.json
var zh_default = {
  meta: {
    title: "Mermaid \u9884\u89C8",
    description: "\u5728 Mermaid \u4EE3\u7801\u5757\u4E0A\u6DFB\u52A0\u9884\u89C8\u6309\u94AE\uFF0C\u5E76\u5728\u53EF\u7F29\u653E\u3001\u53EF\u62D6\u62FD\u7684\u7A97\u53E3\u4E2D\u6253\u5F00\u6E32\u67D3\u540E\u7684\u56FE\u8868\u3002"
  },
  ui: {
    preview: "\u9884\u89C8 Mermaid \u56FE",
    dialogTitle: "Mermaid \u9884\u89C8",
    close: "\u5173\u95ED",
    zoomIn: "\u653E\u5927",
    zoomOut: "\u7F29\u5C0F",
    fit: "\u9002\u5E94\u7A97\u53E3",
    zoomLevel: "\u7F29\u653E\u6BD4\u4F8B",
    loading: "\u6B63\u5728\u6E32\u67D3\u56FE\u8868\u2026",
    errorTitle: "\u65E0\u6CD5\u6E32\u67D3\u6B64 Mermaid \u56FE",
    retry: "\u91CD\u8BD5",
    hint: "\u62D6\u62FD\u5E73\u79FB \xB7 \u6EDA\u8F6E\u6216\u53CC\u6307\u7F29\u653E",
    empty: "\u672A\u627E\u5230 Mermaid \u4EE3\u7801\u3002",
    resize: "\u62D6\u52A8\u8C03\u6574\u7A97\u53E3\u5927\u5C0F"
  }
};

// src/icons.jsx
var React = __toESM(require("react"), 1);
var stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function PreviewIcon() {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { ...stroke, d: "M2.75 12S6.5 6.5 12 6.5 21.25 12 21.25 12 17.5 17.5 12 17.5 2.75 12 2.75 12Z" }), /* @__PURE__ */ React.createElement("circle", { ...stroke, cx: "12", cy: "12", r: "2.75" }));
}
function ZoomInIcon() {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("circle", { ...stroke, cx: "10.5", cy: "10.5", r: "6.5" }), /* @__PURE__ */ React.createElement("path", { ...stroke, d: "m15.5 15.5 5 5M7.5 10.5h6M10.5 7.5v6" }));
}
function ZoomOutIcon() {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("circle", { ...stroke, cx: "10.5", cy: "10.5", r: "6.5" }), /* @__PURE__ */ React.createElement("path", { ...stroke, d: "m15.5 15.5 5 5M7.5 10.5h6" }));
}
function FitIcon() {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { ...stroke, d: "M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" }));
}
function ResizeIcon() {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 16 16", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { ...stroke, strokeWidth: 1.4, d: "M14 6 6 14M14 10.5 10.5 14" }));
}
function CloseIcon() {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { ...stroke, d: "m6 6 12 12M18 6 6 18" }));
}

// src/styles.js
var STYLE = `
.dsh-mermaid-preview-layer {
  position: fixed;
  inset: 0;
  z-index: 900;
  pointer-events: none;
}
.dsh-mermaid-preview-trigger {
  position: fixed;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: var(--dsw-radius-sm, 6px);
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
  pointer-events: auto;
}
.dsh-mermaid-preview-trigger:hover {
  background: var(--dsw-alias-interactive-bg-hover);
}
.dsh-mermaid-preview-trigger:focus-visible {
  outline: 1px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}
.dsh-mermaid-preview-trigger > svg {
  display: block;
  width: 14px;
  height: 14px;
}

.dsh-mermaid-preview-tooltip {
  position: fixed;
  z-index: 1001;
  padding: 3px 7px;
  border-radius: var(--dsw-radius-sm, 6px);
  background: var(--dsw-alias-tooltip-bg, #1f1f1f);
  color: var(--dsw-static-neutral-bluish-00, #fff);
  font-family: var(--dsw-font-family);
  font-size: 13px;
  line-height: 20px;
  white-space: nowrap;
  pointer-events: none;
  transform: translate(-50%, -100%);
  animation: dsh-mermaid-preview-tooltip-in 150ms var(--ds-ease-in-out, ease);
}
@keyframes dsh-mermaid-preview-tooltip-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.dsh-mermaid-preview-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(40px + var(--dsh-frame-chrome-top, 0px)) 40px 40px;
  background: var(--dsw-alias-bg-mask-1, rgba(0, 0, 0, 0.45));
  backdrop-filter: var(--dsw-mask-blur, blur(2px));
}
.dsh-mermaid-preview-dialog {
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(1600px, 92vw);
  height: min(1000px, 90vh);
  max-width: calc(100vw - 80px);
  max-height: calc(100vh - 80px - var(--dsh-frame-chrome-top, 0px));
  overflow: hidden;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: var(--dsw-radius-lg, 10px);
  background: var(--dsw-alias-bg-overlay);
  box-shadow: var(--dsw-elevation-prominent, 0 24px 80px rgba(0, 0, 0, 0.3));
  color: var(--dsw-alias-label-primary);
  font-family: var(--dsw-font-family);
}
.dsh-mermaid-preview-resizer {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 22px;
  height: 22px;
  padding: 3px;
  color: var(--dsw-alias-label-secondary);
  cursor: nwse-resize;
  opacity: 0.55;
  touch-action: none;
}
.dsh-mermaid-preview-resizer:hover,
.dsh-mermaid-preview-resizer:focus-visible {
  color: var(--dsw-alias-label-primary);
  opacity: 1;
}
.dsh-mermaid-preview-resizer > svg {
  display: block;
  width: 14px;
  height: 14px;
}
.dsh-mermaid-preview-dialog[data-resizing="true"] {
  cursor: nwse-resize;
  user-select: none;
}
.dsh-mermaid-preview-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px 10px 16px;
  border-bottom: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-overlay);
}
.dsh-mermaid-preview-title {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dsh-mermaid-preview-controls {
  display: flex;
  flex: none;
  align-items: center;
  gap: 2px;
}
.dsh-mermaid-preview-zoom {
  min-width: 46px;
  padding: 0 4px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  line-height: 28px;
  text-align: center;
}
.dsh-mermaid-preview-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: var(--dsw-radius-sm, 6px);
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
  line-height: 0;
}
.dsh-mermaid-preview-icon-button:hover:not(:disabled) {
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-primary);
}
.dsh-mermaid-preview-icon-button:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 1px;
}
.dsh-mermaid-preview-icon-button:disabled {
  cursor: default;
  opacity: 0.4;
}
.dsh-mermaid-preview-icon-button > svg {
  display: block;
  width: 16px;
  height: 16px;
}
.dsh-mermaid-preview-viewport {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background: var(--dsw-alias-bg-layer-2);
  cursor: grab;
  touch-action: none;
  user-select: none;
}
.dsh-mermaid-preview-viewport[data-dragging="true"] {
  cursor: grabbing;
}
.dsh-mermaid-preview-stage {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
  will-change: transform;
}
.dsh-mermaid-preview-stage > svg {
  display: block;
  margin: 0;
}
.dsh-mermaid-preview-status {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
  color: var(--dsw-alias-label-secondary);
  font-size: 13px;
  line-height: 20px;
  text-align: center;
}
.dsh-mermaid-preview-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--dsw-alias-border-l2);
  border-top-color: var(--dsw-alias-brand-primary);
  border-radius: 50%;
  animation: dsh-mermaid-preview-spin 900ms linear infinite;
}
@keyframes dsh-mermaid-preview-spin {
  to { transform: rotate(360deg); }
}
.dsh-mermaid-preview-error {
  width: min(620px, 100%);
  padding: 24px;
  text-align: left;
}
.dsh-mermaid-preview-error h2 {
  margin: 0 0 10px;
  color: var(--dsw-alias-label-primary);
  font-size: 14px;
  font-weight: 600;
}
.dsh-mermaid-preview-error pre {
  max-height: 260px;
  margin: 0 0 16px;
  padding: 10px 12px;
  overflow: auto;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: var(--dsw-radius-md, 8px);
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-state-error-primary);
  font-family: var(--ds-font-family-code, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 12px;
  line-height: 18px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  user-select: text;
}
.dsh-mermaid-preview-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  padding: 0 12px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: var(--dsw-radius-sm, 6px);
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}
.dsh-mermaid-preview-action:hover {
  background: var(--dsw-alias-bg-layer-2);
}
.dsh-mermaid-preview-hint {
  position: absolute;
  bottom: 12px;
  left: 50%;
  padding: 3px 10px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 999px;
  background: var(--dsw-alias-bg-overlay);
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 16px;
  pointer-events: none;
  transform: translateX(-50%);
  white-space: nowrap;
}
@media (max-width: 720px) {
  .dsh-mermaid-preview-backdrop {
    padding: 0;
  }
  .dsh-mermaid-preview-dialog {
    width: 100vw !important;
    height: 100vh !important;
    max-width: none;
    max-height: none;
    border: 0;
    border-radius: 0;
  }
  .dsh-mermaid-preview-resizer {
    display: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .dsh-mermaid-preview-tooltip,
  .dsh-mermaid-preview-spinner {
    animation: none;
  }
}
`;

// src/client.jsx
var {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore
} = React2;
var NS = "dsh-mermaid-preview";
var LAYER_SELECTOR = "[data-dsh-mermaid-preview-layer]";
var TRIGGER_SIZE = 24;
var TRIGGER_GAP = 4;
var BANNER_PADDING = 14;
var MIN_SCALE = 0.08;
var MAX_SCALE = 8;
var FIT_MAX_SCALE = 2;
var DIALOG_SIZE_KEY = "dsh-mermaid-preview:dialog-size";
var MIN_DIALOG_WIDTH = 520;
var MIN_DIALOG_HEIGHT = 360;
var MOBILE_BREAKPOINT = 720;
var VIEWPORT_GUTTER = 80;
var MUTATION_SCAN_DELAY = 120;
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
function frameChromeTop() {
  try {
    const value = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--dsh-frame-chrome-top")
    );
    return Number.isFinite(value) ? value : 0;
  } catch {
    return 0;
  }
}
function dialogBounds() {
  return {
    maxWidth: Math.max(MIN_DIALOG_WIDTH, window.innerWidth - VIEWPORT_GUTTER),
    maxHeight: Math.max(MIN_DIALOG_HEIGHT, window.innerHeight - VIEWPORT_GUTTER - frameChromeTop())
  };
}
function readStoredDialogSize() {
  if (typeof window === "undefined" || window.innerWidth <= MOBILE_BREAKPOINT) return null;
  try {
    const raw = window.localStorage.getItem(DIALOG_SIZE_KEY);
    if (raw === null) return null;
    const parsed = JSON.parse(raw);
    const width = Number(parsed?.width);
    const height = Number(parsed?.height);
    if (!Number.isFinite(width) || !Number.isFinite(height)) return null;
    const bounds = dialogBounds();
    return {
      width: clamp(width, MIN_DIALOG_WIDTH, bounds.maxWidth),
      height: clamp(height, MIN_DIALOG_HEIGHT, bounds.maxHeight)
    };
  } catch {
    return null;
  }
}
function storeDialogSize(size) {
  try {
    window.localStorage.setItem(DIALOG_SIZE_KEY, JSON.stringify(size));
  } catch {
  }
}
function isMermaidCode(code) {
  for (const name of code.classList) {
    if (name.toLowerCase() === "language-mermaid") return true;
  }
  return false;
}
var MERMAID_HEADER = /^(?:graph\b|flowchart\b|sequenceDiagram\b|classDiagram(?:-v2)?\b|stateDiagram(?:-v2)?\b|erDiagram\b|journey\b|gantt\b|pie\b|gitGraph\b|mindmap\b|timeline\b|quadrantChart\b|xychart(?:-beta)?\b|sankey(?:-beta)?\b|block(?:-beta)?\b|packet(?:-beta)?\b|kanban\b|architecture(?:-beta)?\b|C4(?:Context|Container|Component|Dynamic|Deployment)\b|requirementDiagram\b|zenuml\b)/;
function firstMermaidStatement(source) {
  const lines = source.split(/\r?\n/u);
  let index = 0;
  const skipNoise = () => {
    while (index < lines.length) {
      const line = lines[index].trim();
      if (line !== "" && !line.startsWith("%%")) return;
      index += 1;
    }
  };
  skipNoise();
  if (lines[index]?.trim() === "---") {
    index += 1;
    while (index < lines.length && lines[index].trim() !== "---") index += 1;
    index += 1;
    skipNoise();
  }
  return lines[index]?.trim() ?? "";
}
function looksLikeMermaid(source) {
  return MERMAID_HEADER.test(firstMermaidStatement(source));
}
function mermaidCodeOf(block) {
  return block.querySelector("[data-code-block-content] code, pre code")?.textContent ?? "";
}
function sameTriggers(left, right) {
  if (left.length !== right.length) return false;
  for (let index = 0; index < left.length; index += 1) {
    if (left[index].key !== right[index].key) return false;
  }
  return true;
}
function triggerRectFor(block) {
  const banner = block.querySelector("[data-code-block-banner]");
  if (banner === null) return null;
  const buttons = banner.querySelectorAll("button");
  const action = buttons.length === 0 ? null : buttons[0];
  const anchor = action?.getBoundingClientRect() ?? banner.getBoundingClientRect();
  if (anchor.width <= 0 || anchor.height <= 0) return null;
  const top = anchor.top + (anchor.height - TRIGGER_SIZE) / 2;
  const left = action === null ? anchor.right - BANNER_PADDING - TRIGGER_SIZE : anchor.left - TRIGGER_GAP - TRIGGER_SIZE;
  if (left < 0 || top < 0) return null;
  if (left + TRIGGER_SIZE > window.innerWidth || top + TRIGGER_SIZE > window.innerHeight) return null;
  const hit = document.elementFromPoint(
    anchor.left + anchor.width / 2,
    anchor.top + anchor.height / 2
  );
  if (hit === null) return null;
  const ownSurface = hit.closest(LAYER_SELECTOR) ?? hit.closest("[data-dsh-mermaid-preview-backdrop]");
  if (!block.contains(hit) && ownSurface === null) return null;
  const stack = document.elementsFromPoint(left + TRIGGER_SIZE / 2, top + TRIGGER_SIZE / 2);
  const under = stack.find((element) => element.closest(LAYER_SELECTOR) === null && element.closest("[data-dsh-mermaid-preview-backdrop]") === null);
  if (under !== void 0 && !block.contains(under)) return null;
  return { top, left };
}
function naturalSizeOf(svg) {
  const viewBox = svg?.viewBox?.baseVal;
  if (viewBox !== void 0 && viewBox.width > 0 && viewBox.height > 0) {
    return { width: viewBox.width, height: viewBox.height };
  }
  const width = Number.parseFloat(svg?.getAttribute("width") ?? "");
  const height = Number.parseFloat(svg?.getAttribute("height") ?? "");
  if (Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0) {
    return { width, height };
  }
  const rect = svg?.getBoundingClientRect();
  if (rect !== void 0 && rect.width > 0 && rect.height > 0) {
    return { width: rect.width, height: rect.height };
  }
  return { width: 800, height: 600 };
}
function prepareSvg(stage) {
  const svg = stage.querySelector("svg");
  if (svg === null) return null;
  const size = naturalSizeOf(svg);
  svg.setAttribute("width", String(size.width));
  svg.setAttribute("height", String(size.height));
  svg.style.display = "block";
  svg.style.maxWidth = "none";
  svg.style.width = `${size.width}px`;
  svg.style.height = `${size.height}px`;
  svg.style.backgroundColor = "transparent";
  stage.style.width = `${size.width}px`;
  stage.style.height = `${size.height}px`;
  return size;
}
function trapFocus(event, dialog) {
  if (dialog === null) return;
  const focusable = Array.from(dialog.querySelectorAll(
    'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
  )).filter((element) => element.isConnected && element.getClientRects().length > 0);
  if (focusable.length === 0) {
    event.preventDefault();
    dialog.focus();
    return;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;
  if (event.shiftKey) {
    if (active === first || !dialog.contains(active)) {
      event.preventDefault();
      last.focus();
    }
  } else if (active === last || !dialog.contains(active)) {
    event.preventDefault();
    first.focus();
  }
}
function createMermaidRenderer(loadChunk) {
  let modulePromise;
  let queue = Promise.resolve();
  let sequence = 0;
  let initializedKey;
  const load = () => {
    if (modulePromise === void 0) {
      modulePromise = Promise.resolve().then(loadChunk).then((chunk) => {
        const api = chunk?.mermaid ?? chunk?.default ?? chunk;
        if (api === null || typeof api !== "object" || typeof api.initialize !== "function" || typeof api.render !== "function") {
          throw new Error("The bundled Mermaid module did not expose initialize/render.");
        }
        return api;
      }).catch((error) => {
        modulePromise = void 0;
        throw error;
      });
    }
    return modulePromise;
  };
  const run = async (code, colorScheme) => {
    const mermaid = await load();
    const theme = colorScheme === "dark" ? "dark" : "default";
    const fontFamily = getComputedStyle(document.body).fontFamily;
    const initKey = `${theme}\0${fontFamily}`;
    if (initializedKey !== initKey) {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        suppressErrorRendering: true,
        theme,
        themeVariables: { background: "transparent" },
        fontFamily
      });
      initializedKey = initKey;
    }
    sequence += 1;
    const id = `dsh-mermaid-preview-${Date.now().toString(36)}-${sequence}`;
    try {
      const result = await mermaid.render(id, code);
      return {
        svg: result.svg,
        bindFunctions: typeof result.bindFunctions === "function" ? result.bindFunctions : void 0
      };
    } finally {
      document.getElementById(id)?.remove();
    }
  };
  return (code, colorScheme) => {
    const result = queue.then(() => run(code, colorScheme));
    queue = result.catch(() => {
    });
    return result;
  };
}
function useLocaleRevision(locale) {
  const subscribe = useCallback((onChange) => locale.subscribe(onChange), [locale]);
  return useSyncExternalStore(subscribe, () => locale.getSnapshot(), () => locale.getSnapshot());
}
function useColorScheme(ctx) {
  const theme = ctx.get("theme");
  const subscribe = useCallback(
    (onChange) => theme === void 0 ? () => {
    } : ctx.on("theme/change", onChange),
    [ctx, theme]
  );
  const snapshot = useSyncExternalStore(
    subscribe,
    () => theme === void 0 ? void 0 : theme.getTheme(),
    () => theme === void 0 ? void 0 : theme.getTheme()
  );
  return snapshot?.active?.colorScheme === "dark" ? "dark" : "light";
}
function TriggerLayer({ onOpen, suspended, t }) {
  const [entries, setEntries] = useState([]);
  const [tip, setTip] = useState(null);
  const idsRef = useRef(/* @__PURE__ */ new WeakMap());
  const sequenceRef = useRef(0);
  const tipTimerRef = useRef(0);
  const entriesRef = useRef(entries);
  const buttonsRef = useRef(/* @__PURE__ */ new Map());
  const suspendedRef = useRef(suspended);
  const scheduleRef = useRef(() => {
  });
  useLayoutEffect(() => {
    entriesRef.current = entries;
  }, [entries]);
  const hideTip = useCallback(() => {
    window.clearTimeout(tipTimerRef.current);
    tipTimerRef.current = 0;
    setTip(null);
  }, []);
  const showTip = useCallback((entry, element) => {
    window.clearTimeout(tipTimerRef.current);
    tipTimerRef.current = window.setTimeout(() => {
      if (!element.isConnected) return;
      const rect = element.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      setTip({
        key: entry.key,
        label: t("preview"),
        left: rect.left + rect.width / 2,
        top: rect.top - 6
      });
    }, 320);
  }, [t]);
  useEffect(() => () => window.clearTimeout(tipTimerRef.current), []);
  useEffect(() => {
    if (tip === null) return void 0;
    const hide = () => hideTip();
    window.addEventListener("scroll", hide, true);
    window.addEventListener("wheel", hide, { passive: true, capture: true });
    window.addEventListener("resize", hide);
    return () => {
      window.removeEventListener("scroll", hide, true);
      window.removeEventListener("wheel", hide, true);
      window.removeEventListener("resize", hide);
    };
  }, [tip, hideTip]);
  useEffect(() => {
    if (tip === null) return;
    if (!entries.some((entry) => entry.key === tip.key)) setTip(null);
  }, [entries, tip]);
  useEffect(() => {
    suspendedRef.current = suspended;
    if (suspended) {
      hideTip();
      return;
    }
    scheduleRef.current();
  }, [suspended, hideTip]);
  useEffect(() => {
    let frame = 0;
    let mutationTimer = 0;
    let disposed = false;
    let resizeObserver;
    const observed = /* @__PURE__ */ new Set();
    const dirty = /* @__PURE__ */ new WeakSet();
    const idFor = (block) => {
      let id = idsRef.current.get(block);
      if (id === void 0) {
        sequenceRef.current += 1;
        id = sequenceRef.current;
        idsRef.current.set(block, id);
      }
      return id;
    };
    const verdicts = /* @__PURE__ */ new WeakMap();
    const isMermaidBlock = (block) => {
      const cached = verdicts.get(block);
      if (cached !== void 0 && !dirty.has(block)) return cached;
      const code = block.querySelector("[data-code-block-content] code");
      const mermaid = code !== null && isMermaidCode(code) ? true : looksLikeMermaid(mermaidCodeOf(block));
      verdicts.set(block, mermaid);
      dirty.delete(block);
      return mermaid;
    };
    const blockOfNode = (node) => {
      const element = node instanceof Element ? node : node.parentElement;
      return element?.closest("[data-code-block-content]")?.parentElement ?? null;
    };
    const applyPositions = (next) => {
      for (const item of next) {
        const button = buttonsRef.current.get(item.key);
        if (button === void 0) continue;
        const left = `${item.left}px`;
        const top = `${item.top}px`;
        const visibility = item.visible ? "visible" : "hidden";
        if (button.style.left !== left) button.style.left = left;
        if (button.style.top !== top) button.style.top = top;
        if (button.style.visibility !== visibility) button.style.visibility = visibility;
      }
    };
    const scan = () => {
      frame = 0;
      if (disposed || suspendedRef.current) return;
      const next = [];
      const current = /* @__PURE__ */ new Set();
      for (const content of document.querySelectorAll("[data-code-block-content]")) {
        const block = content.parentElement;
        if (block === null || block.querySelector("[data-code-block-banner]") === null) continue;
        if (!isMermaidBlock(block)) continue;
        const rect = triggerRectFor(block);
        next.push({
          key: idFor(block),
          block,
          top: rect?.top ?? 0,
          left: rect?.left ?? 0,
          visible: rect !== null
        });
        current.add(block);
        if (!observed.has(block)) {
          observed.add(block);
          resizeObserver?.observe(block);
        }
      }
      for (const block of observed) {
        if (current.has(block)) continue;
        observed.delete(block);
        resizeObserver?.unobserve(block);
      }
      if (sameTriggers(entriesRef.current, next)) {
        for (let index = 0; index < next.length; index += 1) {
          const entry = entriesRef.current[index];
          entry.top = next[index].top;
          entry.left = next[index].left;
          entry.visible = next[index].visible;
        }
        applyPositions(next);
        return;
      }
      setEntries(next);
    };
    const schedule = () => {
      if (disposed || frame !== 0 || suspendedRef.current) return;
      frame = requestAnimationFrame(scan);
    };
    scheduleRef.current = schedule;
    if (typeof ResizeObserver === "function") {
      resizeObserver = new ResizeObserver(schedule);
    }
    const mutationObserver = new MutationObserver((records) => {
      for (const record of records) {
        const block = blockOfNode(record.target);
        if (block !== null) dirty.add(block);
        if (record.type !== "childList") continue;
        for (const node of record.addedNodes) {
          const added = blockOfNode(node);
          if (added !== null) dirty.add(added);
        }
      }
      if (suspendedRef.current) return;
      if (mutationTimer !== 0) return;
      mutationTimer = window.setTimeout(() => {
        mutationTimer = 0;
        schedule();
      }, MUTATION_SCAN_DELAY);
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["class"]
    });
    window.addEventListener("scroll", schedule, true);
    window.addEventListener("resize", schedule);
    window.addEventListener("transitionend", schedule, true);
    window.addEventListener("animationend", schedule, true);
    window.visualViewport?.addEventListener("scroll", schedule);
    window.visualViewport?.addEventListener("resize", schedule);
    document.fonts?.ready.then(schedule).catch(() => {
    });
    schedule();
    return () => {
      disposed = true;
      scheduleRef.current = () => {
      };
      if (frame !== 0) cancelAnimationFrame(frame);
      window.clearTimeout(mutationTimer);
      mutationObserver.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("transitionend", schedule, true);
      window.removeEventListener("animationend", schedule, true);
      window.visualViewport?.removeEventListener("scroll", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
    };
  }, []);
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, (0, import_react_dom.createPortal)(
    /* @__PURE__ */ React2.createElement("div", { className: "dsh-mermaid-preview-layer", "data-dsh-mermaid-preview-layer": "" }, entries.map((entry) => /* @__PURE__ */ React2.createElement(
      "button",
      {
        key: entry.key,
        ref: (element) => {
          if (element === null) buttonsRef.current.delete(entry.key);
          else buttonsRef.current.set(entry.key, element);
        },
        type: "button",
        className: "dsh-mermaid-preview-trigger",
        style: {
          top: entry.top,
          left: entry.left,
          visibility: entry.visible ? "visible" : "hidden"
        },
        "aria-label": t("preview"),
        onPointerDown: (event) => event.stopPropagation(),
        onPointerEnter: (event) => showTip(entry, event.currentTarget),
        onPointerLeave: hideTip,
        onFocus: (event) => showTip(entry, event.currentTarget),
        onBlur: hideTip,
        onClick: (event) => {
          event.preventDefault();
          event.stopPropagation();
          hideTip();
          onOpen(entry.block);
        }
      },
      /* @__PURE__ */ React2.createElement(PreviewIcon, null)
    ))),
    document.body
  ), tip === null ? null : (0, import_react_dom.createPortal)(
    /* @__PURE__ */ React2.createElement(
      "div",
      {
        className: "dsh-mermaid-preview-tooltip",
        role: "tooltip",
        style: { left: tip.left, top: tip.top }
      },
      tip.label
    ),
    document.body
  ));
}
function PreviewDialog({ code, colorScheme, onClose, renderMermaid, t }) {
  const titleId = useId();
  const hintId = useId();
  const dialogRef = useRef(null);
  const viewportRef = useRef(null);
  const stageRef = useRef(null);
  const bindFunctionsRef = useRef(void 0);
  const pointersRef = useRef(/* @__PURE__ */ new Map());
  const gestureRef = useRef(null);
  const movedRef = useRef(false);
  const userAdjustedRef = useRef(false);
  const [status, setStatus] = useState(code.trim() === "" ? "empty" : "loading");
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");
  const [reloadToken, setReloadToken] = useState(0);
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const [fitted, setFitted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dialogSize, setDialogSize] = useState(readStoredDialogSize);
  const [resizing, setResizing] = useState(false);
  const viewRef = useRef(view);
  const dialogSizeRef = useRef(dialogSize);
  const resizeRef = useRef(null);
  useLayoutEffect(() => {
    viewRef.current = view;
  }, [view]);
  useLayoutEffect(() => {
    dialogSizeRef.current = dialogSize;
  }, [dialogSize]);
  const fit = useCallback(() => {
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    if (viewport === null || stage === null) return;
    const size = prepareSvg(stage);
    if (size === null) return;
    const width = viewport.clientWidth;
    const height = viewport.clientHeight;
    if (width <= 0 || height <= 0) return;
    const padding = width < 480 ? 16 : 32;
    const scale = clamp(
      Math.min((width - padding * 2) / size.width, (height - padding * 2) / size.height),
      MIN_SCALE,
      FIT_MAX_SCALE
    );
    userAdjustedRef.current = false;
    setView({
      scale,
      x: (width - size.width * scale) / 2,
      y: (height - size.height * scale) / 2
    });
    setFitted(true);
  }, []);
  const zoomAt = useCallback((clientX, clientY, factor) => {
    const viewport = viewportRef.current;
    if (viewport === null) return;
    const rect = viewport.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    userAdjustedRef.current = true;
    setView((current) => {
      const scale = clamp(current.scale * factor, MIN_SCALE, MAX_SCALE);
      const ratio = scale / current.scale;
      return {
        scale,
        x: x - (x - current.x) * ratio,
        y: y - (y - current.y) * ratio
      };
    });
  }, []);
  const zoomBy = useCallback((factor) => {
    const viewport = viewportRef.current;
    if (viewport === null) return;
    const rect = viewport.getBoundingClientRect();
    zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, factor);
  }, [zoomAt]);
  useEffect(() => {
    if (code.trim() === "") {
      setStatus("empty");
      setSvg("");
      setError("");
      setFitted(false);
      return void 0;
    }
    let cancelled = false;
    setStatus("loading");
    setSvg("");
    setError("");
    setFitted(false);
    bindFunctionsRef.current = void 0;
    renderMermaid(code, colorScheme).then((result) => {
      if (cancelled) return;
      bindFunctionsRef.current = result.bindFunctions;
      setSvg(result.svg);
      setStatus("ready");
    }).catch((reason) => {
      if (cancelled) return;
      bindFunctionsRef.current = void 0;
      setError(reason instanceof Error ? reason.message : String(reason));
      setStatus("error");
    });
    return () => {
      cancelled = true;
    };
  }, [code, colorScheme, reloadToken, renderMermaid]);
  useLayoutEffect(() => {
    if (status !== "ready" || svg === "") return void 0;
    const stage = stageRef.current;
    if (stage === null) return void 0;
    prepareSvg(stage);
    if (bindFunctionsRef.current !== void 0) {
      try {
        bindFunctionsRef.current(stage);
      } catch (reason) {
        console.error("dsh-mermaid-preview: mermaid bindFunctions failed", reason);
      }
    }
    const frame = requestAnimationFrame(fit);
    return () => cancelAnimationFrame(frame);
  }, [svg, status, fit]);
  useEffect(() => {
    if (status !== "ready") return void 0;
    const viewport = viewportRef.current;
    if (viewport === null || typeof ResizeObserver !== "function") return void 0;
    const observer = new ResizeObserver(() => {
      if (!userAdjustedRef.current) fit();
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [status, fit]);
  useEffect(() => {
    if (status !== "ready") return void 0;
    const viewport = viewportRef.current;
    if (viewport === null) return void 0;
    let frame = 0;
    let pending = null;
    const onWheel = (event) => {
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 100 : 1;
      if (pending === null) pending = { x: event.clientX, y: event.clientY, delta: 0 };
      pending.x = event.clientX;
      pending.y = event.clientY;
      pending.delta += event.deltaY * unit;
      if (frame !== 0) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const batch = pending;
        pending = null;
        if (batch === null || batch.delta === 0) return;
        zoomAt(batch.x, batch.y, Math.exp(-batch.delta * 15e-4));
      });
    };
    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      viewport.removeEventListener("wheel", onWheel);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, [status, zoomAt]);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previous = document.activeElement;
    const closeButton = dialog?.querySelector("[data-dsh-mermaid-preview-autofocus]");
    if (closeButton instanceof HTMLElement) closeButton.focus();
    const onKeyDown = (event) => {
      if (event.defaultPrevented) return;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key === "Tab") {
        trapFocus(event, dialog);
        return;
      }
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        zoomBy(1.2);
      } else if (event.key === "-" || event.key === "_") {
        event.preventDefault();
        zoomBy(1 / 1.2);
      } else if (event.key === "0") {
        event.preventDefault();
        fit();
      }
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus();
    };
  }, [onClose, zoomBy, fit]);
  const startGesture = useCallback(() => {
    const points = Array.from(pointersRef.current.values());
    const start = viewRef.current;
    if (points.length === 1) {
      gestureRef.current = { mode: "pan", point: points[0], start };
      return;
    }
    if (points.length === 2) {
      const [a, b] = points;
      gestureRef.current = {
        mode: "pinch",
        distance: Math.hypot(a.x - b.x, a.y - b.y),
        center: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
        start
      };
      return;
    }
    gestureRef.current = null;
  }, []);
  const onPointerDown = (event) => {
    if (status !== "ready") return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const viewport = viewportRef.current;
    if (viewport === null) return;
    event.preventDefault();
    try {
      viewport.setPointerCapture(event.pointerId);
    } catch {
    }
    const rect = viewport.getBoundingClientRect();
    pointersRef.current.set(event.pointerId, {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
    movedRef.current = false;
    startGesture();
    setDragging(true);
  };
  const onPointerMove = (event) => {
    const viewport = viewportRef.current;
    if (viewport === null || !pointersRef.current.has(event.pointerId)) return;
    const rect = viewport.getBoundingClientRect();
    pointersRef.current.set(event.pointerId, {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
    const gesture = gestureRef.current;
    if (gesture === null) return;
    const points = Array.from(pointersRef.current.values());
    if (gesture.mode === "pan" && points.length === 1) {
      const point = points[0];
      if (Math.hypot(point.x - gesture.point.x, point.y - gesture.point.y) > 2) {
        movedRef.current = true;
      }
      userAdjustedRef.current = true;
      setView({
        scale: gesture.start.scale,
        x: gesture.start.x + point.x - gesture.point.x,
        y: gesture.start.y + point.y - gesture.point.y
      });
      return;
    }
    if (gesture.mode === "pinch" && points.length === 2) {
      const [a, b] = points;
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (!Number.isFinite(distance) || distance <= 0) return;
      const center = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const scale = clamp(gesture.start.scale * (distance / gesture.distance), MIN_SCALE, MAX_SCALE);
      const ratio = scale / gesture.start.scale;
      movedRef.current = true;
      userAdjustedRef.current = true;
      setView({
        scale,
        x: center.x - ratio * (gesture.center.x - gesture.start.x),
        y: center.y - ratio * (gesture.center.y - gesture.start.y)
      });
    }
  };
  const onPointerEnd = (event) => {
    pointersRef.current.delete(event.pointerId);
    if (pointersRef.current.size === 0) {
      gestureRef.current = null;
      setDragging(false);
      window.setTimeout(() => {
        movedRef.current = false;
      }, 0);
      return;
    }
    startGesture();
  };
  const onClickCapture = (event) => {
    if (!movedRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    movedRef.current = false;
  };
  const closeOnBackdrop = (event) => {
    if (event.target === event.currentTarget) onClose();
  };
  const onResizeStart = useCallback((event) => {
    if (event.button !== 0) return;
    const dialog = dialogRef.current;
    if (dialog === null) return;
    const rect = dialog.getBoundingClientRect();
    resizeRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      width: rect.width,
      height: rect.height,
      ...dialogBounds()
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
    event.stopPropagation();
    setResizing(true);
  }, []);
  const onResizeMove = useCallback((event) => {
    const session = resizeRef.current;
    if (session === null || session.pointerId !== event.pointerId) return;
    const next = {
      width: clamp(session.width + (event.clientX - session.startX) * 2, MIN_DIALOG_WIDTH, session.maxWidth),
      height: clamp(session.height + (event.clientY - session.startY) * 2, MIN_DIALOG_HEIGHT, session.maxHeight)
    };
    dialogSizeRef.current = next;
    setDialogSize(next);
  }, []);
  const onResizeEnd = useCallback((event) => {
    const session = resizeRef.current;
    if (session === null || session.pointerId !== event.pointerId) return;
    resizeRef.current = null;
    setResizing(false);
    if (dialogSizeRef.current !== null) storeDialogSize(dialogSizeRef.current);
  }, []);
  const zoomLabel = `${t("zoomLevel")}: ${Math.round(view.scale * 100)}%`;
  return /* @__PURE__ */ React2.createElement(
    "div",
    {
      className: "dsh-mermaid-preview-backdrop",
      "data-dsh-mermaid-preview-backdrop": "",
      onMouseDown: closeOnBackdrop,
      role: "presentation"
    },
    /* @__PURE__ */ React2.createElement(
      "div",
      {
        ref: dialogRef,
        className: "dsh-mermaid-preview-dialog",
        "data-resizing": resizing ? "true" : "false",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": titleId,
        "aria-describedby": status === "ready" && fitted ? hintId : void 0,
        tabIndex: -1,
        style: dialogSize === null ? void 0 : { width: dialogSize.width, height: dialogSize.height },
        onMouseDown: (event) => event.stopPropagation()
      },
      /* @__PURE__ */ React2.createElement("div", { className: "dsh-mermaid-preview-header" }, /* @__PURE__ */ React2.createElement("div", { className: "dsh-mermaid-preview-title", id: titleId }, t("dialogTitle")), /* @__PURE__ */ React2.createElement("div", { className: "dsh-mermaid-preview-controls" }, /* @__PURE__ */ React2.createElement(
        "button",
        {
          type: "button",
          className: "dsh-mermaid-preview-icon-button",
          title: t("zoomOut"),
          "aria-label": t("zoomOut"),
          disabled: status !== "ready",
          onClick: () => zoomBy(1 / 1.2)
        },
        /* @__PURE__ */ React2.createElement(ZoomOutIcon, null)
      ), /* @__PURE__ */ React2.createElement("span", { className: "dsh-mermaid-preview-zoom", "aria-label": zoomLabel }, Math.round(view.scale * 100), "%"), /* @__PURE__ */ React2.createElement(
        "button",
        {
          type: "button",
          className: "dsh-mermaid-preview-icon-button",
          title: t("zoomIn"),
          "aria-label": t("zoomIn"),
          disabled: status !== "ready",
          onClick: () => zoomBy(1.2)
        },
        /* @__PURE__ */ React2.createElement(ZoomInIcon, null)
      ), /* @__PURE__ */ React2.createElement(
        "button",
        {
          type: "button",
          className: "dsh-mermaid-preview-icon-button",
          title: t("fit"),
          "aria-label": t("fit"),
          disabled: status !== "ready",
          onClick: fit
        },
        /* @__PURE__ */ React2.createElement(FitIcon, null)
      ), /* @__PURE__ */ React2.createElement(
        "button",
        {
          type: "button",
          className: "dsh-mermaid-preview-icon-button",
          title: t("close"),
          "aria-label": t("close"),
          "data-dsh-mermaid-preview-autofocus": "",
          onClick: onClose
        },
        /* @__PURE__ */ React2.createElement(CloseIcon, null)
      ))),
      /* @__PURE__ */ React2.createElement(
        "div",
        {
          ref: viewportRef,
          className: "dsh-mermaid-preview-viewport",
          "data-dragging": dragging ? "true" : "false",
          onPointerDown,
          onPointerMove,
          onPointerUp: onPointerEnd,
          onPointerCancel: onPointerEnd,
          onLostPointerCapture: onPointerEnd,
          onClickCapture,
          onDoubleClick: (event) => {
            event.preventDefault();
            fit();
          }
        },
        status === "ready" ? /* @__PURE__ */ React2.createElement(
          "div",
          {
            ref: stageRef,
            className: "dsh-mermaid-preview-stage",
            style: {
              transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`,
              visibility: fitted ? "visible" : "hidden"
            },
            dangerouslySetInnerHTML: { __html: svg }
          }
        ) : null,
        status === "loading" ? /* @__PURE__ */ React2.createElement("div", { className: "dsh-mermaid-preview-status", role: "status", "aria-live": "polite" }, /* @__PURE__ */ React2.createElement("div", { className: "dsh-mermaid-preview-spinner", "aria-hidden": "true" }), /* @__PURE__ */ React2.createElement("div", null, t("loading"))) : null,
        status === "empty" ? /* @__PURE__ */ React2.createElement("div", { className: "dsh-mermaid-preview-status", role: "status" }, t("empty")) : null,
        status === "error" ? /* @__PURE__ */ React2.createElement("div", { className: "dsh-mermaid-preview-status", role: "alert" }, /* @__PURE__ */ React2.createElement("div", { className: "dsh-mermaid-preview-error" }, /* @__PURE__ */ React2.createElement("h2", null, t("errorTitle")), /* @__PURE__ */ React2.createElement("pre", null, error || t("errorTitle")), /* @__PURE__ */ React2.createElement(
          "button",
          {
            type: "button",
            className: "dsh-mermaid-preview-action",
            onClick: () => setReloadToken((token) => token + 1)
          },
          t("retry")
        ))) : null,
        status === "ready" && fitted ? /* @__PURE__ */ React2.createElement("div", { className: "dsh-mermaid-preview-hint", id: hintId }, t("hint")) : null
      ),
      /* @__PURE__ */ React2.createElement(
        "div",
        {
          className: "dsh-mermaid-preview-resizer",
          "data-dsh-mermaid-preview-resizer": "",
          role: "presentation",
          "aria-hidden": "true",
          title: t("resize"),
          onPointerDown: onResizeStart,
          onPointerMove: onResizeMove,
          onPointerUp: onResizeEnd,
          onPointerCancel: onResizeEnd,
          onLostPointerCapture: onResizeEnd
        },
        /* @__PURE__ */ React2.createElement(ResizeIcon, null)
      )
    )
  );
}
function MermaidPreviewRoot({ ctx, renderMermaid, t }) {
  useLocaleRevision(ctx.locale);
  const colorScheme = useColorScheme(ctx);
  const [preview, setPreview] = useState(null);
  const open = useCallback((block) => {
    const code = mermaidCodeOf(block);
    if (code.trim() === "") return;
    setPreview({ code });
  }, []);
  const close = useCallback(() => setPreview(null), []);
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("style", null, STYLE), /* @__PURE__ */ React2.createElement(TriggerLayer, { onOpen: open, suspended: preview !== null, t }), preview === null ? null : (0, import_react_dom.createPortal)(
    /* @__PURE__ */ React2.createElement(
      PreviewDialog,
      {
        code: preview.code,
        colorScheme,
        onClose: close,
        renderMermaid,
        t
      }
    ),
    document.body
  ));
}
function createPlugin({ loadMermaid }) {
  return {
    inject: ["slots", "locale"],
    apply(ctx) {
      const t = ctx.locale.bind(NS);
      ctx.effect(
        () => ctx.locale.register(NS, { en: en_default.ui, zh: zh_default.ui }),
        `${NS}: dictionaries`
      );
      const renderMermaid = createMermaidRenderer(loadMermaid);
      ctx.slots.inject("shell.overlay", () => ctx.slots.register({
        name: "shell.overlay",
        id: NS,
        order: 10
      }, function MermaidPreviewOverlay() {
        return /* @__PURE__ */ React2.createElement(MermaidPreviewRoot, { ctx, renderMermaid, t });
      }));
    }
  };
}

    return module.exports.createPlugin({
      loadMermaid: () => require.async('./client.mermaid.js'),
    });
  },
});
