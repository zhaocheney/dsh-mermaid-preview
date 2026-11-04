import * as React from 'react';

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

/** Eye glyph used by the per-block preview trigger. */
export function PreviewIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path {...stroke} d="M2.75 12S6.5 6.5 12 6.5 21.25 12 21.25 12 17.5 17.5 12 17.5 2.75 12 2.75 12Z" />
      <circle {...stroke} cx="12" cy="12" r="2.75" />
    </svg>
  );
}

/** Magnifier with a plus, used to zoom in. */
export function ZoomInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle {...stroke} cx="10.5" cy="10.5" r="6.5" />
      <path {...stroke} d="m15.5 15.5 5 5M7.5 10.5h6M10.5 7.5v6" />
    </svg>
  );
}

/** Magnifier with a minus, used to zoom out. */
export function ZoomOutIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle {...stroke} cx="10.5" cy="10.5" r="6.5" />
      <path {...stroke} d="m15.5 15.5 5 5M7.5 10.5h6" />
    </svg>
  );
}

/** Four corner brackets, used to fit the diagram to the window. */
export function FitIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path {...stroke} d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" />
    </svg>
  );
}

/** Close glyph. */
export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path {...stroke} d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
