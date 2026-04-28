/**
 * Portfolio data API route.
 * GET - public; returns all portfolio data
 * POST - protected; updates all portfolio data
 */

import { type NextRequest, NextResponse } from "next/server";
import { loadPortfolioData, savePortfolioData } from "@/lib/data";
import { verifyToken } from "@/lib/auth";
import { initializePortfolioData } from "@/lib/db-init";

export async function GET() {
  try {
    // Ensure Supabase has seed data on first request
    await initializePortfolioData();
    const data = await loadPortfolioData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to load portfolio data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin token from cookie
    const token = request.cookies.get("admin_token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    await savePortfolioData(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save portfolio data" }, { status: 500 });
  }
}

