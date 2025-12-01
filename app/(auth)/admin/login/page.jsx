"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setErr(data.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <form onSubmit={submit} className="max-w-md w-full bg-[#0b0b0b] p-6 rounded">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        {err && <div className="mb-3 text-red-400">{err}</div>}
        <input className="input mb-3" placeholder="username or email" value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input className="input mb-3" type="password" placeholder="password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full py-2 bg-blue-600 rounded">Login</button>
      </form>
    </div>
  );
}
