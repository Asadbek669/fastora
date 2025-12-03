"use client";

import { useEffect, useRef, useState } from "react";

export default function Player({ src, title }) {
  const playerRef = useRef(null);
  const fullscreenHandlerRef = useRef(null);
  const probeTimerRef = useRef(null);
  const [blocked, setBlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let canceled = false;

    async function init() {
      // reset states for new src
      setBlocked(false);
      setLoading(true);

      if (!src) {
        setLoading(false);
        return;
      }

      // Try to load player directly and probe if it actually started.
      // If player doesn't create expected DOM (iframe/video) within TIMEOUT => treat as blocked.
      await loadPlayerWithProbe(src);

      if (canceled) return;

      setLoading(false);
    }

    init();

    return () => {
      canceled = true;
      cleanupProbe();
      if (fullscreenHandlerRef.current) {
        document.removeEventListener("fullscreenchange", fullscreenHandlerRef.current);
        fullscreenHandlerRef.current = null;
      }
    };
  }, [src]);

  // Cleanup probe timer helper
  function cleanupProbe() {
    if (probeTimerRef.current) {
      clearTimeout(probeTimerRef.current);
      probeTimerRef.current = null;
    }
  }

  // Try to load Playerjs and probe DOM to detect if it actually started.
  async function loadPlayerWithProbe(url) {
    // clear any previous player DOM so probe is clean
    clearPlayerContainer();

    // If script already loaded, init and probe
    if (window.Playerjs) {
      initPlayerInstance(url);
      return probeForReadyOrFail(url);
    }

    // If script tag exists but not yet loaded, attach once handler
    const existing = document.querySelector('script[data-playerjs="1"]');
    if (existing) {
      // attach one-time load and error handlers
      const onLoad = () => {
        initPlayerInstance(url);
        probeForReadyOrFail(url);
      };
      const onError = () => {
        // couldn't load playerjs - show blocked fallback
        setBlocked(true);
        setLoading(false);
      };
      existing.addEventListener("load", onLoad, { once: true });
      existing.addEventListener("error", onError, { once: true });
      return;
    }

    // Insert script and init on load
    const script = document.createElement("script");
    script.src = "/player/playerjs.min.js";
    script.async = true;
    script.setAttribute("data-playerjs", "1");

    script.onload = () => {
      initPlayerInstance(url);
      probeForReadyOrFail(url);
    };

    script.onerror = () => {
      // fail fast — fallback to blocked UI
      setBlocked(true);
      setLoading(false);
    };

    document.body.appendChild(script);
  }

  // Probe: wait short time for expected DOM nodes. If none, show blocked.
  function probeForReadyOrFail(url) {
    // clear any existing probe
    cleanupProbe();

    // If playerjs created an iframe/video quickly, success.
    const checkReady = () => {
      const el = document.getElementById("playerjs");
      if (!el) return false;
      // common cases: iframe (embed), video tag, or playerjs might append children
      const hasMedia = !!el.querySelector("iframe, video, audio, [role='application']");
      return hasMedia || (el.children && el.children.length > 0);
    };

    // immediate check
    if (checkReady()) {
      setBlocked(false);
      return;
    }

    // wait up to TIMEOUT ms for player to create DOM. If not — treat as blocked.
    const TIMEOUT = 2500;
    probeTimerRef.current = setTimeout(() => {
      probeTimerRef.current = null;
      if (!checkReady()) {
        // If player didn't create any expected DOM, assume server refused (CORS/403) and show fallback.
        setBlocked(true);
        // keep loading false so UI shows button
        setLoading(false);
      } else {
        setBlocked(false);
      }
    }, TIMEOUT);
  }

  // Helper: clear the player container to force a refresh
  function clearPlayerContainer() {
    const el = document.getElementById("playerjs");
    if (el) {
      // Replace with an empty div to ensure no lingering listeners/iframes remain
      el.innerHTML = "";
    }
  }

  // Instantiate Playerjs safely
  function initPlayerInstance(url) {
    try {
      clearPlayerContainer();
      if (window.Playerjs) {
        // Some Playerjs variants accept `file` or `playlist`, keep minimal params
        new window.Playerjs({
          id: "playerjs",
          file: url,
          autoplay: 0,
        });
      } else {
        console.warn("Playerjs not present at init");
      }
    } catch (e) {
      console.warn("Playerjs init failed:", e);
    }
  }

  // Try to lock orientation when fullscreen; unlock on exit
  function setupFullscreenRotation() {
    if (fullscreenHandlerRef.current) {
      document.removeEventListener("fullscreenchange", fullscreenHandlerRef.current);
      fullscreenHandlerRef.current = null;
    }

    const handler = async () => {
      if (document.fullscreenElement) {
        try {
          await screen.orientation.lock("landscape");
        } catch {}
      } else {
        try {
          await screen.orientation.unlock();
        } catch {}
      }
    };

    fullscreenHandlerRef.current = handler;
    document.addEventListener("fullscreenchange", handler);
  }

  // openDirect as before
  function openDirect() {
    if (!src) return;

    const sep = src.includes("?") ? "&" : "?";
    const target = `${src}${sep}t=${Date.now()}`;

    const html = `<!doctype html><html><head><meta name="referrer" content="no-referrer"><meta charset="utf-8"><title>Loading…</title><style>html,body{height:100%;margin:0;background:#000;color:#fff}</style></head><body><script>(function(){try{var t=${JSON.stringify(
      target
    )};location.replace(t);}catch(e){window.location.href=${JSON.stringify(
      target
    )};}})();</script></body></html>`;

    try {
      const blob = new Blob([html], { type: "text/html" });
      const blobUrl = URL.createObjectURL(blob);
      const newWin = window.open(blobUrl, "_blank", "noopener");

      if (!newWin) {
        window.open(target, "_blank", "noopener,noreferrer");
        try {
          URL.revokeObjectURL(blobUrl);
        } catch (e) {}
        return;
      }

      setTimeout(() => {
        try {
          URL.revokeObjectURL(blobUrl);
        } catch (e) {}
      }, 2000);
    } catch (e) {
      console.warn("Blob opener failed, falling back:", e);
      window.open(target, "_blank", "noopener,noreferrer");
    }
  }

  // keep copyLink if needed
  async function copyLink() {
    if (!src) return;
    try {
      await navigator.clipboard.writeText(src);
      alert("Manzil nusxalandi");
    } catch {
      alert("Nusxalashning iloji bo'lmadi");
    }
  }

  return (
    <div className="mt-4 px-4">
      {loading && (
        <div className="w-full aspect-video bg-black flex items-center justify-center rounded-xl">
          <div className="animate-spin w-10 h-10 border-4 border-gray-400 border-t-transparent rounded-full"></div>
        </div>
      )}

      {!loading && blocked && (
        <div className="w-full aspect-video bg-black flex items-center justify-center rounded-xl border border-white/10">
          <button
            onClick={openDirect}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openDirect();
              }
            }}
            aria-label="To‘g‘ridan-to‘g‘ri ochish"
            title="To‘g‘ridan-to‘g‘ri ochish"
            className="flex items-center justify-center text-white text-4xl leading-none w-20 h-20 rounded-full bg-blue-600 shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-blue-400/40"
          >
            ▶
          </button>
        </div>
      )}

      {!blocked && !loading && (
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden border border-white/10">
          <div id="playerjs" ref={playerRef} className="w-full h-full"></div>
        </div>
      )}

      {title && <h3 className="mt-2 text-white text-lg font-semibold">{title}</h3>}
    </div>
  );
}
