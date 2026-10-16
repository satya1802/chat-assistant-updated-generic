import { NavLink, Navigate, Route, Routes } from "react-router-dom";

import Login from "@/screens/Login";
import ChangePassword from "@/screens/ChangePassword";
import Chat from "@/screens/Chat";
import Settings from "@/screens/Settings";
import KnowledgeBase from "@/screens/KnowledgeBase";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "block rounded-[var(--brand-radius)] px-3 py-2 text-sm font-medium transition-colors",
    isActive ? "bg-[var(--brand-hover)] text-[var(--brand-fg)]" : "text-[var(--brand-fg-muted)]",
  ].join(" ");

export default function App() {
  return (
    <div className="flex min-h-screen">
      <aside
        className="w-56 shrink-0 border-r p-4"
        style={{
          backgroundColor: "var(--brand-surface)",
          borderColor: "var(--brand-border)",
        }}
      >
        <p
          className="mb-4 px-3 text-sm font-semibold"
          style={{ fontFamily: "var(--brand-font-heading)" }}
        >
          {"Chat Assistant - Updated Generic"}
        </p>
        <nav className="flex flex-col gap-1">
          <NavLink to="/login" className={navLinkClass}>
            {"Login"}
          </NavLink>
          <NavLink to="/change-password" className={navLinkClass}>
            {"Set Your Password"}
          </NavLink>
          <NavLink to="/chat" className={navLinkClass}>
            {"Chat Workspace"}
          </NavLink>
          <NavLink to="/settings" className={navLinkClass}>
            {"Settings"}
          </NavLink>
          <NavLink to="/knowledge-base" className={navLinkClass}>
            {"Knowledge Base"}
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}
