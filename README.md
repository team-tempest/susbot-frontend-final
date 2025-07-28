#  SusBot Frontend – Web3 Safety Scanner (Next.js)

SusBot is an AI-powered Web3 safety scanner that helps users instantly check the trust level of crypto wallet addresses, tokens, and smart contracts. This repository contains the frontend of SusBot, built with **Next.js** and integrated with an **ICP-hosted Rust backend**.

>  “Think of it like antivirus — but for the blockchain.”


## Overview

The frontend provides a smooth, responsive UI where users can:

- Paste any Ethereum address or token contract
- Click **Scan Now**
- Instantly receive:
  - A **trust score (0–100)**
  - A **verdict** ("Safe", "Moderate", "High Risk")
  - A list of risks and bonuses
  - A **plain-English AI explanation**

All data is fetched from the ICP backend canister, which runs security checks and calls the OpenAI API for summary generation.


## 🧱 Tech Stack

| Layer         | Tech            |
|---------------|-----------------|
| Frontend      | [Next.js](https://nextjs.org/) |
| Styling       | Tailwind CSS    |
| State Mgmt    | React Context API |
| Backend API   | ICP Rust Canister (HTTP outcalls to Etherscan, OpenAI) |
| Deployment    | Internet Computer (via DFX + Asset Canister) |


## ⚙️ Setup & Local Development

### 1. Clone the Repo

```bash
git clone https://github.com/your-org/susbot-frontend-final.git
cd susbot-frontend-final
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Create Environment File

Copy `.env.example` → `.env.local` and fill in:

```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend-canister-id.icp0.io
```

### 4. Run the Dev Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)


## 🌍 Integration Flow

```text
User → Next.js UI → ICP Rust Canister → Etherscan & OpenAI → JSON Results → Rendered in Dashboard
```

* Backend performs:

  * Risk heuristics
  * Score calculation
  * AI summary generation
* Frontend parses structured JSON and shows score, verdict, risks, and AI output.


## 📜 License

MIT License — free to use, fork, modify, and contribute.

