"use client";

import { useEffect, useState } from "react";

export default function InstallAppButton() {
  const [promptEvent, setPromptEvent] = useState(null);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPromptEvent(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // tugma 5 sekund ko‘rinib turadi
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

      console.log("User choice:", res.outcome);
      setPromptEvent(null);
      setShowButton(false);
    } else {
      alert("📱 Ilovani o‘rnatish uchun brauzer menyusidan 'Add to Home Screen'ni bosing.");
    }
  };

  if (!showButton) return null;

  return (
    <button
      onClick={installApp}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-600 text-white px-5 py-3 rounded-xl shadow-xl z-50"
    >
      📥 Ilovani o‘rnatish
    </button>
  );
}
