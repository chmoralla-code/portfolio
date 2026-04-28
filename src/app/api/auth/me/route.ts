/**
 * GET /api/auth/me
 * Returns whether the current user is authenticated as admin.
 */

import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token || !verifyToken(token)) {
    return Response.json({ authenticated: false });
  }

  return Response.json({ authenticated: true });
}
