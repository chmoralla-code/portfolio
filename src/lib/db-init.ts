/**
 * Database initialization and seeding.
 * Ensures the portfolio_data table has a default row on first access.
 */

import { isSupabaseConfigured, loadPortfolioData, savePortfolioData } from "./supabase";
import { defaultPortfolioData } from "./data";

/**
 * Initialize the portfolio data in Supabase.
 * If no row exists with id=1, inserts the default seed data.
 */
export async function initializePortfolioData(): Promise<void> {
  if (!isSupabaseConfigured) {
    return;
  }

  const data = await loadPortfolioData();
  if (!data) {
    await savePortfolioData(defaultPortfolioData);
  }
}
