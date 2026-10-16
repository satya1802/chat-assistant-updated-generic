// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const { Button, Card, CardContent, Input, Label, Checkbox } = UI;
const { Check, X, Clock, AlertCircle, CheckCircle } = Icons;

const ACCOUNTS = [
  { username: 'admin', password: 'Admin@123', role: 'Administrator', is_active: true, must_change_password: true },
  { username: 'r.okafor', password: 'Readingroom1!', role: 'Member', is_active: true, must_change_password: false },
  { username: 'h.vance', password: 'Westbourne#44', role: 'Member', is_active: true, must_change_password: false },
  { username: 's.lindqvist', password: 'Northwind#7', role: 'Member', is_active: false, must_change_password: false },
];

const LOCK_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

const HEALTH_CYCLE = ['ok', 'degraded', 'ok', 'ok'];

const CSS = `
@keyframes ca-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes ca-panel { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
@keyframes ca-breathe { 0%, 100% { opacity: .3; } 50% { opacity: 1; } }
.ca-rise { animation: ca-rise .5s cubic-bezier(.2,.7,.3,1) both; }
.ca-panel { animation: ca-panel .28s cubic-bezier(.2,.7,.3,1) both; }
.ca-dot { animation: ca-breathe 1.4s ease-in-out infinite; }
.ca-link { border-radius: .25rem; }
.ca-link:focus-visible, .ca-focus:focus-visible { outline: 2px solid var(--ca-focus); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) {
  .ca-rise, .ca-panel, .ca-dot { animation: none !important; }
}
`;

function mix(color, pct, other) {
  return 'color-mix(in srgb, ' + color + ' ' + pct + '%, ' + (other || 'white') + ')';
}

function utcClock(ms) {
  const d = new Date(ms);
  const h = String(d.getUTCHours()).padStart(2, '0');
  const m = String(d.getUTCMinutes()).padStart(2, '0');
  return h + ':' + m + ' UTC';
}

