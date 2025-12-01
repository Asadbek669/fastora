"use client";

import { useState } from "react";

// TEMPORARY MOCK
const SERIES_LIST = [
  { id: "1", title: "My Demon" },
  { id: "2", title: "Squid Game" },
  { id: "3", title: "Kuruluş Osman" },
];

// MOCK SEASONS
const SEASONS = {
  "1": [1, 2],      // My Demon → Season 1,2
  "2": [1],         // Squid Game → Season 1
  "3": [1, 2, 3],   // Osman → 1,2,3
};

export default function AddEpisodePage() {
  const [selectedSeries, setSelectedSeries] = useState("");
  const [form, setForm] = useState({
    seasonNumber: "",
    episodeNumber: "",
    title: "",
    videoUrl: "",
    thumbnail: "",
    duration: "",
  });

  const handleSeriesChange = (seriesId) => {
    setSelectedSeries(seriesId);
    setForm({ ...form, seasonNumber: "" }); // reset season
  };

  return (
    <div className="text-gray-200">
      <h1 className="text-3xl font-bold mb-6">🎥 Add Episode</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* SELECT SERIES */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm">Select Series</label>
          <select
            className="input"
            value={selectedSeries}
            onChange={(e) => handleSeriesChange(e.target.value)}
          >
            <option value="">Choose series</option>
            {SERIES_LIST.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        {/* SELECT SEASON */}
        {selectedSeries && (
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm">Select Season</label>
            <select
              className="input"
              value={form.seasonNumber}
              onChange={(e) =>
                setForm({ ...form, seasonNumber: e.target.value })
              }
            >
              <option value="">Choose season</option>

              {SEASONS[selectedSeries].map((num) => (
                <option key={num} value={num}>
                  Season {num}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* EPISODE NUMBER */}
        <div>
          <label className="block mb-1 text-sm">Episode Number</label>
          <input
            className="input"
            type="number"
            value={form.episodeNumber}
            onChange={(e) =>
              setForm({ ...form, episodeNumber: e.target.value })
            }
          />
        </div>

        {/* DURATION */}
        <div>
          <label className="block mb-1 text-sm">Duration (min)</label>
          <input
            className="input"
            type="number"
            value={form.duration}
            onChange={(e) =>
              setForm({ ...form, duration: e.target.value })
            }
          />
        </div>

        {/* TITLE */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm">Episode Title</label>
          <input
            className="input"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* VIDEO URL */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm">Video URL</label>
          <input
            className="input"
            value={form.videoUrl}
            onChange={(e) =>
              setForm({ ...form, videoUrl: e.target.value })
            }
          />
        </div>

        {/* THUMBNAIL */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm">Thumbnail URL</label>
          <input
            className="input"
            value={form.thumbnail}
            onChange={(e) =>
              setForm({ ...form, thumbnail: e.target.value })
            }
          />
        </div>

        {/* SAVE */}
        <div className="md:col-span-2">
          <button className="w-full py-3 bg-purple-600 rounded font-semibold">
            Save Episode
          </button>
        </div>
      </div>
    </div>
  );
}
