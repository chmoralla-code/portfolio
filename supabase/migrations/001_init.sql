-- Portfolio Data Table
-- Stores all portfolio content as a single JSONB document

CREATE TABLE IF NOT EXISTS portfolio_data (
  id INTEGER PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;

-- Create a permissive policy for all operations
-- Customize this for stricter access control if needed
CREATE POLICY "Allow all" ON portfolio_data
  FOR ALL USING (true) WITH CHECK (true);

-- Insert default seed data (id = 1)
INSERT INTO portfolio_data (id, data, updated_at)
VALUES (1, '{
  "profile": {
    "name": "Alex Developer",
    "title": "Full-Stack Engineer",
    "tagline": "I build scalable web apps and delightful user experiences.",
    "profilePhoto": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    "resumeUrl": "#"
  },
  "about": "I am a passionate full-stack developer with 5+ years of experience building modern web applications. I specialize in React, Node.js, and cloud technologies. I love solving complex problems and creating intuitive user interfaces. When I am not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying the outdoors.",
  "skills": [
    {"id":"1","name":"React","category":"Frontend","level":95},
    {"id":"2","name":"TypeScript","category":"Frontend","level":90},
    {"id":"3","name":"Next.js","category":"Frontend","level":92},
    {"id":"4","name":"Tailwind CSS","category":"Frontend","level":88},
    {"id":"5","name":"Node.js","category":"Backend","level":85},
    {"id":"6","name":"PostgreSQL","category":"Backend","level":80},
    {"id":"7","name":"MongoDB","category":"Backend","level":78},
    {"id":"8","name":"Docker","category":"DevOps","level":75},
    {"id":"9","name":"AWS","category":"DevOps","level":72},
    {"id":"10","name":"Git","category":"Tools","level":90},
    {"id":"11","name":"Figma","category":"Design","level":70},
    {"id":"12","name":"Python","category":"Backend","level":82}
  ],
  "projects": [
    {
      "id": "1",
      "title": "E-Commerce Platform",
      "description": "A full-featured online store with real-time inventory and payment processing.",
      "longDescription": "Built a scalable e-commerce platform handling 10k+ daily users. Features include real-time inventory tracking, Stripe payment integration, admin dashboard, and responsive design.",
      "technologies": ["Next.js","TypeScript","Stripe","PostgreSQL"],
      "imageUrl": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
      "demoUrl": "#",
      "repoUrl": "#",
      "featured": true
    },
    {
      "id": "2",
      "title": "Task Management App",
      "description": "Collaborative task manager with real-time updates and team workspaces.",
      "longDescription": "A Trello-like task management application with drag-and-drop functionality, real-time collaboration via WebSockets, and team workspace management.",
      "technologies": ["React","Node.js","Socket.io","MongoDB"],
      "imageUrl": "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&h=500&fit=crop",
      "demoUrl": "#",
