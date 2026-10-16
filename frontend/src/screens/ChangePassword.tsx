// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const { Check, X, Settings, Clock, ArrowLeft, ArrowRight, AlertCircle, CheckCircle } = Icons;

const ACCOUNT = {
  username: 'admin',
  role: 'Administrator',
  temporaryPassword: 'Admin@123',
  signedInAt: '16 Oct 2026, 09:58 UTC',
  sessionExpires: '16 Oct 2026, 17:58 UTC',
  passwordSetBy: 'Initial deployment seed',
  rememberMe: false,
};

const LOCKED_AREAS = [
  { name: 'Chat workspace', note: 'Composer and streaming replies' },
  { name: 'Conversations', note: '0 conversations on this account' },
  { name: 'Knowledge Base', note: 'Placeholder page' },
  { name: 'Settings', note: 'Theme and password' },
];

const RULES = [
  { id: 'length', label: 'At least 12 characters', test: (v) => v.length >= 12 },
  { id: 'case', label: 'Upper and lower case letters', test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { id: 'number', label: 'At least one number', test: (v) => /\d/.test(v) },
  { id: 'symbol', label: 'At least one symbol, such as ! ? @ #', test: (v) => /[^A-Za-z0-9]/.test(v) },
  {
    id: 'distinct',
    label: 'Not the temporary password, and not your username',
    test: (v) => v.length > 0 && v !== ACCOUNT.temporaryPassword && !v.toLowerCase().includes(ACCOUNT.username),
  },
];

const STRENGTH_LABELS = ['Too short', 'Weak', 'Getting there', 'Good', 'Strong'];

const MAX_ATTEMPTS = 5;
const LOCK_CLEARS_AT = '10:19 UTC';
const SAVED_AT = '16 Oct 2026, 10:04 UTC';

const STYLES = `
@keyframes rr-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes rr-fade { from { opacity: 0; } to { opacity: 1; } }
.rr-rise { animation: rr-rise .34s cubic-bezier(.22,.61,.36,1) both; }
.rr-fade { animation: rr-fade .3s ease-out both; }
.rr-t { transition: all .22s ease-out; }
@media (prefers-reduced-motion: reduce) {
  .rr-rise, .rr-fade { animation: none !important; }
  .rr-t { transition: none !important; }
}
`;

export default function Screen() {
  const navigate = useNavigate();
  const [current, setCurrent] = React.useState('');
  const [next, setNext] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [reveal, setReveal] = React.useState({ current: false, next: false, confirm: false });
  const [fieldErrors, setFieldErrors] = React.useState({});
  const [formError, setFormError] = React.useState(null);
  const [status, setStatus] = React.useState('idle'); // idle | saving | saved | locked
  const [failures, setFailures] = React.useState(0);

  const currentRef = React.useRef(null);
  const nextRef = React.useRef(null);
  const confirmRef = React.useRef(null);
  const busyRef = React.useRef(false);
  const timers = React.useRef([]);

  React.useEffect(() => {
    if (currentRef.current && currentRef.current.focus) currentRef.current.focus();
    return () => { timers.current.forEach(clearTimeout); timers.current = []; };
  }, []);

  const met = RULES.map((r) => r.test(next));
  const metCount = met.filter(Boolean).length;
  const strengthIndex = next.length === 0 ? 0 : Math.max(1, Math.min(4, Math.round((metCount / RULES.length) * 4)));
  const allRulesMet = metCount === RULES.length;
  const matches = next.length > 0 && next === confirm;
  const attemptsLeft = MAX_ATTEMPTS - failures;
  const disabled = status === 'saving' || status === 'locked';

  const ink = brand.primaryColor;
  const muted = brand.neutralColor;
  const accent = brand.accentColor;
  const radius = brand.radius;

  const inputClass =
    'w-full rounded-md border bg-white px-3.5 py-2.5 text-[15px] rr-t focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60';

  function fieldStyle(hasError) {
    return {
      borderColor: hasError ? accent : 'rgba(110,103,94,0.3)',
      color: ink,
      borderRadius: radius,
      fontFamily: brand.fontBody,
      '--tw-ring-color': hasError ? accent : brand.primaryColor,
      '--tw-ring-offset-color': brand.backgroundColor,
    };
  }

  function handleSubmit(event) {
    if (event) event.preventDefault();
    if (busyRef.current || disabled) return;

    const errors = {};
    if (!current.trim()) errors.current = 'Enter the password you signed in with.';
    if (!next) errors.next = 'Choose a new password.';
    else if (!allRulesMet) errors.next = 'This password does not meet all five rules yet.';
    if (!confirm) errors.confirm = 'Type the new password a second time.';
    else if (next && confirm !== next) errors.confirm = 'The two new passwords are different.';

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setFormError(null);
      const first = errors.current ? currentRef : errors.next ? nextRef : confirmRef;
      if (first.current && first.current.focus) first.current.focus();
      return;
    }

    busyRef.current = true;
    setFormError(null);
    setStatus('saving');

    const t = setTimeout(() => {
      busyRef.current = false;
      if (current !== ACCOUNT.temporaryPassword) {
        const nextFailures = failures + 1;
        setFailures(nextFailures);
        if (nextFailures >= MAX_ATTEMPTS) {
          setStatus('locked');
          setFormError(null);
        } else {
          setStatus('idle');
          setFormError({
            title: 'That is not the password you signed in with',
            detail:
              'Nothing has been changed and your new password is still typed below. Check the temporary password from your welcome note and try once more.',
          });
          if (currentRef.current && currentRef.current.focus) currentRef.current.focus();
        }
      } else {
        setStatus('saved');
      }
    }, 850);
    timers.current.push(t);
  }

  function toggle(key) {
    setReveal((r) => ({ ...r, [key]: !r[key] }));
  }

  const metaRows = [
    { label: 'Role', value: ACCOUNT.role },
    { label: 'Signed in', value: ACCOUNT.signedInAt },
    { label: 'Session expires', value: ACCOUNT.sessionExpires },
    { label: 'Password set by', value: ACCOUNT.passwordSetBy },
  ];

  return (
    <div className="min-h-full" style={{ backgroundColor: brand.backgroundColor, fontFamily: brand.fontBody }}>
      <style>{STYLES}</style>

      <div className="mx-auto w-full max-w-5xl px-6 py-14 lg:px-10 lg:py-20">
        <header className="max-w-2xl">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: accent }}
          >
            Required before you continue
          </p>
          <h1
            className="mt-3 text-4xl leading-tight tracking-tight"
            style={{ fontFamily: brand.fontHeading, color: ink, fontWeight: 600 }}
          >
            Set your password
          </h1>
          <p className="mt-4 text-[16px] leading-7" style={{ color: muted }}>
            The <span style={{ color: ink, fontWeight: 600 }}>{ACCOUNT.username}</span> account is still using the
            password it was created with. Choose your own and the workspace opens straight away — nothing else about
            your account changes.
          </p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14">
          {/* ---------------- Focal column ---------------- */}
          <main>
            {status === 'saved' ? (
              <section
                className="rr-rise rounded-lg border bg-white p-8 sm:p-10"
                style={{ borderColor: 'rgba(110,103,94,0.22)', borderRadius: radius }}
                aria-live="polite"
              >
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ backgroundColor: 'rgba(31,94,75,0.1)' }}
                >
                  <Icons.CheckCircle className="h-6 w-6" aria-hidden="true" style={{ color: ink }} />
                </span>
                <h2
                  className="mt-5 text-2xl tracking-tight"
                  style={{ fontFamily: brand.fontHeading, color: ink, fontWeight: 600 }}
                >
                  Your password is set
                </h2>
                <p className="mt-3 max-w-xl text-[15px] leading-7" style={{ color: muted }}>
                  Saved on the server at{' '}
                  <span style={{ fontVariantNumeric: 'tabular-nums', color: ink }}>{SAVED_AT}</span>. The temporary
                  password no longer works, and from now on sign in as{' '}
                  <span style={{ color: ink, fontWeight: 600 }}>{ACCOUNT.username}</span> with the password you just
                  chose.
                </p>

                <ul className="mt-7 space-y-2.5">
                  {[
                    'New password hash stored',
                    'must_change_password cleared on your account',
                    'Your session stays open — no need to sign in again',
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2.5 text-[14px] leading-6" style={{ color: muted }}>
                      <Icons.Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" style={{ color: ink }} />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('chat')}
                    className="rr-t inline-flex items-center gap-2 px-5 py-3 text-[15px] font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:opacity-90"
                    style={{
                      backgroundColor: ink,
                      borderRadius: radius,
                      '--tw-ring-color': ink,
                      '--tw-ring-offset-color': '#ffffff',
                    }}
                  >
                    Open chat workspace
                    <Icons.ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('settings')}
                    className="rr-t px-4 py-3 text-[15px] font-medium underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={{
                      color: muted,
                      borderRadius: radius,
                      '--tw-ring-color': ink,
                      '--tw-ring-offset-color': '#ffffff',
                    }}
                  >
                    Review settings
                  </button>
                </div>
              </section>
            ) : status === 'locked' ? (
              <section
                className="rr-rise rounded-lg border bg-white p-8 sm:p-10"
                style={{ borderColor: accent, borderRadius: radius }}
                aria-live="assertive"
              >
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ backgroundColor: 'rgba(180,96,26,0.12)' }}
                >
                  <Icons.Clock className="h-6 w-6" aria-hidden="true" style={{ color: accent }} />
                </span>
                <h2
                  className="mt-5 text-2xl tracking-tight"
                  style={{ fontFamily: brand.fontHeading, color: ink, fontWeight: 600 }}
                >
                  Password changes are paused for 15 minutes
                </h2>
                <p className="mt-3 max-w-xl text-[15px] leading-7" style={{ color: muted }}>
                  Five temporary passwords in a row did not match, so{' '}
                  <span style={{ color: ink, fontWeight: 600 }}>{ACCOUNT.username}</span> is locked until{' '}
                  <span style={{ fontVariantNumeric: 'tabular-nums', color: ink }}>{LOCK_CLEARS_AT}</span>. Your
                  conversations and settings are untouched — only this change is held back.
                </p>
                <p className="mt-4 max-w-xl text-[15px] leading-7" style={{ color: muted }}>
                  An administrator can clear the lock immediately by resetting the temporary password on the server. If
                  you are the administrator, the seeded credentials live in <code style={{ color: ink }}>ADMIN_INITIAL_PASSWORD</code>.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('login')}
                    className="rr-t inline-flex items-center gap-2 px-5 py-3 text-[15px] font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:opacity-90"
                    style={{
                      backgroundColor: ink,
                      borderRadius: radius,
                      '--tw-ring-color': ink,
                      '--tw-ring-offset-color': '#ffffff',
                    }}
                  >
                    <Icons.ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Back to sign in
                  </button>
                  <span
                    className="text-[13px]"
                    style={{ color: muted, fontVariantNumeric: 'tabular-nums' }}
                  >
                    5 of 5 attempts used
                  </span>
                </div>
              </section>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-lg border bg-white"
                style={{ borderColor: 'rgba(110,103,94,0.22)', borderRadius: radius }}
              >
                <div className="border-b px-8 pb-6 pt-8 sm:px-10" style={{ borderColor: 'rgba(110,103,94,0.14)' }}>
                  <h2
                    className="text-xl tracking-tight"
                    style={{ fontFamily: brand.fontHeading, color: ink, fontWeight: 600 }}
                  >
                    Choose a new password
                  </h2>
                  <p className="mt-2 text-[14px] leading-6" style={{ color: muted }}>
                    Twelve characters or more. The five rules below are checked as you type.
                  </p>
                </div>

                <div className="space-y-8 px-8 py-8 sm:px-10">
                  {formError && (
                    <div
                      className="rr-rise flex gap-3 border-l-2 py-3 pl-4 pr-3"
                      style={{ borderColor: accent, backgroundColor: 'rgba(180,96,26,0.07)', borderRadius: radius }}
                      role="alert"
                    >
                      <Icons.AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" style={{ color: accent }} />
                      <div>
                        <p className="text-[14px] font-semibold" style={{ color: ink }}>
                          {formError.title}
                        </p>
                        <p className="mt-1 text-[14px] leading-6" style={{ color: muted }}>
                          {formError.detail}
                        </p>
                        <p className="mt-2 text-[13px] font-medium" style={{ color: accent, fontVariantNumeric: 'tabular-nums' }}>
                          {attemptsLeft} {attemptsLeft === 1 ? 'attempt' : 'attempts'} left before this account is
                          locked for 15 minutes
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Temporary password */}
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <label
                        htmlFor="current-password"
                        className="text-[13px] font-semibold uppercase tracking-[0.08em]"
                        style={{ color: ink }}
                      >
                        Temporary password
                      </label>
                      <button
                        type="button"
                        onClick={() => toggle('current')}
                        aria-pressed={reveal.current}
                        className="rr-t rounded px-1.5 py-0.5 text-[12px] font-medium underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        style={{ color: muted, '--tw-ring-color': ink, '--tw-ring-offset-color': '#ffffff' }}
                      >
                        {reveal.current ? 'Hide' : 'Show'} temporary password
                      </button>
                    </div>
                    <p id="current-help" className="mt-1.5 text-[13.5px] leading-6" style={{ color: muted }}>
                      The password you signed in with a moment ago.
                    </p>
                    <input
                      id="current-password"
                      ref={currentRef}
                      type={reveal.current ? 'text' : 'password'}
                      value={current}
                      autoComplete="current-password"
                      disabled={disabled}
                      aria-describedby={fieldErrors.current ? 'current-error' : 'current-help'}
                      aria-invalid={fieldErrors.current ? 'true' : undefined}
                      onChange={(e) => {
                        setCurrent(e.target.value);
                        if (fieldErrors.current) setFieldErrors((f) => ({ ...f, current: undefined }));
                      }}
                      className={inputClass + ' mt-3'}
                      style={fieldStyle(!!fieldErrors.current)}
                    />
                    {fieldErrors.current && (
                      <p id="current-error" className="mt-2 text-[13.5px]" style={{ color: ink }}>
                        <Icons.AlertCircle className="mr-1.5 inline h-4 w-4 align-[-3px]" aria-hidden="true" style={{ color: accent }} />
                        {fieldErrors.current}
                      </p>
                    )}
                  </div>

                  <hr style={{ borderColor: 'rgba(110,103,94,0.14)' }} />

                  {/* New password */}
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <label
                        htmlFor="new-password"
                        className="text-[13px] font-semibold uppercase tracking-[0.08em]"
                        style={{ color: ink }}
                      >
                        New password
                      </label>
                      <button
                        type="button"
                        onClick={() => toggle('next')}
                        aria-pressed={reveal.next}
                        className="rr-t rounded px-1.5 py-0.5 text-[12px] font-medium underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        style={{ color: muted, '--tw-ring-color': ink, '--tw-ring-offset-color': '#ffffff' }}
                      >
                        {reveal.next ? 'Hide' : 'Show'} new password
                      </button>
                    </div>
                    <input
                      id="new-password"
                      ref={nextRef}
                      type={reveal.next ? 'text' : 'password'}
                      value={next}
                      autoComplete="new-password"
                      disabled={disabled}
                      aria-describedby={'password-rules' + (fieldErrors.next ? ' new-error' : '')}
                      aria-invalid={fieldErrors.next ? 'true' : undefined}
                      onChange={(e) => {
                        setNext(e.target.value);
                        if (fieldErrors.next) setFieldErrors((f) => ({ ...f, next: undefined }));
                      }}
                      className={inputClass + ' mt-3'}
                      style={fieldStyle(!!fieldErrors.next)}
                    />

                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex flex-1 gap-1.5" aria-hidden="true">
                        {[0, 1, 2, 3].map((i) => (
                          <span
                            key={i}
                            className="rr-t h-1.5 flex-1 rounded-full"
                            style={{
                              backgroundColor:
                                next.length > 0 && i < strengthIndex
                                  ? allRulesMet
                                    ? ink
                                    : accent
                                  : 'rgba(110,103,94,0.18)',
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-[13px] font-medium" style={{ color: allRulesMet ? ink : muted }}>
                        {next.length === 0 ? 'Not started' : allRulesMet ? STRENGTH_LABELS[4] : STRENGTH_LABELS[strengthIndex]}
                      </p>
                      <p className="w-16 text-right text-[13px]" style={{ color: muted, fontVariantNumeric: 'tabular-nums' }}>
                        {next.length}/12
                      </p>
                    </div>

                    <ul id="password-rules" className="mt-5 space-y-2.5">
                      {RULES.map((rule, i) => (
                        <li key={rule.id} className="flex items-start gap-2.5 text-[14px] leading-6">
                          {met[i] ? (
                            <Icons.Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" style={{ color: ink }} />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full border"
                              style={{ borderColor: 'rgba(110,103,94,0.45)' }}
                            />
                          )}
                          <span style={{ color: met[i] ? ink : muted }}>
                            {rule.label}
                            <span className="sr-only">{met[i] ? ' — met' : ' — not met yet'}</span>
                          </span>
                        </li>
                      ))}
                    </ul>

                    {fieldErrors.next && (
                      <p id="new-error" className="mt-3 text-[13.5px]" style={{ color: ink }}>
                        <Icons.AlertCircle className="mr-1.5 inline h-4 w-4 align-[-3px]" aria-hidden="true" style={{ color: accent }} />
                        {fieldErrors.next}
                      </p>
                    )}
                  </div>

                  {/* Confirm */}
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <label
                        htmlFor="confirm-password"
                        className="text-[13px] font-semibold uppercase tracking-[0.08em]"
                        style={{ color: ink }}
                      >
                        Confirm new password
                      </label>
                      <button
                        type="button"
                        onClick={() => toggle('confirm')}
                        aria-pressed={reveal.confirm}
                        className="rr-t rounded px-1.5 py-0.5 text-[12px] font-medium underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        style={{ color: muted, '--tw-ring-color': ink, '--tw-ring-offset-color': '#ffffff' }}
                      >
                        {reveal.confirm ? 'Hide' : 'Show'} confirmation
                      </button>
                    </div>
                    <input
                      id="confirm-password"
                      ref={confirmRef}
                      type={reveal.confirm ? 'text' : 'password'}
                      value={confirm}
                      autoComplete="new-password"
                      disabled={disabled}
                      aria-describedby={fieldErrors.confirm ? 'confirm-error' : 'confirm-status'}
                      aria-invalid={fieldErrors.confirm ? 'true' : undefined}
                      onChange={(e) => {
                        setConfirm(e.target.value);
                        if (fieldErrors.confirm) setFieldErrors((f) => ({ ...f, confirm: undefined }));
                      }}
                      className={inputClass + ' mt-3'}
                      style={fieldStyle(!!fieldErrors.confirm)}
                    />
                    <p id="confirm-status" className="mt-2 min-h-[1.25rem] text-[13.5px]" aria-live="polite">
                      {confirm.length > 0 && matches && (
                        <span style={{ color: ink }}>
                          <Icons.Check className="mr-1.5 inline h-4 w-4 align-[-3px]" aria-hidden="true" />
                          Both entries match
                        </span>
                      )}
                      {confirm.length > 0 && !matches && !fieldErrors.confirm && (
                        <span style={{ color: muted }}>
                          <Icons.X className="mr-1.5 inline h-4 w-4 align-[-3px]" aria-hidden="true" style={{ color: accent }} />
                          Not matching yet
                        </span>
                      )}
                    </p>
                    {fieldErrors.confirm && (
                      <p id="confirm-error" className="text-[13.5px]" style={{ color: ink }}>
                        <Icons.AlertCircle className="mr-1.5 inline h-4 w-4 align-[-3px]" aria-hidden="true" style={{ color: accent }} />
                        {fieldErrors.confirm}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t px-8 py-7 sm:px-10"
                  style={{ borderColor: 'rgba(110,103,94,0.14)', backgroundColor: brand.backgroundColor, borderBottomLeftRadius: radius, borderBottomRightRadius: radius }}
                >
                  <button
                    type="submit"
                    disabled={disabled}
                    className="rr-t inline-flex items-center gap-2 px-6 py-3 text-[15px] font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:opacity-90 disabled:opacity-70"
                    style={{
                      backgroundColor: ink,
                      borderRadius: radius,
                      '--tw-ring-color': ink,
                      '--tw-ring-offset-color': brand.backgroundColor,
                    }}
                  >
                    {status === 'saving' ? (
                      <React.Fragment>
                        <span
                          aria-hidden="true"
                          className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                        />
                        Saving your password…
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        Save password and continue
                        <Icons.ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </React.Fragment>
                    )}
                  </button>
                  <p className="text-[13.5px] leading-6" style={{ color: muted }}>
                    Stored as a hash on the server. We never keep the text you typed.
                  </p>
                </div>
              </form>
            )}
          </main>

          {/* ---------------- Quiet rail ---------------- */}
          <aside className="space-y-10 lg:pt-1">
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: muted }}>
                Signed in as
              </h2>
              <div className="mt-4 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-semibold text-white"
                  style={{ backgroundColor: ink }}
                >
                  AD
                </span>
                <div>
                  <p className="text-[15px] font-semibold" style={{ color: ink }}>
                    {ACCOUNT.username}
                  </p>
                  <p className="text-[13px]" style={{ color: muted }}>
                    {ACCOUNT.role}
                  </p>
                </div>
              </div>
              <dl className="mt-5 space-y-3">
                {metaRows.map((row) => (
                  <div key={row.label} className="flex items-baseline justify-between gap-4">
                    <dt className="text-[13px]" style={{ color: muted }}>
                      {row.label}
                    </dt>
                    <dd
                      className="text-right text-[13px] font-medium"
                      style={{ color: ink, fontVariantNumeric: 'tabular-nums' }}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: muted }}>
                {status === 'saved' ? 'Now open to you' : 'Held until this is done'}
              </h2>
              <ul className="mt-4 space-y-3.5">
                {LOCKED_AREAS.map((area) => (
                  <li key={area.name} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[14px] font-medium" style={{ color: status === 'saved' ? ink : muted }}>
                        {area.name}
                      </p>
                      <p className="mt-0.5 text-[12.5px]" style={{ color: muted }}>
                        {area.note}
                      </p>
                    </div>
                    <span
                      className="rr-t mt-0.5 shrink-0 rounded px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em]"
                      style={
                        status === 'saved'
                          ? { color: ink, backgroundColor: 'rgba(31,94,75,0.1)' }
                          : { color: accent, backgroundColor: 'rgba(180,96,26,0.1)' }
                      }
                    >
                      {status === 'saved' ? 'Open' : 'Locked'}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: muted }}>
                Need a hand
              </h2>
              <p className="mt-4 text-[13.5px] leading-6" style={{ color: muted }}>
                Lost the temporary password? An administrator can issue a new one — there is no self-service reset
                email in Chat Assistant.
              </p>
              <button
                type="button"
                onClick={() => navigate('login')}
                className="rr-t mt-4 inline-flex items-center gap-1.5 rounded px-1 py-1 text-[13.5px] font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ color: ink, '--tw-ring-color': ink, '--tw-ring-offset-color': brand.backgroundColor }}
              >
                <Icons.ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Sign out instead
              </button>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
