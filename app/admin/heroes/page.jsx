"use client";

import { useEffect, useState } from "react";

export default function HeroesPage() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [backdrop, setBackdrop] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/admin/heroes");
      const data = await res.json();
      setList(data);
    };
    fetchData();
  }, []);


  async function load() {
    const res = await fetch("/api/admin/heroes");
    const data = await res.json();
    setList(data);
  }

  async function addHero(e) {
    e.preventDefault();

    await fetch("/api/admin/heroes", {
      method: "POST",
      body: JSON.stringify({
        title,
        backdrop_url: backdrop,
        page_url: link,
      }),
    });

    setTitle("");
    setBackdrop("");
    setLink("");

    load();
  }

  async function removeHero(id) {
    await fetch(`/api/admin/heroes?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="p-6 text-white">

      <h1 className="text-2xl font-bold mb-4">Hero Slider Boshqaruvi</h1>

      {/* FORM */}
      <form onSubmit={addHero} className="bg-[#111] p-4 rounded space-y-3">
        <input
          className="w-full p-2 rounded bg-[#222]"
          placeholder="Sarlavha (title)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-[#222]"
          placeholder="Backdrop URL"
          value={backdrop}
          onChange={(e) => setBackdrop(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-[#222]"
          placeholder="Kino sahifasi URL (masalan: /movie/avatar)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <button
          className="px-4 py-2 bg-red-600 rounded font-semibold"
          type="submit"
        >
          Qo‘shish
        </button>
      </form>

      {/* LIST */}
      <div className="mt-6 space-y-3">
        {list.map((item) => (
          <div
            key={item.id}
            className="bg-[#0d0d0d] p-4 rounded flex items-center justify-between"
          >
            <div>
              <div className="font-bold">{item.title}</div>
              <div className="text-xs text-gray-400">{item.page_url}</div>
            </div>

            <button
              onClick={() => removeHero(item.id)}
              className="px-3 py-1 bg-red-700 rounded"
            >
              O‘chirish
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
