# Deploying Sanity Studio

Studio is live at **https://j471n-blog.sanity.studio/**

---

## First-time setup

Install the Sanity CLI globally (only needed once):

```bash
npm i @sanity/cli -g
```

Log in with your Google account:

```bash
sanity login
```

---

## Deploy

Run this from the `sanity/` folder whenever you make schema changes:

```bash
cd sanity
sanity deploy
```

---

## Local dev

```bash
cd sanity
sanity dev
```

Opens the studio at `http://localhost:3333`.

---

## Notes

- **Schema changes** (adding/editing fields) → `sanity deploy`
- **Content changes** (adding/editing entries) → just hit **Publish** in the studio, no deploy needed
- **Site updates automatically** — Next.js picks up new content within 5 minutes (ISR)