function mmss(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

export default function Screen() {
  const navigate = useNavigate();
  const ink = mix(brand.neutralColor, 55, 'black');
  const inkSoft = brand.neutralColor;
  const line = mix(brand.neutralColor, 22);
  const surface = mix(brand.backgroundColor, 40);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const [status, setStatus] = React.useState('idle'); // idle | submitting | error | locked | success
  const [fieldErrors, setFieldErrors] = React.useState({});
  const [failCount, setFailCount] = React.useState(0);
  const [lockedUntil, setLockedUntil] = React.useState(null);
  const [tick, setTick] = React.useState(() => Date.now());
  const [signedIn, setSignedIn] = React.useState(null);
  const [target, setTarget] = React.useState('chat');

  const [forgotOpen, setForgotOpen] = React.useState(false);
  const [health, setHealth] = React.useState({ state: 'stale', checkedAt: Date.now() - 6 * 60 * 1000 });
  const healthRuns = React.useRef(0);

  const forgotBtnRef = React.useRef(null);
  const errorRef = React.useRef(null);

  const busy = status === 'submitting';
  const locked = status === 'locked';
  const formDisabled = busy || locked || status === 'success';

  // Simulated sign-in round trip
  React.useEffect(() => {
    if (status !== 'submitting') return undefined;
    const id = setTimeout(() => {
      const u = username.trim().toLowerCase();
      const acct = ACCOUNTS.find((a) => a.username === u);
      const ok = acct && acct.password === password && acct.is_active;
      if (!ok) {
        const next = failCount + 1;
        setFailCount(next);
        if (next >= MAX_ATTEMPTS) {
          setLockedUntil(Date.now() + LOCK_MS);
          setTick(Date.now());
          setStatus('locked');
        } else {
          setStatus('error');
        }
        return;
      }
      setFailCount(0);
      setSignedIn(acct);
      setTarget(acct.must_change_password ? 'change-password' : 'chat');
      setStatus('success');
    }, 780);
    return () => clearTimeout(id);
  }, [status, username, password, failCount]);

  // Move focus to the alert so the reason is announced
  React.useEffect(() => {
    if ((status === 'error' || status === 'locked') && errorRef.current) errorRef.current.focus();
  }, [status]);

  // Lock countdown
  React.useEffect(() => {
    if (!lockedUntil) return undefined;
    const id = setInterval(() => setTick(Date.now()), 1000);
    return () => clearInterval(id);
  }, [lockedUntil]);

  const remaining = lockedUntil ? Math.max(0, Math.ceil((lockedUntil - tick) / 1000)) : 0;
  React.useEffect(() => {
    if (lockedUntil && remaining === 0) {
      setLockedUntil(null);
      setFailCount(0);
      setStatus('idle');
    }
  }, [remaining, lockedUntil]);

  // Hand off to the workspace after the success state has been seen
  React.useEffect(() => {
    if (status !== 'success') return undefined;
    const id = setTimeout(() => navigate(target), 1100);
    return () => clearTimeout(id);
  }, [status, target]);

  // Health probe
  React.useEffect(() => {
    if (health.state !== 'checking') return undefined;
    const id = setTimeout(() => {
      const next = HEALTH_CYCLE[healthRuns.current % HEALTH_CYCLE.length];
      healthRuns.current += 1;
      setHealth({ state: next, checkedAt: Date.now() });
    }, 950);
    return () => clearTimeout(id);
  }, [health.state]);

  // Escape closes the reset panel
  React.useEffect(() => {
    if (!forgotOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setForgotOpen(false);
        if (forgotBtnRef.current) forgotBtnRef.current.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [forgotOpen]);

  function handleSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (formDisabled) return;
    const errs = {};
    if (!username.trim()) errs.username = 'Enter your username.';
    if (!password) errs.password = 'Enter your password.';
    setFieldErrors(errs);
    if (Object.keys(errs).length) {
      setStatus('idle');
      return;
    }
    setStatus('submitting');
  }

  const attemptsLeft = MAX_ATTEMPTS - failCount;

  const inputStyle = {
    backgroundColor: 'white',
    borderColor: line,
    color: ink,
    borderRadius: brand.radius,
  };

  function labelRow(htmlFor, text, trailing) {
    return (
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={htmlFor} className="text-sm font-medium" style={{ color: ink }}>
          {text}
        </Label>
        {trailing}
      </div>
    );
  }

  const healthView = (() => {
    if (health.state === 'checking') {
      return {
        icon: <span className="ca-dot inline-block h-2 w-2 rounded-full" style={{ backgroundColor: brand.primaryColor }} aria-hidden="true" />,
        text: 'Checking the database and model provider…',
        tone: inkSoft,
      };
    }
    if (health.state === 'ok') {
      return {
        icon: <CheckCircle className="h-4 w-4" aria-hidden="true" />,
        text: 'Database and model provider reachable · ' + utcClock(health.checkedAt),
        tone: brand.primaryColor,
      };
    }
    if (health.state === 'degraded') {
      return {
        icon: <AlertCircle className="h-4 w-4" aria-hidden="true" />,
        text: 'Model provider is answering slowly. Sign-in and saved history are unaffected.',
        tone: brand.accentColor,
      };
    }
    return {
      icon: <Clock className="h-4 w-4" aria-hidden="true" />,
      text: 'Service status last checked 6 minutes ago.',
      tone: inkSoft,
    };
  })();

  return (
    <div
      className="min-h-screen w-full px-6 py-14 sm:py-20"
      style={{
        backgroundColor: brand.backgroundColor,
        fontFamily: brand.fontBody,
        color: ink,
        '--ca-focus': brand.primaryColor,
      }}
    >
      <style>{CSS}</style>

      <div className="mx-auto w-full" style={{ maxWidth: '31rem' }}>
        <header className="ca-rise">
          <p className="text-xs font-semibold uppercase" style={{ letterSpacing: '0.2em', color: brand.accentColor }}>
            Chat Assistant
          </p>
          <h1
            className="mt-5 text-4xl leading-tight"
            style={{ fontFamily: brand.fontHeading, color: ink, letterSpacing: '-0.02em', fontWeight: 600 }}
          >
            Sign in to your workspace
          </h1>
          <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: inkSoft, maxWidth: '27rem' }}>
            Your conversations are private to your account and kept on the server, so they are waiting
            exactly as you left them. Accounts are provisioned by an administrator.
          </p>
        </header>

        {status === 'success' && signedIn ? (
          <section
            className="ca-rise mt-10 border p-8"
            aria-live="polite"
            style={{ backgroundColor: surface, borderColor: line, borderRadius: brand.radius }}
          >
            <h2 className="flex items-center gap-2 text-lg" style={{ fontFamily: brand.fontHeading, fontWeight: 600, color: brand.primaryColor }}>
              <CheckCircle className="h-5 w-5" aria-hidden="true" />
              Signed in as {signedIn.username}
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed" style={{ color: inkSoft }}>
              {signedIn.must_change_password
                ? 'This account is still on its initial password, so you will set a new one before the workspace opens.'
                : 'Opening your conversations, newest first. ' +
                  (remember ? 'This browser will stay signed in for 30 days.' : 'This session ends after 8 hours.')}
            </p>
            <div className="mt-7">
              <Button
                type="button"
                onClick={() => navigate(target)}
                className="ca-focus px-5 py-2.5 text-sm font-medium"
                style={{ backgroundColor: brand.primaryColor, color: 'white', borderRadius: brand.radius }}
              >
                {signedIn.must_change_password ? 'Set your password' : 'Open chat workspace'}
              </Button>
            </div>
          </section>
        ) : (
          <Card
            className="ca-rise mt-10 border"
            style={{ backgroundColor: surface, borderColor: line, borderRadius: brand.radius, boxShadow: '0 1px 2px rgba(31,94,75,0.04)' }}
          >
            <CardContent className="p-8">
              {(status === 'error' || locked) && (
                <div
                  ref={errorRef}
                  tabIndex={-1}
                  role="alert"
                  className="ca-panel mb-7 flex gap-3 border p-4"
                  style={{
                    backgroundColor: mix(brand.accentColor, 8),
                    borderColor: mix(brand.accentColor, 35),
                    borderRadius: brand.radius,
                    outline: 'none',
                  }}
                >
                  <span style={{ color: brand.accentColor }}>
                    <AlertCircle className="mt-0.5 h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: mix(brand.accentColor, 70, 'black') }}>
                      {locked ? 'Sign-in paused for this username' : 'We could not sign you in'}
                    </p>
                    {locked ? (
                      <p className="mt-1.5 text-sm leading-relaxed" style={{ color: inkSoft }}>
                        Five attempts failed in the last 15 minutes, so this username is locked as a precaution.
                        Correct details are refused until{' '}
                        <span style={{ fontVariantNumeric: 'tabular-nums', color: ink }}>{utcClock(lockedUntil || Date.now())}</span>.
                      </p>
                    ) : (
                      <p className="mt-1.5 text-sm leading-relaxed" style={{ color: inkSoft }}>
                        That username and password do not match an active account. Both are checked together, so try
                        each again — your entry has been kept.
                      </p>
                    )}
                    {locked && (
                      <p className="mt-2 text-sm font-medium" style={{ color: ink, fontVariantNumeric: 'tabular-nums' }} aria-live="polite">
                        Unlocks in {mmss(remaining)}
                      </p>
                    )}
                    {!locked && attemptsLeft <= 2 && (
                      <p className="mt-2 text-sm" style={{ color: ink, fontVariantNumeric: 'tabular-nums' }}>
                        {attemptsLeft} {attemptsLeft === 1 ? 'attempt' : 'attempts'} left before a 15-minute lock.
                      </p>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-7">
                <div className="space-y-2">
                  {labelRow('username', 'Username')}
                  <Input
                    id="username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    disabled={formDisabled}
                    aria-invalid={fieldErrors.username ? 'true' : undefined}
                    aria-describedby={fieldErrors.username ? 'username-error' : undefined}
                    onChange={(e) => {
                      setUsername(e && e.target ? e.target.value : '');
                      if (fieldErrors.username) setFieldErrors({ ...fieldErrors, username: null });
                    }}
                    className="ca-focus w-full px-3.5 py-2.5 text-[0.9375rem]"
                    style={inputStyle}
                  />
                  {fieldErrors.username && (
                    <p id="username-error" className="text-sm" style={{ color: mix(brand.accentColor, 72, 'black') }}>
                      {fieldErrors.username}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  {labelRow(
                    'password',
                    'Password',
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="ca-link text-xs font-medium underline-offset-4 hover:underline"
                      style={{ color: brand.primaryColor }}
                      aria-pressed={showPassword}
                    >
                      {showPassword ? 'Hide password' : 'Show password'}
                    </button>
                  )}
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    disabled={formDisabled}
                    aria-invalid={fieldErrors.password ? 'true' : undefined}
                    aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                    onChange={(e) => {
                      setPassword(e && e.target ? e.target.value : '');
                      if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: null });
                    }}
                    className="ca-focus w-full px-3.5 py-2.5 text-[0.9375rem]"
                    style={inputStyle}
                  />
                  {fieldErrors.password && (
                    <p id="password-error" className="text-sm" style={{ color: mix(brand.accentColor, 72, 'black') }}>
                      {fieldErrors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5">
                    <Checkbox
                      id="remember"
                      checked={remember}
                      disabled={formDisabled}
                      aria-describedby="remember-help"
                      onChange={(e) =>
                        setRemember(e && e.target && typeof e.target.checked === 'boolean' ? e.target.checked : !remember)
                      }
                      className="ca-focus"
                      style={{ accentColor: brand.primaryColor }}
                    />
                  </span>
                  <div>
                    <Label htmlFor="remember" className="text-sm font-medium" style={{ color: ink }}>
                      Remember me on this browser
                    </Label>
                    <p id="remember-help" className="mt-1 text-sm" style={{ color: inkSoft }}>
                      Keeps you signed in for 30 days. Without it, the session ends after 8 hours.
                    </p>
                  </div>
                </div>

                <div className="pt-1">
                  <Button
                    type="submit"
                    disabled={formDisabled}
                    className="ca-focus w-full py-3 text-[0.9375rem] font-medium transition-opacity duration-200"
                    style={{
                      backgroundColor: locked ? mix(brand.neutralColor, 45) : brand.primaryColor,
                      color: 'white',
                      borderRadius: brand.radius,
                      opacity: formDisabled ? 0.75 : 1,
                      cursor: formDisabled ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {busy ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <span className="ca-dot inline-block h-2 w-2 rounded-full" style={{ backgroundColor: 'white' }} aria-hidden="true" />
                        Signing in…
                      </span>
                    ) : locked ? (
                      'Locked — try again at ' + utcClock(lockedUntil || Date.now())
                    ) : (
                      'Sign in'
                    )}
                  </Button>
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    ref={forgotBtnRef}
                    onClick={() => setForgotOpen((v) => !v)}
                    aria-expanded={forgotOpen}
                    aria-controls="reset-help"
                    className="ca-link text-sm underline-offset-4 hover:underline"
                    style={{ color: brand.primaryColor }}
                  >
                    Forgot password?
                  </button>
                </div>
              </form>

              {forgotOpen && (
                <div
                  id="reset-help"
                  className="ca-panel mt-6 border p-5"
                  style={{ backgroundColor: mix(brand.primaryColor, 5), borderColor: mix(brand.primaryColor, 22), borderRadius: brand.radius }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-sm font-semibold" style={{ fontFamily: brand.fontHeading, color: ink }}>
                      Resets go through an administrator
                    </h2>
                    <button
                      type="button"
                      aria-label="Close password reset instructions"
                      onClick={() => {
                        setForgotOpen(false);
                        if (forgotBtnRef.current) forgotBtnRef.current.focus();
                      }}
                      className="ca-focus rounded p-1"
                      style={{ color: inkSoft }}
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: inkSoft }}>
                    Chat Assistant does not send reset emails. Message your administrator in
                    <span style={{ color: ink }}> #chat-assistant-help</span> or email
                    <span style={{ color: ink }}> it-support@northgate.internal</span> with your username. They will
                    issue a temporary password, and you will be asked to set your own the first time you sign in.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <section className="ca-rise mt-8 border border-dashed p-5" style={{ borderColor: line, borderRadius: brand.radius }}>
          <h2 className="text-sm font-semibold" style={{ fontFamily: brand.fontHeading, color: ink }}>
            Just deployed Chat Assistant?
          </h2>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: inkSoft }}>
            Sign in as <span style={{ color: ink, fontVariantNumeric: 'tabular-nums' }}>admin</span> with the password from
            <span style={{ color: ink }}> ADMIN_INITIAL_PASSWORD</span> (<span style={{ color: ink }}>Admin@123</span> by
            default). You will be asked to replace it before the workspace opens.
          </p>
        </section>

        <div
          className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-5"
          style={{ borderColor: line }}
        >
          <p className="flex items-center gap-2 text-sm" style={{ color: healthView.tone, fontVariantNumeric: 'tabular-nums' }} aria-live="polite">
            {healthView.icon}
            <span>{healthView.text}</span>
          </p>
          <button
            type="button"
            onClick={() => setHealth({ state: 'checking', checkedAt: health.checkedAt })}
            disabled={health.state === 'checking'}
            className="ca-link text-sm underline-offset-4 hover:underline disabled:no-underline"
            style={{ color: health.state === 'checking' ? inkSoft : brand.primaryColor }}
          >
            {health.state === 'checking' ? 'Checking…' : 'Check again'}
          </button>
        </div>

        <p className="mt-6 text-xs leading-relaxed" style={{ color: mix(brand.neutralColor, 80) }}>
          Every sign-in attempt is recorded with its username, outcome and UTC time. Passwords are stored only as
          hashes and never appear in logs.
        </p>
      </div>
    </div>
  );
}
