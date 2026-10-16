// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const { Button, Input, Textarea, Label, Table, THead, TBody, TR, TH, TD, Tabs } = UI;
const { Plus, Search, Check, X, Users, Settings, Home, FileText, Clock, Trash, ArrowLeft, ArrowRight, AlertCircle } = Icons;

const _UI = (typeof UI !== 'undefined' && UI) ? UI : {};
const _IC = (typeof Icons !== 'undefined' && Icons) ? Icons : {};

const Button = _UI.Button || (({ children, ...p }) => <button type="button" {...p}>{children}</button>);
const Input = _UI.Input || ((p) => <input {...p} />);
const Textarea = _UI.Textarea || ((p) => <textarea {...p} />);
const Label = _UI.Label || (({ children, ...p }) => <label {...p}>{children}</label>);
const Table = _UI.Table || (({ children, ...p }) => <table {...p}>{children}</table>);
const THead = _UI.THead || (({ children, ...p }) => <thead {...p}>{children}</thead>);
const TBody = _UI.TBody || (({ children, ...p }) => <tbody {...p}>{children}</tbody>);
const TR = _UI.TR || (({ children, ...p }) => <tr {...p}>{children}</tr>);
const TH = _UI.TH || (({ children, ...p }) => <th {...p}>{children}</th>);
const TD = _UI.TD || (({ children, ...p }) => <td {...p}>{children}</td>);

const IcCheck = _IC.Check || (() => null);
const IcX = _IC.X || (() => null);
const IcAlert = _IC.AlertCircle || (() => null);
const IcClock = _IC.Clock || (() => null);
const IcSearch = _IC.Search || (() => null);
const IcArrowRight = _IC.ArrowRight || (() => null);
const IcTrash = _IC.Trash || (() => null);
const IcPlus = _IC.Plus || (() => null);
const IcFileText = _IC.FileText || (() => null);

function hexToRgb(hex) {
  const h = String(hex || '#000000').replace('#', '');
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [parseInt(n.slice(0, 2), 16) || 0, parseInt(n.slice(2, 4), 16) || 0, parseInt(n.slice(4, 6), 16) || 0];
}
function withAlpha(hex, a) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
function mixTo(hex, target, amt) {
  const [r, g, b] = hexToRgb(hex);
  const [tr, tg, tb] = target;
  const f = (c, t) => Math.round(c + (t - c) * amt);
  return `rgb(${f(r, tr)}, ${f(g, tg)}, ${f(b, tb)})`;
}

const INK = mixTo(brand.neutralColor, [0, 0, 0], 0.62);
const INK_SOFT = brand.neutralColor;
const PAPER = mixTo(brand.backgroundColor, [255, 255, 255], 0.62);
const LINE = withAlpha(brand.neutralColor, 0.2);
const LINE_SOFT = withAlpha(brand.neutralColor, 0.12);

const TABS = [
  { id: 'today', label: 'Today’s answer sources' },
  { id: 'next', label: 'When retrieval arrives' },
  { id: 'storage', label: 'Storage readiness' }
];

const IN_USE = [
  { title: 'Gemini 2.0 Flash general knowledge', detail: 'Training data up to mid-2024. Nothing from your organisation is in it.' },
  { title: 'The conversation you are in', detail: 'The most recent 20 turns, trimmed to the configured history window.' },
  { title: 'The system prompt', detail: 'Set once in backend configuration and prepended to every request.' }
];

const NOT_USED = [
  { title: 'Files you might upload', detail: 'There is no upload control on this page, because there is nothing behind it yet.' },
  { title: 'Your other conversations', detail: 'Each conversation is answered on its own. Nothing crosses between them.' },
  { title: 'Company drives, wikis or ticket history', detail: 'No connector is installed and none is called.' },
  { title: 'The live web', detail: 'The model does not browse. Anything after mid-2024 may be wrong or missing.' }
];

