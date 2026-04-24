import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  UserPlus, Trash2, Plus, ZoomIn, ZoomOut,
  Maximize2, Link2, X, LocateFixed,
} from 'lucide-react';
import { Member } from '../data/mockData';
import { useStore } from '../store/useStore';
import MemberPopup from '../components/MemberPopup';
import AddMemberForm from '../components/AddMemberForm';

// ─── Inject styles once into <head> ──────────────────────────────

const STYLE_ID = 'tree-screen-styles';
const CSS = `
.ts-screen {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background: #fafaf7;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

/* Header */
.ts-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #fff;
  border-bottom: 1px solid rgba(0,0,0,0.07);
  flex-shrink: 0;
  gap: 8px;
  flex-wrap: wrap;
  z-index: 10;
}
.ts-header-left h2 {
  font-size: 17px;
  font-weight: 700;
  color: #d97706;
  margin: 0;
  line-height: 1.2;
}
.ts-header-left p {
  font-size: 11px;
  color: #9ca3af;
  margin: 1px 0 0;
}
.ts-header-right {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
}

/* Segmented control */
.ts-seg {
  display: flex;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 7px;
  overflow: hidden;
  margin-right: 4px;
}
.ts-seg-btn {
  padding: 5px 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  color: #6b7280;
  transition: background 0.12s, color 0.12s;
  white-space: nowrap;
}
.ts-seg-btn:hover { background: #f3f4f6; }
.ts-seg-btn.active { background: #f59e0b; color: #fff; }

/* Buttons */
.ts-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 9px;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 7px;
  background: #fff;
  cursor: pointer;
  color: #374151;
  font-size: 12px;
  font-weight: 500;
  transition: background 0.12s;
  white-space: nowrap;
}
.ts-btn:hover { background: #f9fafb; }
.ts-btn.active { background: #eef2ff; border-color: #6366f1; color: #4f46e5; }
.ts-btn-add {
  background: #f59e0b;
  color: #fff;
  border-color: #f59e0b;
  font-weight: 600;
}
.ts-btn-add:hover { background: #d97706; border-color: #d97706; }

/* Connect banner */
.ts-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: #eef2ff;
  border-bottom: 1px solid #c7d2fe;
  font-size: 12px;
  color: #4338ca;
  flex-shrink: 0;
}
.ts-banner-close {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  color: #4338ca;
  display: flex;
  align-items: center;
  padding: 0;
}

/* Canvas */
.ts-canvas-wrap {
  flex: 1;
  position: relative;
  overflow: hidden;
  background-color: #f5f4f0;
  background-image: radial-gradient(circle, #d1cfc4 1px, transparent 1px);
  background-size: 24px 24px;
}
.ts-canvas {
  position: absolute;
  inset: 0;
  user-select: none;
  touch-action: none;
  cursor: grab;
}
.ts-canvas.panning  { cursor: grabbing; }
.ts-canvas.connect-idle  { cursor: cell; }
.ts-canvas.connect-ready { cursor: crosshair; }
.ts-canvas-inner {
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;
}
.ts-svg {
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
  pointer-events: none;
  /* z-index below cards so edges render behind them */
  z-index: 0;
}

/* Cards */
.ts-card {
  position: absolute;
  width: 130px;
  background: #fff;
  border: 1.5px solid rgba(0,0,0,0.10);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 8px 6px;
  gap: 3px;
  will-change: left, top;
  overflow: visible;
  transition: box-shadow 0.12s, border-color 0.12s;
  cursor: grab;
  z-index: 1;
}
.ts-card:hover {
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  z-index: 5;
}
.ts-card.self {
  border-color: #f59e0b;
  border-width: 2.5px;
  box-shadow: 0 0 0 4px rgba(245,158,11,0.15), 0 4px 16px rgba(245,158,11,0.12);
  z-index: 2;
}
.ts-card.connect-src {
  border-color: #6366f1;
  border-width: 2px;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.2);
}
.ts-card.maternal { border-color: rgba(14,165,233,0.3); }

/* Card top bar */
.ts-card-bar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  border-radius: 10px 10px 0 0;
}
.ts-card-bar.paternal { background: #f59e0b; }
.ts-card-bar.maternal { background: #0ea5e9; }
.ts-card-bar.self-bar { background: linear-gradient(90deg, #f59e0b, #ef4444); }

/* Avatar */
.ts-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}

/* Card text */
.ts-card-name {
  font-size: 11px;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: center;
}
.ts-card-role {
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: center;
}
.ts-card-role.paternal { color: #b45309; }
.ts-card-role.maternal { color: #0284c7; }
.ts-card-role.self-role { color: #92400e; font-weight: 600; }

/* "You" badge */
.ts-self-badge {
  position: absolute;
  top: -9px;
  right: -5px;
  background: #f59e0b;
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 6px;
  pointer-events: none;
  letter-spacing: 0.3px;
}

/* Action buttons (visible on hover) */
.ts-card-actions {
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
  z-index: 10;
}
.ts-card:hover .ts-card-actions {
  opacity: 1;
  pointer-events: auto;
}
.ts-act-btn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.12);
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6b7280;
  transition: background 0.1s;
}
.ts-act-btn:hover { background: #f3f4f6; }
.ts-act-btn.del { color: #ef4444; border-color: #fca5a5; }
.ts-act-btn.del:hover { background: #fef2f2; }

/* HUD overlays */
.ts-zoom-badge {
  position: absolute;
  bottom: 14px;
  right: 14px;
  background: rgba(255,255,255,0.92);
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 11px;
  color: #6b7280;
  pointer-events: none;
}
.ts-legend {
  position: absolute;
  bottom: 14px;
  right: 62px;
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(255,255,255,0.92);
  border: 1px solid rgba(0,0,0,0.07);
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 11px;
  color: #6b7280;
  pointer-events: none;
}
.ts-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  display: inline-block;
}
.ts-dot.p { background: #f59e0b; }
.ts-dot.m { background: #0ea5e9; }
.ts-dot.s { background: #a78bfa; }

/* Minimap */
.ts-minimap {
  position: absolute;
  bottom: 46px;
  left: 14px;
  background: rgba(255,255,255,0.9);
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 8px;
  padding: 6px;
}
.ts-minimap-title {
  font-size: 9px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-bottom: 4px;
  text-align: center;
}

/* Find Me button */
.ts-find-me {
  position: absolute;
  top: 14px;
  right: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  background: rgba(245,158,11,0.92);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.12s, transform 0.1s;
  box-shadow: 0 2px 8px rgba(245,158,11,0.3);
}
.ts-find-me:hover { background: rgba(217,119,6,0.95); transform: scale(1.02); }

/* Confirm dialog */
.ts-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}
.ts-dialog {
  background: #fff;
  border-radius: 16px;
  padding: 24px 24px 20px;
  max-width: 300px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}
.ts-dialog h3 { font-size: 15px; font-weight: 600; color: #111; margin: 8px 0 4px; }
.ts-dialog .ts-dialog-member-name { font-size: 13px; color: #d97706; font-weight: 500; margin: 0 0 8px; }
.ts-dialog .ts-dialog-desc { font-size: 12px; color: #6b7280; margin: 0 0 16px; line-height: 1.5; }
.ts-dialog-btns { display: flex; gap: 8px; justify-content: center; }
.ts-btn-cancel {
  padding: 7px 16px;
  border-radius: 7px;
  border: 1px solid rgba(0,0,0,0.1);
  background: #fff;
  cursor: pointer;
  font-size: 13px;
  color: #374151;
}
.ts-btn-cancel:hover { background: #f9fafb; }
.ts-btn-del {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 7px 16px;
  border-radius: 7px;
  border: none;
  background: #ef4444;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
}
.ts-btn-del:hover { background: #dc2626; }
`;

