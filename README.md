# Nirp — Portfolio Website

## Setup

### 1. Install Node.js
Download and install from https://nodejs.org (choose the LTS version)

### 2. Install dependencies

Open a terminal in the `portfolio` folder:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Run the app

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
```
Runs on http://localhost:5000

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
```
Opens on http://localhost:5173

---

## Customize Your Content

All data is in `server/data/` — edit these JSON files to update the site without touching any code:

| File | What it controls |
|------|-----------------|
| `server/data/projects.json` | Your projects + metrics |
| `server/data/skills.json` | Your skill categories |
| `server/data/experience.json` | Work history |

## Project Structure

```
portfolio/
├── server/           # Node.js + Express API
│   ├── data/         # JSON content files (edit these!)
│   ├── routes/       # API route handlers
│   └── index.js      # Server entry point
└── client/           # React frontend
    └── src/
        ├── components/   # Hero, About, Skills, Projects, Experience, Contact
        ├── hooks/        # useApi.js — fetch wrapper
        └── App.jsx
```