const ROADMAP = [
  { title: 'Document upload — PDF, Markdown, plain text', status: 'Planned', note: 'Per-user libraries first, shared ones later.' },
  { title: 'Chunking and embedding on ingest', status: 'In design', note: 'Writes into the embedding column that already exists.' },
  { title: 'Citations under each reply', status: 'Planned', note: 'Source name and the passage that was matched.' },
  { title: 'Choosing sources per conversation', status: 'Under discussion', note: 'May land as a simple on/off instead.' },
  { title: 'Shared team libraries with permissions', status: 'Not scheduled', note: 'Needs the admin Users page first.' }
];

const READINESS = [
  { component: 'pgvector extension', status: 'Enabled', ready: true, detail: 'vector 0.7.4 on chat_assistant' },
  { component: 'messages.embedding column', status: 'Migrated', ready: true, detail: 'vector(768), written by nothing yet' },
  { component: 'Message store', status: 'Collecting', ready: true, detail: '1,284 messages across 37 conversations' },
  { component: 'Ingest and chunking pipeline', status: 'Not built', ready: false, detail: 'No upload, no parser, no job queue' },
  { component: 'Embedding model', status: 'Not configured', ready: false, detail: 'EMBEDDING_MODEL is unset' },
  { component: 'Retrieval endpoint', status: 'Not exposed', ready: false, detail: 'No route answers search requests' }
];

const SEED_REQUESTS = [
  { id: 'r-108', text: 'The 2026 incident runbooks in Confluence. I retype the same escalation steps to the bot most weeks.', source: 'Confluence', author: 'Priya Raghavan', date: '15 Oct 2026', status: 'Under review', mine: false },
  { id: 'r-107', text: 'Our internal API reference, so replies stop inventing endpoint names that have never existed.', source: 'Codebase', author: 'Dan Okafor', date: '14 Oct 2026', status: 'Scheduled', mine: false },
  { id: 'r-106', text: 'Supplier contracts sitting in the shared drive — renewal dates and notice periods, mostly.', source: 'Shared drive', author: 'Tom Byrne', date: '13 Oct 2026', status: 'Logged', mine: false },
  { id: 'r-105', text: 'Minutes from the Thursday ops call, going back about a year.', source: 'Shared drive', author: 'Helena Vos', date: '10 Oct 2026', status: 'Logged', mine: false },
  { id: 'r-104', text: 'Onboarding guides for new starters, so I can point people at the assistant in week one.', source: 'Confluence', author: 'Sam Aldridge', date: '9 Oct 2026', status: 'Under review', mine: false },
  { id: 'r-103', text: 'Historic support tickets from 2024 onward, including the customer names.', source: 'Elsewhere', author: 'Marta Kowalczyk', date: '6 Oct 2026', status: 'Declined', mine: false }
];

const SOURCES = ['Shared drive', 'Confluence', 'Codebase', 'Email threads', 'Elsewhere'];
const STATUS_FILTERS = ['All', 'Logged', 'Under review', 'Scheduled', 'Declined'];

function statusTone(status) {
  if (status === 'Scheduled' || status === 'Enabled' || status === 'Migrated' || status === 'Collecting') {
    return { bg: withAlpha(brand.primaryColor, 0.1), fg: brand.primaryColor, bd: withAlpha(brand.primaryColor, 0.28) };
  }
  if (status === 'Under review' || status === 'In design' || status === 'Planned') {
    return { bg: withAlpha(brand.accentColor, 0.12), fg: brand.accentColor, bd: withAlpha(brand.accentColor, 0.3) };
  }
  return { bg: withAlpha(brand.neutralColor, 0.1), fg: INK_SOFT, bd: withAlpha(brand.neutralColor, 0.24) };
}

