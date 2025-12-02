"use client";
import { useState } from "react";

export default function AddStory() {
  const [title, setTitle] = useState("");
  const [poster_url, setPoster] = useState("");
  const [youtube_url, setYoutube] = useState("");
  const [page_url, setPageUrl] = useState("");

  async function submit() {
    const res = await fetch("/api/stories/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, poster_url, youtube_url, page_url })
    });

    if (res.ok) {
      alert("Story qo'shildi!");
      setTitle("");
      setPoster("");
      setYoutube("");
      setPageUrl("");
    } else {
      alert("Xatolik yuz berdi!");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Story qo'shish</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Story nomi"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Poster URL"
        value={poster_url}
        onChange={(e) => setPoster(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="YouTube Shorts URL"
        value={youtube_url}
        onChange={(e) => setYoutube(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Page URL (masalan: /movie/fast-x)"
        value={page_url}
        onChange={(e) => setPageUrl(e.target.value)}
      />

      <button
        onClick={submit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Qo'shish
      </button>
    </div>
  );
}
