# Threadly — Frontend

A React frontend for Threadly, a Reddit-style community platform. Talks to the [Threadly API](https://github.com/your-username/threadly-backend) over REST.

**Live app:** https://threadly-frontend-nine.vercel.app
**Backend repo:** https://github.com/ArlanSul/threadly-backend

## Features

- JWT-based auth (register / login / logout), persisted across page reloads
- Community feed with search, filtering, and sorting (newest / top)
- Post detail view with a fully recursive nested comment tree
- Reply-to-any-comment, at any depth
- Optimistic-UI upvote/downvote on both posts and comments (instant visual feedback, rolls back on request failure)
- Create posts into an existing community, or create a new community inline from the same form
- Client-side routing with protected actions (e.g. "log in to comment")

## Tech Stack

- React 18 + Vite
- `react-router-dom` for client-side routing
- `axios` with a request interceptor for automatic JWT attachment
- React Context for global auth state
- Deployed on Vercel

## Setup (local development)

Requires the [backend](https://github.com/ArlanSul/threadly-backend) running locally too (or point `VITE_API_URL` at the deployed backend).

```bash
git clone https://github.com/your-username/threadly-frontend.git
cd threadly-frontend
npm install

cp .env.example .env.local
# .env.local:
# VITE_API_URL=http://127.0.0.1:8000/api

npm run dev
```

App runs at `http://localhost:5173`.

## Environment Variables

| Variable | Description | Local default |
|---|---|---|
| `VITE_API_URL` | Base URL of the Threadly API | `http://127.0.0.1:8000/api` |

## Project Structure

```
src/
  api/            axios instance + one file per resource (auth, posts, communities)
  context/        global auth state (context object, provider, and hook in separate files)
  components/     reusable, presentational pieces (PostCard, Comment, VoteButtons, Navbar)
  pages/          route-level components (HomePage, PostDetailPage, LoginPage, etc.)
  App.jsx         route definitions
  main.jsx        app entry point, wraps App in Router + AuthProvider
```

## Notable Engineering Decisions

- **Recursive `Comment` component** mirrors the backend's self-referencing comment model — each comment renders itself for every reply, with depth-based indentation, so the UI naturally supports unlimited nesting with no special-case code.
- **Optimistic voting:** `VoteButtons` updates its local score/vote state immediately on click, before the API call resolves, and rolls back if the request fails — this is what makes voting feel instant instead of laggy. The optimistic math (toggle vs. switch vs. new vote) mirrors the backend's vote-toggle logic exactly.
- **Auth split across three files** (`context.js`, `AuthContext.jsx`, `useAuth.js`) — keeps the context object, the provider component, and the consuming hook each in their own file, which is required for Vite's Fast Refresh to track components correctly and is also the standard pattern in most production React codebases.
- **Data-fetching kept out of presentational components** — components like `PostCard` and `Comment` only receive data via props; all `axios` calls live in `src/api/`, so swapping or mocking the data layer never touches UI code.

## Known Tradeoffs / What I'd Improve With More Time

- JWTs are stored in `localStorage` for simplicity — a production app handling sensitive data would use httpOnly cookies to reduce XSS exposure
- No pagination UI yet for the post feed (backend already paginates; frontend just requests page 1)
- Comment replies trigger a full post re-fetch rather than a local state merge — simpler and always correct, but not as instant as the optimistic voting pattern
- No loading skeletons — currently plain "Loading..." text
- No automated frontend tests yet (React Testing Library would be the next addition)

## Screenshots

<img width="1512" height="864" alt="Screenshot 2026-07-23 at 4 01 39 AM" src="https://github.com/user-attachments/assets/496204ad-4c6a-4fac-b7ef-90c94c92ad6a" />
<img width="1512" height="859" alt="Screenshot 2026-07-23 at 4 01 52 AM" src="https://github.com/user-attachments/assets/1a0111e8-a46c-40a9-9a04-934328eb93d2" />
<img width="1512" height="860" alt="Screenshot 2026-07-23 at 4 02 04 AM" src="https://github.com/user-attachments/assets/22f2bdee-a107-44e9-a002-ceea095efcd9" />


## License

MIT
