// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const { Search, Check, X, ChevronRight, Settings, FileText, Clock, Trash, ArrowLeft, AlertCircle, CheckCircle } = Icons;

/* ---------- colour helpers: everything derives from the brand tokens ---------- */
const _clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));
const _toRgb = (hex) => {
  const h = String(hex).replace('#', '');
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(v, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const _toHex = (arr) => '#' + arr.map((x) => _clamp(x).toString(16).padStart(2, '0')).join('');
const _mix = (hex, target, amt) => {
  const a = _toRgb(hex);
  return _toHex(a.map((c, i) => c + (target[i] - c) * amt));
};
const shade = (hex, amt) => _mix(hex, [0, 0, 0], amt);
const tint = (hex, amt) => _mix(hex, [255, 255, 255], amt);
const alpha = (hex, a) => {
  const [r, g, b] = _toRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

/* ---------- account data (the server is the source of truth) ---------- */
const ACCOUNT = {
  username: 'admin',
  role: 'Administrator',
  createdAt: '2 Sep 2026',
  passwordChangedAt: '14 Oct 2026, 16:21 UTC',
  sessionExpires: '14 Nov 2026, 09:14 UTC',
  rememberMe: true,
};

const CURRENT_PASSWORD = 'Admin@123';

const PROVIDER_CONFIG = [
  ['Provider', 'Google Gemini'],
  ['Model', 'gemini-2.0-flash'],
  ['Temperature', '0.40'],
  ['History window', '20 turns'],
  ['Max output tokens', '2,048'],
];

const INITIAL_SESSIONS = [
  {
    id: 'ses_9f31',
    device: 'Chrome 131 · macOS',
    ip: '10.4.18.22',
    started: '16 Oct 2026, 09:14 UTC',
    expires: '14 Nov 2026',
    remember: true,
    current: true,
  },
  {
    id: 'ses_7c08',
    device: 'Firefox 132 · Windows 11',
    ip: '10.4.18.57',
    started: '16 Oct 2026, 08:31 UTC',
    expires: 'Today, 16:31 UTC',
    remember: false,
    current: false,
  },
  {
    id: 'ses_4ab2',
    device: 'Safari · iPadOS 18',
    ip: '82.14.203.91',
    started: '12 Oct 2026, 20:06 UTC',
    expires: '11 Nov 2026',
    remember: true,
    current: false,
  },
];

const INITIAL_ACTIVITY = [
  { id: 'a9', when: '16 Oct 2026', time: '09:14 UTC', action: 'Signed in', detail: 'Remember me · 10.4.18.22', kind: 'signin', outcome: 'success' },
  { id: 'a8', when: '16 Oct 2026', time: '08:02 UTC', action: 'Failed sign-in', detail: 'Wrong password · 10.4.18.57', kind: 'signin', outcome: 'failed' },
  { id: 'a7', when: '15 Oct 2026', time: '17:48 UTC', action: 'Signed out', detail: 'Chrome 131 · macOS', kind: 'signin', outcome: 'success' },
  { id: 'a6', when: '15 Oct 2026', time: '09:03 UTC', action: 'Signed in', detail: 'Remember me · 10.4.18.22', kind: 'signin', outcome: 'success' },
  { id: 'a5', when: '14 Oct 2026', time: '16:21 UTC', action: 'Password changed', detail: 'Changed from Settings · 10.4.18.22', kind: 'security', outcome: 'changed' },
  { id: 'a4', when: '13 Oct 2026', time: '11:52 UTC', action: 'Account locked', detail: '5 failed attempts in 15 minutes · 82.14.203.91', kind: 'security', outcome: 'locked' },
  { id: 'a3', when: '13 Oct 2026', time: '11:37 UTC', action: 'Failed sign-in', detail: 'Wrong password · 82.14.203.91', kind: 'signin', outcome: 'failed' },
  { id: 'a2', when: '12 Oct 2026', time: '20:06 UTC', action: 'Signed in', detail: 'Remember me · 82.14.203.91', kind: 'signin', outcome: 'success' },
  { id: 'a1', when: '11 Oct 2026', time: '08:55 UTC', action: 'Signed in', detail: '8-hour session · 10.4.18.22', kind: 'signin', outcome: 'success' },
];

const RULES = [
  { id: 'len', label: 'At least 12 characters', test: (v) => v.length >= 12 },
  { id: 'case', label: 'An uppercase and a lowercase letter', test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { id: 'num', label: 'A number', test: (v) => /[0-9]/.test(v) },
  { id: 'sym', label: 'A symbol, such as ! ? @ #', test: (v) => /[^A-Za-z0-9]/.test(v) },
];

const FILTERS = [
  { id: 'all', label: 'All activity' },
  { id: 'signin', label: 'Sign-ins' },
  { id: 'security', label: 'Security changes' },
];

export default function Screen() {
  const navigate = useNavigate();
  const [theme, setTheme] = React.useState('light');
  const [themeSaved, setThemeSaved] = React.useState(false);

  const [current, setCurrent] = React.useState('');
  const [next, setNext] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [reveal, setReveal] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState({});
  const [banner, setBanner] = React.useState(null); // {kind, title, body}
  const [status, setStatus] = React.useState('idle'); // idle | saving
  const [changedAt, setChangedAt] = React.useState(ACCOUNT.passwordChangedAt);

  const [sessions, setSessions] = React.useState(INITIAL_SESSIONS);
  const [confirming, setConfirming] = React.useState(null);

  const [activity, setActivity] = React.useState(INITIAL_ACTIVITY);
  const [filter, setFilter] = React.useState('all');
  const [query, setQuery] = React.useState('');

  const [health, setHealth] = React.useState({ state: 'ok', at: '09:41 UTC' });

  const t = React.useMemo(() => {
    const n = brand.neutralColor;
    if (theme === 'dark') {
      const page = shade(n, 0.88);
      const surface = shade(n, 0.8);
      const primary = tint(brand.primaryColor, 0.34);
      const accent = tint(brand.accentColor, 0.3);
      return {
        page,
        surface,
        raised: shade(n, 0.74),
        field: shade(n, 0.72),
        text: tint(brand.backgroundColor, 0.02),
        muted: tint(n, 0.3),
        faint: tint(n, 0.12),
        border: alpha(tint(n, 0.5), 0.26),
        primary,
        onPrimary: shade(brand.primaryColor, 0.76),
        primarySoft: alpha(primary, 0.18),
        accent,
        accentSoft: alpha(accent, 0.16),
      };
    }
    return {
      page: brand.backgroundColor,
      surface: tint(brand.backgroundColor, 0.72),
      raised: tint(brand.backgroundColor, 0.45),
      field: tint(brand.backgroundColor, 0.85),
      text: shade(n, 0.64),
      muted: n,
      faint: tint(n, 0.22),
      border: alpha(n, 0.22),
      primary: brand.primaryColor,
      onPrimary: tint(brand.backgroundColor, 0.92),
      primarySoft: alpha(brand.primaryColor, 0.1),
      accent: brand.accentColor,
      accentSoft: alpha(brand.accentColor, 0.1),
    };
  }, [theme]);

  /* theme "saved" confirmation fades out on its own */
  React.useEffect(() => {
    if (!themeSaved) return undefined;
    const id = setTimeout(() => setThemeSaved(false), 2400);
    return () => clearTimeout(id);
  }, [themeSaved]);

  /* health re-check */
  React.useEffect(() => {
    if (health.state !== 'checking') return undefined;
    const id = setTimeout(() => setHealth({ state: 'ok', at: '09:46 UTC' }), 900);
    return () => clearTimeout(id);
  }, [health.state]);

  /* POST /auth/change-password */
  React.useEffect(() => {
    if (status !== 'saving') return undefined;
    const id = setTimeout(() => {
      setStatus('idle');
      setCurrent('');
      setNext('');
      setConfirm('');
      setReveal(false);
      setFieldErrors({});
      setChangedAt('16 Oct 2026, 09:46 UTC');
      setBanner({
        kind: 'success',
        title: 'Your password is changed.',
        body: 'The new password is stored as an Argon2 hash. Your other sessions stay signed in — end them below if you would rather they did not.',
      });
      setActivity((prev) => [
        {
          id: 'a' + (prev.length + 10),
          when: '16 Oct 2026',
          time: '09:46 UTC',
          action: 'Password changed',
          detail: 'Changed from Settings · 10.4.18.22',
          kind: 'security',
          outcome: 'changed',
          fresh: true,
        },
        ...prev,
      ]);
    }, 750);
    return () => clearTimeout(id);
  }, [status]);

  const passed = RULES.filter((r) => r.test(next)).length;
  const strengthLabel = next.length === 0 ? '—' : passed <= 1 ? 'Weak' : passed <= 3 ? 'Getting there' : 'Strong';

  const chooseTheme = (value) => {
    setTheme(value);
    setThemeSaved(true);
  };

  const submit = (e) => {
    e.preventDefault();
    if (status === 'saving') return;
    const errs = {};
    if (!current) errs.current = 'Enter the password you use today.';
    if (!next) errs.next = 'Choose a new password.';
    else if (passed < RULES.length) errs.next = 'This does not meet all four rules yet.';
    else if (next === current) errs.next = 'Your new password must differ from your current one.';
    if (!confirm) errs.confirm = 'Type the new password a second time.';
    else if (confirm !== next) errs.confirm = 'These two entries do not match.';

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setBanner({
        kind: 'error',
        title: 'Not changed yet.',
        body: 'Everything you typed is still here. Fix the fields marked below and send it again.',
      });
      return;
    }
    if (current !== CURRENT_PASSWORD) {
      setFieldErrors({ current: 'This is not the password on file.' });
      setBanner({
        kind: 'error',
        title: 'That current password does not match.',
        body: 'Your password is unchanged and your new one is still typed below. Try again, or ask an administrator to reset it for you.',
      });
      return;
    }
    setFieldErrors({});
    setBanner(null);
    setStatus('saving');
  };

  const endSession = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    setConfirming(null);
  };

  const otherSessions = sessions.filter((s) => !s.current);

  const visibleActivity = activity.filter((a) => {
    const matchesFilter = filter === 'all' || a.kind === filter;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q.length === 0 ||
      a.action.toLowerCase().includes(q) ||
      a.detail.toLowerCase().includes(q) ||
      a.when.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });

  const outcomeStyle = (outcome) => {
    if (outcome === 'failed' || outcome === 'locked') {
      return { backgroundColor: t.accentSoft, color: t.accent, borderColor: alpha(t.accent, 0.35) };
    }
    return { backgroundColor: t.primarySoft, color: t.primary, borderColor: alpha(t.primary, 0.3) };
  };
  const outcomeWord = { success: 'Success', failed: 'Failed', locked: 'Locked 15 min', changed: 'Changed' };
  const OutcomeIcon = { success: Check, failed: X, locked: AlertCircle, changed: CheckCircle };

  const inputStyle = (hasError) => ({
    backgroundColor: t.field,
    color: t.text,
    borderColor: hasError ? t.accent : t.border,
    fontFamily: brand.fontBody,
    borderRadius: brand.radius,
  });

  const cardStyle = {
    backgroundColor: t.surface,
    borderColor: t.border,
    borderRadius: brand.radius,
  };

  const labelCls = 'block text-[0.8125rem] font-medium tracking-wide';
  const helpCls = 'text-[0.8125rem] leading-relaxed';

  return (
    <div
      className="min-h-screen w-full transition-colors duration-300"
      style={{
        backgroundColor: t.page,
        color: t.text,
        fontFamily: brand.fontBody,
        '--rr-focus': t.primary,
        '--rr-ph': t.faint,
      }}
    >
      <style>{`
        .rr-focus:focus-visible { outline: 2px solid var(--rr-focus); outline-offset: 2px; border-radius: ${brand.radius}; }
        .rr-input::placeholder { color: var(--rr-ph); }
        @keyframes rr-rise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .rr-rise { animation: rr-rise .32s ease-out both; }
        @keyframes rr-pulse { 0%,100% { opacity: 1; } 50% { opacity: .45; } }
        .rr-pulse { animation: rr-pulse 1.1s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .rr-rise, .rr-pulse { animation: none !important; }
          * { transition-duration: .01ms !important; }
        }
      `}</style>

      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-10 sm:py-14">
        {/* ---------- header ---------- */}
        <header className="mb-12">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-xl">
              <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em]" style={{ color: t.muted }}>
                Chat Assistant
              </p>
              <h1
                className="text-[2.1rem] leading-tight tracking-tight sm:text-[2.5rem]"
                style={{ fontFamily: brand.fontHeading, color: t.text, fontWeight: 600 }}
              >
                Settings
              </h1>
              <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: t.muted }}>
                Signed in as <span style={{ color: t.text, fontWeight: 600 }}>{ACCOUNT.username}</span> ·{' '}
                {ACCOUNT.role}. Your theme and password are stored against your account on the server, so they follow
                you to any browser.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 sm:items-end">
              <button
                type="button"
                onClick={() => setHealth({ state: 'checking', at: health.at })}
                className="rr-focus inline-flex items-center gap-2 border px-3 py-2 text-[0.8125rem] transition-colors"
                style={{ borderColor: t.border, color: t.muted, borderRadius: brand.radius, backgroundColor: t.surface }}
              >
                {health.state === 'checking' ? (
                  <Clock className="h-4 w-4 rr-pulse" aria-hidden="true" />
                ) : (
                  <CheckCircle className="h-4 w-4" aria-hidden="true" style={{ color: t.primary }} />
                )}
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {health.state === 'checking'
                    ? 'Checking database and Gemini…'
                    : `Database and Gemini responding · ${health.at}`}
                </span>
              </button>
              <button
                type="button"
                onClick={() => navigate('chat')}
                className="rr-focus inline-flex items-center gap-1.5 text-[0.875rem] font-medium transition-opacity hover:opacity-70"
                style={{ color: t.primary }}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to the chat workspace
              </button>
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-10">
          {/* ---------- main column ---------- */}
          <div className="space-y-8">
            {/* focal: change password */}
            <section
              className="border p-7 shadow-sm transition-colors duration-300 sm:p-9"
              style={{ ...cardStyle, boxShadow: `0 1px 0 ${alpha(t.muted, 0.08)}` }}
              aria-labelledby="pw-heading"
            >
              <h2
                id="pw-heading"
                className="text-[1.5rem] tracking-tight"
                style={{ fontFamily: brand.fontHeading, fontWeight: 600 }}
              >
                Change your password
              </h2>
              <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed" style={{ color: t.muted }}>
                Last changed <span style={{ fontVariantNumeric: 'tabular-nums' }}>{changedAt}</span>. You will stay
                signed in on this device.
              </p>

              {banner ? (
                <div
                  role={banner.kind === 'error' ? 'alert' : 'status'}
                  className="rr-rise mt-6 flex gap-3 border p-4"
                  style={{
                    borderColor: banner.kind === 'error' ? alpha(t.accent, 0.4) : alpha(t.primary, 0.35),
                    backgroundColor: banner.kind === 'error' ? t.accentSoft : t.primarySoft,
                    borderRadius: brand.radius,
                  }}
                >
                  {banner.kind === 'error' ? (
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" style={{ color: t.accent }} />
                  ) : (
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" style={{ color: t.primary }} />
                  )}
                  <div>
                    <p className="text-[0.9375rem] font-semibold" style={{ color: banner.kind === 'error' ? t.accent : t.primary }}>
                      {banner.title}
                    </p>
                    <p className={`mt-1 ${helpCls}`} style={{ color: t.text }}>
                      {banner.body}
                    </p>
                  </div>
                </div>
              ) : null}

              <form className="mt-7 space-y-6" onSubmit={submit} noValidate>
                <div>
                  <label htmlFor="current-password" className={labelCls} style={{ color: t.text }}>
                    Current password
                  </label>
                  <input
                    id="current-password"
                    name="current_password"
                    type={reveal ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    aria-invalid={fieldErrors.current ? 'true' : undefined}
                    aria-describedby={fieldErrors.current ? 'current-password-error' : undefined}
                    placeholder="The password you use today"
                    className="rr-input rr-focus mt-2 w-full border px-3.5 py-3 text-[0.9375rem] transition-colors"
                    style={inputStyle(Boolean(fieldErrors.current))}
                  />
                  {fieldErrors.current ? (
                    <p id="current-password-error" className="mt-2 text-[0.8125rem]" style={{ color: t.accent }}>
                      {fieldErrors.current}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="new-password" className={labelCls} style={{ color: t.text }}>
                      New password
                    </label>
                    <input
                      id="new-password"
                      name="new_password"
                      type={reveal ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={next}
                      onChange={(e) => setNext(e.target.value)}
                      aria-invalid={fieldErrors.next ? 'true' : undefined}
                      aria-describedby={`pw-rules${fieldErrors.next ? ' new-password-error' : ''}`}
                      placeholder="At least 12 characters"
                      className="rr-input rr-focus mt-2 w-full border px-3.5 py-3 text-[0.9375rem] transition-colors"
                      style={inputStyle(Boolean(fieldErrors.next))}
                    />
                    {fieldErrors.next ? (
                      <p id="new-password-error" className="mt-2 text-[0.8125rem]" style={{ color: t.accent }}>
                        {fieldErrors.next}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="confirm-password" className={labelCls} style={{ color: t.text }}>
                      Confirm new password
                    </label>
                    <input
                      id="confirm-password"
                      name="confirm_password"
                      type={reveal ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      aria-invalid={fieldErrors.confirm ? 'true' : undefined}
                      aria-describedby={fieldErrors.confirm ? 'confirm-password-error' : undefined}
                      placeholder="Type it a second time"
                      className="rr-input rr-focus mt-2 w-full border px-3.5 py-3 text-[0.9375rem] transition-colors"
                      style={inputStyle(Boolean(fieldErrors.confirm))}
                    />
                    {fieldErrors.confirm ? (
                      <p id="confirm-password-error" className="mt-2 text-[0.8125rem]" style={{ color: t.accent }}>
                        {fieldErrors.confirm}
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* strength + rules */}
                <div id="pw-rules" className="border p-4" style={{ borderColor: t.border, borderRadius: brand.radius }}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[0.8125rem] font-medium" style={{ color: t.text }}>
                      Password strength
                    </p>
                    <p className="text-[0.8125rem]" style={{ color: passed === RULES.length ? t.primary : t.muted }}>
                      {strengthLabel}
                      <span className="ml-2" style={{ fontVariantNumeric: 'tabular-nums', color: t.muted }}>
                        {passed}/{RULES.length}
                      </span>
                    </p>
                  </div>
                  <div
                    className="mt-3 h-1.5 w-full overflow-hidden"
                    style={{ backgroundColor: alpha(t.muted, 0.18), borderRadius: brand.radius }}
                  >
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${(passed / RULES.length) * 100}%`,
                        backgroundColor: passed === RULES.length ? t.primary : t.accent,
                      }}
                    />
                  </div>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {RULES.map((r) => {
                      const ok = r.test(next);
                      return (
                        <li key={r.id} className="flex items-center gap-2 text-[0.8125rem]" style={{ color: ok ? t.text : t.muted }}>
                          {ok ? (
                            <Check className="h-4 w-4 shrink-0" aria-hidden="true" style={{ color: t.primary }} />
                          ) : (
                            <X className="h-4 w-4 shrink-0" aria-hidden="true" style={{ color: t.faint }} />
                          )}
                          <span>{r.label}</span>
                          <span className="sr-only">{ok ? ' — met' : ' — not met yet'}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-2.5">
                    <input
                      id="reveal-passwords"
                      type="checkbox"
                      checked={reveal}
                      onChange={(e) => setReveal(e.target.checked)}
                      className="rr-focus h-4 w-4"
                      style={{ accentColor: t.primary }}
                    />
                    <label htmlFor="reveal-passwords" className="text-[0.875rem]" style={{ color: t.muted }}>
                      Show what I am typing
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrent('');
                        setNext('');
                        setConfirm('');
                        setFieldErrors({});
                        setBanner(null);
                      }}
                      className="rr-focus px-4 py-2.5 text-[0.9375rem] transition-colors"
                      style={{ color: t.muted, borderRadius: brand.radius }}
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      disabled={status === 'saving'}
                      className="rr-focus inline-flex items-center gap-2 px-5 py-2.5 text-[0.9375rem] font-semibold transition-opacity disabled:opacity-70"
                      style={{ backgroundColor: t.primary, color: t.onPrimary, borderRadius: brand.radius }}
                    >
                      {status === 'saving' ? (
                        <>
                          <Clock className="h-4 w-4 rr-pulse" aria-hidden="true" />
                          Saving your new password…
                        </>
                      ) : (
                        'Update password'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </section>

            {/* activity */}
            <section
              className="border p-7 transition-colors duration-300 sm:p-8"
              style={cardStyle}
              aria-labelledby="activity-heading"
            >
              <div className="flex flex-wrap items-end justify-between gap-5">
                <div>
                  <h2
                    id="activity-heading"
                    className="text-[1.25rem] tracking-tight"
                    style={{ fontFamily: brand.fontHeading, fontWeight: 600 }}
                  >
                    Account activity
                  </h2>
                  <p className="mt-2 text-[0.9375rem]" style={{ color: t.muted }}>
                    Sign-ins and security changes recorded on the server, newest first.
                  </p>
                </div>
                <div className="flex flex-wrap items-end gap-4">
                  <div>
                    <label htmlFor="activity-search" className={`${labelCls} mb-1.5`} style={{ color: t.muted }}>
                      Find an event
                    </label>
                    <div className="relative">
                      <Search
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                        aria-hidden="true"
                        style={{ color: t.faint }}
                      />
                      <input
                        id="activity-search"
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g. locked"
                        className="rr-input rr-focus w-48 border py-2 pl-9 pr-3 text-[0.875rem] transition-colors"
                        style={inputStyle(false)}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="activity-filter" className={`${labelCls} mb-1.5`} style={{ color: t.muted }}>
                      Show
                    </label>
                    <select
                      id="activity-filter"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="rr-focus border px-3 py-2 text-[0.875rem] transition-colors"
                      style={inputStyle(false)}
                    >
                      {FILTERS.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                {visibleActivity.length === 0 ? (
                  <div
                    className="rr-rise border border-dashed px-6 py-12 text-center"
                    style={{ borderColor: t.border, borderRadius: brand.radius }}
                  >
                    <FileText className="mx-auto h-6 w-6" aria-hidden="true" style={{ color: t.faint }} />
                    <p className="mt-4 text-[1rem] font-semibold" style={{ color: t.text }}>
                      Nothing matches “{query || FILTERS.find((f) => f.id === filter).label}”
                    </p>
                    <p className="mx-auto mt-2 max-w-sm text-[0.875rem] leading-relaxed" style={{ color: t.muted }}>
                      The log only holds the last 90 days. Try a shorter search, or switch back to all activity.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('');
                        setFilter('all');
                      }}
                      className="rr-focus mt-5 px-4 py-2 text-[0.875rem] font-medium"
                      style={{ color: t.primary, backgroundColor: t.primarySoft, borderRadius: brand.radius }}
                    >
                      Show all activity
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      <caption className="sr-only">Your recent sign-ins and security changes</caption>
                      <thead>
                        <tr style={{ borderBottom: `1px solid ${t.border}` }}>
                          <th scope="col" className="pb-3 pr-4 text-[0.75rem] font-semibold uppercase tracking-[0.12em]" style={{ color: t.muted }}>
                            When
                          </th>
                          <th scope="col" className="pb-3 pr-4 text-[0.75rem] font-semibold uppercase tracking-[0.12em]" style={{ color: t.muted }}>
                            Event
                          </th>
                          <th scope="col" className="hidden pb-3 pr-4 text-[0.75rem] font-semibold uppercase tracking-[0.12em] sm:table-cell" style={{ color: t.muted }}>
                            Detail
                          </th>
                          <th scope="col" className="pb-3 text-right text-[0.75rem] font-semibold uppercase tracking-[0.12em]" style={{ color: t.muted }}>
                            Outcome
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {visibleActivity.map((row) => {
                          const Icon = OutcomeIcon[row.outcome];
                          return (
                            <tr
                              key={row.id}
                              className={row.fresh ? 'rr-rise' : undefined}
                              style={{ borderBottom: `1px solid ${alpha(t.muted, 0.12)}` }}
                            >
                              <td className="py-4 pr-4 align-top text-[0.875rem]" style={{ color: t.muted }}>
                                <span style={{ color: t.text }}>{row.when}</span>
                                <span className="block">{row.time}</span>
                              </td>
                              <td className="py-4 pr-4 align-top text-[0.9375rem]" style={{ color: t.text }}>
                                {row.action}
                                <span className="mt-1 block text-[0.8125rem] sm:hidden" style={{ color: t.muted }}>
                                  {row.detail}
                                </span>
                              </td>
                              <td className="hidden py-4 pr-4 align-top text-[0.875rem] sm:table-cell" style={{ color: t.muted }}>
                                {row.detail}
                              </td>
                              <td className="py-4 align-top text-right">
                                <span
                                  className="inline-flex items-center gap-1.5 border px-2.5 py-1 text-[0.75rem] font-semibold"
                                  style={{ ...outcomeStyle(row.outcome), borderRadius: brand.radius }}
                                >
                                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                                  {outcomeWord[row.outcome]}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* ---------- side column ---------- */}
          <div className="space-y-8">
            {/* appearance */}
            <section
              className="border p-7 transition-colors duration-300"
              style={cardStyle}
              aria-labelledby="appearance-heading"
            >
              <div className="flex items-start justify-between gap-3">
                <h2
                  id="appearance-heading"
                  className="text-[1.25rem] tracking-tight"
                  style={{ fontFamily: brand.fontHeading, fontWeight: 600 }}
                >
                  Appearance
                </h2>
                <span
                  role="status"
                  aria-live="polite"
                  className="text-[0.75rem] font-medium transition-opacity duration-300"
                  style={{ color: t.primary, opacity: themeSaved ? 1 : 0 }}
                >
                  {themeSaved ? 'Saved to your account' : ''}
                </span>
              </div>
              <p className="mt-2 text-[0.9375rem] leading-relaxed" style={{ color: t.muted }}>
                Applies everywhere the moment you choose it, and comes back the next time you sign in.
              </p>

              <fieldset className="mt-5">
                <legend className="sr-only">Theme</legend>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'light', name: 'Light', hint: 'Warm paper' },
                    { id: 'dark', name: 'Dark', hint: 'Late reading' },
                  ].map((opt) => {
                    const selected = theme === opt.id;
                    return (
                      <label
                        key={opt.id}
                        htmlFor={`theme-${opt.id}`}
                        className="flex cursor-pointer items-start gap-2.5 border p-4 transition-colors"
                        style={{
                          borderColor: selected ? t.primary : t.border,
                          backgroundColor: selected ? t.primarySoft : 'transparent',
                          borderRadius: brand.radius,
                        }}
                      >
                        <input
                          id={`theme-${opt.id}`}
                          type="radio"
                          name="theme"
                          value={opt.id}
                          checked={selected}
                          onChange={() => chooseTheme(opt.id)}
                          className="rr-focus mt-0.5 h-4 w-4"
                          style={{ accentColor: t.primary }}
                        />
                        <span>
                          <span className="block text-[0.9375rem] font-semibold" style={{ color: t.text }}>
                            {opt.name}
                          </span>
                          <span className="block text-[0.8125rem]" style={{ color: t.muted }}>
                            {opt.hint}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* live preview */}
              <div
                className="mt-5 border p-4 transition-colors duration-300"
                style={{ borderColor: t.border, backgroundColor: t.raised, borderRadius: brand.radius }}
              >
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em]" style={{ color: t.faint }}>
                  Preview
                </p>
                <div className="mt-3 flex justify-end">
                  <span
                    className="inline-block max-w-[80%] px-3 py-2 text-[0.8125rem]"
                    style={{ backgroundColor: t.primary, color: t.onPrimary, borderRadius: brand.radius }}
                  >
                    Summarise the Q3 retro notes.
                  </span>
                </div>
                <p className="mt-3 text-[0.8125rem] leading-relaxed" style={{ color: t.text }}>
                  Three themes came up repeatedly: release cadence, on-call load and the handover doc…
                </p>
              </div>
            </section>

            {/* account */}
            <section className="border p-7 transition-colors duration-300" style={cardStyle} aria-labelledby="account-heading">
              <h2
                id="account-heading"
                className="text-[1.25rem] tracking-tight"
                style={{ fontFamily: brand.fontHeading, fontWeight: 600 }}
              >
                Your account
              </h2>
              <dl className="mt-4 space-y-3 text-[0.875rem]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {[
                  ['Username', ACCOUNT.username],
                  ['Role', ACCOUNT.role],
                  ['Account created', ACCOUNT.createdAt],
                  ['Password changed', changedAt],
                  ['This session ends', `${ACCOUNT.sessionExpires} · Remember me on`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6">
                    <dt style={{ color: t.muted }}>{k}</dt>
                    <dd className="text-right" style={{ color: t.text }}>
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* sessions */}
            <section className="border p-7 transition-colors duration-300" style={cardStyle} aria-labelledby="sessions-heading">
              <h2
                id="sessions-heading"
                className="text-[1.25rem] tracking-tight"
                style={{ fontFamily: brand.fontHeading, fontWeight: 600 }}
              >
                Where you are signed in
              </h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed" style={{ color: t.muted }}>
                Ending a session signs that browser out the next time it calls the API.
              </p>

              <ul className="mt-5 space-y-3">
                {sessions.map((s) => (
                  <li
                    key={s.id}
                    className="rr-rise border p-4 transition-colors"
                    style={{ borderColor: t.border, borderRadius: brand.radius }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[0.9375rem] font-semibold" style={{ color: t.text }}>
                          {s.device}
                        </p>
                        <p className="mt-1 text-[0.8125rem]" style={{ color: t.muted, fontVariantNumeric: 'tabular-nums' }}>
                          {s.ip} · started {s.started}
                        </p>
                        <p className="mt-0.5 text-[0.8125rem]" style={{ color: t.muted, fontVariantNumeric: 'tabular-nums' }}>
                          {s.remember ? '30-day session' : '8-hour session'} · expires {s.expires}
                        </p>
                      </div>
                      {s.current ? (
                        <span
                          className="shrink-0 border px-2.5 py-1 text-[0.75rem] font-semibold"
                          style={{
                            color: t.primary,
                            backgroundColor: t.primarySoft,
                            borderColor: alpha(t.primary, 0.3),
                            borderRadius: brand.radius,
                          }}
                        >
                          This browser
                        </span>
                      ) : null}
                    </div>

                    {!s.current ? (
                      <div className="mt-3">
                        {confirming === s.id ? (
                          <div className="rr-rise flex flex-wrap items-center gap-3">
                            <span className="text-[0.8125rem]" style={{ color: t.text }}>
                              End this session?
                            </span>
                            <button
                              type="button"
                              onClick={() => endSession(s.id)}
                              className="rr-focus px-3 py-1.5 text-[0.8125rem] font-semibold"
                              style={{ backgroundColor: t.accent, color: tint(brand.backgroundColor, 0.95), borderRadius: brand.radius }}
                            >
                              Yes, end it
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirming(null)}
                              className="rr-focus px-3 py-1.5 text-[0.8125rem]"
                              style={{ color: t.muted, borderRadius: brand.radius }}
                            >
                              Keep it
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirming(s.id)}
                            className="rr-focus inline-flex items-center gap-1.5 text-[0.8125rem] font-medium transition-opacity hover:opacity-70"
                            style={{ color: t.accent }}
                          >
                            <Trash className="h-3.5 w-3.5" aria-hidden="true" />
                            End session on {s.device.split(' · ')[0]}
                          </button>
                        )}
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>

              {otherSessions.length === 0 ? (
                <p
                  className="rr-rise mt-4 border border-dashed px-4 py-5 text-center text-[0.875rem] leading-relaxed"
                  style={{ borderColor: t.border, color: t.muted, borderRadius: brand.radius }}
                >
                  Only this browser is signed in. Nothing else holds a session for{' '}
                  <span style={{ color: t.text }}>{ACCOUNT.username}</span>.
                </p>
              ) : null}
            </section>

            {/* admin-only, read-only */}
            <section className="border p-7 transition-colors duration-300" style={cardStyle} aria-labelledby="model-heading">
              <div className="flex items-start justify-between gap-3">
                <h2
                  id="model-heading"
                  className="text-[1.25rem] tracking-tight"
                  style={{ fontFamily: brand.fontHeading, fontWeight: 600 }}
                >
                  Model and provider
                </h2>
                <span
                  className="inline-flex shrink-0 items-center gap-1.5 border px-2.5 py-1 text-[0.75rem] font-semibold"
                  style={{
                    color: t.accent,
                    backgroundColor: t.accentSoft,
                    borderColor: alpha(t.accent, 0.35),
                    borderRadius: brand.radius,
                  }}
                >
                  <Settings className="h-3.5 w-3.5" aria-hidden="true" />
                  Read only
                </span>
              </div>
              <p className="mt-2 text-[0.9375rem] leading-relaxed" style={{ color: t.muted }}>
                These are set in backend configuration and cannot be edited from the browser. Ask an administrator to
                change them; an in-app editor ships in a later release.
              </p>
              <dl className="mt-4 space-y-2.5 text-[0.875rem]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {PROVIDER_CONFIG.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6">
                    <dt style={{ color: t.muted }}>{k}</dt>
                    <dd style={{ color: t.text }}>{v}</dd>
                  </div>
                ))}
              </dl>
              <button
                type="button"
                onClick={() => navigate('knowledge-base')}
                className="rr-focus mt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-medium transition-opacity hover:opacity-70"
                style={{ color: t.primary }}
              >
                What the Knowledge Base will add
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
