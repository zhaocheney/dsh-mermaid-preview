import * as React from 'react';
import { createPortal } from 'react-dom';
import en from '../locale/en.json';
import zh from '../locale/zh.json';
import { CloseIcon, FitIcon, PreviewIcon, ZoomInIcon, ZoomOutIcon } from './icons.jsx';
import { STYLE } from './styles.js';

const {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} = React;

const NS = 'dsh-mermaid-preview';
const LAYER_SELECTOR = '[data-dsh-mermaid-preview-layer]';
const TRIGGER_SIZE = 24;
const TRIGGER_GAP = 4;
const BANNER_PADDING = 14;
const MIN_SCALE = 0.08;
const MAX_SCALE = 8;
const FIT_MAX_SCALE = 2;

/** Clamp a number to an inclusive interval. */
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/** Whether a `<code>` element carries the `mermaid` fence language. */
function isMermaidCode(code) {
  for (const name of code.classList) {
    if (name.toLowerCase() === 'language-mermaid') return true;
  }
  return false;
}

/** Diagram headers Mermaid accepts at the top of a document. */
const MERMAID_HEADER = /^(?:graph\b|flowchart\b|sequenceDiagram\b|classDiagram(?:-v2)?\b|stateDiagram(?:-v2)?\b|erDiagram\b|journey\b|gantt\b|pie\b|gitGraph\b|mindmap\b|timeline\b|quadrantChart\b|xychart(?:-beta)?\b|sankey(?:-beta)?\b|block(?:-beta)?\b|packet(?:-beta)?\b|kanban\b|architecture(?:-beta)?\b|C4(?:Context|Container|Component|Dynamic|Deployment)\b|requirementDiagram\b|zenuml\b)/;

/**
 * First meaningful Mermaid line: blank lines, `%%` directives, and an optional
 * YAML frontmatter block are skipped.
 */
function firstMermaidStatement(source) {
  const lines = source.split(/\r?\n/u);
  let index = 0;
  const skipNoise = () => {
    while (index < lines.length) {
      const line = lines[index].trim();
      if (line !== '' && !line.startsWith('%%')) return;
      index += 1;
    }
  };
  skipNoise();
  if (lines[index]?.trim() === '---') {
    index += 1;
    while (index < lines.length && lines[index].trim() !== '---') index += 1;
    index += 1;
    skipNoise();
  }
  return lines[index]?.trim() ?? '';
}

/**
 * Whether a source text is a Mermaid diagram. Current DSH renderers do not put
 * `language-mermaid` on the `<code>` element of a non-highlighted block, so the
 * diagram header is the only stable signal.
 */
function looksLikeMermaid(source) {
  return MERMAID_HEADER.test(firstMermaidStatement(source));
}

/** Read the source text of a markdown code block. */
function mermaidCodeOf(block) {
  return block.querySelector('[data-code-block-content] code, pre code')?.textContent ?? '';
}

/** Compare two trigger layouts without depending on object identity. */
function sameTriggers(left, right) {
  if (left.length !== right.length) return false;
  for (let index = 0; index < left.length; index += 1) {
    const a = left[index];
    const b = right[index];
    if (a.key !== b.key) return false;
    if (Math.abs(a.top - b.top) > 0.1 || Math.abs(a.left - b.left) > 0.1) return false;
  }
  return true;
}

/**
 * Locate the trigger just before the code block's leading action button. The
 * host banner is the only stable anchor: its actions sit at the right edge, so
 * the first button marks the left edge of the action row. Anchoring on the last
 * button would overlap the wrap toggle that current DSH banners put before copy.
 */
