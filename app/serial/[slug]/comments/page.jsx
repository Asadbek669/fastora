"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { User, ArrowLeft } from "lucide-react";

export default function SerialCommentsPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [seriesId, setSeriesId] = useState(null);
  const [list, setList] = useState([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  // USERNAME
  const [username, setUsername] = useState("Anonim");
  const [showNameModal, setShowNameModal] = useState(false);
  const [tempName, setTempName] = useState("");

  // REPLY MODE
  const [replyTo, setReplyTo] = useState(null);

  // LOAD USERNAME
  useEffect(() => {
    const saved = localStorage.getItem("fastora_username");
    if (saved) setUsername(saved);
  }, []);

  // LOAD SERIES ID
  useEffect(() => {
    async function loadSeries() {
      const res = await fetch(`/api/series/${slug}`);
      const data = await res.json();
      setSeriesId(data.id);
    }
    loadSeries();
  }, []);

  // LOAD COMMENTS
  useEffect(() => {
    if (!seriesId) return;
    loadComments();
  }, [seriesId]);

  async function loadComments() {
    const res = await fetch(`/api/comments/list?series=${seriesId}`);
    const data = await res.json();
    setList(buildTree(data));
  }

  // BUILD TREE
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

  // SEND COMMENT
  async function send() {
    if (!text.trim()) return;
    setSending(true);

    await fetch(`/api/comments/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        series_id: seriesId,
        text,
        username,
        parent_id: replyTo?.id || null,
      }),
    });

    setText("");
    setReplyTo(null);
    setSending(false);
    loadComments();
  }

  // YOUTUBE STYLE TIME FORMATTER
  function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 5) return "Hozir";
    if (diff < 60) return `${diff} soniya avval`;

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes} daqiqa avval`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} soat avval`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} kun avval`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} oy avval`;

    const years = Math.floor(months / 12);
    return `${years} yil avval`;
  }

  function UserAvatar({ name, isAdmin }) {
    return (
      <div
        className={`
          w-10 h-10 rounded-full flex items-center justify-center 
          font-bold text-base border shadow-md
          ${
            isAdmin
              ? "bg-gradient-to-br from-yellow-400 via-red-500 to-pink-600 border-red-300"
              : "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 border-white/20"
          }
        `}
      >
        {isAdmin ? "A" : name[0]?.toUpperCase()}
      </div>
    );
  }

  function CommentBox({ c, depth = 0 }) {
    const isAdmin = c.is_admin === true;

    return (
      <div
        className={`
          p-3 rounded-xl mb-3 border border-white/10 transition-all 
          ${depth === 0 ? "bg-[#1a1a1a]" : "bg-[#222] ml-6 border-l-2 border-red-600"}
        `}
      >
        <div className="flex items-center gap-3 mb-2">
          <UserAvatar name={c.username || "Anonim"} isAdmin={isAdmin} />

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{c.username || "Anonim"}</span>

              {isAdmin && (
                <span className="text-xs bg-red-600 px-2 py-0.5 rounded-full">ADMIN</span>
              )}
            </div>

            <div className="text-[10px] text-gray-400">
              {formatTimeAgo(c.created_at)}
            </div>
          </div>
        </div>

        <p className="text-gray-200 text-sm">{c.text}</p>

        {depth === 0 && (
          <button
            onClick={() => setReplyTo({ id: c.id, name: c.username })}
            className="text-blue-400 mt-2 text-xs"
          >
            Javob yozish
          </button>
        )}

        {c.children?.map((child) => (
          <CommentBox key={child.id} c={child} depth={depth + 1} />
        ))}
      </div>
    );
  }

  return (
  	<div className="min-h-screen bg-[#0e0e0e] text-white">
  
  	  {/* HEADER */}
  	  <div className="p-4 bg-[#151515] border-b border-white/10 flex items-center justify-between relative">
  		
  		{/* Ortga tugma (chapda) */}
  		<button
  		  onClick={() => router.back()}
  		  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition"
  		>
  		  <ArrowLeft className="w-4 h-4" />
  		  Orqaga
  		</button>
  
  		{/* Sarlavha markazda */}
  		<h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold uppercase text-white">
  		  Izohlar
  		</h2>
  
  		{/* Bo‘sh joy (right) */}
  		<div className="w-20" /> {/* placeholder, agar keyin tugma qo‘ysangiz */}

    		<button
    		  onClick={() => {
    			setTempName(username);
    			setShowNameModal(true);
    		  }}
    		  className="
    			px-3 py-1 rounded-lg text-sm
    			bg-white/10 border border-white/20
    			text-blue-300 hover:bg-white/20
    			transition flex items-center gap-1
    		  "
    		>
    		  <User className="w-4 h-4" />
    		  <span>{username}</span>
    		</button>
      </div>

      {/* INPUT PANEL */}
      <div className="p-3 bg-[#141414] border-b border-white/10 flex flex-col gap-2 sticky top-[56px] z-10">

        {replyTo && (
          <div className="text-xs text-blue-400 mb-1 flex justify-between">
            <span>{replyTo.name} foydalanuvchiga javob yozilyapti…</span>
            <button onClick={() => setReplyTo(null)} className="text-red-400">
              Bekor qilish
            </button>
          </div>
        )}

        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-[#222] text-white text-sm"
            placeholder="Izoh yozing..."
          />
          <button
            disabled={sending}
            onClick={send}
            className="px-4 rounded-lg bg-red-600"
          >
            Yuborish
          </button>
        </div>
      </div>

      {/* COMMENT LIST */}
      <div className="p-3">
        {list.map((c) => (
          <CommentBox key={c.id} c={c} />
        ))}
      </div>

      {/* USERNAME MODAL */}
      {showNameModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1b1b1b] p-5 w-[85%] max-w-sm rounded-xl border border-white/10">

            <h3 className="text-lg font-semibold mb-3">Ismingizni o‘zgartirish</h3>

            <input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full p-2 bg-[#2a2a2a] border border-white/10 rounded-lg text-white"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowNameModal(false)}
                className="px-3 py-1 bg-white/10 rounded-lg"
              >
                Bekor qilish
              </button>

              <button
                onClick={() => {
                  if (tempName.trim()) {
                    setUsername(tempName.trim());
                    localStorage.setItem("fastora_username", tempName.trim());
                  }
                  setShowNameModal(false);
                }}
                className="px-4 py-1 bg-blue-600 rounded-lg"
              >
                Saqlash
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

