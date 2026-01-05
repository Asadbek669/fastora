"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import TopBar from "./TopBar";
import BottomNav from "./BottomNav";
import InstallAppButton from "./InstallAppButton";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;

    const handleKey = (e) => {
      // TAB ni bloklaymiz
      if (e.key === "Tab") {
        e.preventDefault();
        return;
      }

      const active = document.activeElement;
      if (!active) return;

      switch (e.key) {
        case "ArrowRight":
          moveFocus(1);
          break;
        case "ArrowLeft":
          moveFocus(-1);
          break;
        case "ArrowDown":
          moveFocus(1);
          break;
        case "ArrowUp":
          moveFocus(-1);
          break;
        case "Enter":
          active.click();
          break;
        case "Backspace":
        case "Escape":
          window.history.back();
          break;
      }
    };

    window.addEventListener("keydown", handleKey);

    // Birinchi focus
    setTimeout(() => {
      const first = getFocusableElements()[0];
      first?.focus();
    }, 300);

    return () => window.removeEventListener("keydown", handleKey);
  }, [isAdmin]);

  return (
    <>
      <TopBar />
      {children}
      {!isAdmin && <BottomNav />}
      {!isAdmin && <InstallAppButton />}
    </>
  );
}

/* ================================
   TV FOCUS HELPERS
================================ */

function getFocusableElements() {
  return Array.from(
    document.querySelectorAll(
      "a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])"
    )
  ).filter(
    (el) =>
      !el.disabled &&
      el.offsetParent !== null
  );
}

function moveFocus(step) {
  const items = getFocusableElements();
  const index = items.indexOf(document.activeElement);

  if (index === -1) {
    items[0]?.focus();
    return;
  }

  const next = items[index + step];
  next?.focus();
}

