/**
 * Database initialization and seeding.
 * Ensures the portfolio_data table has a default row on first access.
 */

import { supabase } from "./supabase";
import { defaultPortfolioData } from "./data";

/**
 * Initialize the portfolio data in Supabase.
 * If no row exists with id=1, inserts the default seed data.
 */
export async function initializePortfolioData(): Promise<void> {
  const { data, error } = await supabase
    .from("portfolio_data")
    .select("id")
    .eq("id", 1)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows returned, which is expected if empty
    console.error("Initialization check error:", error.message);
    return;
  }

  if (!data) {
    const { error: insertError } = await supabase
      .from("portfolio_data")
      .insert({
        id: 1,
        data: defaultPortfolioData,
        updated_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error("Failed to seed portfolio data:", insertError.message);
    } else {
      console.log("Portfolio data seeded successfully.");
    }
  }
}