function useInjectStyles() {
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => {
      document.getElementById(STYLE_ID)?.remove();
    };
  }, []);
}

// ─── Layout constants ─────────────────────────────────────────────

const CARD_W       = 130;
const CARD_H       = 78;
const H_GAP        = 44;
const V_GAP        = 80;
const MAX_MEMBERS  = 100;
const DEFAULT_SCALE = 0.72;

type Pos = { x: number; y: number };
interface Transform { x: number; y: number; scale: number; }

// ─── Layout helpers ───────────────────────────────────────────────

function childMapOf(members: Member[]): Map<string, string[]> {
  const m = new Map<string, string[]>();
  for (const mb of members) m.set(mb.id, mb.children ?? []);
  return m;
}

function parentMapOf(members: Member[]): Map<string, string> {
  const m = new Map<string, string>();
  for (const mb of members)
    for (const cid of mb.children ?? [])
      if (!m.has(cid)) m.set(cid, mb.id);
  return m;
}

function spouseMapOf(members: Member[]): Map<string, string> {
  const map = new Map<string, string>();
  for (let i = 0; i < members.length; i++) {
    const a = members[i];
    if (map.has(a.id)) continue;
    for (let j = i + 1; j < members.length; j++) {
      const b = members[j];
      if (map.has(b.id)) continue;
      if ((a.children ?? []).some(c => (b.children ?? []).includes(c))) {
        map.set(a.id, b.id);
        map.set(b.id, a.id);
        break;
      }
    }
  }
  return map;
}

