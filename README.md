# GymBuddy

GymBuddy is a Next.js 15 AI gym and diet planner with React, Next.js API routes, Prisma, PostgreSQL, NextAuth Credentials authentication, Recharts, Framer Motion, React Hook Form, Zod, Lucide icons, and optional OpenAI chat.

## Run Locally

1. Copy `.env.example` to `.env` and update `DATABASE_URL` and `NEXTAUTH_SECRET` for your local PostgreSQL database.
2. Install dependencies:

```bash
npm install
```

3. Create database tables and seed demo data:

```bash
npm run db:push
npm run db:seed
```

4. Start the app:

```bash
npm run dev
```

Demo login after seeding:

- Email: `demo@gymbuddy.app`
- Password: `GymBuddy123!`

OpenAI is optional. If `OPENAI_API_KEY` is empty, the chatbot returns a local fitness-coach response.

Authentication uses email and password only. Signup, login, forgot password, and protected pages are handled by Next.js API routes and NextAuth.
