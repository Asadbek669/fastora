"use client";

const testMovies = [
  { id: 1,  title: "Hind Film 1",  poster_url: "https://m.media-amazon.com/images/I/81G-r6Eb8aL._AC_SL1500_.jpg" },
  { id: 2,  title: "Hind Film 2",  poster_url: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SL1200_.jpg" },
  { id: 3,  title: "Hind Film 3",  poster_url: "https://m.media-amazon.com/images/I/81Zt42ioCgL._AC_SL1500_.jpg" },
  { id: 4,  title: "Hind Film 4",  poster_url: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SL1500_.jpg" },
  { id: 5,  title: "Hind Film 5",  poster_url: "https://m.media-amazon.com/images/I/71d1KSKk2hL._AC_SL1500_.jpg" },
  { id: 6,  title: "Hind Film 6",  poster_url: "https://m.media-amazon.com/images/I/81s6DUyQCZL._SL1500_.jpg" },
  { id: 7,  title: "Hind Film 7",  poster_url: "https://m.media-amazon.com/images/I/61B0E3vYvCL._AC_SY679_.jpg" },
  { id: 8,  title: "Hind Film 8",  poster_url: "https://m.media-amazon.com/images/I/51oBxmV-dML._AC_.jpg" },
  { id: 9,  title: "Hind Film 9",  poster_url: "https://m.media-amazon.com/images/I/81r+2bq7tXL._SY445_.jpg" },
  { id: 10, title: "Hind Film 10", poster_url: "https://m.media-amazon.com/images/I/81ZqP8xH5LL._AC_SL1500_.jpg" },

  { id: 11, title: "Hind Film 11", poster_url: "https://m.media-amazon.com/images/I/71a9fF0hKRL._SL1200_.jpg" },
  { id: 12, title: "Hind Film 12", poster_url: "https://m.media-amazon.com/images/I/81b1X5V1t0L._SL1500_.jpg" },
  { id: 13, title: "Hind Film 13", poster_url: "https://m.media-amazon.com/images/I/71x5k0eqsQL._SL1024_.jpg" },
  { id: 14, title: "Hind Film 14", poster_url: "https://m.media-amazon.com/images/I/51v2xixwM+L._AC_.jpg" },
  { id: 15, title: "Hind Film 15", poster_url: "https://m.media-amazon.com/images/I/71s8s6oA9wL._SL1500_.jpg" },
  { id: 16, title: "Hind Film 16", poster_url: "https://m.media-amazon.com/images/I/51x+9Kq3HmL._AC_.jpg" },
  { id: 17, title: "Hind Film 17", poster_url: "https://m.media-amazon.com/images/I/71Wq4s0qKIL._SL1200_.jpg" },
  { id: 18, title: "Hind Film 18", poster_url: "https://m.media-amazon.com/images/I/81s8eEz8qML._SL1500_.jpg" },
  { id: 19, title: "Hind Film 19", poster_url: "https://m.media-amazon.com/images/I/91YgdYgq6PL._SL1500_.jpg" },
  { id: 20, title: "Hind Film 20", poster_url: "https://m.media-amazon.com/images/I/71j3w8YJZJL._SL1000_.jpg" }
];

export default function HindPage() {
  return (
    <div className="p-4 pb-24 text-white">
      <h1 className="text-2xl font-semibold mb-4">Hind kinolar</h1>

      <div className="grid grid-cols-3 gap-3">
        {testMovies.map((m) => (
          <div key={m.id} className="flex flex-col">
            <div className="w-full h-[150px] rounded-lg overflow-hidden bg-[#111] shadow-lg">
              <img
                src={m.poster_url}
                className="w-full h-full object-cover"
                alt={m.title}
              />
            </div>
            <p className="text-[13px] mt-2 truncate">{m.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
