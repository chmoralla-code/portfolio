/**
 * POST /api/auth/login
 * Validates admin credentials and sets an auth cookie.
 */

import { cookies } from "next/headers";
import { verifyCredentials, generateToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { username?: string; password?: string };
    const { username, password } = body;

    if (!username || !password) {
      return Response.json({ error: "Username and password are required" }, { status: 400 });
    }

    const valid = await verifyCredentials(username, password);
    if (!valid) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = generateToken();
    const cookieStore = await cookies();

    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}