function triggerRectFor(block) {
  const banner = block.querySelector('[data-code-block-banner]');
  if (banner === null) return null;
  const buttons = banner.querySelectorAll('button');
  const action = buttons.length === 0 ? null : buttons[0];
  const anchor = action?.getBoundingClientRect() ?? banner.getBoundingClientRect();
  if (anchor.width <= 0 || anchor.height <= 0) return null;

  const top = anchor.top + (anchor.height - TRIGGER_SIZE) / 2;
  const left = action === null
    ? anchor.right - BANNER_PADDING - TRIGGER_SIZE
    : anchor.left - TRIGGER_GAP - TRIGGER_SIZE;
  if (left < 0 || top < 0) return null;
  if (left + TRIGGER_SIZE > window.innerWidth || top + TRIGGER_SIZE > window.innerHeight) return null;

  // Hit testing catches predecessors clipped by scroll containers, sticky
  // surfaces, and dialogs, which plain getBoundingClientRect cannot see.
  const hit = document.elementFromPoint(
    anchor.left + anchor.width / 2,
    anchor.top + anchor.height / 2,
  );
  if (hit === null) return null;
  const ownSurface = hit.closest(LAYER_SELECTOR) ?? hit.closest('[data-dsh-mermaid-preview-backdrop]');
  if (!block.contains(hit) && ownSurface === null) return null;

  // The trigger sits left of the action row, so check what is actually under
  // that spot too. `elementsFromPoint` lets us skip our own overlay layer.
  const stack = document.elementsFromPoint(left + TRIGGER_SIZE / 2, top + TRIGGER_SIZE / 2);
  const under = stack.find((element) => (
    element.closest(LAYER_SELECTOR) === null
    && element.closest('[data-dsh-mermaid-preview-backdrop]') === null
  ));
  if (under !== undefined && !block.contains(under)) return null;
  return { top, left };
}

/** Read a rendered SVG's intrinsic size, preferring its viewBox. */
function naturalSizeOf(svg) {
  const viewBox = svg?.viewBox?.baseVal;
  if (viewBox !== undefined && viewBox.width > 0 && viewBox.height > 0) {
    return { width: viewBox.width, height: viewBox.height };
  }
  const width = Number.parseFloat(svg?.getAttribute('width') ?? '');
  const height = Number.parseFloat(svg?.getAttribute('height') ?? '');
  if (Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0) {
    return { width, height };
  }
  const rect = svg?.getBoundingClientRect();
  if (rect !== undefined && rect.width > 0 && rect.height > 0) {
    return { width: rect.width, height: rect.height };
  }
  return { width: 800, height: 600 };
}

/** Size the SVG and its transform stage in intrinsic pixels. */
function prepareSvg(stage) {
  const svg = stage.querySelector('svg');
  if (svg === null) return null;
  const size = naturalSizeOf(svg);
  svg.setAttribute('width', String(size.width));
  svg.setAttribute('height', String(size.height));
  svg.style.display = 'block';
  svg.style.maxWidth = 'none';
  svg.style.width = `${size.width}px`;
  svg.style.height = `${size.height}px`;
  svg.style.backgroundColor = 'transparent';
  stage.style.width = `${size.width}px`;
  stage.style.height = `${size.height}px`;
  return size;
}