/**
 * Proper recursive subtree layout — matches the reference image exactly.
 *
 * Rules:
 *  - Grandparents row is at the TOP (highest generation number).
 *  - Parents row is below that. Self/siblings/cousins row is at the bottom.
 *  - Each parent couple is centred OVER their own children's subtree.
 *  - Maternal subtrees go LEFT of Paternal subtrees, separated by a gap.
 *  - Self is centred horizontally (x=0) after all positions are computed.
 *  - Edges connect correctly because positions come from the same subtree pass.
 */
function buildLayout(members: Member[], selfId: string): Map<string, Pos> {
  if (!members.length) return new Map();

  const childMap  = childMapOf(members);
  const parentMap = parentMapOf(members);
  const spouseMap = spouseMapOf(members);

  // Y coordinate: generation field drives vertical position.
  // Higher generation = older = higher on screen.
  const maxGen = Math.max(...members.map(m => m.generation));
  const rowY = (gen: number): number => (maxGen - gen) * (CARD_H + V_GAP);

  // ── Subtree width (memoised) ─────────────────────────────────
  const wCache = new Map<string, number>();
  function subtreeW(id: string): number {
    if (wCache.has(id)) return wCache.get(id)!;
    const spId  = spouseMap.get(id);
    const ownW  = spId ? CARD_W * 2 + H_GAP : CARD_W;
    const myK   = childMap.get(id) ?? [];
    const spK   = spId ? (childMap.get(spId) ?? []) : [];
    const kids  = [...new Set([...myK, ...spK])];
    if (!kids.length) { wCache.set(id, ownW); return ownW; }
    const kidsW = kids.reduce((s, k) => s + subtreeW(k) + H_GAP, -H_GAP);
    const result = Math.max(ownW, kidsW);
    wCache.set(id, result);
    return result;
  }

  // ── Recursive placement ──────────────────────────────────────
  const positions = new Map<string, Pos>();
  const placed    = new Set<string>();

  function place(id: string, leftX: number) {
    if (placed.has(id)) return;
    placed.add(id);

    const spId = spouseMap.get(id);
    const sw   = subtreeW(id);
    const gen  = members.find(m => m.id === id)?.generation ?? 0;
    const y    = rowY(gen);

    if (spId && !placed.has(spId)) {
      placed.add(spId);
      const cx = leftX + sw / 2;
      positions.set(id,   { x: cx - H_GAP / 2 - CARD_W, y });
      positions.set(spId, { x: cx + H_GAP / 2,           y });
    } else if (!positions.has(id)) {
      positions.set(id, { x: leftX + sw / 2 - CARD_W / 2, y });
    }

    const myK  = childMap.get(id) ?? [];
    const spK  = spId ? (childMap.get(spId) ?? []) : [];
    const kids = [...new Set([...myK, ...spK])];
    let cl = leftX;
    for (const kid of kids) {
      if (placed.has(kid)) continue;
      place(kid, cl);
      cl += subtreeW(kid) + H_GAP;
    }
  }

  // ── Identify root nodes ──────────────────────────────────────
  // Roots = members not listed as anyone's child.
  const allChildIds = new Set(members.flatMap(m => m.children ?? []));
  const roots       = members.filter(m => !allChildIds.has(m.id));

  // Pair spouse roots
  type Entry = { type: 'couple'; a: string; b: string } | { type: 'solo'; id: string };
  const rSeen: Set<string> = new Set();
  const entries: Entry[] = [];
  for (const r of roots) {
    if (rSeen.has(r.id)) continue;
    rSeen.add(r.id);
    const spId = spouseMap.get(r.id);
    if (spId && !rSeen.has(spId) && roots.some(x => x.id === spId)) {
      rSeen.add(spId);
      entries.push({ type: 'couple', a: r.id, b: spId });
    } else {
      entries.push({ type: 'solo', id: r.id });
    }
  }

  // Sort: Maternal entries go FIRST (left), Paternal entries go SECOND (right)
  const branch = (id: string) => members.find(m => m.id === id)?.branch ?? 'Paternal';
  const isMat  = (e: Entry) => branch(e.type === 'couple' ? e.a : e.id) === 'Maternal';
  const matEntries = entries.filter(isMat);
  const patEntries = entries.filter(e => !isMat(e));

  const entryW = (e: Entry) => e.type === 'couple' ? subtreeW(e.a) : subtreeW(e.id);

  // ── Place maternal subtrees (left side) ─────────────────────
  let cursor = 0;
  for (const e of matEntries) {
    place(e.type === 'couple' ? e.a : e.id, cursor);
    cursor += entryW(e) + H_GAP * 2;
  }

  // ── Gap between branches ─────────────────────────────────────
  if (matEntries.length > 0 && patEntries.length > 0) cursor += H_GAP * 2;

  // ── Place paternal subtrees (right side) ────────────────────
  for (const e of patEntries) {
    place(e.type === 'couple' ? e.a : e.id, cursor);
    cursor += entryW(e) + H_GAP * 2;
  }

  // ── Safety: place any unplaced member ───────────────────────
  let ox = cursor + H_GAP * 4;
  for (const m of members) {
    if (!positions.has(m.id)) {
      positions.set(m.id, { x: ox, y: rowY(m.generation) });
      ox += CARD_W + H_GAP;
    }
  }

  // ── Centre on Self ───────────────────────────────────────────
  const sp = positions.get(selfId);
  if (sp) {
    const cx = sp.x + CARD_W / 2;
    for (const [id, p] of positions) positions.set(id, { x: p.x - cx, y: p.y });
  }

  return positions;
}


