"use client";

import { useState } from "react";

const CATEGORY_LIST = [
  { value: "xorij-seriallar", label: "Xorij seriallari" },
  { value: "korea-seriallari", label: "Koreya seriallari" },
  { value: "turk-seriallar", label: "Turk seriallari" },
  { value: "anime", label: "Anime (Serial)" },
  { value: "multfilmlar", label: "Multseriallar" }, // ➕ QO‘SHILDI
];

const GENRE_LIST = [
  "Drama",
  "Fantastika",
  "Tarixiy",
  "Jangari",
  "Komediya",
  "Melodrama",
  "Ujas",
  "Sarguzasht",
];

export default function AddSeriesPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    year: "",
    country: "",
    imdb: "",
    poster: "",
    backdrop: "",
    description: "",
    category: "",
    genres: [],
	age: "",   
  });

  const generateSlug = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  const toggleGenre = (genre) => {
    setForm((prev) => {
      const exists = prev.genres.includes(genre);
      return {
        ...prev,
        genres: exists
          ? prev.genres.filter((g) => g !== genre)
          : [...prev.genres, genre],
      };
    });
  };

  // ⭐ REAL SAVE FUNCTION
  const saveSeries = async () => {
    if (!form.title || !form.slug || !form.category) {
      alert("Iltimos barcha kerakli maydonlarni to‘ldiring!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/series", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Xato: " + data.message);
      } else {
        alert("🎉 Serial muvaffaqiyatli qo‘shildi!");
        setForm({
          title: "",
          slug: "",
          year: "",
          country: "",
          imdb: "",
          poster: "",
          backdrop: "",
          description: "",
          category: "",
          genres: [],
		  age: "", // ⭐
        });
      }
    } catch (error) {
      alert("Server bilan ulanishda xatolik!");
    }

    setLoading(false);
  };

  return (
    <div className="text-gray-200">
      <h1 className="text-3xl font-bold mb-6">📺 Add Series</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* TITLE */}
        <div>
          <label className="block mb-1 text-sm">Series Title</label>
          <input
            className="input"
            placeholder="Series title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
                slug: generateSlug(e.target.value),
              })
            }
          />
        </div>

        {/* SLUG */}
        <div>
          <label className="block mb-1 text-sm">Slug (auto)</label>
          <input
            className="input"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />
        </div>

        {/* CATEGORY */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm">Select Category</label>
          <select
            className="input"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option value="">Tanlang</option>

            {CATEGORY_LIST.map((c, i) => (
              <option key={i} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* GENRES */}
        <div className="md:col-span-2">
          <label className="block mb-2 text-sm">Genres</label>

          <div className="flex gap-2 flex-wrap">
            {GENRE_LIST.map((g) => {
              const active = form.genres.includes(g);

              return (
                <button
                  type="button"
                  key={g}
                  onClick={() => toggleGenre(g)}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    active
                      ? "bg-blue-600 border-blue-500"
                      : "bg-[#111] border-gray-700"
                  }`}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>

        {/* YEAR */}
        <div>
          <label className="block mb-1 text-sm">Year</label>
          <input
            className="input"
            type="number"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
          />
        </div>

		{/* AGE LIMIT */}
		<div>
		  <label className="block mb-1 text-sm">Age Limit</label>
		  <input
			className="input"
			placeholder="Masalan: 18+"
			value={form.age}
			onChange={(e) => setForm({ ...form, age: e.target.value })}
		  />
		</div>



        {/* COUNTRY */}
        <div>
          <label className="block mb-1 text-sm">Country</label>
          <input
            className="input"
            placeholder="Korea, Turkiya, USA..."
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          />
        </div>

        {/* IMDB */}
        <div>
          <label className="block mb-1 text-sm">IMDb</label>
          <input
            className="input"
            type="number"
            step="0.1"
            value={form.imdb}
            onChange={(e) => setForm({ ...form, imdb: e.target.value })}
          />
        </div>

        {/* POSTER */}
        <div>
          <label className="block mb-1 text-sm">Poster URL</label>
          <input
            className="input"
            placeholder="https://..."
            value={form.poster}
            onChange={(e) => setForm({ ...form, poster: e.target.value })}
          />
        </div>

        {/* BACKDROP */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm">Backdrop URL</label>
          <input
            className="input"
            placeholder="https://..."
            value={form.backdrop}
            onChange={(e) => setForm({ ...form, backdrop: e.target.value })}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm">Description</label>
          <textarea
            className="input min-h-[120px]"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        {/* SAVE BUTTON */}
        <div className="md:col-span-2">
          <button
            onClick={saveSeries}
            disabled={loading}
            className="w-full py-3 bg-green-600 rounded font-semibold disabled:opacity-70"
          >
            {loading ? "Saqlanmoqda..." : "Save Series"}
          </button>
        </div>
      </div>
    </div>
  );
}
