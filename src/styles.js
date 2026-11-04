/** Styles owned by the Mermaid preview plugin. Every color comes from a host theme token. */
export const STYLE = `
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
  display: flex;
  flex-direction: column;
  width: min(1100px, calc(100vw - 80px));
  height: min(820px, calc(100vh - 80px - var(--dsh-frame-chrome-top, 0px)));
  overflow: hidden;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: var(--dsw-radius-lg, 10px);
  background: var(--dsw-alias-bg-overlay);
  box-shadow: var(--dsw-elevation-prominent, 0 24px 80px rgba(0, 0, 0, 0.3));
  color: var(--dsw-alias-label-primary);
  font-family: var(--dsw-font-family);
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
    width: 100vw;
    height: 100vh;
    max-width: none;
    max-height: none;
    border: 0;
    border-radius: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .dsh-mermaid-preview-tooltip,
  .dsh-mermaid-preview-spinner {
    animation: none;
  }
}
`;
