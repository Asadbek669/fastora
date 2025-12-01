"use client";

import { useEffect, useState } from "react";

export default function Comments({ movieId, seriesId }) {
  const [list, setList] = useState([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  async function load() {
    const query = movieId ? `movie=${movieId}` : `series=${seriesId}`;
    const res = await fetch(`/api/comments/list?${query}`);
    const data = await res.json();
    setList(buildTree(data));
  }

  // Convert flat list → nested comment tree
  function buildTree(comments) {
    const map = {};
    const roots = [];

    comments.forEach((c) => {
      c.children = [];
      map[c.id] = c;
    });

    comments.forEach((c) => {
      if (c.parent_id) {
        map[c.parent_id]?.children.push(c);
      } else {
        roots.push(c);
      }
    });

    return roots;
  }

  async function sendComment(parentId = null) {
    if (!text.trim()) return;

    setSending(true);

    const res = await fetch("/api/comments/add", {
      method: "POST",
      body: JSON.stringify({
        movie_id: movieId || null,
        series_id: seriesId || null,
        text,
        parent_id: parentId,
      }),
    });

    const newC = await res.json();
    setText("");
    setSending(false);
    load();
  }

  function CommentBox({ c, depth = 0 }) {
    const isAdmin = c.is_admin === true;

    return (
      <div
        className={`p-3 rounded-lg mb-3 border-white/10 ${
          depth === 0 ? "bg-white/5" : "bg-white/10 ml-6 border-l-2 border-red-600"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="text-sm font-bold">
            {c.username || c.guest_username || "Foydalanuvchi"}
          </div>

          {isAdmin && (
            <span className="text-xs bg-red-600 px-2 py-0.5 rounded-full">
              ADMIN
            </span>
          )}
        </div>

        <div className="text-xs text-gray-400">
          {new Date(c.created_at).toLocaleString("uz-UZ")}
        </div>

        <p className="mt-1 text-gray-200">{c.text}</p>

        {/* Reply Button */}
        {depth === 0 && (
          <button
            onClick={() => sendComment(c.id)}
            className="mt-2 text-sm text-blue-400"
          >
            Javob yozish
          </button>
        )}

        {/* Children */}
        {c.children?.length > 0 &&
          c.children.map((child) => (
            <CommentBox key={child.id} c={child} depth={depth + 1} />
          ))}
      </div>
    );
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="mt-6">
      {list.map((c) => (
        <CommentBox key={c.id} c={c} />
      ))}

      {/* User comment input */}
      <div className="flex gap-2 mt-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-white/10 px-3 py-2 rounded-lg"
          placeholder="Izoh yozing…"
        />
        <button
          disabled={sending}
          onClick={() => sendComment(null)}
          className="bg-red-600 px-4 rounded-lg"
        >
          Yuborish
        </button>
      </div>
    </div>
  );
}
