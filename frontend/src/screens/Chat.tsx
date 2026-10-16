// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const { Button, Input, Textarea, Label } = UI;
const { Plus, Search, Check, X, Menu, Settings, Clock, Trash, Edit, ArrowRight, AlertCircle } = Icons;

// ---------------------------------------------------------------------------
// Chat Assistant — Chat Workspace
// Design direction: "Reading Room" — warm paper, generous measure, one accent.
// ---------------------------------------------------------------------------

const KIT = typeof UI !== 'undefined' && UI ? UI : {};
const ICONS = typeof Icons !== 'undefined' && Icons ? Icons : {};

const Btn = KIT.Button || ((p) => React.createElement('button', p));
const TextArea = KIT.Textarea || ((p) => React.createElement('textarea', p));
const TextInput = KIT.Input || ((p) => React.createElement('input', p));
const Lbl = KIT.Label || ((p) => React.createElement('label', p));

const NoIcon = () => null;
const IPlus = ICONS.Plus || NoIcon;
const ISearch = ICONS.Search || NoIcon;
const ICheck = ICONS.Check || NoIcon;
const IX = ICONS.X || NoIcon;
const IEdit = ICONS.Edit || NoIcon;
const ITrash = ICONS.Trash || NoIcon;
const IAlert = ICONS.AlertCircle || NoIcon;
const IMenu = ICONS.Menu || NoIcon;
const IArrowRight = ICONS.ArrowRight || NoIcon;
const IClock = ICONS.Clock || NoIcon;

