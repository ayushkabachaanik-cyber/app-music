# 🎵 RADHA MUSIC

A modern music streaming web app with Telegram authentication, YouTube integration, lyrics display, and a beautiful dark theme.

## ✨ Features

- 🔍 **YouTube Search** - Search millions of songs with safe content filtering
- 🎤 **Voice Search** - Search using voice commands
- 🎧 **Queue Management** - Create and manage playlists on the fly
- 🎶 **Live Lyrics** - Display song lyrics in real-time
- 🔐 **Telegram Auth** - Login with Telegram ID (no password needed)
- 💾 **History Tracking** - Keeps track of your played songs
- 🎬 **Auto Thumbnails** - YouTube video thumbnails for every song
- ✨ **Smooth Animations** - Beautiful slide-in, fade-in, and pulse animations
- 🎵 **Native Audio Player** - No iFrame, just pure HTML5 audio
- 💫 **Glassmorphic UI** - Modern dark theme with blur effects

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **APIs:** YouTube API v3, Lyrics.ovh
- **Auth:** Telegram WebApp API
- **Deployment:** Vercel-ready

## 📋 Prerequisites

- Node.js (v14+)
- Python 3 (for local frontend server)
- MongoDB Atlas account
- YouTube API Key
- Telegram Bot Token (optional)

## 🚀 Quick Start (Local)

### 1. Clone & Setup
```bash
git clone <repo-url>
cd app-music
```

### 2. Set Environment Variables
Create `.env` file in the root:
```env
MONGODB_URI=mongodb+srv://rj5706603:O95nvJYxapyDHfkw@cluster0.fzmckei.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
YOUTUBE_API_KEY=AIzaSyAJwGWTd-xoRRZLaA-fL9naZJ7d7Ufqebg
TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
PORT=3000
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
```

### 4. Start Backend & Frontend

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Runs on http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
python3 -m http.server 8000
# Runs on http://localhost:8000
```

### 5. Open in Browser
Visit: **http://localhost:8000**

## 🔐 Authentication

### Telegram Login
The app supports two authentication methods:

1. **Telegram WebApp** - Direct login from Telegram bot
2. **Guest Login** - Test the app without Telegram

When logged in via Telegram, the app automatically:
- Fetches user's first name, last name, username
- Creates/updates user profile in MongoDB
- Tracks play history
- Stores favorites

## 🌐 Deployment on Vercel

### 1. Connect Repository
```bash
npm install -g vercel
vercel
```

### 2. Set Environment Variables
In Vercel Dashboard:
- Add `MONGODB_URI`
- Add `YOUTUBE_API_KEY`
- Add `TELEGRAM_BOT_TOKEN`

### 3. Configure Vercel
The `vercel.json` is already configured:
- Backend: Node.js on `/api`
- Frontend: Static files on `/`

### 4. Deploy
```bash
vercel --prod
```

## 📱 API Endpoints

### Authentication
- `POST /auth/telegram` - Login with Telegram ID
  ```json
  {
    "telegramId": "123456",
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "photoUrl": "..."
  }
  ```

### History
- `GET /history/:telegramId` - Get user's play history
- `POST /history` - Save a played song
  ```json
  {
    "telegramId": "123456",
    "song": {
      "id": "dQw4w9WgXcQ",
      "title": "Never Gonna Give You Up"
    }
  }
  ```

### Favorites
- `GET /favorites/:telegramId` - Get favorite songs
- `POST /favorites/add` - Add song to favorites

### User
- `GET /user/:telegramId` - Get user profile

## 🎨 Customization

### Change Colors
Edit `frontend/style.css`:
```css
--primary: #1db954;  /* Change primary color */
--dark-bg: #0f0f0f;  /* Change background */
```

### Add More APIs
Update `backend/server.js` to add:
- Spotify API integration
- Apple Music integration
- Custom playlist system

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify `MONGODB_URI` in `.env`
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0)
- Test connection: `mongosh "your-uri"`

### YouTube API Issues
- Verify API key is enabled for YouTube v3
- Check you haven't exceeded daily quota (10,000 requests)
- Try searching for a different query

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

### CORS Errors
- Backend CORS is configured to accept all origins
- If issues persist, update `backend/server.js`:
```javascript
app.use(cors({
  origin: "https://your-domain.com"
}));
```

## 📚 Project Structure

```
app-music/
├── backend/
│   ├── server.js           # Express server & API routes
│   ├── package.json        # Node dependencies
│   └── node_modules/
├── frontend/
│   ├── index.html          # Main HTML
│   ├── script.js           # All JavaScript logic
│   ├── style.css           # All styles & animations
│   └── package.json
├── .env                    # Environment variables
├── vercel.json            # Vercel deployment config
└── README.md
```

## 🔒 Security Notes

- API keys are stored in `.env` (never commit this!)
- MongoDB credentials in `.env` are not exposed to frontend
- YouTube API key is used client-side (consider server proxy for production)
- CORS enabled for all origins (restrict in production)

## 📄 License

Open source - feel free to use and modify!

## 💬 Support

For issues or questions:
1. Check `backend/server.js` logs
2. Check browser console errors
3. Verify `.env` file has all required variables
4. Test API endpoints with Postman

---

**Made with ❤️ by Radha Music Team**
