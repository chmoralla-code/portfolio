# Portfolio Website with Admin Dashboard

A modern, responsive, fully editable personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and **Supabase**. Features a public-facing portfolio and a protected admin dashboard with full CRUD capabilities.

## Features

- **Public Portfolio**: Hero, About, Skills, Projects, Experience, and Contact sections
- **Admin Dashboard**: Edit all portfolio content via a protected admin interface
- **Authentication**: Secure admin login with cookie-based session tokens
- **Responsive Design**: Mobile-first monochrome design with subtle motion
- **Persistent Storage**: PostgreSQL database via Supabase (data survives serverless cold starts)
- **Vercel Ready**: Configured for easy deployment to Vercel

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Auth**: bcryptjs + custom token verification
- **Deployment**: Vercel

## Installation

1. Clone or download the project:
```bash
cd claude-bot
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```
Fill in your Supabase credentials (see Supabase Setup below).

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Login

1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Use the default credentials:
   - **Username**: `admin`
   - **Password**: `admin1234`

The admin dashboard lets you edit:
- Profile (name, title, tagline, photo, resume URL)
- About / Bio text
- Skills (add, edit, delete with proficiency levels)
- Projects (add, edit, delete with images, links, technologies)
- Experience (add, edit, delete work history entries)
- Contact info and social links
- Site settings (site name, hero background, accent color, section headings/subtitles)

## Supabase Setup

1. Create a free Supabase project at [https://supabase.com](https://supabase.com)

2. Go to the **SQL Editor** in your Supabase dashboard and run:

```sql
CREATE TABLE portfolio_data (
  id INTEGER PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow all operations (customize for your needs)
CREATE POLICY "Allow all" ON portfolio_data
  FOR ALL USING (true) WITH CHECK (true);
```

3. Get your project credentials:
   - Go to **Project Settings** > **API**
   - Copy `Project URL` → `SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_URL`
   - Copy `service_role` secret → `SUPABASE_SERVICE_ROLE_KEY`
   - Copy `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Add these to your `.env.local` file.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Supabase project URL (server-side) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only!) |
| `NEXT_PUBLIC_SUPABASE_URL` | Same URL, exposed to browser |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key (browser-safe) |
| `ADMIN_USERNAME` | Admin dashboard username |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash of admin password |

Generate a bcrypt hash:
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-password', 10));"
```

## Vercel Deployment

1. Push your code to GitHub/GitLab/Bitbucket.

2. Import your repository in Vercel:
   - Go to [https://vercel.com/new](https://vercel.com/new)
   - Select your repository

3. Configure environment variables in Vercel:
   - Go to **Project Settings** > **Environment Variables**
   - Add all variables from `.env.local.example`

4. Deploy! Vercel will build and host your site automatically.

## Fallback Behavior

If Supabase is not configured, the app gracefully falls back to:
- In-memory data storage (resets on serverless cold start)
- JSON file persistence (works in local development)

This ensures the app always works, but **Supabase is strongly recommended for production** to persist data across deployments.

## Project Structure

```
claude-bot/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts    # Admin login
│   │   │   │   ├── logout/route.ts   # Admin logout
│   │   │   │   └── me/route.ts       # Verify session
│   │   │   └── portfolio/route.ts    # Get/update portfolio data
│   │   ├── admin/
│   │   │   ├── login/page.tsx        # Login form
│   │   │   ├── layout.tsx            # Admin shell with sidebar
│   │   │   ├── page.tsx              # Dashboard overview
│   │   │   ├── profile/page.tsx      # Edit profile
│   │   │   ├── about/page.tsx        # Edit bio
│   │   │   ├── skills/page.tsx       # CRUD skills
│   │   │   ├── projects/page.tsx     # CRUD projects
│   │   │   ├── experience/page.tsx   # CRUD experience
│   │   │   └── contact/page.tsx      # Edit contact & socials
│   │   ├── globals.css               # Global styles & Tailwind utilities
│   │   ├── layout.tsx                # Root layout with AuthProvider
│   │   └── page.tsx                  # Public portfolio page
│   ├── components/
│   │   ├── hero.tsx                  # Hero section
│   │   ├── about-section.tsx         # About section
│   │   ├── skills-section.tsx        # Skills section
│   │   ├── projects-section.tsx      # Projects section
│   │   ├── experience-section.tsx    # Experience timeline
│   │   └── contact-section.tsx       # Contact section
│   └── lib/
│       ├── types.ts                  # TypeScript interfaces
│       ├── data.ts                   # Data persistence layer (Supabase + fallback)
│       ├── supabase.ts               # Server-side Supabase client
│       ├── supabase-client.ts        # Browser-side Supabase client
│       ├── db-init.ts                # Database seeding
│       ├── auth.ts                   # Password & token utilities
│       └── auth-context.tsx          # React auth context
├── data/
│   ├── .gitkeep                      # Keeps directory in git
│   └── portfolio.json                # Local dev fallback data
├── public/                           # Static assets
├── next.config.ts                    # Next.js configuration
├── .env.local.example                # Environment variable template
└── package.json
```

## Security Notes

- Default demo credentials are **only** for local development
- Production credentials must be set via environment variables
- Admin routes are protected with cookie-based token verification
- No sensitive credentials are exposed in the frontend
- Use **service_role key only server-side** — never expose it to the browser

## Customization

- Edit `src/lib/data.ts` to change the default seed data
- Modify `src/app/globals.css` to adjust colors and styling
- Add new sections by creating components in `src/components/` and importing them in `src/app/page.tsx`

## License

MIT
