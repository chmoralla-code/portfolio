# Deploy-Ready for Vercel + Supabase

## Todo

- [x] 1. Create TODO.md tracking file
- [x] 2. Remove Netlify config (`netlify.toml`)
- [x] 3. Update `package.json` — remove `@netlify/plugin-nextjs`, add `@supabase/supabase-js`
- [x] 4. Update `next.config.ts` for Vercel
- [x] 5. Create `src/lib/supabase.ts` — server-side Supabase client
- [x] 6. Create `src/lib/supabase-client.ts` — browser-side Supabase client
- [x] 7. Rewrite `src/lib/data.ts` — use Supabase PostgreSQL with local fallback
- [x] 8. Create `src/lib/db-init.ts` — seed/initialize portfolio data
- [x] 9. Update `src/app/api/portfolio/route.ts` — initialize data on first load
- [x] 10. Create `.env.local.example`
- [x] 11. Update `README.md` with Vercel + Supabase deployment instructions
- [x] 12. Install dependencies (`npm install`)