const STYLES = `
.ca-root :focus-visible { outline: 2px solid ${brand.accentColor}; outline-offset: 2px; border-radius: ${brand.radius}; }
@keyframes ca-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes ca-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes ca-breathe { 0%, 100% { opacity: .38; } 50% { opacity: 1; } }
.ca-rise { animation: ca-rise 340ms cubic-bezier(.2,.7,.3,1) both; }
.ca-fade { animation: ca-fade 260ms ease-out both; }
.ca-breathe { animation: ca-breathe 1.5s ease-in-out infinite; }
.ca-row { transition: background-color 180ms ease, border-color 180ms ease; }
@media (prefers-reduced-motion: reduce) {
  .ca-rise, .ca-fade, .ca-breathe { animation: none !important; }
  .ca-row { transition: none !important; }
}
`;

function StatusPill({ status, icon }) {
  const tone = statusTone(status);
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap px-2.5 py-1 text-[12px] font-medium"
      style={{ backgroundColor: tone.bg, color: tone.fg, border: `1px solid ${tone.bd}`, borderRadius: '999px' }}
    >
      {icon}
      {status}
    </span>
  );
}

export default function Screen() {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState('today');
  const tabRefs = React.useRef([]);

  const [checkState, setCheckState] = React.useState('idle');
  const [checkCount, setCheckCount] = React.useState(0);
  const [lastChecked, setLastChecked] = React.useState('6 minutes ago');

  const [requests, setRequests] = React.useState(SEED_REQUESTS);
  const [draft, setDraft] = React.useState('');
  const [source, setSource] = React.useState(SOURCES[0]);
  const [formError, setFormError] = React.useState('');
  const [confirmId, setConfirmId] = React.useState(null);
  const [banner, setBanner] = React.useState('');
  const [query, setQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('All');

  React.useEffect(() => {
    if (checkState !== 'checking') return undefined;
    const t = setTimeout(() => {
      const next = checkCount + 1;
      setCheckCount(next);
      if (next % 3 === 0) {
        setCheckState('error');
      } else {
        setCheckState('ok');
        setLastChecked('just now');
      }
    }, 850);
    return () => clearTimeout(t);
  }, [checkState, checkCount]);

  const onTabKey = (e, index) => {
    let next = null;
    if (e.key === 'ArrowRight') next = (index + 1) % TABS.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + TABS.length) % TABS.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = TABS.length - 1;
    if (next === null) return;
    e.preventDefault();
    setTab(TABS[next].id);
    const node = tabRefs.current[next];
    if (node && node.focus) node.focus();
  };

  const submitRequest = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (text.length < 12) {
      setFormError('Give it a sentence — what you would want looked up, and roughly where it lives today. Your words are still here.');
      return;
    }
    const id = 'r-' + (200 + requests.length);
    setRequests([{ id, text, source, author: 'You · admin', date: '16 Oct 2026', status: 'Logged', mine: true }, ...requests]);
    setDraft('');
    setFormError('');
    setBanner('Logged. It sits with the others below — withdraw it any time before ingest is scoped.');
  };

  const withdraw = (id) => {
    setRequests(requests.filter((r) => r.id !== id));
    setConfirmId(null);
    setBanner('Withdrawn. Nothing was kept.');
  };

  const filtered = requests.filter((r) => {
    const matchStatus = statusFilter === 'All' || r.status === statusFilter;
    const q = query.trim().toLowerCase();
    const matchQuery = !q || r.text.toLowerCase().includes(q) || r.author.toLowerCase().includes(q) || r.source.toLowerCase().includes(q);
    return matchStatus && matchQuery;
  });

  const eyebrow = 'text-[11px] font-semibold uppercase tracking-[0.16em]';
  const cardStyle = { backgroundColor: PAPER, border: `1px solid ${LINE}`, borderRadius: brand.radius };

  return (
    <div
      className="ca-root min-h-full w-full px-6 py-10 sm:px-10 lg:px-14"
      style={{ backgroundColor: brand.backgroundColor, color: INK, fontFamily: brand.fontBody }}
    >
      <style>{STYLES}</style>

      <div className="mx-auto w-full max-w-3xl">

        {/* ---------- Header ---------- */}
        <header className="ca-fade">
          <p className={eyebrow} style={{ color: brand.accentColor }}>Not available yet</p>
          <h1
            className="mt-3 text-[2.4rem] leading-[1.15] tracking-[-0.02em]"
            style={{ fontFamily: brand.fontHeading, fontWeight: 600, color: INK }}
          >
            Knowledge Base
          </h1>
          <p className="mt-5 max-w-[62ch] text-[1.0625rem] leading-[1.75]" style={{ color: INK_SOFT }}>
            Chat Assistant cannot search your documents yet. Every reply you have read so far was written
            by the model from its own general knowledge, plus the turns of the conversation you were in —
            nothing of yours was consulted, and nothing of yours was sent anywhere else.
          </p>
          <p
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]"
            style={{ color: INK_SOFT, fontVariantNumeric: 'tabular-nums' }}
          >
            <span><strong style={{ color: INK }}>0</strong> documents indexed</span>
            <span aria-hidden="true" style={{ color: LINE }}>·</span>
            <span><strong style={{ color: INK }}>1,284</strong> messages stored and vector-ready</span>
            <span aria-hidden="true" style={{ color: LINE }}>·</span>
            <span><strong style={{ color: INK }}>6</strong> source requests from the team</span>
          </p>
        </header>

        {/* ---------- Focal panel ---------- */}
        <section
          className="ca-rise mt-10 p-7 sm:p-9"
          style={{ ...cardStyle, borderLeft: `3px solid ${brand.accentColor}` }}
          aria-labelledby="kb-focal-heading"
        >
          <h2
            id="kb-focal-heading"
            className="text-[1.4rem] leading-snug tracking-[-0.01em]"
            style={{ fontFamily: brand.fontHeading, fontWeight: 600, color: INK }}
          >
            Retrieval over your own documents is switched off
          </h2>
          <p className="mt-4 max-w-[60ch] text-[1rem] leading-[1.75]" style={{ color: INK_SOFT }}>
            There is no upload control on this page because there is nothing behind it yet — no parser,
            no embedding job, no search endpoint. When that work ships, this page becomes the library and
            replies start carrying citations. Until then, treat answers as a well-read colleague’s: useful,
            confident, and worth checking against the real document.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button
              type="button"
              onClick={() => navigate('chat')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[15px] font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: brand.primaryColor, color: PAPER, borderRadius: brand.radius, border: 'none' }}
            >
              Back to the chat
              <IcArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              onClick={() => navigate('settings')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[15px] font-medium transition-colors"
              style={{ backgroundColor: 'transparent', color: INK, border: `1px solid ${LINE}`, borderRadius: brand.radius }}
            >
              Open Settings
            </Button>
          </div>
        </section>

        {/* ---------- Tabs ---------- */}
        <section className="mt-14" aria-labelledby="kb-detail-heading">
          <h2
            id="kb-detail-heading"
            className="text-[1.25rem] tracking-[-0.01em]"
            style={{ fontFamily: brand.fontHeading, fontWeight: 600, color: INK }}
          >
            What a reply is built from
          </h2>

          <div
            role="tablist"
            aria-label="Knowledge base detail"
            className="mt-5 flex flex-wrap gap-x-7 gap-y-2"
            style={{ borderBottom: `1px solid ${LINE}` }}
          >
            {TABS.map((t, i) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  role="tab"
                  type="button"
                  id={`kb-tab-${t.id}`}
                  aria-selected={active}
                  aria-controls={`kb-panel-${t.id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setTab(t.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className="-mb-px pb-3 text-[15px] transition-colors"
                  style={{
                    color: active ? INK : INK_SOFT,
                    fontWeight: active ? 600 : 400,
                    borderBottom: `2px solid ${active ? brand.accentColor : 'transparent'}`,
                    background: 'none'
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {tab === 'today' && (
            <div className="ca-fade pt-8" role="tabpanel" id="kb-panel-today" aria-labelledby="kb-tab-today" tabIndex={0}>
              <h3 className={eyebrow} style={{ color: brand.primaryColor }}>In use right now</h3>
              <ul role="list" className="mt-4 space-y-5">
                {IN_USE.map((item) => (
                  <li key={item.title} className="flex gap-3.5">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: withAlpha(brand.primaryColor, 0.12), color: brand.primaryColor }}
                    >
                      <IcCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="text-[15px] font-medium" style={{ color: INK }}>{item.title}</span>
                      <span className="mt-1 block max-w-[58ch] text-[14px] leading-relaxed" style={{ color: INK_SOFT }}>{item.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <hr className="my-8" style={{ borderColor: LINE_SOFT }} />

              <h3 className={eyebrow} style={{ color: INK_SOFT }}>Never consulted</h3>
              <ul role="list" className="mt-4 space-y-5">
                {NOT_USED.map((item) => (
                  <li key={item.title} className="flex gap-3.5">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: withAlpha(brand.neutralColor, 0.12), color: INK_SOFT }}
                    >
                      <IcX className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="text-[15px] font-medium" style={{ color: INK }}>{item.title}</span>
                      <span className="mt-1 block max-w-[58ch] text-[14px] leading-relaxed" style={{ color: INK_SOFT }}>{item.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === 'next' && (
            <div className="ca-fade pt-8" role="tabpanel" id="kb-panel-next" aria-labelledby="kb-tab-next" tabIndex={0}>
              <p className="max-w-[60ch] text-[15px] leading-[1.75]" style={{ color: INK_SOFT }}>
                The shape of the feature, as it stands in planning. No dates are committed, and nothing
                here is switched on behind the scenes.
              </p>
              <ul role="list" className="mt-6 divide-y" style={{ borderColor: LINE_SOFT }}>
                {ROADMAP.map((item) => (
                  <li key={item.title} className="flex items-start justify-between gap-6 py-5">
                    <span>
                      <span className="text-[15px] font-medium" style={{ color: INK }}>{item.title}</span>
                      <span className="mt-1 block max-w-[48ch] text-[14px] leading-relaxed" style={{ color: INK_SOFT }}>{item.note}</span>
                    </span>
                    <StatusPill status={item.status} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === 'storage' && (
            <div className="ca-fade pt-8" role="tabpanel" id="kb-panel-storage" aria-labelledby="kb-tab-storage" tabIndex={0}>
              <p className="max-w-[60ch] text-[15px] leading-[1.75]" style={{ color: INK_SOFT }}>
                The database is already shaped for this. Messages are stored in PostgreSQL with a
                vector column that no application code writes to yet.
              </p>

              {/* stale / loading / error indicator */}
              <div
                className="ca-row mt-6 flex flex-wrap items-center justify-between gap-3 px-4 py-3"
                style={{
                  backgroundColor: checkState === 'error' ? withAlpha(brand.accentColor, 0.08) : withAlpha(brand.neutralColor, 0.06),
                  border: `1px solid ${checkState === 'error' ? withAlpha(brand.accentColor, 0.3) : LINE_SOFT}`,
                  borderRadius: brand.radius
                }}
              >
                <p className="flex items-center gap-2 text-[13px]" style={{ color: checkState === 'error' ? brand.accentColor : INK_SOFT }}>
                  {checkState === 'error'
                    ? <IcAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
                    : <IcClock className="h-4 w-4 shrink-0" aria-hidden="true" />}
                  <span className={checkState === 'checking' ? 'ca-breathe' : ''} aria-live="polite">
                    {checkState === 'checking' && 'Asking the backend for its current state…'}
                    {checkState === 'error' && `The health check did not answer. Showing the last known result from ${lastChecked}.`}
                    {(checkState === 'idle' || checkState === 'ok') && `Checked ${lastChecked} against GET /health.`}
                  </span>
                </p>
                <Button
                  type="button"
                  onClick={() => setCheckState('checking')}
                  disabled={checkState === 'checking'}
                  className="px-3.5 py-1.5 text-[13px] font-medium transition-colors"
                  style={{
                    backgroundColor: 'transparent',
                    color: checkState === 'checking' ? INK_SOFT : INK,
                    border: `1px solid ${LINE}`,
                    borderRadius: brand.radius,
                    opacity: checkState === 'checking' ? 0.6 : 1
                  }}
                >
                  {checkState === 'error' ? 'Try again' : 'Check again'}
                </Button>
              </div>

              <div className="mt-6 overflow-x-auto" style={{ border: `1px solid ${LINE}`, borderRadius: brand.radius, backgroundColor: PAPER }}>
                <Table className="w-full text-left" style={{ fontVariantNumeric: 'tabular-nums', borderCollapse: 'collapse' }}>
                  <caption className="sr-only">Knowledge base components and whether each is ready</caption>
                  <THead>
                    <TR style={{ borderBottom: `1px solid ${LINE}` }}>
                      <TH scope="col" className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: INK_SOFT }}>Component</TH>
                      <TH scope="col" className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: INK_SOFT }}>State</TH>
                      <TH scope="col" className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: INK_SOFT }}>Detail</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {READINESS.map((row) => (
                      <TR key={row.component} style={{ borderTop: `1px solid ${LINE_SOFT}` }}>
                        <TH scope="row" className="px-5 py-4 text-[14px] font-medium" style={{ color: INK }}>{row.component}</TH>
                        <TD className="px-5 py-4">
                          <StatusPill
                            status={row.status}
                            icon={row.ready
                              ? <IcCheck className="h-3.5 w-3.5" aria-hidden="true" />
                              : <IcX className="h-3.5 w-3.5" aria-hidden="true" />}
                          />
                        </TD>
                        <TD className="px-5 py-4 text-[14px]" style={{ color: INK_SOFT }}>{row.detail}</TD>
                      </TR>
                    ))}
                  </TBody>
                </Table>
              </div>

              <div className="mt-6 px-5 py-4" style={{ border: `1px dashed ${LINE}`, borderRadius: brand.radius }}>
                <h3 className="text-[14px] font-semibold" style={{ color: INK }}>Who can switch this on</h3>
                <p className="mt-2 max-w-[58ch] text-[14px] leading-relaxed" style={{ color: INK_SOFT }}>
                  Nobody from this page — administrators included. Retrieval is enabled by whoever runs the
                  deployment, through backend configuration (<span style={{ fontVariantNumeric: 'tabular-nums' }}>KB_RETRIEVAL_ENABLED</span> and
                  {' '}<span style={{ fontVariantNumeric: 'tabular-nums' }}>EMBEDDING_MODEL</span>), once the ingest pipeline exists. If you need it for a
                  pilot, ask your operator and point them at the setup notes.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* ---------- Requests ---------- */}
        <section className="mt-16" aria-labelledby="kb-requests-heading">
          <h2
            id="kb-requests-heading"
            className="text-[1.25rem] tracking-[-0.01em]"
            style={{ fontFamily: brand.fontHeading, fontWeight: 600, color: INK }}
          >
            Tell us what you would want it to read
          </h2>
          <p className="mt-3 max-w-[60ch] text-[15px] leading-[1.75]" style={{ color: INK_SOFT }}>
            These go to the team scoping ingest. Nothing is uploaded and no document is read — you are
            describing a source, not attaching one.
          </p>

          <form onSubmit={submitRequest} className="mt-7 p-6 sm:p-7" style={cardStyle} noValidate>
            <div>
              <Label htmlFor="kb-request" className="block text-[13px] font-semibold" style={{ color: INK }}>
                What would you want Chat Assistant to look up?
              </Label>
              <Textarea
                id="kb-request"
                value={draft}
                rows={3}
                onChange={(e) => setDraft(e.target.value)}
                aria-invalid={formError ? 'true' : 'false'}
                aria-describedby={formError ? 'kb-request-error' : 'kb-request-hint'}
                placeholder="e.g. The warranty terms in the 2026 supplier contracts"
                className="mt-2 w-full px-3.5 py-3 text-[15px] leading-relaxed"
                style={{
                  backgroundColor: brand.backgroundColor,
                  color: INK,
                  border: `1px solid ${formError ? brand.accentColor : LINE}`,
                  borderRadius: brand.radius
                }}
              />
              {formError ? (
                <p id="kb-request-error" role="alert" className="ca-fade mt-2 flex items-start gap-2 text-[13px]" style={{ color: brand.accentColor }}>
                  <IcAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {formError}
                </p>
              ) : (
                <p id="kb-request-hint" className="mt-2 text-[13px]" style={{ color: INK_SOFT }}>
                  A sentence is plenty. Your name and today’s date are attached automatically.
                </p>
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <Label htmlFor="kb-source" className="block text-[13px] font-semibold" style={{ color: INK }}>
                  Where does it live today?
                </Label>
                <select
                  id="kb-source"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="mt-2 px-3 py-2.5 text-[14px]"
                  style={{ backgroundColor: brand.backgroundColor, color: INK, border: `1px solid ${LINE}`, borderRadius: brand.radius }}
                >
                  {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <Button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[15px] font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: brand.primaryColor, color: PAPER, border: 'none', borderRadius: brand.radius }}
              >
                <IcPlus className="h-4 w-4" aria-hidden="true" />
                Log this request
              </Button>
            </div>
          </form>

          {banner && (
            <p
              className="ca-fade mt-4 flex items-start gap-2 px-4 py-3 text-[14px]"
              role="status"
              style={{
                backgroundColor: withAlpha(brand.primaryColor, 0.08),
                color: brand.primaryColor,
                border: `1px solid ${withAlpha(brand.primaryColor, 0.24)}`,
                borderRadius: brand.radius
              }}
            >
              <IcCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {banner}
            </p>
          )}

          {/* filters */}
          <div className="mt-12 flex flex-wrap items-end gap-5">
            <div className="min-w-[14rem] flex-1">
              <Label htmlFor="kb-search" className={`block ${eyebrow}`} style={{ color: INK_SOFT }}>Search requests</Label>
              <div className="relative mt-2">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" style={{ color: INK_SOFT }}>
                  <IcSearch className="h-4 w-4" aria-hidden="true" />
                </span>
                <Input
                  id="kb-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="runbooks, Dan, Confluence…"
                  className="w-full py-2.5 pl-9 pr-3 text-[14px]"
                  style={{ backgroundColor: PAPER, color: INK, border: `1px solid ${LINE}`, borderRadius: brand.radius }}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="kb-status" className={`block ${eyebrow}`} style={{ color: INK_SOFT }}>Status</Label>
              <select
                id="kb-status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="mt-2 px-3 py-2.5 text-[14px]"
                style={{ backgroundColor: PAPER, color: INK, border: `1px solid ${LINE}`, borderRadius: brand.radius }}
              >
                {STATUS_FILTERS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <p className="mt-5 text-[13px]" style={{ color: INK_SOFT, fontVariantNumeric: 'tabular-nums' }} aria-live="polite">
            Showing {filtered.length} of {requests.length} requests
          </p>

          {requests.length === 0 ? (
            <div className="ca-fade mt-5 px-6 py-12 text-center" style={{ border: `1px dashed ${LINE}`, borderRadius: brand.radius }}>
              <IcFileText className="mx-auto h-6 w-6" aria-hidden="true" style={{ color: INK_SOFT }} />
              <h3 className="mt-4 text-[16px] font-semibold" style={{ color: INK }}>No sources requested yet</h3>
              <p className="mx-auto mt-2 max-w-[42ch] text-[14px] leading-relaxed" style={{ color: INK_SOFT }}>
                When someone names a document they keep retyping into chat, it lands here. Yours would be the first.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="ca-fade mt-5 px-6 py-12 text-center" style={{ border: `1px dashed ${LINE}`, borderRadius: brand.radius }}>
              <h3 className="text-[16px] font-semibold" style={{ color: INK }}>Nothing matches that</h3>
              <p className="mx-auto mt-2 max-w-[44ch] text-[14px] leading-relaxed" style={{ color: INK_SOFT }}>
                {query.trim()
                  ? `No request mentions “${query.trim()}”${statusFilter !== 'All' ? ` with the status ${statusFilter}` : ''}.`
                  : `No request currently has the status ${statusFilter}.`}
                {' '}Try a shorter phrase, or clear the filters.
              </p>
              <Button
                type="button"
                onClick={() => { setQuery(''); setStatusFilter('All'); }}
                className="mt-5 px-4 py-2 text-[14px] font-medium"
                style={{ backgroundColor: 'transparent', color: INK, border: `1px solid ${LINE}`, borderRadius: brand.radius }}
              >
                Clear search and filter
              </Button>
            </div>
          ) : (
            <ul role="list" className="mt-5 space-y-3">
              {filtered.map((r) => (
                <li
                  key={r.id}
                  className="ca-rise ca-row px-5 py-5"
                  style={{
                    backgroundColor: r.mine ? withAlpha(brand.accentColor, 0.05) : PAPER,
                    border: `1px solid ${r.mine ? withAlpha(brand.accentColor, 0.28) : LINE}`,
                    borderRadius: brand.radius
                  }}
                >
                  <div className="flex items-start justify-between gap-5">
                    <p className="max-w-[56ch] text-[15px] leading-[1.7]" style={{ color: INK }}>{r.text}</p>
                    <StatusPill status={r.status} />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px]" style={{ color: INK_SOFT, fontVariantNumeric: 'tabular-nums' }}>
                      <span>{r.author}</span>
                      <span aria-hidden="true" style={{ color: LINE }}>·</span>
                      <span>{r.date}</span>
                      <span aria-hidden="true" style={{ color: LINE }}>·</span>
                      <span>{r.source}</span>
                    </p>

                    {r.mine && confirmId !== r.id && (
                      <Button
                        type="button"
                        onClick={() => setConfirmId(r.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium"
                        style={{ backgroundColor: 'transparent', color: INK_SOFT, border: `1px solid ${LINE}`, borderRadius: brand.radius }}
                      >
                        <IcTrash className="h-3.5 w-3.5" aria-hidden="true" />
                        Withdraw
                      </Button>
                    )}

                    {r.mine && confirmId === r.id && (
                      <span className="ca-fade flex flex-wrap items-center gap-2.5">
                        <span className="text-[13px]" style={{ color: INK }}>Withdraw this request?</span>
                        <Button
                          type="button"
                          onClick={() => withdraw(r.id)}
                          className="px-3 py-1.5 text-[13px] font-medium"
                          style={{ backgroundColor: brand.accentColor, color: PAPER, border: 'none', borderRadius: brand.radius }}
                        >
                          Yes, withdraw
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setConfirmId(null)}
                          className="px-3 py-1.5 text-[13px] font-medium"
                          style={{ backgroundColor: 'transparent', color: INK, border: `1px solid ${LINE}`, borderRadius: brand.radius }}
                        >
                          Keep it
                        </Button>
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <p className="mt-16 max-w-[58ch] text-[13px] leading-relaxed" style={{ color: INK_SOFT }}>
          Chat Assistant stores every message in PostgreSQL before it is shown as final, so conversations
          outlive this page and whatever ships on it.
        </p>
      </div>
    </div>
  );
}
