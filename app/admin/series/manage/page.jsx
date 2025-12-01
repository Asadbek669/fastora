"use client";

import { useEffect, useState } from "react";

/**
 * ManageSeriesPage — to'liq professional admin panel component.
 *
 * Must-haves:
 * - Backend endpoints:
 *   GET  /api/series
 *   GET  /api/season?slug=...
 *   POST /api/season
 *   PUT  /api/season/{id}
 *   DELETE /api/season/{id}
 *   GET  /api/episode/season/{seasonId}
 *   POST /api/episode
 *   PUT  /api/episode/{id}
 *   DELETE /api/episode/{id}
 *
 * Notes:
 * - Episode manual add uses `episodeNumber` provided from the UI.
 * - All fetch calls use helper fetchJSON to avoid JSON parsing errors when non-JSON returned.
 */

export default function ManageSeriesPage() {
  // --- State ---
  const [series, setSeries] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedSeries, setSelectedSeries] = useState(null);

  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);

  const [episodes, setEpisodes] = useState([]);

  // manual episode inputs
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [episodeUrl, setEpisodeUrl] = useState("");

  // modal states for edit
  const [seasonEditOpen, setSeasonEditOpen] = useState(false);
  const [seasonEditData, setSeasonEditData] = useState(null);

  const [episodeEditOpen, setEpisodeEditOpen] = useState(false);
  const [episodeEditData, setEpisodeEditData] = useState(null);

  // loading flags (optional UX)
  const [loadingSeries, setLoadingSeries] = useState(false);
  const [loadingSeasons, setLoadingSeasons] = useState(false);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  // --- Helper: safe fetch JSON that returns null on non-json or error ---
  async function fetchJSON(url, opts = {}) {
    try {
      const res = await fetch(url, opts);
      if (!res.ok) {
        // Try to decode JSON error if possible
        try {
          const data = await res.json();
          // throw to be handled by caller
          throw new Error(data?.error || `HTTP ${res.status}`);
        } catch (e) {
          throw new Error(`HTTP ${res.status}`);
        }
      }
      // if 204 No Content
      if (res.status === 204) return null;
      // parse JSON safely
      const text = await res.text();
      if (!text) return null;
      return JSON.parse(text);
    } catch (err) {
      console.error("fetchJSON error", url, err);
      throw err;
    }
  }

  // --- Load series once ---
  useEffect(() => {
    let cancelled = false;
    setLoadingSeries(true);
    fetchJSON("/api/series")
      .then((data) => {
        if (!cancelled) setSeries(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        console.error("Load series error:", e);
        setSeries([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingSeries(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // --- Load seasons when a series selected (by slug) ---
  useEffect(() => {
    if (!selectedSeries) return;
    let cancelled = false;
    setLoadingSeasons(true);
    fetchJSON(`/api/season?slug=${encodeURIComponent(selectedSeries.slug)}`)
      .then((data) => {
        if (!cancelled) setSeasons(Array.isArray(data) ? data : []);
        if (!cancelled) {
          setSelectedSeason(null);
          setEpisodes([]);
        }
      })
      .catch((e) => {
        console.error("Load seasons error:", e);
        setSeasons([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingSeasons(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedSeries]);

  // --- Load episodes when season selected ---
  useEffect(() => {
    if (!selectedSeason) return;
    let cancelled = false;
    setLoadingEpisodes(true);
    fetchJSON(`/api/episode/season/${selectedSeason.id}`)
      .then((data) => {
        if (!cancelled) setEpisodes(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        console.error("Load episodes error:", e);
        setEpisodes([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingEpisodes(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedSeason]);

  // -------------------------
  // Season CRUD
  // -------------------------

  // Create season
  const createSeason = async () => {
    if (!selectedSeries) return alert("Avval serialni tanlang");
    const nextSeasonNumber = seasons.length + 1;
    try {
      const newSeason = await fetchJSON("/api/season", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seriesId: selectedSeries.id,
          seasonNumber: nextSeasonNumber,
          description: "",
        }),
      });
      // refresh seasons
      const updated = await fetchJSON(`/api/season?slug=${encodeURIComponent(selectedSeries.slug)}`);
      setSeasons(Array.isArray(updated) ? updated : []);
      // auto-select created season by number or by returned id
      const created =
        (Array.isArray(updated) && updated.find((s) => s.season_number === nextSeasonNumber)) ||
        newSeason ||
        null;
      setSelectedSeason(created || null);
    } catch (err) {
      alert("Sezon yaratishda xato: " + (err.message || err));
    }
  };

  // Delete season (and episodes)
  const deleteSeason = async (seasonId) => {
    if (!confirm("Bu sezon va uning barcha qismlarini o‘chirmoqchimisiz?")) return;
    try {
      await fetchJSON(`/api/season/${seasonId}`, { method: "DELETE" });
      const updated = await fetchJSON(`/api/season?slug=${encodeURIComponent(selectedSeries.slug)}`);
      setSeasons(Array.isArray(updated) ? updated : []);
      setSelectedSeason(null);
      setEpisodes([]);
    } catch (err) {
      alert("Season o'chirishda xato: " + (err.message || err));
    }
  };

  // Open season edit modal
  const openSeasonEdit = (season) => {
    setSeasonEditData({
      id: season.id,
      season_number: season.season_number,
      description: season.description || "",
      poster: season.poster || "",
    });
    setSeasonEditOpen(true);
  };

  // Save season edit (PUT)
  const saveSeasonEdit = async () => {
    if (!seasonEditData || !seasonEditData.id) return;
    try {
      await fetchJSON(`/api/season/${seasonEditData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          season_number: Number(seasonEditData.season_number),
          description: seasonEditData.description,
          poster: seasonEditData.poster,
        }),
      });
      const updated = await fetchJSON(`/api/season?slug=${encodeURIComponent(selectedSeries.slug)}`);
      setSeasons(Array.isArray(updated) ? updated : []);
      setSelectedSeason(updated.find((s) => s.id === seasonEditData.id) || null);
      setSeasonEditOpen(false);
      setSeasonEditData(null);
    } catch (err) {
      alert("Season update failed: " + (err.message || err));
    }
  };

  // -------------------------
  // Episode CRUD (manual add)
  // -------------------------

  // Create episode manual: user provides episodeNumber and video URL
  const createEpisodeManual = async () => {
    if (!selectedSeason) return alert("Avval season tanlang");
    if (!episodeNumber || isNaN(Number(episodeNumber))) return alert("Qism raqamini to'g'ri kiriting");
    if (!episodeUrl?.trim()) return alert("Video URL kiriting");

    const title = `${Number(episodeNumber)}-qism`;
    try {
      const created = await fetchJSON("/api/episode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seasonId: selectedSeason.id,
          episodeNumber: Number(episodeNumber),
          title,
          videoUrl: episodeUrl,
          thumbnail: "",
          duration: 0,
        }),
      });
      // reload episodes and seasons
      const eps = await fetchJSON(`/api/episode/season/${selectedSeason.id}`);
      setEpisodes(Array.isArray(eps) ? eps : []);
      const updatedSeasons = await fetchJSON(`/api/season?slug=${encodeURIComponent(selectedSeries.slug)}`);
      setSeasons(Array.isArray(updatedSeasons) ? updatedSeasons : []);
      setSelectedSeason((prev) => {
        // find matching by id in updatedSeasons
        return (updatedSeasons || []).find((s) => s.id === selectedSeason.id) || prev;
      });
      // reset inputs
      setEpisodeNumber("");
      setEpisodeUrl("");
      alert("Qism qo'shildi");
    } catch (err) {
      alert("Qism qo'shishda xato: " + (err.message || err));
    }
  };

  // Delete episode by id
  const deleteEpisode = async (episodeId) => {
    if (!confirm("Haqiqatan o'chirmoqchimisiz?")) return;
    try {
      await fetchJSON(`/api/episode/${episodeId}`, { method: "DELETE" });
      const eps = await fetchJSON(`/api/episode/season/${selectedSeason.id}`);
      setEpisodes(Array.isArray(eps) ? eps : []);
      const updatedSeasons = await fetchJSON(`/api/season?slug=${encodeURIComponent(selectedSeries.slug)}`);
      setSeasons(Array.isArray(updatedSeasons) ? updatedSeasons : []);
      setSelectedSeason((prev) => (updatedSeasons || []).find((s) => s.id === prev?.id) || prev);
    } catch (err) {
      alert("Episode o'chirish xato: " + (err.message || err));
    }
  };

  // Open episode edit modal
  const openEpisodeEdit = (ep) => {
    setEpisodeEditData({
      id: ep.id,
      title: ep.title,
      videoUrl: ep.video_url,
      thumbnail: ep.thumbnail,
      duration: ep.duration,
    });
    setEpisodeEditOpen(true);
  };

  // Save episode edit (PUT)
  const saveEpisodeEdit = async () => {
    if (!episodeEditData || !episodeEditData.id) return;
    try {
      await fetchJSON(`/api/episode/${episodeEditData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: episodeEditData.title,
          videoUrl: episodeEditData.videoUrl,
          thumbnail: episodeEditData.thumbnail,
          duration: Number(episodeEditData.duration || 0),
        }),
      });
      const eps = await fetchJSON(`/api/episode/season/${selectedSeason.id}`);
      setEpisodes(Array.isArray(eps) ? eps : []);
      setEpisodeEditOpen(false);
      setEpisodeEditData(null);
    } catch (err) {
      alert("Episode update failed: " + (err.message || err));
    }
  };

  // -------------------------
  // Render UI
  // -------------------------
  return (
    <div className="p-6 text-gray-200 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">🎬 Serial boshqaruvi</h1>
        <p className="text-gray-400">Serialni tanlang va season/episodelarni boshqaring</p>
      </div>

      {/* Series list */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {series.slice(0, visibleCount).map((s) => (
          <div
            key={s.id}
            onClick={() => {
              setSelectedSeries(s);
              setSelectedSeason(null);
              setEpisodes([]);
            }}
            className={`cursor-pointer p-3 rounded-xl border transition ${selectedSeries?.id === s.id ? "border-purple-500 bg-purple-500/10" : "border-white/10 bg-white/5"}`}
          >
            <img src={s.poster} alt={s.title} className="w-full h-40 object-cover rounded-lg" />
            <p className="mt-2 text-sm">{s.title}</p>
            <p className="text-xs text-gray-400 mt-1">ID: {s.id}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-3">
        {visibleCount < series.length && (
          <button className="px-3 py-2 bg-white/10 rounded" onClick={() => setVisibleCount(visibleCount + 5)}>
            + Ko‘proq
          </button>
        )}
        {visibleCount > 3 && (
          <button className="px-3 py-2 bg-white/10 rounded" onClick={() => setVisibleCount(3)}>
            - Kamroq
          </button>
        )}
      </div>

      {/* Seasons */}
      {selectedSeries && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">📚 {selectedSeries.title} — Seasonlar</h2>
            <div className="flex gap-2">
              <button className="px-3 py-2 bg-purple-600 rounded" onClick={createSeason}>
                + Yangi sezon
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {seasons.map((season) => (
              <div key={season.id} className="p-4 rounded-lg border bg-white/5 flex justify-between items-center">
                <div onClick={() => setSelectedSeason(season)} className="cursor-pointer">
                  <p className="font-semibold">{season.season_number}-sezon</p>
                  <p className="text-sm text-gray-400">{season.episode_count || 0} ta qism</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-yellow-600 rounded" onClick={() => openSeasonEdit(season)}>
                    Tahrirlash
                  </button>
                  <button className="px-3 py-1 bg-red-600 rounded" onClick={() => deleteSeason(season.id)}>
                    O'chirish
                  </button>
                </div>
              </div>
            ))}
            {seasons.length === 0 && <p className="text-gray-400">Sezonlar mavjud emas</p>}
          </div>
        </div>
      )}

      {/* Episodes / Manual Add */}
      {selectedSeason && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">🎥 {selectedSeason.season_number}-sezon</h3>

          {/* existing episodes */}
          {loadingEpisodes ? (
            <p className="text-gray-400 mt-3">Yuklanmoqda...</p>
          ) : episodes.length > 0 ? (
            <div className="mt-3 space-y-2">
              {episodes.map((ep) => (
                <div key={ep.id} className="p-3 bg-white/5 rounded border flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{ep.episode_number}-qism</p>
                    <p className="text-sm text-gray-400">{ep.title}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-yellow-600 rounded" onClick={() => openEpisodeEdit(ep)}>
                      Tahrirlash
                    </button>
                    <button className="px-3 py-1 bg-red-600 rounded" onClick={() => deleteEpisode(ep.id)}>
                      O'chirish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 mt-3">Hozircha qism mavjud emas</p>
          )}

          {/* manual add */}
          <div className="mt-6 p-4 rounded-lg bg-white/5 border">
            <h4 className="font-semibold mb-2">Qo'lda qism qo'shish</h4>

            <label className="text-sm block mb-1">Qism raqami</label>
            <input
              type="number"
              value={episodeNumber}
              onChange={(e) => setEpisodeNumber(e.target.value)}
              className="w-full p-2 rounded bg-black/20 mb-3"
              placeholder="Masalan: 4"
            />

            <label className="text-sm block mb-1">Video URL</label>
            <input
              value={episodeUrl}
              onChange={(e) => setEpisodeUrl(e.target.value)}
              className="w-full p-2 rounded bg-black/20 mb-3"
              placeholder="Video URL..."
            />

            <div className="flex gap-2">
              <button className="px-4 py-2 bg-green-600 rounded" onClick={createEpisodeManual}>
                Qo'shish
              </button>
              <button
                className="px-4 py-2 bg-white/10 rounded"
                onClick={() => {
                  setEpisodeNumber("");
                  setEpisodeUrl("");
                }}
              >
                Tozalash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Season Edit Modal */}
      {seasonEditOpen && seasonEditData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl bg-[#0b0b0b] p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold mb-3">Season tahrirlash</h3>

            <label className="block text-sm text-gray-300">Sezon raqami</label>
            <input value={seasonEditData.season_number} onChange={(e) => setSeasonEditData({ ...seasonEditData, season_number: e.target.value })} className="w-full p-2 rounded bg-white/5 mb-3" />

            <label className="block text-sm text-gray-300">Poster URL</label>
            <input value={seasonEditData.poster} onChange={(e) => setSeasonEditData({ ...seasonEditData, poster: e.target.value })} className="w-full p-2 rounded bg-white/5 mb-3" />

            <label className="block text-sm text-gray-300">Tavsif</label>
            <textarea value={seasonEditData.description} onChange={(e) => setSeasonEditData({ ...seasonEditData, description: e.target.value })} className="w-full p-2 rounded bg-white/5 mb-4" />

            <div className="flex gap-2 justify-end">
              <button className="px-4 py-2 bg-white/10 rounded" onClick={() => { setSeasonEditOpen(false); setSeasonEditData(null); }}>
                Bekor qilish
              </button>
              <button className="px-4 py-2 bg-blue-600 rounded" onClick={saveSeasonEdit}>
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Episode Edit Modal */}
      {episodeEditOpen && episodeEditData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl bg-[#0b0b0b] p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold mb-3">Episode tahrirlash</h3>

            <label className="block text-sm text-gray-300">Title</label>
            <input value={episodeEditData.title} onChange={(e) => setEpisodeEditData({ ...episodeEditData, title: e.target.value })} className="w-full p-2 rounded bg-white/5 mb-3" />

            <label className="block text-sm text-gray-300">Video URL</label>
            <input value={episodeEditData.videoUrl} onChange={(e) => setEpisodeEditData({ ...episodeEditData, videoUrl: e.target.value })} className="w-full p-2 rounded bg-white/5 mb-3" />

            <label className="block text-sm text-gray-300">Thumbnail URL</label>
            <input value={episodeEditData.thumbnail} onChange={(e) => setEpisodeEditData({ ...episodeEditData, thumbnail: e.target.value })} className="w-full p-2 rounded bg-white/5 mb-3" />

            <label className="block text-sm text-gray-300">Duration (seconds)</label>
            <input type="number" value={episodeEditData.duration} onChange={(e) => setEpisodeEditData({ ...episodeEditData, duration: e.target.value })} className="w-full p-2 rounded bg-white/5 mb-4" />

            <div className="flex gap-2 justify-end">
              <button className="px-4 py-2 bg-white/10 rounded" onClick={() => { setEpisodeEditOpen(false); setEpisodeEditData(null); }}>
                Bekor qilish
              </button>
              <button className="px-4 py-2 bg-blue-600 rounded" onClick={saveEpisodeEdit}>
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
