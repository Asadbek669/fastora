"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Admin comments panel (infinite scroll, paginated roots, replies attached)
 * Put this file at: app/admin/comments/page.jsx
 *
 * Depends on backend:
 * GET /api/admin/comments/list?offset=0  -> { roots: [...], replies: [...] }
 * POST /api/admin/comments/delete           -> body: { id }
 * POST /api/admin/comments/reply            -> body: { parent_id, movie_id, series_id, text }
 *
 * UX:
 * - initial load: offset = 0, pageSize = 20
 * - scroll near bottom -> loadMore()
 * - reply opens a bottom modal on mobile (and inline on desktop)
 */

const PAGE_SIZE = 20;
const SCROLL_THRESHOLD_PX = 300; // trigger when within 300px of bottom

export default function AdminComments() {
  const [roots, setRoots] = useState([]); // paginated root comments
  const [replies, setReplies] = useState([]); // replies for loaded roots
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [error, setError] = useState(null);

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [expanded, setExpanded] = useState({}); // expanded roots map

  const containerRef = useRef();

  // Build tree from roots and replies
  function buildTreeFromRootsAndReplies(rootsArr, repliesArr) {
    const map = {};
    // clone roots so we don't mutate state objects unexpectedly
    const rootsClone = rootsArr.map((r) => ({ ...r, children: [] }));
    rootsClone.forEach((r) => (map[r.id] = r));

    repliesArr.forEach((rep) => {
      // if parent is one of the loaded roots -> attach
      if (rep.parent_id && map[rep.parent_id]) {
        map[rep.parent_id].children.push({ ...rep, children: [] });
      }
    });

    // sort root children by created_at ascending (older replies first)
    rootsClone.forEach((r) => {
      r.children.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    });

    return rootsClone;
  }

  // Load next page of roots (+ their replies) from backend
  async function loadMore() {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/comments/list?offset=${offset}`);
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();

      // support both { roots, replies } and flat-list fallback
      if (Array.isArray(data) && data.length) {
        // fallback: a flat list of comments (no pagination) — put them as roots
        if (offset === 0) {
          setRoots(data.filter((c) => c.parent_id === null));
          setReplies(data.filter((c) => c.parent_id !== null));
          setHasMore(false);
        } else {
          // already paginated earlier but server sent flat list -> no more
          setHasMore(false);
        }
      } else {
        const nextRoots = data.roots || [];
        const nextReplies = data.replies || [];

		// old:
		// setRoots((prev) => [...prev, ...nextRoots]);

		// new (dedupe by id)
		setRoots((prev) => {
		  const ids = new Set(prev.map((r) => r.id));
		  const filtered = (nextRoots || []).filter((r) => !ids.has(r.id));
		  return [...prev, ...filtered];
		});

		setReplies((prev) => {
		  const ids = new Set(prev.map((r) => r.id));
		  const filtered = (nextReplies || []).filter((r) => !ids.has(r.id));
		  return [...prev, ...filtered];
		});

        if ((nextRoots?.length || 0) < PAGE_SIZE) setHasMore(false);
        setOffset((prev) => prev + (nextRoots?.length || 0));
      }
    } catch (err) {
      console.error("LoadMore Error:", err);
      setError(err.message || "Server error");
      // don't change hasMore to allow retry
    } finally {
      setLoadingMore(false);
      setLoadingInitial(false);
    }
  }

  // Initial load
  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll handler with throttle (simple)
  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY || window.pageYOffset;
        const height = document.documentElement.scrollHeight;
        const viewport = window.innerHeight;
        if (viewport + scrollTop >= height - SCROLL_THRESHOLD_PX) {
          loadMore();
        }
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, hasMore, loadingMore]);

  // Delete comment
  async function deleteComment(id) {
    if (!confirm("Haqiqatan ham o'chirishni istaysizmi?")) return;
    try {
      const res = await fetch("/api/admin/comments/delete", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Delete failed");
      // remove locally
      setRoots((r) => r.filter((x) => x.id !== id));
      setReplies((r) => r.filter((x) => x.parent_id !== id && x.id !== id));
    } catch (err) {
      alert("O'chirishda xato: " + err.message);
    }
  }

  // Send reply (admin)
  async function sendReply() {
    if (!replyText.trim() || !replyingTo) return;
    try {
      const res = await fetch("/api/admin/comments/reply", {
        method: "POST",
        body: JSON.stringify({
          parent_id: replyingTo.id,
          movie_id: replyingTo.movie_id,
          series_id: replyingTo.series_id,
          text: replyText.trim(),
        }),
      });

      if (!res.ok) throw new Error("Reply failed");
      const created = await res.json();

      // attach new reply to replies and to specific root in state
      setReplies((prev) => [...prev, created]);
      setRoots((prevRoots) =>
        prevRoots.map((root) =>
          root.id === replyingTo.id
            ? { ...root, children: [...(root.children || []), created] }
            : root
        )
      );

      setReplyText("");
      setReplyingTo(null);
    } catch (err) {
      alert("Reply yuborishda xato: " + err.message);
    }
  }

  // Build final tree for rendering from roots+replies arrays
  const tree = buildTreeFromRootsAndReplies(roots, replies);

  // Toggle expand root
  function toggleExpand(id) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  // Simple responsive avatar component
  function Avatar({ username, isAdmin }) {
    const letter = (username || "Anonim").charAt(0).toUpperCase();
    const baseClass =
      "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white shadow-sm flex-shrink-0";

    const gradClass = isAdmin
      ? "bg-gradient-to-br from-yellow-400 via-red-500 to-pink-600"
      : "bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500";

    return <div className={`${baseClass} ${gradClass}`}>{letter}</div>;
  }

  return (
    <div ref={containerRef} className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Kommentlar boshqaruvi</h1>

      {/* Error */}
      {error && (
        <div className="mb-4 text-sm text-red-400 bg-red-900/10 p-3 rounded">
          Xato: {error} — sahifani yangilab qayta urinib ko‘ring.
        </div>
      )}

      {/* Empty */}
      {!loadingInitial && tree.length === 0 && (
        <div className="text-center py-12 text-gray-400">Kommentlar topilmadi.</div>
      )}

      {/* Comments list */}
      <div className="space-y-4">
        {tree.map((root) => {
          const isAdmin = root.is_admin === true;
          const children = root.children || [];

          return (
            <div
              key={`root-${root.id}`}
              className={`p-4 rounded-xl border ${
                isAdmin ? "border-red-400 bg-red-500/6" : "border-white/10 bg-white/2"
              }`}
            >
              <div className="flex gap-3 items-start">
                <Avatar username={root.username || root.guest_username} isAdmin={isAdmin} />

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">
                          {isAdmin ? root.username : root.username || "Anonim"}
                        </span>

                        {isAdmin && (
                          <span className="text-xs bg-red-600 px-2 py-0.5 rounded-full">ADMIN</span>
                        )}

                        <span className="text-[11px] text-gray-400 ml-2">
                          • {new Date(root.created_at).toLocaleString("uz-UZ")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setReplyingTo(root)}
                        className="text-blue-400 text-sm hover:underline"
                      >
                        Javob yozish
                      </button>

                      <button
                        onClick={() => deleteComment(root.id)}
                        className="text-red-400 text-sm hover:underline"
                      >
                        O‘chirish
                      </button>
                    </div>
                  </div>

                  <p className="mt-2 text-gray-200">{root.text}</p>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => toggleExpand(root.id)}
                      className="text-xs text-gray-400"
                    >
                      {expanded[root.id] ? "Yopish ▲" : `Replies (${children.length}) ▼`}
                    </button>

                    <div className="text-xs text-gray-500">
                      ID: {root.id} • {root.movie_id ? "Movie" : root.series_id ? "Series" : "—"}
                    </div>
                  </div>

                  {/* Children (replies) */}
                  {expanded[root.id] && children.length > 0 && (
                    <div className="mt-3 space-y-3">
                      {children.map((child) => {
                        const childAdmin = child.is_admin === true;
                        return (
                          <div
                            key={`reply-${child.id}`}
                            className="flex gap-3 items-start ml-6 p-3 rounded-lg bg-[#111] border border-white/5"
                          >
                            <Avatar username={child.username || child.guest_username} isAdmin={childAdmin} />

                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">
                                    {childAdmin ? child.username : child.username || "Anonim"}
                                  </span>
                                  {childAdmin && <span className="text-xs bg-red-600 px-2 py-0.5 rounded-full">ADMIN</span>}
                                  <span className="text-[11px] text-gray-400 ml-2">
                                    • {new Date(child.created_at).toLocaleString("uz-UZ")}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button onClick={() => setReplyingTo(child)} className="text-blue-400 text-xs">Reply</button>
                                  <button onClick={() => deleteComment(child.id)} className="text-red-400 text-xs">O‘chirish</button>
                                </div>
                              </div>

                              <p className="mt-1 text-gray-200 text-sm">{child.text}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load more area */}
      <div className="mt-6 flex items-center justify-center">
        {loadingMore ? (
          <div className="text-gray-400">Yuklanyapti...</div>
        ) : hasMore ? (
          <button
            onClick={() => loadMore()}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Ko‘proq yuklash
          </button>
        ) : (
          <div className="text-gray-500 text-sm">Barcha kommentlar yuklandi</div>
        )}
      </div>

      {/* Reply modal (mobile-friendly) */}
	  {replyingTo && (
	    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
		  {/* Overlay */}
		  <div
		    className="absolute inset-0 bg-black/50"
		    onClick={() => setReplyingTo(null)}
		  />

		  {/* Modal box */}
		  <div
		    className="w-full sm:w-3/4 md:w-2/3 bg-[#0f0f0f] border border-white/10 p-4 rounded-t-xl sm:rounded-xl m-4 relative"
		    onClick={(e) => e.stopPropagation()} // ← MUHIM!!
		  >
		    <div className="flex items-center justify-between mb-2">
			  <div className="font-semibold">Reply → {replyingTo.username || "Anonim"}</div>
			  <button className="text-gray-400" onClick={() => setReplyingTo(null)}>✕</button>
		    </div>

		    <textarea
			  rows={4}
			  value={replyText}
			  onChange={(e) => setReplyText(e.target.value)}
			  className="w-full bg-[#121212] border border-white/5 p-3 rounded text-white"
			  placeholder="Javob matnini yozing..."
		    />

		    <div className="flex justify-end gap-3 mt-3">
			  <button onClick={() => setReplyingTo(null)} className="text-gray-400">Bekor</button>
			  <button onClick={sendReply} className="bg-blue-600 text-white px-4 py-2 rounded">Yuborish</button>
		    </div>
		  </div>
	    </div>
	  )}
    </div>
  );
}