function allSpousePairs(members: Member[]): Array<[string, string]> {
  const pairs: Array<[string, string]> = [];
  const seen = new Set<string>();
  for (let i = 0; i < members.length; i++) {
    const a = members[i];
    if (seen.has(a.id)) continue;
    for (let j = i + 1; j < members.length; j++) {
      const b = members[j];
      if (seen.has(b.id)) continue;
      if ((a.children ?? []).some(c => (b.children ?? []).includes(c))) {
        seen.add(a.id); seen.add(b.id);
        pairs.push([a.id, b.id]); break;
      }
    }
  }
  return pairs;
}

// ─── Utilities ────────────────────────────────────────────────────

function initials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}
function idHue(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
  return h;
}
function bezierPath(x1: number, y1: number, x2: number, y2: number) {
  const cy = y1 + (y2 - y1) * 0.55;
  return `M ${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`;
}

// ─── Main component ───────────────────────────────────────────────

export default function TreeScreen() {
  useInjectStyles();

  const allMembers   = useStore(s => s.members);
  const currentUser  = useStore(s => s.currentUser);
  const removeMember = useStore(s => s.removeMember);
  const updateParent = useStore(
    s => (s as any).updateParent as ((childId: string, newParentId: string | null) => void) | undefined,
  );

  // Cap to 100 members
  const members = useMemo(() => allMembers.slice(0, MAX_MEMBERS), [allMembers]);

  const selfId = useMemo(
    () => currentUser?.id ?? members.find(m => m.relation === 'Self')?.id ?? members[0]?.id,
    [currentUser, members],
  );

  // Manual drag overrides
  const [nodePos, setNodePos] = useState<Map<string, Pos>>(() => new Map());
  const autoPos   = useMemo(() => buildLayout(members, selfId ?? ''), [members, selfId]);
  const positions = useMemo(() => {
    const merged = new Map(autoPos);
    for (const [id, pos] of nodePos) merged.set(id, pos);
    return merged;
  }, [autoPos, nodePos]);

  // Canvas transform
  const [transform, setTransform] = useState<Transform>({ x: 0, y: 0, scale: DEFAULT_SCALE });
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLDivElement>(null);
  const initialised = useRef(false);

  // Interaction refs
  const draggingRef = useRef<{ id: string; smx: number; smy: number; sx: number; sy: number } | null>(null);
  const panRef      = useRef<{ sx: number; sy: number; tx: number; ty: number } | null>(null);
  const isPanning   = useRef(false);

  // Connect mode
  const [connectMode, setConnectMode] = useState(false);
  const [connectSrc,  setConnectSrc]  = useState<string | null>(null);
  const [connectLine, setConnectLine] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);

  // UI state
  const [selectedId,   setSelectedId]   = useState<string | null>(null);
  const [addParent,    setAddParent]    = useState<string | null | undefined>(undefined);
  const [confirmId,    setConfirmId]    = useState<string | null>(null);
  const [showPopup,    setShowPopup]    = useState(false);
  const [branchFilter, setBranchFilter] = useState<'All' | 'Paternal' | 'Maternal'>('All');
  const [isPan,        setIsPan]        = useState(false);

  const spousePairs = useMemo(() => allSpousePairs(members), [members]);

  const visible = useMemo(() => {
    if (branchFilter === 'All')      return members;
    if (branchFilter === 'Paternal') return members.filter(m => m.branch !== 'Maternal');
    return members.filter(m => m.branch === 'Maternal');
  }, [members, branchFilter]);
  const visibleSet = useMemo(() => new Set(visible.map(m => m.id)), [visible]);

  // ── Centre on Self ─────────────────────────────────────────────
  const centreOnSelf = useCallback((scaleOverride?: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !selfId) return;
    const selfP = positions.get(selfId);
    if (!selfP) return;
    const W  = wrapper.clientWidth;
    const H  = wrapper.clientHeight;
    const sc = scaleOverride ?? transform.scale;
    const tx = W / 2 - (selfP.x + CARD_W / 2) * sc;
    const ty = H / 2 - (selfP.y + CARD_H / 2) * sc + 60; // shift up slightly so ancestors are visible
    setTransform({ x: tx, y: ty, scale: sc });
  }, [positions, selfId, transform.scale]);

  // Initial centre on mount
  useLayoutEffect(() => {
    if (initialised.current) return;
    if (!selfId || positions.size === 0) return;
    initialised.current = true;
    centreOnSelf(DEFAULT_SCALE);
  });

  // Re-centre when branch filter changes
  useEffect(() => {
    if (!initialised.current) return;
    centreOnSelf();
  }, [branchFilter]); // eslint-disable-line

  // ── Fit all in view ────────────────────────────────────────────
  const fitAll = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const [id, pos] of positions) {
      if (!visibleSet.has(id)) continue;
      minX = Math.min(minX, pos.x);         minY = Math.min(minY, pos.y);
      maxX = Math.max(maxX, pos.x + CARD_W); maxY = Math.max(maxY, pos.y + CARD_H);
    }
    if (minX === Infinity) return;
    const W = wrapper.clientWidth, H = wrapper.clientHeight;
    const cW = maxX - minX + 100, cH = maxY - minY + 100;
    const sc = Math.min(0.9, W / cW, H / cH);
    setTransform({
      scale: sc,
      x: (W - cW * sc) / 2 - minX * sc + 50 * sc,
      y: (H - cH * sc) / 2 - minY * sc + 50 * sc,
    });
  }, [positions, visibleSet]);

  // ── Wheel zoom ─────────────────────────────────────────────────
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const h = (e: WheelEvent) => {
      e.preventDefault();
      const r  = el.getBoundingClientRect();
      const mx = e.clientX - r.left, my = e.clientY - r.top;
      const d  = -e.deltaY * 0.001;
      setTransform(t => {
        const ns = Math.min(2.5, Math.max(0.05, t.scale + d));
        const k  = ns / t.scale;
        return { scale: ns, x: mx - k * (mx - t.x), y: my - k * (my - t.y) };
      });
    };
    el.addEventListener('wheel', h, { passive: false });
    return () => el.removeEventListener('wheel', h);
  }, []);

  const zoom = (d: number) =>
    setTransform(t => ({ ...t, scale: Math.min(2.5, Math.max(0.05, t.scale + d)) }));

  // ── Canvas pointer ─────────────────────────────────────────────
  const onCvsDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('[data-nid]')) return;
    isPanning.current = true;
    setIsPan(true);
    panRef.current = { sx: e.clientX, sy: e.clientY, tx: transform.x, ty: transform.y };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  }, [transform]);

  const onCvsMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) {
      const { id, smx, smy, sx, sy } = draggingRef.current;
      const dx = (e.clientX - smx) / transform.scale;
      const dy = (e.clientY - smy) / transform.scale;
      setNodePos(p => { const n = new Map(p); n.set(id, { x: sx + dx, y: sy + dy }); return n; });
      return;
    }
    if (isPanning.current && panRef.current) {
      const { sx, sy, tx, ty } = panRef.current;
      setTransform(t => ({ ...t, x: tx + e.clientX - sx, y: ty + e.clientY - sy }));
      return;
    }
    if (connectMode && connectSrc) {
      const r  = wrapperRef.current!.getBoundingClientRect();
      const cx = (e.clientX - r.left - transform.x) / transform.scale;
      const cy = (e.clientY - r.top  - transform.y) / transform.scale;
      const sp = positions.get(connectSrc);
      if (sp) setConnectLine({ x1: sp.x + CARD_W / 2, y1: sp.y + CARD_H, x2: cx, y2: cy });
    }
  }, [transform, connectMode, connectSrc, positions]);

  const onCvsUp = useCallback(() => {
    draggingRef.current = null;
    isPanning.current = false;
    setIsPan(false);
    panRef.current = null;
  }, []);

  const onCvsClick = useCallback(() => {
    if (connectMode && connectSrc) { setConnectSrc(null); setConnectLine(null); }
  }, [connectMode, connectSrc]);

  // ── Node pointer ───────────────────────────────────────────────
  const onNodeDown = useCallback((e: React.PointerEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();
    if (connectMode) {
      if (!connectSrc) {
        setConnectSrc(id);
        const p = positions.get(id);
        if (p) setConnectLine({ x1: p.x + CARD_W / 2, y1: p.y + CARD_H, x2: p.x + CARD_W / 2, y2: p.y + CARD_H + 1 });
      }
      return;
    }
    const pos = positions.get(id) ?? { x: 0, y: 0 };
    draggingRef.current = { id, smx: e.clientX, smy: e.clientY, sx: pos.x, sy: pos.y };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  }, [connectMode, connectSrc, positions]);

  const onNodeUp = useCallback((e: React.PointerEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();
    if (connectMode && connectSrc && connectSrc !== id) {
      updateParent?.(connectSrc, id);
      setConnectSrc(null); setConnectLine(null); return;
    }
    draggingRef.current = null;
  }, [connectMode, connectSrc, updateParent]);

  const onNodeClick = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (connectMode) return;
    setSelectedId(id); setShowPopup(true);
  }, [connectMode]);

  // ── Edges ──────────────────────────────────────────────────────
  const edges = useMemo(() => {
    const list: Array<{ p: string; c: string; mat: boolean }> = [];
    for (const m of visible)
      for (const cid of m.children ?? [])
        if (visibleSet.has(cid)) list.push({ p: m.id, c: cid, mat: m.branch === 'Maternal' });
    return list;
  }, [visible, visibleSet]);

  // ── SVG bounds ─────────────────────────────────────────────────
  // The SVG is position:absolute top:0 left:0 inside canvas-inner,
  // so its pixel origin matches the card coordinate space exactly.
  // We set viewBox="0 0 1 1" with overflow:visible so SVG paths
  // drawn at any coordinate (including negative x/y) still render.
  // Width/height of 1 is a dummy — overflow:visible does the work.
  const svgB = useMemo(() => {
    let minX = 0, minY = 0, maxX = 1, maxY = 1;
    for (const [id, pos] of positions) {
      if (!visibleSet.has(id)) continue;
      minX = Math.min(minX, pos.x); minY = Math.min(minY, pos.y);
      maxX = Math.max(maxX, pos.x + CARD_W); maxY = Math.max(maxY, pos.y + CARD_H);
    }
    return { minX: 0, minY: 0, w: Math.max(1, maxX - minX), h: Math.max(1, maxY - minY) };
  }, [positions, visibleSet]);

  const confirmMember = members.find(m => m.id === confirmId);
  const pCount = members.filter(m => m.branch !== 'Maternal').length;
  const mCount = members.filter(m => m.branch === 'Maternal').length;
  const canvasCls = `ts-canvas${isPan ? ' panning' : ''}${connectMode ? (connectSrc ? ' connect-ready' : ' connect-idle') : ''}`;

  // ──────────────────────────────────────────────────────────────
  return (
    <div className="ts-screen">

      {/* Header */}
      <header className="ts-header">
        <div className="ts-header-left">
          <h2>Family Tree</h2>
          <p>{visible.length} shown · {pCount} paternal · {mCount} maternal</p>
        </div>
        <div className="ts-header-right">
          <div className="ts-seg">
            {(['All', 'Paternal', 'Maternal'] as const).map(b => (
              <button
                key={b}
                className={`ts-seg-btn${branchFilter === b ? ' active' : ''}`}
                onClick={() => setBranchFilter(b)}
              >
                {b}
              </button>
            ))}
          </div>
          <button
            className={`ts-btn${connectMode ? ' active' : ''}`}
            title="Connect mode"
            onClick={() => { setConnectMode(v => !v); setConnectSrc(null); setConnectLine(null); }}
          >
            <Link2 size={14} />
          </button>
          <button className="ts-btn" title="Zoom in"  onClick={() => zoom(0.15)}><ZoomIn  size={14} /></button>
          <button className="ts-btn" title="Zoom out" onClick={() => zoom(-0.15)}><ZoomOut size={14} /></button>
          <button className="ts-btn" title="Fit all"  onClick={fitAll}><Maximize2 size={14} /></button>
          <button className="ts-btn ts-btn-add" onClick={() => setAddParent(null)}>
            <UserPlus size={14} /><span>Add</span>
          </button>
        </div>
      </header>

      {/* Connect banner */}
      {connectMode && (
        <div className="ts-banner">
          <Link2 size={13} />
          {connectSrc
            ? `Now click the new parent of "${members.find(m => m.id === connectSrc)?.name ?? ''}"`
            : 'Click the child node first, then click its new parent'}
          <button className="ts-banner-close"
            onClick={() => { setConnectMode(false); setConnectSrc(null); setConnectLine(null); }}>
            <X size={13} />
          </button>
        </div>
      )}

      {/* Canvas */}
      <div ref={wrapperRef} className="ts-canvas-wrap">
        <div
          ref={canvasRef}
          className={canvasCls}
          onPointerDown={onCvsDown}
          onPointerMove={onCvsMove}
          onPointerUp={onCvsUp}
          onClick={onCvsClick}
        >
          <div
            className="ts-canvas-inner"
            style={{
              transform: `translate(${transform.x}px,${transform.y}px) scale(${transform.scale})`,
              transformOrigin: '0 0',
            }}
          >
            {/* SVG edges — overflow="visible" lets paths drawn at
                negative coordinates (x<0) still render correctly.
                The SVG sits at top:0 left:0 so its (0,0) matches
                the card div coordinate origin exactly. */}
            <svg
              className="ts-svg"
              viewBox={`0 0 ${svgB.w} ${svgB.h}`}
              width={svgB.w}
              height={svgB.h}
              overflow="visible"
            >
              <defs>
                <marker id="ap" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
                  <polygon points="0 0,6 2.5,0 5" fill="#d97706" opacity="0.55" />
                </marker>
                <marker id="am" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
                  <polygon points="0 0,6 2.5,0 5" fill="#0ea5e9" opacity="0.55" />
                </marker>
              </defs>

              {/* Parent → child edges */}
              {edges.map(({ p, c, mat }) => {
                const pp = positions.get(p), cp = positions.get(c);
                if (!pp || !cp) return null;
                return (
                  <path
                    key={`${p}-${c}`}
                    d={bezierPath(pp.x + CARD_W / 2, pp.y + CARD_H, cp.x + CARD_W / 2, cp.y)}
                    fill="none"
                    stroke={mat ? '#0ea5e9' : '#d97706'}
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    markerEnd={`url(#a${mat ? 'm' : 'p'})`}
                  />
                );
              })}

              {/* Spouse bond lines */}
              {spousePairs.map(([a, b]) => {
                if (!visibleSet.has(a) || !visibleSet.has(b)) return null;
                const pa = positions.get(a), pb = positions.get(b);
                if (!pa || !pb) return null;
                const y  = Math.min(pa.y, pb.y) + CARD_H / 2;
                const x1 = pa.x < pb.x ? pa.x + CARD_W : pb.x + CARD_W;
                const x2 = pa.x < pb.x ? pb.x : pa.x;
                return (
                  <g key={`s-${a}-${b}`}>
                    <line x1={x1} y1={y} x2={x2} y2={y}
                      stroke="#a78bfa" strokeWidth="1.5"
                      strokeDasharray="4 3" strokeOpacity="0.6" />
                    <text x={(x1 + x2) / 2} y={y - 4} textAnchor="middle"
                      fontSize="8" fill="#a78bfa" fillOpacity="0.75">♥</text>
                  </g>
                );
              })}

              {/* Live connect preview */}
              {connectLine && (
                <line
                  x1={connectLine.x1} y1={connectLine.y1}
                  x2={connectLine.x2} y2={connectLine.y2}
                  stroke="#6366f1" strokeWidth="2"
                  strokeDasharray="5 4" strokeOpacity="0.9"
                />
              )}
            </svg>

            {/* Member cards */}
            {visible.map(member => {
              const pos = positions.get(member.id);
              if (!pos) return null;
              const isSelf = member.id === selfId;
              const isCSrc = member.id === connectSrc;
              const isMat  = member.branch === 'Maternal';
              const hue    = idHue(member.id);

              let cls = 'ts-card';
              if (isSelf)  cls += ' self';
              if (isCSrc)  cls += ' connect-src';
              if (isMat && !isSelf && !isCSrc) cls += ' maternal';

              return (
                <div
                  key={member.id}
                  data-nid={member.id}
                  className={cls}
                  style={{ left: pos.x, top: pos.y, cursor: connectMode ? 'pointer' : 'grab' }}
                  onPointerDown={e => onNodeDown(e, member.id)}
                  onPointerUp={e => onNodeUp(e, member.id)}
                  onClick={e => onNodeClick(e, member.id)}
                >
                  <div className={`ts-card-bar ${isSelf ? 'self-bar' : isMat ? 'maternal' : 'paternal'}`} />

                  <div
                    className="ts-avatar"
                    style={{ background: `hsl(${hue},55%,88%)`, color: `hsl(${hue},45%,35%)` }}
                  >
                    {initials(member.name)}
                  </div>

                  <div className="ts-card-name" title={member.name}>{member.name}</div>
                  <div className={`ts-card-role ${isSelf ? 'self-role' : isMat ? 'maternal' : 'paternal'}`}>
                    {member.relation}
                  </div>

                  {isSelf && <div className="ts-self-badge">You</div>}

                  <div className="ts-card-actions" onClick={e => e.stopPropagation()}>
                    <button className="ts-act-btn" title="Add child"
                      onPointerDown={e => e.stopPropagation()}
                      onClick={e => { e.stopPropagation(); setAddParent(member.id); }}>
                      <Plus size={10} />
                    </button>
                    {!isSelf && (
                      <button className="ts-act-btn del" title="Remove"
                        onPointerDown={e => e.stopPropagation()}
                        onClick={e => { e.stopPropagation(); setConfirmId(member.id); }}>
                        <Trash2 size={10} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Find Me */}
        <button className="ts-find-me" onClick={() => centreOnSelf()}>
          <LocateFixed size={14} />
          Find Me
        </button>

        {/* Zoom badge */}
        <div className="ts-zoom-badge">{Math.round(transform.scale * 100)}%</div>

        {/* Legend */}
        <div className="ts-legend">
          <span className="ts-dot p" /><span>Paternal</span>
          <span className="ts-dot m" style={{ marginLeft: 6 }} /><span>Maternal</span>
          <span className="ts-dot s" style={{ marginLeft: 6 }} /><span>Couple</span>
        </div>

        {/* Minimap */}
        <MiniMap members={visible} positions={positions} selfId={selfId} />
      </div>

      {/* Popups */}
      {showPopup && selectedId && (
        <MemberPopup
          memberId={selectedId}
          onClose={() => { setShowPopup(false); setSelectedId(null); }}
          onAddChild={id => { setShowPopup(false); setAddParent(id); }}
          onRequestRemove={id => { setShowPopup(false); setConfirmId(id); }}
        />
      )}
      {addParent !== undefined && (
        <AddMemberForm parentId={addParent ?? undefined} onClose={() => setAddParent(undefined)} />
      )}
      {confirmId && confirmMember && (
        <div className="ts-overlay" onClick={() => setConfirmId(null)}>
          <div className="ts-dialog" onClick={e => e.stopPropagation()}>
            <Trash2 size={22} color="#ef4444" />
            <h3>Remove member?</h3>
            <p className="ts-dialog-member-name">{confirmMember.name}</p>
            <p className="ts-dialog-desc">
              {(confirmMember.children?.length ?? 0) > 0
                ? `Their ${confirmMember.children!.length} child(ren) will be unlinked.`
                : 'This member will be permanently removed.'}
            </p>
            <div className="ts-dialog-btns">
              <button className="ts-btn-cancel" onClick={() => setConfirmId(null)}>Cancel</button>
              <button className="ts-btn-del"
                onClick={() => { removeMember(confirmId); setConfirmId(null); }}>
                <Trash2 size={12} /> Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MiniMap ──────────────────────────────────────────────────────

function MiniMap({
  members,
  positions,
  selfId,
}: {
  members: Member[];
  positions: Map<string, Pos>;
  selfId: string | undefined;
}) {
  const W = 140, H = 80;

  const bounds = useMemo(() => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const m of members) {
      const p = positions.get(m.id); if (!p) continue;
      minX = Math.min(minX, p.x); minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x + CARD_W); maxY = Math.max(maxY, p.y + CARD_H);
    }
    return minX === Infinity
      ? { minX: 0, minY: 0, tw: 800, th: 500 }
      : { minX, minY, tw: maxX - minX + 30, th: maxY - minY + 30 };
  }, [members, positions]);

  const sx = W / bounds.tw;
  const sy = H / bounds.th;

  return (
    <div className="ts-minimap">
      <div className="ts-minimap-title">Overview</div>
      <svg width={W} height={H} style={{ display: 'block' }}>
        {members.map(m => {
          const p = positions.get(m.id); if (!p) return null;
          const isSelf = m.id === selfId;
          return (
            <rect key={m.id}
              x={(p.x - bounds.minX) * sx}
              y={(p.y - bounds.minY) * sy}
              width={Math.max(3, CARD_W * sx)}
              height={Math.max(2, CARD_H * sy)}
              rx="1"
              fill={isSelf ? '#ef4444' : m.branch === 'Maternal' ? '#0ea5e9' : '#f59e0b'}
              opacity={isSelf ? 1 : 0.6}
            />
          );
        })}
      </svg>
    </div>
  );
}