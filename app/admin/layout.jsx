import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import AdminLayout from "./AdminLayout";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("fastora_token")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    redirect("/admin/login");
  }

  return <AdminLayout>{children}</AdminLayout>;
}
