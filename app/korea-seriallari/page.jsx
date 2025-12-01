"use client";

const koreaSeries = [
  { id: 1,  title: "The Glory", poster_url: "https://m.media-amazon.com/images/I/81y8VnXN0oL._SL1500_.jpg" },
  { id: 2,  title: "Crash Landing on You", poster_url: "https://m.media-amazon.com/images/I/81VhVnSWPZL._SL1500_.jpg" },
  { id: 3,  title: "Vincenzo", poster_url: "https://m.media-amazon.com/images/I/71Na2rNEnnL._SL1200_.jpg" },
  { id: 4,  title: "My Demon", poster_url: "https://m.media-amazon.com/images/I/71zVuCaLFeL._SL1200_.jpg" },
  { id: 5,  title: "Doctor Cha", poster_url: "https://m.media-amazon.com/images/I/81Z6b7ug1VL._SL1500_.jpg" },

  { id: 6,  title: "Business Proposal", poster_url: "https://m.media-amazon.com/images/I/81qcSxNxS0L._SL1500_.jpg" },
  { id: 7,  title: "Sweet Home", poster_url: "https://m.media-amazon.com/images/I/81jzwzRrHHL._SL1500_.jpg" },
  { id: 8,  title: "King the Land", poster_url: "https://m.media-amazon.com/images/I/71g8G1Ryhok._SL1200_.jpg" },
  { id: 9,  title: "Queen of Tears", poster_url: "https://m.media-amazon.com/images/I/81h7uN55G7L._SL1500_.jpg" },
  { id: 10, title: "All of Us Are Dead", poster_url: "https://m.media-amazon.com/images/I/81lW7x1YgnL._SL1500_.jpg" },

  { id: 11, title: "Start-Up", poster_url: "https://m.media-amazon.com/images/I/81DOAT4kLzL._SL1500_.jpg" },
  { id: 12, title: "Reborn Rich", poster_url: "https://m.media-amazon.com/images/I/71YNbFQG9zL._SL1200_.jpg" },
  { id: 13, title: "A Business Proposal", poster_url: "https://m.media-amazon.com/images/I/81OzyM7iWDL._SL1500_.jpg" },
  { id: 14, title: "The Uncanny Counter", poster_url: "https://m.media-amazon.com/images/I/81GBuXvNybL._SL1500_.jpg" },
  { id: 15, title: "Nevertheless", poster_url: "https://m.media-amazon.com/images/I/71CPrmT2yOL._SL1200_.jpg" },

  { id: 16, title: "Itaewon Class", poster_url: "https://m.media-amazon.com/images/I/81CG0iQFgnL._SL1500_.jpg" },
  { id: 17, title: "The King: Eternal Monarch", poster_url: "https://m.media-amazon.com/images/I/81tZL1NVrYL._SL1500_.jpg" },
  { id: 18, title: "Extraordinary Attorney Woo", poster_url: "https://m.media-amazon.com/images/I/71G8ZF5S6SL._SL1200_.jpg" },
  { id: 19, title: "Bloodhounds", poster_url: "https://m.media-amazon.com/images/I/81k2XeVQGQL._SL1500_.jpg" },
  { id: 20, title: "See You in My 19th Life", poster_url: "https://m.media-amazon.com/images/I/71N3pnC7xDL._SL1200_.jpg" }
];

export default function KoreaSeriesPage() {
  return (
    <div className="p-4 pb-24 text-white">
      <h1 className="text-2xl font-semibold mb-4">Koreya seriallari</h1>

      <div className="grid grid-cols-3 gap-3">
        {koreaSeries.map((m) => (
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
