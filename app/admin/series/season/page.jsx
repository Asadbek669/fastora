"use client";

import { useState } from "react";

// TEMPORARY MOCK DATA — keyin API bilan almashtiramiz
const SERIES_LIST = [
  { id: "1", title: "My Demon" },
  { id: "2", title: "Squid Game" },
  { id: "3", title: "Kuruluş Osman" },
];

export default function AddSeasonPage() {
  const [form, setForm] = useState({
    seriesId: "",
    seasonNumber: "",
    poster: "",
    description: "",
  });

  return (
    <div className="text-gray-200">
      <h1 className="text-3xl font-bold mb-6">📚 Add Season</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* SERIAL SELECT */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm">Select Series</label>
          <select
            className="input"
            value={form.seriesId}
            onChange={(e) =>
              setForm({ ...form, seriesId: e.target.value })
            }
          >
            <option value="">Choose series</option>
            {SERIES_LIST.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        {/* SEASON NUMBER */}
        <div>
          <label className="block mb-1 text-sm">Season Number</label>
          <input
            className="input"
            type="number"
            value={form.seasonNumber}
            onChange={(e) =>
              setForm({ ...form, seasonNumber: e.target.value })
            }
          />
        </div>

        {/* POSTER */}
        <div>
          <label className="block mb-1 text-sm">Poster (optional)</label>
          <input
            className="input"
            placeholder="https://..."
            value={form.poster}
            onChange={(e) =>
              setForm({ ...form, poster: e.target.value })
            }
          />
        </div>

        {/* DESCRIPTION */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm">Description (optional)</label>
          <textarea
            className="input min-h-[120px]"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        {/* SAVE */}
        <div className="md:col-span-2">
          <button className="w-full py-3 bg-green-600 rounded font-semibold">
            Save Season
          </button>
        </div>
      </div>
    </div>
  );
}
