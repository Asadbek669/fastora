"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function DonateList({ donations }) {
  const [active, setActive] = useState(null);

  if (!donations?.length) return null;

  return (
    <>
      <div className="space-y-3 mt-6">
        {donations.map((d, i) => (
          <div
            key={i}
            onClick={() => setActive(d)}
            className="
              flex items-center gap-4
              p-4 rounded-2xl
              bg-zinc-900/70 backdrop-blur
              cursor-pointer
              hover:bg-zinc-800 transition
            "
          >
            {/* Avatar */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center font-bold text-lg">
              {d.name[0]}
            </div>

            {/* Text */}
            <div className="flex-1">
              <p className="font-semibold">
                {d.name}
                <span className="ml-2 text-green-400 font-bold">
                  {d.amount.toLocaleString()} so‘m
                </span>
              </p>
              <p className="text-sm text-gray-400 line-clamp-1">
                {d.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {active && (
        <div className="fixed inset-0 z-[1000] bg-black/70 flex items-center justify-center">
          <div className="bg-zinc-900 w-[90%] max-w-md rounded-2xl p-5 relative">
            <button
              onClick={() => setActive(null)}
              className="absolute top-3 right-3 text-gray-400"
            >
              <X />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center font-bold text-lg">
                {active.name[0]}
              </div>
              <div>
                <p className="font-semibold">{active.name}</p>
                <p className="text-yellow-400 font-bold">
                  {active.amount.toLocaleString()} so‘m
                </p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              {active.message}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

