"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function SerialCommentsPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [seriesId, setSeriesId] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const scrollRef = useRef(null);

  // 1️⃣ Slug → Series ID olish
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
    loadComments();
  }, [seriesId]);

  async function loadComments() {
    const res = await fetch(`/api/comments/list?series=${seriesId}`);
    const data = await res.json();

    const sorted = data.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    setComments(sorted);
  }

  // 3️⃣ Komment yuborish
  async function handleSend() {
    if (!text.trim() || sending || !seriesId) return;

    setSending(true);

    const res = await fetch(`/api/comments/add`, {
      method: "POST",
      body: JSON.stringify({
        series_id: seriesId, // 🔥 SERIAL UCHUN TO‘G‘RI
        text,
      }),
    });

    const newComment = await res.json();
    setText("");

    setComments((prev) => [newComment, ...prev]);
    setSending(false);

    scrollRef.current?.scrollTo({ top: 0 });
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white flex flex-col">

      {/* HEADER */}
      <div className="p-4 bg-[#151515] flex items-center gap-4 border-b border-white/10">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h2 className="text-xl font-bold">Izohlar (Serial)</h2>
      </div>

      {/* INPUT TEPADA */}
      <div className="p-3 bg-[#141414] border-b border-white/10 flex gap-2 sticky top-[56px] z-10">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="
            flex-1 px-3 py-2 rounded-lg bg-[#222] text-white
            border border-white/10 focus:border-red-600
            outline-none transition text-sm
          "
          placeholder="Izoh yozing..."
        />

        <button
          disabled={sending}
          onClick={handleSend}
          className="
            px-4 rounded-lg bg-red-600 hover:bg-red-700
            active:scale-95 transition font-semibold text-sm
            disabled:bg-gray-600
          "
        >
          {sending ? "..." : "Yuborish"}
        </button>
      </div>

      {/* COMMENTS LIST */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
        {comments.map((c, index) => (
          <div
            key={c.id ?? index}
            className="p-3 rounded-xl bg-[#1a1a1a] border border-white/10 shadow-md"
          >
            <div className="flex items-center gap-2 mb-2">

              {/* AVATAR */}
              <div
                className="
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-base
                  bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500
                  border border-white/20 shadow-md
                "
              >
                A
              </div>

              <div className="flex-1">
                <div className="text-sm font-semibold">Anonim</div>
                <div className="text-[10px] text-gray-400">
                  {new Date(c.created_at).toLocaleString("uz-UZ")}
                </div>
              </div>

            </div>

            <p className="text-gray-200 text-sm">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
