# Gothic About Me Image Generation API

A production-ready Node.js & Express API that generates a Gothic "About Me" template image with user information composited over the template using **Sharp** and high-quality SVG text overlay rendering with **Pirata One** gothic font.

The API endpoint returns a **direct PNG binary image** (`Content-Type: image/png`) that displays directly in any web browser, `<img>` tag, or markdown document.

---

## 🚀 Features

- **Direct PNG Image Output**: `GET /api/about-me` returns raw `image/png` binary buffer directly. No JSON, no HTML wrapper.
- **Embedded Pirata One Typography**: Renders all labels and text in authentic **Pirata One** gothic font.
- **Interactive Documentation**: Available directly at `/docs` on your deployed site.
- **Server-Side Sharp Processing**: Composites SVG text overlays directly onto the template image.
- **Auto Text Fitting & Font Scaling**: Dynamically adjusts font size to prevent long text from overflowing field boundaries.
- **Input Sanitization & XML Escaping**: Full protection against XML injection and unsafe characters.
- **In-Memory Caching**: Parameter hash-based cache returns cached PNG buffers instantly for repeated requests.
- **Health Check Endpoint**: Includes `/health` endpoint returning `200 OK` for deployment monitoring.
- **Render.com Ready**: Includes `render.yaml` for error-free 1-click deployment on Render.com.

---

## 🌐 Live Pages & Routes

- **Live Playground**: `/`
- **Interactive API Documentation**: `/docs`
- **Direct Image API**: `/api/about-me?name=PIASH&age=17...`
- **Health Check**: `/health`

---

## 📋 API Endpoint

### `GET /api/about-me`

#### Query Parameters

| Parameter | Template Field | Max Length | Example |
| :--- | :--- | :--- | :--- |
| `name` | Name | 50 | `PIASH` |
| `age` | Age | 10 | `17` |
| `location` | Location | 80 | `GAZIPUR` |
| `religion` | Religion | 40 | `Islam` |
| `relationship` | Relationship | 80 | `Single` |
| `height` / `hight` | Height | 20 | `5'0` |
| `birthday` | Birthday | 60 | `November 15` |
| `bestie` | Bestie | 60 | `Moon` |

---

## 🌐 Render.com Deployment Guide

1. Push this repository to GitHub.
2. Go to [Render.com](https://render.com) and create a **New Web Service**.
3. Connect your repository.
4. Set the following settings:
   - **Runtime**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/health`
   - **Environment Variable**: `NODE_ENV=production`
5. Click **Deploy**!

