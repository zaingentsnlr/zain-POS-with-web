# ☁️ How to Deploy Zain POS to Render

Follow this guide to host your Dashboard and API on the cloud using Render.

## ⚠️ Important Warning
Since we are using a local database inside the project (`pos.db`), **your data will reset every time the server restarts** on the free plan.
- To keep data permanently, you need a **Render Disk** (Paid) or a **PostgreSQL Database**.
- For now, this guide sets up the **Free Version** (Good for testing).

---

## Phase 1: Prepare & Push Code

1. **Create a GitHub Account** at [github.com](https://github.com)
2. **Create a New Repository** named `zain-pos`.
3. **Push your code**:
   - Open your project folder.
   - Run these commands in your terminal:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/zain-pos.git
     git push -u origin main
     ```
   *(Replace `YOUR_USERNAME` with your actual GitHub username)*

---

## Phase 2: Deploy Backend (API)

1. **Log in to Render** at [render.com](https://render.com).
2. Click **New +** -> **Web Service**.
3. Connect your **GitHub** account and select the `zain-pos` repository.
4. **Configure the Service**:
   - **Name**: `zain-pos-api`
   - **Root Directory**: `zain-pos-api`  (⚠️ Important)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. **Scroll down to "Environment Variables"** and add these:
   - `DATABASE_URL` = `file:./pos.db`
   - `JWT_SECRET` = `supersecretkey123`
   - `CORS_ORIGIN` = `*`
   - `NODE_VERSION` = `20.11.0`

6. Click **Create Web Service**.
7. ⏳ Wait for it to deploy. Once finished, copy the **URL** (e.g., `https://zain-pos-api.onrender.com`).

---

## Phase 3: Deploy Frontend (Dashboard)

1. Go to **Dashboard** -> **New +** -> **Static Site**.
2. Select the same `zain-pos` repository.
3. **Configure the Service**:
   - **Name**: `zain-pos-dashboard`
   - **Root Directory**: `zain-pos-dashboard` (⚠️ Important)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Add Environment Variables**:
   - `VITE_API_URL` = Paste your API URL from Phase 2 (e.g., `https://zain-pos-api.onrender.com`)

5. click **Create Static Site**.

---

## Phase 4: Fix "Page Not Found" Errors

Since this is a Single Page App (SPA), we need to tell Render to always serve `index.html`.

1. Go to your **zain-pos-dashboard** service on Render.
2. Click **Redirects/Rewrites** on the left menu.
3. Add a new rule:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`
4. Click **Save Changes**.

---

## ✅ You're Done!
Open your **Dashboard URL** (e.g., `https://zain-pos-dashboard.onrender.com`).
Login with:
- **User**: `admin`
- **Pass**: `admin123`

*(Note: If login fails, your cloud database is empty. You need to register a new user via API or Seed the database.)*