/** Keep keyboard focus inside the dialog while it is open. */
function trapFocus(event, dialog) {
  if (dialog === null) return;
  const focusable = Array.from(dialog.querySelectorAll(
    'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
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

/**
 * Load the Mermaid chunk once and serialize renders. Serialization keeps
 * `initialize()` and `render()` from interleaving when dialogs reopen quickly.
 */
function createMermaidRenderer(loadChunk) {
  let modulePromise;
  let queue = Promise.resolve();
  let sequence = 0;

  const load = () => {
    if (modulePromise === undefined) {
      modulePromise = Promise.resolve()
        .then(loadChunk)
        .then((chunk) => {
          const api = chunk?.mermaid ?? chunk?.default ?? chunk;
          if (api === null || typeof api !== 'object'
            || typeof api.initialize !== 'function' || typeof api.render !== 'function') {
            throw new Error('The bundled Mermaid module did not expose initialize/render.');
          }
          return api;
        })
        .catch((error) => {
          modulePromise = undefined;
          throw error;
        });
    }
    return modulePromise;
  };

  const run = async (code, colorScheme) => {
    const mermaid = await load();
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      suppressErrorRendering: true,
      theme: colorScheme === 'dark' ? 'dark' : 'default',
      themeVariables: { background: 'transparent' },
      fontFamily: getComputedStyle(document.body).fontFamily,
    });
    sequence += 1;
    const id = `dsh-mermaid-preview-${Date.now().toString(36)}-${sequence}`;
    try {
      const result = await mermaid.render(id, code);
      return {
        svg: result.svg,
        bindFunctions: typeof result.bindFunctions === 'function' ? result.bindFunctions : undefined,
      };
    } finally {
      // Mermaid may leave a temporary render holder behind when parsing fails.
      document.getElementById(id)?.remove();
    }
  };

  return (code, colorScheme) => {
    const result = queue.then(() => run(code, colorScheme));
    queue = result.catch(() => {});
    return result;
  };
}

/** Re-render on locale switches and late dictionary registration. */
function useLocaleRevision(locale) {
  const subscribe = useCallback((onChange) => locale.subscribe(onChange), [locale]);
  return useSyncExternalStore(subscribe, () => locale.getSnapshot(), () => locale.getSnapshot());
}

/** Read the active color scheme, with a light fallback when no theme service exists. */
function useColorScheme(ctx) {
  const theme = ctx.get('theme');
  const subscribe = useCallback(
    (onChange) => (theme === undefined ? () => {} : ctx.on('theme/change', onChange)),
    [ctx, theme],
  );
  const snapshot = useSyncExternalStore(
    subscribe,
    () => (theme === undefined ? undefined : theme.getTheme()),
    () => (theme === undefined ? undefined : theme.getTheme()),
  );
  return snapshot?.active?.colorScheme === 'dark' ? 'dark' : 'light';
}

/**
 * Frame-wide trigger layer. It never edits the host's Markdown DOM: it reads
 * the document, places icon buttons over each Mermaid block, and portals them.
 */
function TriggerLayer({ onOpen, t }) {
  const [entries, setEntries] = useState([]);
  const [tip, setTip] = useState(null);
  const idsRef = useRef(new WeakMap());
  const sequenceRef = useRef(0);
  const tipTimerRef = useRef(0);

  const hideTip = useCallback(() => {
    window.clearTimeout(tipTimerRef.current);
    tipTimerRef.current = 0;
    setTip(null);
  }, []);

  /** Host-style tooltip: delayed bubble above the trigger, fixed-position. */
  const showTip = useCallback((entry, element) => {
    window.clearTimeout(tipTimerRef.current);
    tipTimerRef.current = window.setTimeout(() => {
      const rect = element.getBoundingClientRect();
      setTip({
        key: entry.key,
        label: t('preview'),
        left: rect.left + rect.width / 2,
        top: rect.top - 6,
      });
    }, 320);
  }, [t]);

  useEffect(() => () => window.clearTimeout(tipTimerRef.current), []);

  useEffect(() => {
    if (tip === null) return undefined;
    const hide = () => hideTip();
    window.addEventListener('scroll', hide, true);
    window.addEventListener('wheel', hide, { passive: true, capture: true });
    window.addEventListener('resize', hide);
    return () => {
      window.removeEventListener('scroll', hide, true);
      window.removeEventListener('wheel', hide, true);
      window.removeEventListener('resize', hide);
    };
  }, [tip, hideTip]);

  useEffect(() => {
    if (tip === null) return;
    if (!entries.some((entry) => entry.key === tip.key)) setTip(null);
  }, [entries, tip]);

  useEffect(() => {
    let frame = 0;
    let disposed = false;
    let resizeObserver;
    const observed = new Set();

    const idFor = (block) => {
      let id = idsRef.current.get(block);
      if (id === undefined) {
        sequenceRef.current += 1;
        id = sequenceRef.current;
        idsRef.current.set(block, id);
      }
      return id;
    };

    const verdicts = new WeakMap();
    const isMermaidBlock = (block) => {
      const code = block.querySelector('[data-code-block-content] code');
      if (code !== null && isMermaidCode(code)) return true;
      const source = mermaidCodeOf(block);
      const cached = verdicts.get(block);
      if (cached !== undefined && cached.source === source) return cached.mermaid;
      const mermaid = looksLikeMermaid(source);
      verdicts.set(block, { source, mermaid });
      return mermaid;
    };

    const scan = () => {
      frame = 0;
      if (disposed) return;
      const next = [];
      const current = new Set();
      for (const content of document.querySelectorAll('[data-code-block-content]')) {
        const block = content.parentElement;
        if (block === null || block.querySelector('[data-code-block-banner]') === null) continue;
        if (!isMermaidBlock(block)) continue;
        const rect = triggerRectFor(block);
        if (rect === null) continue;
        next.push({ key: idFor(block), block, top: rect.top, left: rect.left });
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
      setEntries((previous) => (sameTriggers(previous, next) ? previous : next));
    };

    const schedule = () => {
      if (disposed || frame !== 0) return;
      frame = requestAnimationFrame(scan);
    };

    if (typeof ResizeObserver === 'function') {
      resizeObserver = new ResizeObserver(schedule);
    }
    const mutationObserver = new MutationObserver(schedule);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });

    window.addEventListener('scroll', schedule, true);
    window.addEventListener('resize', schedule);
    window.addEventListener('transitionend', schedule, true);
    window.addEventListener('animationend', schedule, true);
    window.visualViewport?.addEventListener('scroll', schedule);
    window.visualViewport?.addEventListener('resize', schedule);
    document.fonts?.ready.then(schedule).catch(() => {});
    schedule();

    return () => {
      disposed = true;
      if (frame !== 0) cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener('scroll', schedule, true);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('transitionend', schedule, true);
      window.removeEventListener('animationend', schedule, true);
      window.visualViewport?.removeEventListener('scroll', schedule);
      window.visualViewport?.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <>
      {createPortal(
        <div className="dsh-mermaid-preview-layer" data-dsh-mermaid-preview-layer="">
          {entries.map((entry) => (
            <button
              key={entry.key}
              type="button"
              className="dsh-mermaid-preview-trigger"
              style={{ top: entry.top, left: entry.left }}
              aria-label={t('preview')}
              onPointerDown={(event) => event.stopPropagation()}
              onPointerEnter={(event) => showTip(entry, event.currentTarget)}
              onPointerLeave={hideTip}
              onFocus={(event) => showTip(entry, event.currentTarget)}
              onBlur={hideTip}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                hideTip();
                onOpen(entry.block);
              }}
            >
              <PreviewIcon />
            </button>
          ))}
        </div>,
        document.body,
      )}
      {tip === null ? null : createPortal(
        <div
          className="dsh-mermaid-preview-tooltip"
          role="tooltip"
          style={{ left: tip.left, top: tip.top }}
        >
          {tip.label}
        </div>,
        document.body,
      )}
    </>
  );
}

