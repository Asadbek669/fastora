"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function SerialCommentsPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [seriesId, setSeriesId] = useState(null);
  const [list, setList] = useState([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  // 1️⃣ Slug orqali Serial ID olish
  useEffect(() => {
    async function loadSeries() {
      const res = await fetch(`/api/series/${slug}`);
      const data = await res.json();
      setSeriesId(data.id);
    }
    loadSeries();
  }, []);

  // 2️⃣ Kommentlarni yuklash
  useEffect(() => {
    if (!seriesId) return;
    load();
  }, [seriesId]);

  async function load() {
    const res = await fetch(`/api/comments/list?series=${seriesId}`);
    const data = await res.json();
    setList(buildTree(data));
  }

  // 🌳 Daraxt ko‘rinishida reply struktura yaratish
  function buildTree(comments) {
    const map = {};
    const roots = [];

    comments.forEach((c) => {
      c.children = [];
      map[c.id] = c;
    });

    comments.forEach((c) => {
      if (c.parent_id) map[c.parent_id]?.children.push(c);
      else roots.push(c);
    });

    return roots;
  }

  // 3️⃣ Yuborish
  async function send(parentId = null) {
    if (!text.trim()) return;

    setSending(true);

    await fetch(`/api/comments/add`, {
      method: "POST",
      body: JSON.stringify({
        series_id: seriesId, // 🔥 SERIAL uchun to‘g‘ri
        text,
        parent_id: parentId,
      }),
    });

    setText("");
    setSending(false);
    load();
  }

  // Avatar component
  function UserAvatar({ isAdmin }) {
    return (
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base border shadow-md
          ${
            isAdmin
              ? "bg-gradient-to-br from-yellow-400 via-red-500 to-pink-600 border-red-300"
              : "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 border-white/20"
          }
        `}
      >
        {isAdmin ? "A" : "U"}
      </div>
    );
  }

  // Bitta komment qutisi (rekursiv)
  function CommentBox({ c, depth = 0 }) {
    const isAdmin = c.is_admin === true;

    return (
      <div
        className={`
          p-3 rounded-xl mb-3 border border-white/10 transition-all 
          ${depth === 0 ? "bg-[#1a1a1a]" : "bg-[#222] ml-6 border-l-2 border-red-600"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-2">
          <UserAvatar isAdmin={isAdmin} />

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">
                {isAdmin ? c.username : "Anonim"}
              </span>

              {isAdmin && (
                <span className="text-xs bg-red-600 px-2 py-0.5 rounded-full">
                  ADMIN
                </span>
              )}
            </div>

            <div className="text-[10px] text-gray-400">
              {new Date(c.created_at).toLocaleString("uz-UZ")}
            </div>
          </div>
        </div>

        {/* TEXT */}
        <p className="text-gray-200 text-sm">{c.text}</p>

        {/* REPLY BUTTON */}
        {depth === 0 && (
          <button
            onClick={() => send(c.id)}
            className="text-blue-400 mt-2 text-xs"
          >
            Javob yozish
          </button>
        )}

        {/* CHILDREN */}
        {c.children?.map((child) => (
          <CommentBox key={child.id} c={child} depth={depth + 1} />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      {/* HEADER */}
      <div className="p-4 bg-[#151515] flex items-center gap-4 border-b border-white/10">
        <button onClick={() => router.back()} className="text-2xl">←</button>
        <h2 className="text-xl font-bold">Izohlar (Serial)</h2>
      </div>

      {/* INPUT */}
      <div className="p-3 bg-[#141414] border-b border-white/10 flex gap-2 sticky top-[56px] z-10">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg bg-[#222] text-white text-sm"
          placeholder="Izoh yozing..."
        />
        <button
          onClick={() => send(null)}
          className="px-4 rounded-lg bg-red-600"
        >
          Yuborish
        </button>
      </div>

      {/* COMMENTS TREE */}
      <div className="p-3">
        {list.map((c) => (
          <CommentBox key={c.id} c={c} />
        ))}
      </div>
    </div>
  );
}