// --- colour roles, all derived from the brand tokens -----------------------
const hexToRgb = (hex) => {
  const h = String(hex || '#000000').replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16) || 0;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const rgba = (hex, a) => {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
const mix = (hex, target, amt) => {
  const [r, g, b] = hexToRgb(hex);
  const m = (c, d) => Math.round(c + (d - c) * amt);
  return `rgb(${m(r, target[0])}, ${m(g, target[1])}, ${m(b, target[2])})`;
};
const WHITE = [255, 255, 255];
const BLACK = [0, 0, 0];

const PAPER = mix(brand.backgroundColor, WHITE, 0.6);
const PAGE = brand.backgroundColor;
const INK = mix(brand.neutralColor, BLACK, 0.66);
const MUTED = brand.neutralColor;
const LINE = rgba(brand.neutralColor, 0.2);
const HAIR = rgba(brand.neutralColor, 0.12);
const ACCENT_DARK = mix(brand.accentColor, BLACK, 0.2);
const PRIMARY_DARK = mix(brand.primaryColor, BLACK, 0.12);
const R = brand.radius;

const MODEL = 'gemini-2.5-flash';
const md = (...lines) => lines.join('\n');

// --- seeded history (server is the system of record) -----------------------
const SEED_CONVERSATIONS = [
  {
    id: 'c-1041',
    title: 'Connection pooling for FastAPI workers',
    group: 'Today',
    updatedLabel: 'Today 09:42',
    messages: [
      {
        id: 'm-7701',
        role: 'user',
        status: 'complete',
        time: '09:38',
        content:
          'We keep hitting `sorry, too many clients already` once four Uvicorn workers are up. How should I size the SQLAlchemy async pool?',
      },
      {
        id: 'm-7702',
        role: 'assistant',
        status: 'complete',
        time: '09:38',
        model: MODEL,
        prompt_tokens: 842,
        completion_tokens: 286,
        content: md(
          'Yes — and the fix is smaller than it looks. Size the pool **per worker**, not per deployment: each Uvicorn worker builds its own engine.',
          '',
          '### A safe starting point',
          '- `pool_size=5` with `max_overflow=5` on every worker',
          '- `pool_pre_ping=True`, so a connection Postgres has already recycled never surfaces as a 500',
          '- Keep `max_connections` at 100 so migrations and `psql` still have room',
          '',
          '```python',
          'engine = create_async_engine(',
          '    settings.database_url,',
          '    pool_size=5,',
          '    max_overflow=5,',
          '    pool_pre_ping=True,',
          '    pool_recycle=1800,',
          ')',
          '```',
          '',
          'Four workers at full stretch is 40 connections — comfortable headroom on a 100-connection instance.'
        ),
      },
      {
        id: 'm-7703',
        role: 'user',
        status: 'complete',
        time: '09:41',
        content: 'Does putting PgBouncer in front of it change those numbers?',
      },
      {
        id: 'm-7704',
        role: 'assistant',
        status: 'complete',
        time: '09:42',
        model: MODEL,
        prompt_tokens: 1204,
        completion_tokens: 198,
        content: md(
          'It does. PgBouncer in **transaction** mode lets the application pool drop to roughly the number of requests a single worker serves at once.',
          '',
          '1. Set `pool_size=2` and `max_overflow=0` per worker',
          '2. Point `DATABASE_URL` at PgBouncer rather than at Postgres directly',
          '3. Disable asyncpg statement caching — prepared statements and transaction pooling do not mix',
          '',
          '> One caveat: `LISTEN/NOTIFY` and session-level advisory locks stop working in transaction mode.'
        ),
      },
    ],
  },
  {
    id: 'c-1038',
    title: 'HNSW or IVFFlat for message embeddings',
    group: 'Earlier this week',
    updatedLabel: 'Yesterday 17:20',
    messages: [
      {
        id: 'm-7620',
        role: 'user',
        status: 'complete',
        time: '17:14',
        content:
          'The messages table already has a vector(768) embedding column sitting unused. When Knowledge Base ships, HNSW or IVFFlat?',
      },
      {
        id: 'm-7621',
        role: 'assistant',
        status: 'complete',
        time: '17:20',
        model: MODEL,
        prompt_tokens: 611,
        completion_tokens: 342,
        content: md(
          'For a corpus the size of one team\'s chat history, **HNSW**. It needs no training step, so it works on an empty table and stays correct as rows arrive.',
          '',
          '- IVFFlat wants representative data before you build the list structure — awkward for a column that starts empty',
          '- HNSW costs more to build and more memory, but recall stays high without retuning',
          '- Either way, match the operator class to the distance you actually query with',
          '',
          '```sql',
          'CREATE INDEX messages_embedding_hnsw',
          '  ON messages USING hnsw (embedding vector_cosine_ops)',
          '  WITH (m = 16, ef_construction = 64);',
          '```',
          '',
          'Revisit it past a few million rows, not before.'
        ),
      },
    ],
  },
  {
    id: 'c-1035',
    title: 'Release note for v0.4 token streaming',
    group: 'Earlier this week',
    updatedLabel: 'Yesterday 11:05',
    messages: [
      {
        id: 'm-7580',
        role: 'user',
        status: 'complete',
        time: '11:02',
        content:
          'Draft a short internal release note for v0.4 — streamed replies, stop generating, conversation rename and delete. Plain, no marketing voice.',
      },
      {
        id: 'm-7581',
        role: 'assistant',
        status: 'complete',
        time: '11:05',
        model: MODEL,
        prompt_tokens: 498,
        completion_tokens: 224,
        content: md(
          '### Chat Assistant v0.4',
          '',
          '- Replies now arrive token by token instead of appearing all at once',
          '- **Stop generating** ends a reply early; whatever arrived is saved',
          '- Conversations can be renamed, and deleting one asks first',
          '- Titles are written from your first message and are never overwritten',
          '',
          'Nothing in this release changes where your history lives: every message is written to Postgres before it is shown as final.'
        ),
      },
    ],
  },
  {
    id: 'c-1030',
    title: 'Alembic: duplicate column on messages',
    group: 'Earlier this week',
    updatedLabel: 'Wed 14 Oct, 16:48',
    messages: [
      {
        id: 'm-7501',
        role: 'user',
        status: 'complete',
        time: '16:47',
        content:
          '`alembic upgrade head` fails on staging with DuplicateColumn: column "embedding" of relation "messages" already exists. The revision ran halfway before the pod was restarted. How do I get back to a clean head without dropping anything?',
      },
      {
        id: 'm-7502',
        role: 'assistant',
        status: 'failed',
        time: '16:48',
        model: MODEL,
        content: '',
      },
    ],
  },
  {
    id: 'c-1026',
    title: 'Warmer tone for the team invite email',
    group: 'Earlier this week',
    updatedLabel: 'Tue 13 Oct, 14:12',
    messages: [
      {
        id: 'm-7440',
        role: 'user',
        status: 'complete',
        time: '14:09',
        content:
          'Rewrite this so it sounds like a person: "Your Chat Assistant account has been provisioned. Credentials are attached. You are required to change your password upon first login."',
      },
      {
        id: 'm-7441',
        role: 'assistant',
        status: 'complete',
        time: '14:12',
        model: MODEL,
        prompt_tokens: 372,
        completion_tokens: 141,
        content: md(
          'Here is a warmer pass:',
          '',
          '> Your Chat Assistant account is ready. Sign in with the temporary password below — we\'ll ask you to pick your own straight away, and that one is yours alone. If anything looks wrong, reply to this message and we\'ll sort it out.',
          '',
          'It keeps the same two facts (temporary password, forced change) and drops the passive voice.'
        ),
      },
    ],
  },
  {
    id: 'c-1019',
    title: 'SSE or WebSocket for the chat endpoint',
    group: 'Earlier this week',
    updatedLabel: 'Mon 12 Oct, 10:31',
    messages: [
      {
        id: 'm-7310',
        role: 'user',
        status: 'complete',
        time: '10:29',
        content:
          'For streaming tokens out of POST /chat — server-sent events or a WebSocket? We only ever push one way.',
      },
      {
        id: 'm-7311',
        role: 'assistant',
        status: 'stopped',
        time: '10:31',
        model: MODEL,
        prompt_tokens: 288,
        completion_tokens: 54,
        content: md(
          'Short version: **server-sent events** are the right fit here.',
          '',
          'The reply only travels one way, SSE rides on the same POST response you already opened, and a dropped connection reconnects without a second protocol to operate. Reach for a WebSocket when the client needs to push mid'
        ),
      },
    ],
  },
  {
    id: 'c-1007',
    title: 'Standup summary — 9 October',
    group: 'Earlier',
    updatedLabel: 'Fri 9 Oct, 09:15',
    messages: [
      {
        id: 'm-7120',
        role: 'user',
        status: 'complete',
        time: '09:13',
        content:
          'Turn these notes into five bullets for the channel: auth lockout merged, pgvector migration on staging, streaming spike done, Knowledge Base still placeholder, Priya out Thursday.',
      },
      {
        id: 'm-7121',
        role: 'assistant',
        status: 'complete',
        time: '09:15',
        model: MODEL,
        prompt_tokens: 265,
        completion_tokens: 118,
        content: md(
          '- Account lockout after five failed sign-ins is merged and on staging',
          '- The pgvector migration ran clean; `vector` extension confirmed enabled',
          '- Streaming spike finished — SSE over the existing POST, no new transport',
          '- Knowledge Base stays a placeholder this sprint; no upload or retrieval',
          '- Priya is out Thursday; review queue goes to Marcus'
        ),
      },
    ],
  },
];

const REPLIES = [
  md(
    'Short answer: persist first, then call the provider. That ordering is what makes the history refresh-safe.',
    '',
    '### The order I would keep',
    '1. Validate the input and write the user message to Postgres',
    '2. Load history, trim it to the configured window, prepend the system prompt',
    '3. Call the adapter and relay tokens as they arrive',
    '4. Write the assistant row with its status and token counts, then touch `updated_at`',
    '',
    '```python',
    'async def stream_reply(conversation_id: UUID, text: str):',
    '    user_msg = await messages.create(conversation_id, "user", text)',
    '    history = await messages.window(conversation_id, limit=settings.history_window)',
    '    prompt = [system_message(settings.system_prompt), *history]',
    '    async for token in adapter.stream(prompt, settings):',
    '        yield token',
    '```',
    '',
    'If the stream drops halfway, store what arrived with status `incomplete` and leave the user message untouched.'
  ),
  md(
    'That holds up, with one thing worth tightening.',
    '',
    '- Treat the provider timeout as a config value, not a constant — 30 seconds is generous for chat and miserly for long generations',
    '- Retry only on transient classes: timeouts, 429s and 5xx. An auth failure retried three times is just three auth failures',
    '- Record the outcome against the message row so a failed reply is visible later, not only in logs',
    '',
    '> Nothing in that path should ever alter stored rows on failure. A bad week for the provider should still leave a complete transcript.',
    '',
    'Worth adding a `Retry` affordance in the UI that re-sends the **same** user message rather than creating a second one.'
  ),
  md(
    'Here is how I would phrase it for the team, keeping it plain:',
    '',
    '**What changed.** Replies now stream in as they are written, and you can stop one early if it is heading the wrong way. Whatever arrived before you stopped is kept.',
    '',
    '**What did not.** Your conversations still live on the server. Clearing the browser, signing out, or a backend restart leaves every message exactly where it was.',
    '',
    'Trim it further if the channel prefers two lines.'
  ),
];

const SUGGESTIONS = [
  'Summarise the incident thread from Tuesday into five bullets',
  'Write the Alembic revision that adds vector(768) to messages',
  'Explain SSE versus WebSocket for streaming replies',
];

// --- tiny markdown renderer (builds React nodes; no HTML is ever injected) --
const inlineMd = (str, kb) => {
  const tokens = String(str).split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return tokens.map((t, i) => {
    if (!t) return null;
    if (/^\*\*[\s\S]+\*\*$/.test(t)) {
      return (
        <strong key={kb + 'b' + i} style={{ fontWeight: 650, color: INK }}>
          {t.slice(2, -2)}
        </strong>
      );
    }
    if (/^`[^`]+`$/.test(t)) {
      return (
        <code
          key={kb + 'c' + i}
          className="rounded px-1.5 py-0.5 text-[0.88em]"
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            backgroundColor: rgba(brand.neutralColor, 0.12),
            color: INK,
          }}
        >
          {t.slice(1, -1)}
        </code>
      );
    }
    const link = t.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      // only http(s) survives; javascript: and friends render as plain text
      const safe = /^https?:\/\//i.test(link[2]) ? link[2] : null;
      return safe ? (
        <a
          key={kb + 'a' + i}
          href={safe}
          className="ca-focus underline underline-offset-2"
          style={{ color: brand.primaryColor }}
        >
          {link[1]}
        </a>
      ) : (
        <span key={kb + 'a' + i}>{link[1]}</span>
      );
    }
    return <React.Fragment key={kb + 't' + i}>{t}</React.Fragment>;
  });
};

const CodeBlock = ({ code, lang }) => {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef(null);
  React.useEffect(() => () => timer.current && clearTimeout(timer.current), []);
  const copy = () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(code);
      }
    } catch (e) {
      /* clipboard unavailable — the confirmation below still reflects intent */
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div
      className="my-5 overflow-hidden"
      style={{ borderRadius: R, border: `1px solid ${LINE}`, backgroundColor: rgba(brand.neutralColor, 0.07) }}
    >
      <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: `1px solid ${HAIR}` }}>
        <span className="text-[0.68rem] uppercase tracking-[0.16em]" style={{ color: MUTED }}>
          {lang || 'code'}
        </span>
        <button
          type="button"
          onClick={copy}
          className="ca-focus inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs transition-colors"
          style={{ color: copied ? brand.primaryColor : MUTED }}
        >
          {copied ? <ICheck className="h-3.5 w-3.5" aria-hidden="true" /> : null}
          {copied ? 'Copied to clipboard' : 'Copy code'}
        </button>
      </div>
      <pre
        className="overflow-x-auto px-4 py-4 text-[0.86rem] leading-[1.7]"
        style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: INK }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};

const renderLines = (lines, kb) => {
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const raw = lines[i];
    if (!raw.trim()) {
      i++;
      continue;
    }
    const heading = raw.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      out.push(
        <h3
          key={kb + 'h' + i}
          className="mb-2 mt-6 text-[1.0625rem] font-semibold tracking-[-0.01em]"
          style={{ color: INK, fontFamily: brand.fontHeading }}
        >
          {inlineMd(heading[2], kb + 'h' + i)}
        </h3>
      );
      i++;
      continue;
    }
    if (/^[-*]\s+/.test(raw)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ''));
        i++;
      }
      out.push(
        <ul key={kb + 'ul' + i} className="my-4 list-disc space-y-2.5 pl-5">
          {items.map((it, n) => (
            <li key={n} className="pl-1.5">
              {inlineMd(it, kb + 'ul' + i + '-' + n)}
            </li>
          ))}
        </ul>
      );
      continue;
    }
    if (/^\d+\.\s+/.test(raw)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ''));
        i++;
      }
      out.push(
        <ol key={kb + 'ol' + i} className="my-4 list-decimal space-y-2.5 pl-5">
          {items.map((it, n) => (
            <li key={n} className="pl-1.5">
              {inlineMd(it, kb + 'ol' + i + '-' + n)}
            </li>
          ))}
        </ol>
      );
      continue;
    }
    if (/^>\s?/.test(raw)) {
      const quote = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quote.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      out.push(
        <blockquote
          key={kb + 'q' + i}
          className="my-5 py-1 pl-5 text-[1.02rem] italic"
          style={{ borderLeft: `2px solid ${rgba(brand.accentColor, 0.5)}`, color: mix(brand.neutralColor, BLACK, 0.4) }}
        >
          {inlineMd(quote.join(' '), kb + 'q' + i)}
        </blockquote>
      );
      continue;
    }
    const para = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^#{1,6}\s/.test(lines[i]) &&
      !/^[-*]\s/.test(lines[i]) &&
      !/^\d+\.\s/.test(lines[i]) &&
      !/^>\s?/.test(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    out.push(
      <p key={kb + 'p' + i} className="my-4">
        {inlineMd(para.join(' '), kb + 'p' + i)}
      </p>
    );
  }
  return out;
};

const Markdown = ({ text }) => {
  const lines = String(text || '').split('\n');
  const blocks = [];
  let buf = [];
  let i = 0;
  const flush = (k) => {
    if (buf.length) {
      blocks.push(<React.Fragment key={'t' + k}>{renderLines(buf, 'k' + k)}</React.Fragment>);
      buf = [];
    }
  };
  while (i < lines.length) {
    if (lines[i].trim().startsWith('```')) {
      flush(i);
      const lang = lines[i].trim().slice(3).trim();
      i++;
      const code = [];
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        code.push(lines[i]);
        i++;
      }
      i++;
      blocks.push(<CodeBlock key={'c' + i} code={code.join('\n')} lang={lang} />);
    } else {
      buf.push(lines[i]);
      i++;
    }
  }
  flush('end');
  return <div>{blocks}</div>;
};

