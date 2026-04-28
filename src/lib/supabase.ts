/**
 * Server-side Supabase client.
 * Uses the service role key for full database access.
 * Only use this in server components / API routes.
 */

import { createClient } from "@supabase/supabase-js";
import type { PortfolioData } from "./types";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    "Missing Supabase environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set."
  );
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Load portfolio data from Supabase.
 * Returns the first row from the portfolio_data table.
 */
export async function loadPortfolioData(): Promise<PortfolioData | null> {
  const { data, error } = await supabase
    .from("portfolio_data")
    .select("data")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Supabase load error:", error.message);
    return null;
  }

  return data?.data as PortfolioData | null;
}

/**
 * Save portfolio data to Supabase.
 * Upserts the data row with id = 1.
 */
export async function savePortfolioData(data: PortfolioData): Promise<void> {
  const { error } = await supabase
    .from("portfolio_data")
    .upsert({ id: 1, data, updated_at: new Date().toISOString() });

  if (error) {
    console.error("Supabase save error:", error.message);
    throw new Error("Failed to save portfolio data");
  }
}