/** One zoomable, pannable Mermaid preview window. */
function PreviewDialog({ code, colorScheme, onClose, renderMermaid, t }) {
  const titleId = useId();
  const hintId = useId();
  const dialogRef = useRef(null);
  const viewportRef = useRef(null);
  const stageRef = useRef(null);
  const bindFunctionsRef = useRef(undefined);
  const pointersRef = useRef(new Map());
  const gestureRef = useRef(null);
  const movedRef = useRef(false);
  const userAdjustedRef = useRef(false);

  const [status, setStatus] = useState(code.trim() === '' ? 'empty' : 'loading');
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');
  const [reloadToken, setReloadToken] = useState(0);
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const [fitted, setFitted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const viewRef = useRef(view);

  useLayoutEffect(() => {
    viewRef.current = view;
  }, [view]);

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
      FIT_MAX_SCALE,
    );
    userAdjustedRef.current = false;
    setView({
      scale,
      x: (width - size.width * scale) / 2,
      y: (height - size.height * scale) / 2,
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
        y: y - (y - current.y) * ratio,
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
    if (code.trim() === '') {
      setStatus('empty');
      setSvg('');
      setError('');
      setFitted(false);
      return undefined;
    }
    let cancelled = false;
    setStatus('loading');
    setSvg('');
    setError('');
    setFitted(false);
    bindFunctionsRef.current = undefined;
    renderMermaid(code, colorScheme)
      .then((result) => {
        if (cancelled) return;
        bindFunctionsRef.current = result.bindFunctions;
        setSvg(result.svg);
        setStatus('ready');
      })
      .catch((reason) => {
        if (cancelled) return;
        bindFunctionsRef.current = undefined;
        setError(reason instanceof Error ? reason.message : String(reason));
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [code, colorScheme, reloadToken, renderMermaid]);

  useLayoutEffect(() => {
    if (status !== 'ready' || svg === '') return undefined;
    const stage = stageRef.current;
    if (stage === null) return undefined;
    prepareSvg(stage);
    if (bindFunctionsRef.current !== undefined) {
      try {
        bindFunctionsRef.current(stage);
      } catch (reason) {
        console.error('dsh-mermaid-preview: mermaid bindFunctions failed', reason);
      }
    }
    const frame = requestAnimationFrame(fit);
    return () => cancelAnimationFrame(frame);
  }, [svg, status, fit]);

  useEffect(() => {
    if (status !== 'ready') return undefined;
    const viewport = viewportRef.current;
    if (viewport === null || typeof ResizeObserver !== 'function') return undefined;
    const observer = new ResizeObserver(() => {
      if (!userAdjustedRef.current) fit();
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [status, fit]);

  useEffect(() => {
    if (status !== 'ready') return undefined;
    const viewport = viewportRef.current;
    if (viewport === null) return undefined;
    const onWheel = (event) => {
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 100 : 1;
      zoomAt(event.clientX, event.clientY, Math.exp(-event.deltaY * unit * 0.0015));
    };
    viewport.addEventListener('wheel', onWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', onWheel);
  }, [status, zoomAt]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previous = document.activeElement;
    const closeButton = dialog?.querySelector('[data-dsh-mermaid-preview-autofocus]');
    if (closeButton instanceof HTMLElement) closeButton.focus();

    const onKeyDown = (event) => {
      if (event.defaultPrevented) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key === 'Tab') {
        trapFocus(event, dialog);
        return;
      }
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        zoomBy(1.2);
      } else if (event.key === '-' || event.key === '_') {
        event.preventDefault();
        zoomBy(1 / 1.2);
      } else if (event.key === '0') {
        event.preventDefault();
        fit();
      }
    };

    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus();
    };
  }, [onClose, zoomBy, fit]);

  const startGesture = useCallback(() => {
    const points = Array.from(pointersRef.current.values());
    const start = viewRef.current;
    if (points.length === 1) {
      gestureRef.current = { mode: 'pan', point: points[0], start };
      return;
    }
    if (points.length === 2) {
      const [a, b] = points;
      gestureRef.current = {
        mode: 'pinch',
        distance: Math.hypot(a.x - b.x, a.y - b.y),
        center: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
        start,
      };
      return;
    }
    gestureRef.current = null;
  }, []);

  const onPointerDown = (event) => {
    if (status !== 'ready') return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const viewport = viewportRef.current;
    if (viewport === null) return;
    event.preventDefault();
    try {
      viewport.setPointerCapture(event.pointerId);
    } catch {
      // Capture is optional; dragging still works while the pointer stays inside.
    }
    const rect = viewport.getBoundingClientRect();
    pointersRef.current.set(event.pointerId, {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
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
      y: event.clientY - rect.top,
    });
    const gesture = gestureRef.current;
    if (gesture === null) return;
    const points = Array.from(pointersRef.current.values());
    if (gesture.mode === 'pan' && points.length === 1) {
      const point = points[0];
      if (Math.hypot(point.x - gesture.point.x, point.y - gesture.point.y) > 2) {
        movedRef.current = true;
      }
      userAdjustedRef.current = true;
      setView({
        scale: gesture.start.scale,
        x: gesture.start.x + point.x - gesture.point.x,
        y: gesture.start.y + point.y - gesture.point.y,
      });
      return;
    }
    if (gesture.mode === 'pinch' && points.length === 2) {
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
        y: center.y - ratio * (gesture.center.y - gesture.start.y),
      });
    }
  };

  const onPointerEnd = (event) => {
    pointersRef.current.delete(event.pointerId);
    if (pointersRef.current.size === 0) {
      gestureRef.current = null;
      setDragging(false);
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

  const zoomLabel = `${t('zoomLevel')}: ${Math.round(view.scale * 100)}%`;

  return (
    <div
      className="dsh-mermaid-preview-backdrop"
      data-dsh-mermaid-preview-backdrop=""
      onMouseDown={closeOnBackdrop}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className="dsh-mermaid-preview-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={status === 'ready' && fitted ? hintId : undefined}
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="dsh-mermaid-preview-header">
          <div className="dsh-mermaid-preview-title" id={titleId}>{t('dialogTitle')}</div>
          <div className="dsh-mermaid-preview-controls">
            <button
              type="button"
              className="dsh-mermaid-preview-icon-button"
              title={t('zoomOut')}
              aria-label={t('zoomOut')}
              disabled={status !== 'ready'}
              onClick={() => zoomBy(1 / 1.2)}
            >
              <ZoomOutIcon />
            </button>
            <span className="dsh-mermaid-preview-zoom" aria-label={zoomLabel}>
              {Math.round(view.scale * 100)}%
            </span>
            <button
              type="button"
              className="dsh-mermaid-preview-icon-button"
              title={t('zoomIn')}
              aria-label={t('zoomIn')}
              disabled={status !== 'ready'}
              onClick={() => zoomBy(1.2)}
            >
              <ZoomInIcon />
            </button>
            <button
              type="button"
              className="dsh-mermaid-preview-icon-button"
              title={t('fit')}
              aria-label={t('fit')}
              disabled={status !== 'ready'}
              onClick={fit}
            >
              <FitIcon />
            </button>
            <button
              type="button"
              className="dsh-mermaid-preview-icon-button"
              title={t('close')}
              aria-label={t('close')}
              data-dsh-mermaid-preview-autofocus=""
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
        <div
          ref={viewportRef}
          className="dsh-mermaid-preview-viewport"
          data-dragging={dragging ? 'true' : 'false'}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
          onLostPointerCapture={onPointerEnd}
          onClickCapture={onClickCapture}
          onDoubleClick={(event) => {
            event.preventDefault();
            fit();
          }}
        >
          {status === 'ready' ? (
            <div
              ref={stageRef}
              className="dsh-mermaid-preview-stage"
              style={{
                transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`,
                visibility: fitted ? 'visible' : 'hidden',
              }}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          ) : null}
          {status === 'loading' ? (
            <div className="dsh-mermaid-preview-status">
              <div className="dsh-mermaid-preview-spinner" aria-hidden="true" />
              <div>{t('loading')}</div>
            </div>
          ) : null}
          {status === 'empty' ? (
            <div className="dsh-mermaid-preview-status">{t('empty')}</div>
          ) : null}
          {status === 'error' ? (
            <div className="dsh-mermaid-preview-status">
              <div className="dsh-mermaid-preview-error">
                <h2>{t('errorTitle')}</h2>
                <pre>{error || t('errorTitle')}</pre>
                <button
                  type="button"
                  className="dsh-mermaid-preview-action"
                  onClick={() => setReloadToken((token) => token + 1)}
                >
                  {t('retry')}
                </button>
              </div>
            </div>
          ) : null}
          {status === 'ready' && fitted ? (
            <div className="dsh-mermaid-preview-hint" id={hintId}>{t('hint')}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** Root slot entry: trigger layer plus the currently open dialog. */
function MermaidPreviewRoot({ ctx, renderMermaid, t }) {
  useLocaleRevision(ctx.locale);
  const colorScheme = useColorScheme(ctx);
  const [preview, setPreview] = useState(null);

  const open = useCallback((block) => {
    const code = mermaidCodeOf(block);
    if (code.trim() === '') return;
    setPreview({ code });
  }, []);

  const close = useCallback(() => setPreview(null), []);

  return (
    <>
      <style>{STYLE}</style>
      <TriggerLayer onOpen={open} t={t} />
      {preview === null ? null : createPortal(
        <PreviewDialog
          code={preview.code}
          colorScheme={colorScheme}
          onClose={close}
          renderMermaid={renderMermaid}
          t={t}
        />,
        document.body,
      )}
    </>
  );
}

/**
 * Build the Client plugin half. The Host-side client-modules wrapper supplies
 * `loadMermaid`, which resolves the package-local Mermaid chunk on first use.
 */
export function createPlugin({ loadMermaid }) {
  return {
    inject: ['slots', 'locale'],
    apply(ctx) {
      const t = ctx.locale.bind(NS);
      ctx.effect(
        () => ctx.locale.register(NS, { en: en.ui, zh: zh.ui }),
        `${NS}: dictionaries`,
      );
      const renderMermaid = createMermaidRenderer(loadMermaid);
      ctx.slots.inject('shell.overlay', () => ctx.slots.register({
        name: 'shell.overlay',
        id: NS,
        order: 10,
      }, function MermaidPreviewOverlay() {
        return <MermaidPreviewRoot ctx={ctx} renderMermaid={renderMermaid} t={t} />;
      }));
    },
  };
}
