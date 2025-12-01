"use client"; 
// bu client-side ishlaydi, chunki window cache ishlatyapsan

// =========================================
//  GLOBAL SETTINGS
// =========================================
const API_URL = "http://192.168.138.228:8000"; // o'zingning IP manziling

// Global browser cache
if (typeof window !== "undefined" && !window.__fastoraCache) {
  window.__fastoraCache = {
    movies: null,
    movieDetails: {},
    search: {}
  };
}

// =========================================
//  1) BARCHA FILMLAR (NO-CACHE)
// =========================================
export async function getMovies() {
  const res = await fetch(`${API_URL}/movies/`, { cache: "no-store" });
  return await res.json();
}

// =========================================
//  2) CACHED BARCHA FILMLAR
// =========================================
export async function getMoviesCached() {
  if (typeof window !== "undefined") {
    // cache bor bo'lsa – qaytaramiz
    if (window.__fastoraCache.movies) {
      return window.__fastoraCache.movies;
    }
  }

  const res = await fetch(`${API_URL}/movies/`);
  const data = await res.json();

  if (typeof window !== "undefined") {
    window.__fastoraCache.movies = data;
  }

  return data;
}

// =========================================
//  3) BITTA FILM (NO-CACHE)
// =========================================
export async function getMovie(id) {
  const res = await fetch(`${API_URL}/movies/${id}`);
  return await res.json();
}

// =========================================
// 4) CACHED BITTA FILM
// =========================================
export async function getMovieCached(id) {
  if (typeof window !== "undefined") {
    if (window.__fastoraCache.movieDetails[id]) {
      return window.__fastoraCache.movieDetails[id];
    }
  }

  const res = await fetch(`${API_URL}/movies/${id}`);
  const data = await res.json();

  if (typeof window !== "undefined") {
    window.__fastoraCache.movieDetails[id] = data;
  }

  return data;
}

// =========================================
// 5) SEARCH (CACHED)
// =========================================
export async function searchMoviesCached(q) {
  if (typeof window !== "undefined") {
    if (window.__fastoraCache.search[q]) {
      return window.__fastoraCache.search[q];
    }
  }

  const res = await fetch(`${API_URL}/movies/search?q=${q}`);
  const data = await res.json();

  if (typeof window !== "undefined") {
    window.__fastoraCache.search[q] = data;
  }

  return data;
}

// =========================================
// 6) LIKE / UNLIKE
// =========================================
export async function addLike(id) {
  const res = await fetch(`${API_URL}/movies/${id}/like`, {
    method: "POST",
  });
  return await res.json();
}

export async function removeLike(id) {
  const res = await fetch(`${API_URL}/movies/${id}/unlike`, {
    method: "POST",
  });
  return await res.json();
}

// =========================================
// 7) EPISODES
// =========================================
export async function getEpisode(id) {
  const res = await fetch(`${API_URL}/episodes/${id}`);
  return await res.json();
}

// =========================================
// 8) ADMIN COMMENTS (TOKEN)
// =========================================
const ADMIN_TOKEN = "CvJcsHNas8iI"; // import.meta.env ishlamaydi Next.js'da

export async function adminGetAllComments() {
  const res = await fetch(`${API_URL}/comments/admin/all`, {
    headers: {
      "X-Admin-Token": ADMIN_TOKEN,
    },
  });
  return await res.json();
}

export async function adminDeleteComment(id) {
  await fetch(`${API_URL}/comments/admin/${id}`, {
    method: "DELETE",
    headers: { "X-Admin-Token": ADMIN_TOKEN },
  });
}

export async function adminReplyComment(id, reply) {
  const res = await fetch(`${API_URL}/comments/admin/${id}/reply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Token": ADMIN_TOKEN,
    },
    body: JSON.stringify({ reply }),
  });

  return await res.json();
}
