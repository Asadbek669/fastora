"use client";

import { useState } from "react";

const CATEGORY_LIST = [
  { value: "premyera", label: "Premyera" },
  { value: "tarjima", label: "Tarjima kinolar" },
  { value: "hind", label: "Hind kinolar" },
  { value: "anime", label: "Anime" },
  { value: "multfilmlar", label: "Multfimlar" },
  { value: "uzbek-film", label: "O‘zbek filmlar" },
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

export default function AddMoviePage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    year: "",
    country: "",
    imdb: "",
    poster: "",
    backdrop: "",
    video: "",
    description: "",
    category: "",
    genres: [],
    age: "18+",
    thumbs: [],
  });

  const [thumbInputs, setThumbInputs] = useState([""]);

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

  const generateSlug = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  const updateThumb = (i, val) => {
    const next = [...thumbInputs];
    next[i] = val;
    setThumbInputs(next);
  };

  // ⭐⭐⭐ SAVE MOVIE FUNCTION — REAL DB CONNECTED ⭐⭐⭐
  const saveMovie = async () => {
    try {
      setLoading(true);

      const payload = {
        ...form,
        thumbs: thumbInputs.filter((t) => t.trim() !== ""),
      };

      const res = await fetch("/api/movies/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        alert("Xatolik: " + (data.error || "Server xatosi"));
        return;
      }

      alert("🎉 Movie added successfully!");

      // RESET FORM
      setForm({
        title: "",
        slug: "",
        year: "",
        country: "",
        imdb: "",
        poster: "",
        backdrop: "",
        video: "",
        description: "",
        category: "",
        genres: [],
        age: "18+",
        thumbs: [],
      });

      setThumbInputs([""]);

    } catch (error) {
      alert("Server xatosi: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-200">
      <h1 className="text-3xl font-bold mb-6">🎬 Add Movie</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* TITLE */}
        <div>
          <label className="block mb-1 text-sm">Title</label>
          <input
            className="input"
            placeholder="Movie title"
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
          <label className="block mb-1 text-sm">Category</label>
          <select
            className="input"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option value="">Select category</option>
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
                  key={g}
                  onClick={() => toggleGenre(g)}
                  className={`
                    px-3 py-1 rounded-full text-sm border
                    ${active
                      ? "bg-blue-600 border-blue-500"
                      : "bg-[#111] border-gray-700"}
                  `}
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

        {/* COUNTRY */}
        <div>
          <label className="block mb-1 text-sm">Country</label>
          <input
            className="input"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          />
        </div>

        {/* IMDB */}
        <div>
          <label className="block mb-1 text-sm">IMDB</label>
          <input
            className="input"
            type="number"
            step="0.1"
            value={form.imdb}
            onChange={(e) => setForm({ ...form, imdb: e.target.value })}
          />
        </div>

        {/* AGE */}
        <div>
          <label className="block mb-1 text-sm">Age Limit</label>
          <select
            className="input"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          >
            <option>0+</option>
            <option>7+</option>
            <option>13+</option>
            <option>16+</option>
            <option>18+</option>
          </select>
        </div>

        {/* POSTER */}
        <div>
          <label className="block mb-1 text-sm">Poster URL</label>
          <input
            className="input"
            value={form.poster}
            onChange={(e) => setForm({ ...form, poster: e.target.value })}
          />
        </div>

        {/* BACKDROP */}
        <div>
          <label className="block mb-1 text-sm">Backdrop URL</label>
          <input
            className="input"
            value={form.backdrop}
            onChange={(e) => setForm({ ...form, backdrop: e.target.value })}
          />
        </div>

        {/* VIDEO */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm">Video URL</label>
          <input
            className="input"
            value={form.video}
            onChange={(e) => setForm({ ...form, video: e.target.value })}
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

        {/* THUMBS */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm">Thumbnails</label>

          <div className="space-y-2">
            {thumbInputs.map((thumb, i) => (
              <input
                key={i}
                className="input"
                placeholder="https://img..."
                value={thumb}
                onChange={(e) => updateThumb(i, e.target.value)}
              />
            ))}
          </div>

          <button
            type="button"
            className="mt-3 px-4 py-2 bg-blue-600 rounded"
            onClick={() => setThumbInputs([...thumbInputs, ""])}
          >
            + Add more
          </button>
        </div>

        {/* SAVE BUTTON */}
        <div className="md:col-span-2">
          <button
            onClick={saveMovie}
            className="w-full py-3 bg-red-600 rounded font-semibold disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Movie"}
          </button>
        </div>

      </div>
    </div>
  );
}
