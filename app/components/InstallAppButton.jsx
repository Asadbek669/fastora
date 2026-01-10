"use client";

import { useEffect, useState } from "react";

export default function InstallAppButton() {
  const [promptEvent, setPromptEvent] = useState(null);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    // 1) Agar ilova o‘rnatilgan bo‘lsa — umuman tugmani ko‘rsatmaymiz
    const isInstalled =
      window.matchMedia("(display-mode: standalone)").matches ||
      localStorage.getItem("fastora_installed") === "true";

    if (isInstalled) {
      setShowButton(false);
      return; // boshqa tekshiruvlarni ham o‘tkazmaymiz
    }

    // 2) Chrome install eventni ushlaymiz
    const handler = (e) => {
      e.preventDefault();
      setPromptEvent(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // 3) Tugma 5 soniya ko‘rinadi
    const hideTimer = setTimeout(() => {
      setShowButton(false);
    }, 5000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(hideTimer);
    };
  }, []);

  const installApp = async () => {
    if (promptEvent) {
      promptEvent.prompt();
      const res = await promptEvent.userChoice;

      console.log("Install result:", res.outcome);

      if (res.outcome === "accepted") {
        localStorage.setItem("fastora_installed", "true");
      }

      setPromptEvent(null);
      setShowButton(false);
    } else {
      alert("📱 Ilovani o‘rnatish uchun brauzer menyusidan 'Add to Home Screen' tugmasini bosing.");
    }
  };

  if (!showButton) return null;

  return (
<button
  onClick={installApp}
  aria-label="Ilovani o‘rnatish"
  className="fixed bottom-24 left-1/2 -translate-x-1/2
             bg-green-700 text-white
             text-base font-semibold
             px-5 py-3 rounded-xl shadow-xl z-50"
>
  📥 Ilovani o‘rnatish
</button>
  );
}