// --- helpers ---------------------------------------------------------------
const GROUP_ORDER = ['Today', 'Earlier this week', 'Earlier'];
const nowLabel = () => {
  const d = new Date();
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
};
const titleFrom = (text) => {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= 52) return clean;
  const cut = clean.slice(0, 52);
  const space = cut.lastIndexOf(' ');
  return (space > 24 ? cut.slice(0, space) : cut) + '…';
};
const chunkify = (text) => String(text).split(/(\s+)/).filter((c) => c !== '');

export default function Screen() {
  const navigate = useNavigate();
  const [conversations, setConversations] = React.useState(SEED_CONVERSATIONS);
  const [activeId, setActiveId] = React.useState('c-1041');
  const [draft, setDraft] = React.useState('');
  const [query, setQuery] = React.useState('');
  const [streamingMsgId, setStreamingMsgId] = React.useState(null);
  const [loadingConv, setLoadingConv] = React.useState(false);
  const [renamingId, setRenamingId] = React.useState(null);
  const [renameValue, setRenameValue] = React.useState('');
  const [renameError, setRenameError] = React.useState('');
  const [confirmId, setConfirmId] = React.useState(null);
  const [sendCount, setSendCount] = React.useState(0);
  const [rateLimited, setRateLimited] = React.useState(false);
  const [savedAt, setSavedAt] = React.useState('09:42');
  const [live, setLive] = React.useState('');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const streamRef = React.useRef(null);
  const idRef = React.useRef(9000);
  const replyIdx = React.useRef(0);
  const loadTimer = React.useRef(null);
  const threadRef = React.useRef(null);
  const composerRef = React.useRef(null);

  const nextId = (p) => {
    idRef.current += 1;
    return p + '-' + idRef.current;
  };

  const activeConv = conversations.find((c) => c.id === activeId) || null;
  const filtered = query.trim()
    ? conversations.filter((c) => c.title.toLowerCase().includes(query.trim().toLowerCase()))
    : conversations;
  const grouped = GROUP_ORDER.map((g) => ({ group: g, items: filtered.filter((c) => c.group === g) })).filter(
    (g) => g.items.length > 0
  );

  // streaming engine -------------------------------------------------------
  React.useEffect(() => {
    if (!streamingMsgId) return undefined;
    const finish = () => {
      const st = streamRef.current;
      streamRef.current = null;
      if (st) {
        setConversations((prev) => {
          const updated = prev.map((c) =>
            c.id !== st.convId
              ? c
              : {
                  ...c,
                  group: 'Today',
                  updatedLabel: 'Just now',
                  messages: c.messages.map((m) =>
                    m.id !== st.msgId
                      ? m
                      : {
                          ...m,
                          status: 'complete',
                          model: MODEL,
                          prompt_tokens: 540 + c.messages.length * 136,
                          completion_tokens: Math.max(12, Math.round(m.content.length / 3.9)),
                        }
                  ),
                }
          );
          const idx = updated.findIndex((c) => c.id === st.convId);
          if (idx > 0) {
            const copy = updated.slice();
            const [one] = copy.splice(idx, 1);
            copy.unshift(one);
            return copy;
          }
          return updated;
        });
      }
      setSavedAt(nowLabel());
      setLive('Reply complete and saved to the server.');
      setStreamingMsgId(null);
    };

    const id = setInterval(() => {
      const st = streamRef.current;
      if (!st) return;
      if (st.i >= st.chunks.length) {
        finish();
        return;
      }
      const take = st.chunks.slice(st.i, st.i + 2).join('');
      st.i += 2;
      setConversations((prev) =>
        prev.map((c) =>
          c.id !== st.convId
            ? c
            : { ...c, messages: c.messages.map((m) => (m.id !== st.msgId ? m : { ...m, content: m.content + take })) }
        )
      );
    }, 34);
    return () => clearInterval(id);
  }, [streamingMsgId]);

  React.useEffect(() => () => loadTimer.current && clearTimeout(loadTimer.current), []);

  React.useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [activeId, loadingConv, streamingMsgId, activeConv ? activeConv.messages.length : 0]);

  React.useEffect(() => {
    if (!sidebarOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sidebarOpen]);

  const startStream = (convId, msgId, text) => {
    streamRef.current = { convId, msgId, chunks: chunkify(text), i: 0 };
    setLive('Chat Assistant is replying.');
    setStreamingMsgId(msgId);
  };

  const handleSend = () => {
    const text = draft.trim();
    if (!text || streamingMsgId) return;
    if (sendCount >= 5) {
      setRateLimited(true);
      return;
    }
    setRateLimited(false);
    const time = nowLabel();
    const userMsg = { id: nextId('m'), role: 'user', status: 'complete', time, content: text };
    const asstId = nextId('m');
    const asstMsg = { id: asstId, role: 'assistant', status: 'streaming', time, model: MODEL, content: '' };
    const reply = REPLIES[replyIdx.current % REPLIES.length];
    replyIdx.current += 1;

    let convId = activeId;
    if (convId) {
      setConversations((prev) =>
        prev.map((c) => (c.id !== convId ? c : { ...c, messages: [...c.messages, userMsg, asstMsg] }))
      );
    } else {
      const conv = {
        id: nextId('c'),
        title: titleFrom(text),
        group: 'Today',
        updatedLabel: 'Just now',
        messages: [userMsg, asstMsg],
      };
      convId = conv.id;
      setConversations((prev) => [conv, ...prev]);
      setActiveId(conv.id);
    }
    setDraft('');
    setSendCount((n) => n + 1);
    setSavedAt(time);
    startStream(convId, asstId, reply);
  };

  const handleStop = () => {
    const st = streamRef.current;
    if (!st) return;
    streamRef.current = null;
    setConversations((prev) =>
      prev.map((c) =>
        c.id !== st.convId
          ? c
          : {
              ...c,
              group: 'Today',
              updatedLabel: 'Just now',
              messages: c.messages.map((m) =>
                m.id !== st.msgId
                  ? m
                  : {
                      ...m,
                      status: 'stopped',
                      model: MODEL,
                      prompt_tokens: 540 + c.messages.length * 136,
                      completion_tokens: Math.max(8, Math.round(m.content.length / 3.9)),
                    }
              ),
            }
      )
    );
    setStreamingMsgId(null);
    setSavedAt(nowLabel());
    setLive('Reply stopped. The part that arrived is saved.');
  };

  const handleRetry = (convId, msgId) => {
    if (streamingMsgId) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id !== convId
          ? c
          : {
              ...c,
              messages: c.messages.map((m) =>
                m.id !== msgId ? m : { ...m, status: 'streaming', content: '', time: nowLabel() }
              ),
            }
      )
    );
    const reply = REPLIES[replyIdx.current % REPLIES.length];
    replyIdx.current += 1;
    startStream(convId, msgId, reply);
  };

  const selectConv = (id) => {
    setActiveId(id);
    setConfirmId(null);
    setRenamingId(null);
    setSidebarOpen(false);
    setLoadingConv(true);
    if (loadTimer.current) clearTimeout(loadTimer.current);
    loadTimer.current = setTimeout(() => setLoadingConv(false), 420);
  };

  const startNewChat = () => {
    setActiveId(null);
    setConfirmId(null);
    setRenamingId(null);
    setSidebarOpen(false);
    setRateLimited(false);
    if (composerRef.current) composerRef.current.focus();
  };

  const submitRename = (e, conv) => {
    e.preventDefault();
    if (!renameValue.trim()) {
      setRenameError('A conversation needs a title — the previous one has been kept.');
      return;
    }
    setConversations((prev) => prev.map((c) => (c.id !== conv.id ? c : { ...c, title: renameValue.trim() })));
    setRenamingId(null);
    setRenameError('');
    setLive('Conversation renamed.');
  };

  const confirmDelete = (conv) => {
    setConversations((prev) => prev.filter((c) => c.id !== conv.id));
    if (activeId === conv.id) setActiveId(null);
    setConfirmId(null);
    setLive('Conversation deleted along with its messages.');
  };

  const useSuggestion = (text) => {
    setDraft(text);
    if (composerRef.current) composerRef.current.focus();
  };

  const failedInActive = activeConv ? activeConv.messages.some((m) => m.status === 'failed') : false;
  const stoppedInActive = activeConv ? activeConv.messages.some((m) => m.status === 'stopped') : false;

  // ------------------------------------------------------------------ render
  return (
    <div style={{ fontFamily: brand.fontBody, color: INK }}>
      <style>{`
        @keyframes ca-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes ca-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.12; } }
        @keyframes ca-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        @keyframes ca-shim { 0% { opacity: 0.45; } 50% { opacity: 0.85; } 100% { opacity: 0.45; } }
        .ca-turn { animation: ca-rise 300ms cubic-bezier(.22,.61,.36,1) both; }
        .ca-panel { animation: ca-rise 200ms ease-out both; }
        .ca-caret { display: inline-block; width: 0.42em; height: 1.05em; vertical-align: -0.16em;
                    background: ${brand.accentColor}; animation: ca-blink 1.05s steps(2, start) infinite; }
        .ca-dot { animation: ca-pulse 1.3s ease-in-out infinite; }
        .ca-skel { animation: ca-shim 1.4s ease-in-out infinite; }
        .ca-num { font-variant-numeric: tabular-nums; }
        .ca-focus:focus-visible { outline: 2px solid ${brand.primaryColor}; outline-offset: 2px; border-radius: ${R}; }
        .ca-row-actions { opacity: 0; transition: opacity 140ms ease; }
        .ca-row:hover .ca-row-actions, .ca-row:focus-within .ca-row-actions { opacity: 1; }
        @media (prefers-reduced-motion: reduce) {
          .ca-turn, .ca-panel, .ca-caret, .ca-dot, .ca-skel { animation: none !important; }
          .ca-caret { opacity: 1; }
        }
      `}</style>

      <div
        className="relative flex h-[calc(100dvh-8.5rem)] min-h-[620px] max-h-[920px] overflow-hidden"
        style={{ borderRadius: R, border: `1px solid ${LINE}`, backgroundColor: PAPER }}
      >
        {/* ------------------------------------------------ conversations rail */}
        {sidebarOpen ? (
          <button
            type="button"
            aria-label="Close the conversation list"
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 z-20 lg:hidden"
            style={{ backgroundColor: rgba(brand.neutralColor, 0.35) }}
          />
        ) : null}

        <aside
          id="conversation-rail"
          className={
            (sidebarOpen ? 'flex ca-panel ' : 'hidden ') +
            'absolute inset-y-0 left-0 z-30 w-[19.5rem] flex-col lg:static lg:z-auto lg:flex lg:w-[20.5rem] lg:shrink-0'
          }
          style={{ borderRight: `1px solid ${HAIR}`, backgroundColor: PAGE }}
          aria-label="Conversations"
        >
          <div className="px-6 pb-4 pt-7">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em]" style={{ color: MUTED }}>
                Conversations
              </h2>
              <span className="ca-num text-[0.72rem]" style={{ color: MUTED }}>
                {conversations.length}
              </span>
            </div>

            <Btn
              type="button"
              onClick={startNewChat}
              className="ca-focus flex w-full items-center justify-center gap-2 px-4 py-2.5 text-[0.95rem] font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: brand.primaryColor, color: PAPER, borderRadius: R, border: 'none' }}
            >
              <IPlus className="h-4 w-4" aria-hidden="true" />
              New chat
            </Btn>

            <div className="relative mt-4">
              <Lbl htmlFor="conv-search" className="sr-only">
                Search your conversations by title
              </Lbl>
              <ISearch
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                aria-hidden="true"
                style={{ color: MUTED }}
              />
              <TextInput
                id="conv-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search titles"
                className="ca-focus w-full py-2 pl-9 pr-3 text-[0.9rem] outline-none"
                style={{
                  backgroundColor: PAPER,
                  border: `1px solid ${HAIR}`,
                  borderRadius: R,
                  color: INK,
                }}
              />
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
            {conversations.length === 0 ? (
              <div className="mx-3 mt-6 px-4 py-6 text-[0.9rem] leading-relaxed" style={{ color: MUTED, border: `1px dashed ${LINE}`, borderRadius: R }}>
                <p style={{ color: INK }} className="mb-1 font-medium">
                  Nothing here yet
                </p>
                <p>Your first message starts a conversation, and it is kept on the server until you delete it.</p>
              </div>
            ) : grouped.length === 0 ? (
              <div className="mx-3 mt-6 px-4 py-6 text-[0.9rem] leading-relaxed" style={{ color: MUTED, border: `1px dashed ${LINE}`, borderRadius: R }}>
                <p style={{ color: INK }} className="mb-1 font-medium">
                  No conversation matches “{query.trim()}”
                </p>
                <p className="mb-3">Titles are written from your first message, so try a word you actually typed.</p>
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="ca-focus text-[0.88rem] font-medium underline underline-offset-4"
                  style={{ color: brand.primaryColor }}
                >
                  Clear search
                </button>
              </div>
            ) : (
              grouped.map((section) => (
                <div key={section.group} className="mb-5">
                  <h3
                    className="px-3 pb-2 pt-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: rgba(brand.neutralColor, 0.85) }}
                  >
                    {section.group}
                  </h3>
                  <ul className="space-y-0.5">
                    {section.items.map((conv) => {
                      const isActive = conv.id === activeId;
                      if (renamingId === conv.id) {
                        return (
                          <li key={conv.id} className="px-1.5 py-1">
                            <form
                              onSubmit={(e) => submitRename(e, conv)}
                              className="px-2 py-2.5"
                              style={{ backgroundColor: PAPER, border: `1px solid ${rgba(brand.primaryColor, 0.35)}`, borderRadius: R }}
                            >
                              <Lbl htmlFor={'rename-' + conv.id} className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.14em]" style={{ color: MUTED }}>
                                Conversation title
                              </Lbl>
                              <TextInput
                                id={'rename-' + conv.id}
                                value={renameValue}
                                autoFocus
                                onChange={(e) => {
                                  setRenameValue(e.target.value);
                                  if (renameError) setRenameError('');
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Escape') {
                                    setRenamingId(null);
                                    setRenameError('');
                                  }
                                }}
                                className="ca-focus w-full px-2.5 py-1.5 text-[0.9rem] outline-none"
                                style={{ border: `1px solid ${LINE}`, borderRadius: R, color: INK, backgroundColor: PAGE }}
                              />
                              {renameError ? (
                                <p className="mt-2 flex items-start gap-1.5 text-[0.78rem] leading-snug" style={{ color: ACCENT_DARK }}>
                                  <IAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                                  <span>{renameError}</span>
                                </p>
                              ) : null}
                              <div className="mt-2.5 flex gap-2">
                                <button
                                  type="submit"
                                  className="ca-focus px-3 py-1.5 text-[0.82rem] font-medium"
                                  style={{ backgroundColor: brand.primaryColor, color: PAPER, borderRadius: R }}
                                >
                                  Save title
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setRenamingId(null);
                                    setRenameError('');
                                  }}
                                  className="ca-focus px-3 py-1.5 text-[0.82rem]"
                                  style={{ color: MUTED }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </li>
                        );
                      }
                      if (confirmId === conv.id) {
                        return (
                          <li key={conv.id} className="px-1.5 py-1">
                            <div
                              className="px-3 py-3"
                              style={{ backgroundColor: rgba(brand.accentColor, 0.07), border: `1px solid ${rgba(brand.accentColor, 0.32)}`, borderRadius: R }}
                            >
                              <p className="text-[0.86rem] leading-snug" style={{ color: INK }}>
                                Delete <span className="font-medium">“{conv.title}”</span> and its{' '}
                                <span className="ca-num">{conv.messages.length}</span> messages? This cannot be undone.
                              </p>
                              <div className="mt-3 flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => confirmDelete(conv)}
                                  className="ca-focus px-3 py-1.5 text-[0.82rem] font-medium"
                                  style={{ backgroundColor: ACCENT_DARK, color: PAPER, borderRadius: R }}
                                >
                                  Delete for good
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmId(null)}
                                  className="ca-focus px-3 py-1.5 text-[0.82rem]"
                                  style={{ color: MUTED }}
                                >
                                  Keep it
                                </button>
                              </div>
                            </div>
                          </li>
                        );
                      }
                      return (
                        <li key={conv.id} className="ca-row relative">
                          <button
                            type="button"
                            onClick={() => selectConv(conv.id)}
                            aria-current={isActive ? 'true' : undefined}
                            className="ca-focus w-full px-3 py-3 pr-16 text-left transition-colors"
                            style={{
                              borderRadius: R,
                              backgroundColor: isActive ? rgba(brand.primaryColor, 0.08) : 'transparent',
                              boxShadow: isActive ? `inset 2px 0 0 0 ${brand.primaryColor}` : 'none',
                            }}
                          >
                            <span
                              className="block truncate text-[0.94rem] leading-snug"
                              style={{ color: isActive ? PRIMARY_DARK : INK, fontWeight: isActive ? 600 : 450 }}
                            >
                              {conv.title}
                            </span>
                            <span className="ca-num mt-1 block text-[0.76rem]" style={{ color: MUTED }}>
                              {conv.messages.length} messages · {conv.updatedLabel}
                            </span>
                          </button>
                          <div className="ca-row-actions absolute right-2 top-2.5 flex gap-0.5">
                            <button
                              type="button"
                              aria-label={'Rename “' + conv.title + '”'}
                              onClick={() => {
                                setRenamingId(conv.id);
                                setRenameValue(conv.title);
                                setConfirmId(null);
                                setRenameError('');
                              }}
                              className="ca-focus rounded p-1.5 focus-visible:opacity-100"
                              style={{ color: MUTED }}
                            >
                              <IEdit className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              aria-label={'Delete “' + conv.title + '”'}
                              onClick={() => {
                                setConfirmId(conv.id);
                                setRenamingId(null);
                              }}
                              className="ca-focus rounded p-1.5 focus-visible:opacity-100"
                              style={{ color: MUTED }}
                            >
                              <ITrash className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            )}
          </div>

          <p
            className="px-6 py-4 text-[0.76rem] leading-relaxed"
            style={{ color: MUTED, borderTop: `1px solid ${HAIR}` }}
          >
            History lives in Postgres, not in this browser. Clearing site data changes nothing here.
          </p>
        </aside>

        {/* ----------------------------------------------------- chat workspace */}
        <main className="flex min-w-0 flex-1 flex-col">
          <header
            className="flex items-start gap-4 px-6 py-5 lg:px-10"
            style={{ borderBottom: `1px solid ${HAIR}`, backgroundColor: PAPER }}
          >
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-expanded={sidebarOpen}
              aria-controls="conversation-rail"
              className="ca-focus mt-1 rounded p-2 lg:hidden"
              style={{ color: MUTED, border: `1px solid ${HAIR}` }}
            >
              <IMenu className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Show conversations</span>
            </button>

            <div className="min-w-0 flex-1">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em]" style={{ color: MUTED }}>
                {activeConv ? 'Conversation' : 'New conversation'}
              </p>
              <h1
                className="mt-1.5 truncate text-[1.6rem] font-semibold leading-tight tracking-[-0.015em] lg:text-[1.75rem]"
                style={{ fontFamily: brand.fontHeading, color: INK }}
              >
                {activeConv ? activeConv.title : 'Ask Chat Assistant something'}
              </h1>
            </div>

            <div className="hidden shrink-0 items-center gap-2 pt-6 text-[0.78rem] sm:flex">
              {streamingMsgId ? (
                <>
                  <span
                    className="ca-dot inline-block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: brand.accentColor }}
                    aria-hidden="true"
                  />
                  <span style={{ color: ACCENT_DARK }}>Streaming — saved as it arrives</span>
                </>
              ) : failedInActive ? (
                <>
                  <IAlert className="h-3.5 w-3.5" aria-hidden="true" style={{ color: ACCENT_DARK }} />
                  <span style={{ color: ACCENT_DARK }}>1 reply didn’t arrive</span>
                </>
              ) : stoppedInActive ? (
                <>
                  <IClock className="h-3.5 w-3.5" aria-hidden="true" style={{ color: MUTED }} />
                  <span style={{ color: MUTED }}>Partial reply kept</span>
                </>
              ) : (
                <>
                  <ICheck className="h-3.5 w-3.5" aria-hidden="true" style={{ color: brand.primaryColor }} />
                  <span className="ca-num" style={{ color: MUTED }}>
                    Saved to the server · {savedAt}
                  </span>
                </>
              )}
            </div>
          </header>

          <p className="sr-only" aria-live="polite">
            {live}
          </p>

          <div ref={threadRef} className="min-h-0 flex-1 overflow-y-auto" style={{ backgroundColor: PAPER }}>
            <div className="mx-auto w-full max-w-[44rem] px-6 py-10 lg:px-10 lg:py-12">
              {loadingConv ? (
                <div aria-busy="true">
                  <p className="mb-6 text-[0.86rem]" style={{ color: MUTED }}>
                    Loading this conversation from the server…
                  </p>
                  {[0, 1, 2].map((n) => (
                    <div key={n} className="mb-8">
                      <div
                        className="ca-skel mb-3 h-3 w-24 rounded"
                        style={{ backgroundColor: rgba(brand.neutralColor, 0.18), animationDelay: n * 120 + 'ms' }}
                      />
                      <div
                        className="ca-skel mb-2 h-3.5 rounded"
                        style={{ backgroundColor: rgba(brand.neutralColor, 0.13), animationDelay: n * 120 + 60 + 'ms' }}
                      />
                      <div
                        className="ca-skel h-3.5 w-3/4 rounded"
                        style={{ backgroundColor: rgba(brand.neutralColor, 0.13), animationDelay: n * 120 + 120 + 'ms' }}
                      />
                    </div>
                  ))}
                </div>
              ) : !activeConv ? (
                <div className="ca-turn py-6">
                  <h2
                    className="text-[1.2rem] font-semibold tracking-[-0.01em]"
                    style={{ fontFamily: brand.fontHeading, color: INK }}
                  >
                    {conversations.length === 0 ? 'A clean slate' : 'Start a new thread'}
                  </h2>
                  <p className="mt-3 text-[1.02rem] leading-[1.75]" style={{ color: mix(brand.neutralColor, BLACK, 0.3) }}>
                    {conversations.length === 0
                      ? 'There are no conversations on your account yet. Type below — your first message creates one, titles itself, and is saved before the reply begins.'
                      : 'Answers come from Gemini’s general knowledge and the messages in this thread. The conversation is created the moment you send, and titled from what you write.'}
                  </p>

                  <h3 className="mt-9 text-[0.7rem] font-semibold uppercase tracking-[0.18em]" style={{ color: MUTED }}>
                    Try one of these
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {SUGGESTIONS.map((s) => (
                      <li key={s}>
                        <button
                          type="button"
                          onClick={() => useSuggestion(s)}
                          className="ca-focus group flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-[0.97rem] transition-colors"
                          style={{ border: `1px solid ${HAIR}`, borderRadius: R, color: INK, backgroundColor: PAGE }}
                        >
                          <span>{s}</span>
                          <IArrowRight
                            className="h-4 w-4 shrink-0 opacity-40 transition-opacity group-hover:opacity-100"
                            aria-hidden="true"
                            style={{ color: brand.primaryColor }}
                          />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-9 text-[0.88rem] leading-relaxed" style={{ color: MUTED }}>
                    Documents and retrieval aren’t switched on yet.{' '}
                    <button
                      type="button"
                      onClick={() => navigate('knowledge-base')}
                      className="ca-focus font-medium underline underline-offset-4"
                      style={{ color: brand.primaryColor }}
                    >
                      See what Knowledge Base will do
                    </button>
                  </p>
                </div>
              ) : (
                <ol className="space-y-10">
                  {activeConv.messages.map((m) => {
                    const isUser = m.role === 'user';
                    const isStreaming = m.status === 'streaming';
                    return (
                      <li key={m.id}>
                        <article className="ca-turn">
                          <div className="mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                            <h2
                              className="text-[0.7rem] font-semibold uppercase tracking-[0.18em]"
                              style={{ color: isUser ? MUTED : PRIMARY_DARK }}
                            >
                              {isUser ? 'You' : 'Chat Assistant'}
                            </h2>
                            <span className="ca-num text-[0.74rem]" style={{ color: MUTED }}>
                              {m.time}
                            </span>
                            {isStreaming ? (
                              <span className="inline-flex items-center gap-1.5 text-[0.74rem]" style={{ color: ACCENT_DARK }}>
                                <span
                                  className="ca-dot inline-block h-1.5 w-1.5 rounded-full"
                                  style={{ backgroundColor: brand.accentColor }}
                                  aria-hidden="true"
                                />
                                Writing…
                              </span>
                            ) : null}
                            {m.status === 'stopped' ? (
                              <span
                                className="rounded-full px-2 py-0.5 text-[0.7rem] font-medium"
                                style={{ backgroundColor: rgba(brand.neutralColor, 0.14), color: INK }}
                              >
                                Stopped early
                              </span>
                            ) : null}
                            {m.status === 'failed' ? (
                              <span
                                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.7rem] font-medium"
                                style={{ backgroundColor: rgba(brand.accentColor, 0.14), color: ACCENT_DARK }}
                              >
                                <IAlert className="h-3 w-3" aria-hidden="true" />
                                No reply
                              </span>
                            ) : null}
                          </div>

                          {isUser ? (
                            <div
                              className="px-5 py-4 text-[1.02rem] leading-[1.75]"
                              style={{
                                backgroundColor: rgba(brand.primaryColor, 0.05),
                                border: `1px solid ${rgba(brand.primaryColor, 0.14)}`,
                                borderRadius: R,
                              }}
                            >
                              {inlineMd(m.content, m.id)}
                            </div>
                          ) : m.status === 'failed' ? (
                            <div
                              className="px-5 py-4"
                              style={{
                                backgroundColor: rgba(brand.accentColor, 0.06),
                                border: `1px solid ${rgba(brand.accentColor, 0.28)}`,
                                borderRadius: R,
                              }}
                            >
                              <p className="text-[0.98rem] leading-[1.7]" style={{ color: INK }}>
                                Gemini didn’t answer — the request timed out after 30 seconds. Your message is saved and
                                nothing in this conversation was lost.
                              </p>
                              <button
                                type="button"
                                onClick={() => handleRetry(activeConv.id, m.id)}
                                disabled={!!streamingMsgId}
                                className="ca-focus mt-4 inline-flex items-center gap-2 px-4 py-2 text-[0.88rem] font-medium transition-opacity disabled:opacity-45"
                                style={{ backgroundColor: ACCENT_DARK, color: PAPER, borderRadius: R }}
                              >
                                Send it again
                              </button>
                            </div>
                          ) : (
                            <div className="text-[1.04rem] leading-[1.78]" style={{ color: mix(brand.neutralColor, BLACK, 0.58) }}>
                              <div aria-busy={isStreaming ? 'true' : 'false'}>
                                <Markdown text={m.content} />
                                {isStreaming ? <span className="ca-caret" aria-hidden="true" /> : null}
                              </div>
                              {m.status === 'stopped' ? (
                                <p className="mt-3 text-[0.86rem] italic" style={{ color: MUTED }}>
                                  You stopped this reply. Everything that had arrived was saved.
                                </p>
                              ) : null}
                              {!isStreaming && m.model ? (
                                <p className="ca-num mt-4 text-[0.75rem]" style={{ color: MUTED }}>
                                  {m.model} · {(m.prompt_tokens || 0).toLocaleString()} prompt +{' '}
                                  {(m.completion_tokens || 0).toLocaleString()} completion tokens
                                </p>
                              ) : null}
                            </div>
                          )}
                        </article>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          </div>

          {/* ------------------------------------------------------- composer */}
          <div className="px-6 pb-6 pt-4 lg:px-10" style={{ borderTop: `1px solid ${HAIR}`, backgroundColor: PAGE }}>
            <div className="mx-auto w-full max-w-[44rem]">
              {rateLimited ? (
                <div
                  className="ca-panel mb-3 flex items-start gap-3 px-4 py-3"
                  style={{
                    backgroundColor: rgba(brand.accentColor, 0.07),
                    border: `1px solid ${rgba(brand.accentColor, 0.3)}`,
                    borderRadius: R,
                  }}
                >
                  <IClock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" style={{ color: ACCENT_DARK }} />
                  <div className="flex-1">
                    <p className="text-[0.92rem] leading-snug" style={{ color: INK }}>
                      You’ve reached this account’s limit of 20 messages a minute, so nothing was sent to Gemini. Your
                      draft is untouched below.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setRateLimited(false);
                        setSendCount(0);
                        if (composerRef.current) composerRef.current.focus();
                      }}
                      className="ca-focus mt-2 text-[0.86rem] font-medium underline underline-offset-4"
                      style={{ color: ACCENT_DARK }}
                    >
                      Try sending it again
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRateLimited(false)}
                    aria-label="Dismiss the rate limit notice"
                    className="ca-focus rounded p-1"
                    style={{ color: MUTED }}
                  >
                    <IX className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              ) : null}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                <Lbl htmlFor="composer" className="sr-only">
                  Write a message to Chat Assistant
                </Lbl>
                <TextArea
                  id="composer"
                  ref={composerRef}
                  rows={3}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={activeConv ? 'Reply in this conversation…' : 'Ask anything — your first message names the conversation'}
                  className="ca-focus w-full resize-none px-4 py-3.5 text-[1.02rem] leading-[1.7] outline-none"
                  style={{
                    backgroundColor: PAPER,
                    border: `1px solid ${LINE}`,
                    borderRadius: R,
                    color: INK,
                    minHeight: '6.25rem',
                  }}
                />

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[0.78rem]" style={{ color: MUTED }}>
                    <span className="font-medium" style={{ color: mix(brand.neutralColor, BLACK, 0.3) }}>
                      Enter
                    </span>{' '}
                    sends ·{' '}
                    <span className="font-medium" style={{ color: mix(brand.neutralColor, BLACK, 0.3) }}>
                      Shift + Enter
                    </span>{' '}
                    adds a line ·{' '}
                    <button
                      type="button"
                      onClick={() => navigate('settings')}
                      className="ca-focus underline underline-offset-4"
                      style={{ color: MUTED }}
                    >
                      Settings
                    </button>
                  </p>

                  {streamingMsgId ? (
                    <Btn
                      type="button"
                      onClick={handleStop}
                      className="ca-focus inline-flex items-center gap-2 px-5 py-2.5 text-[0.95rem] font-medium"
                      style={{
                        backgroundColor: 'transparent',
                        color: ACCENT_DARK,
                        border: `1px solid ${rgba(brand.accentColor, 0.45)}`,
                        borderRadius: R,
                      }}
                    >
                      <IX className="h-4 w-4" aria-hidden="true" />
                      Stop generating
                    </Btn>
                  ) : (
                    <Btn
                      type="submit"
                      disabled={!draft.trim()}
                      className="ca-focus inline-flex items-center gap-2 px-6 py-2.5 text-[0.95rem] font-medium transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                      style={{
                        backgroundColor: brand.primaryColor,
                        color: PAPER,
                        border: 'none',
                        borderRadius: R,
                      }}
                    >
                      Send message
                      <IArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Btn>
                  )}
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
