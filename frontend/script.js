// 🌸 FLOW
setTimeout(() => {
  welcome.style.display = "none";
  loading.classList.remove("hidden");
  setTimeout(() => {
    loading.classList.add("hidden");
    app.classList.remove("hidden");
  }, 1500);
}, 1500);

// 🔐 TELEGRAM LOGIN
let userId = "guest";
if (window.Telegram?.WebApp) {
  const user = Telegram.WebApp.initDataUnsafe.user;
  if (user) userId = user.id;
}

// 🎧 QUEUE
let queue = [];

// 🚫 FILTER
const banned = ["sex","porn","xxx","drugs"];
const safe = t => !banned.some(w => t.toLowerCase().includes(w));

// 🔍 SEARCH
async function searchSongs() {
  const q = searchInput.value;

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=video&safeSearch=strict&key=YOUR_API_KEY`
  );

  const data = await res.json();

  results.innerHTML = "";

  data.items.forEach(v => {
    if (!safe(v.snippet.title)) return;

    const id = v.id.videoId;

    results.innerHTML += `
      <div class="song">
        <p>${v.snippet.title}</p>
        <button onclick="playSong('${id}','${v.snippet.title}')">▶️</button>
        <button onclick="addQueue('${id}')">➕ Queue</button>
      </div>
    `;
  });
}

// ▶️ PLAY
function playSong(id, title) {
  player.innerHTML = `
    <iframe width="100%" height="200"
    src="https://www.youtube.com/embed/${id}?autoplay=1"></iframe>
  `;
  addHistory(id);
  getLyrics(title);
}

// 🎧 QUEUE SYSTEM
function addQueue(id) {
  queue.push(id);
  renderQueue();
}

function renderQueue() {
  queueDiv = document.getElementById("queue");
  queueDiv.innerHTML = queue.map(id =>
    `<p onclick="playSong('${id}','')">${id}</p>`
  ).join("");
}

// 🎤 VOICE SEARCH
function startVoice() {
  const rec = new webkitSpeechRecognition();
  rec.onresult = e => {
    searchInput.value = e.results[0][0].transcript;
    searchSongs();
  };
  rec.start();
}

// 🎶 LYRICS (free API)
async function getLyrics(title) {
  try {
    const res = await fetch(`https://api.lyrics.ovh/v1/${title}`);
    const data = await res.json();
    lyrics.innerText = data.lyrics || "No lyrics found";
  } catch {
    lyrics.innerText = "Lyrics not available";
  }
}

// 🧠 RECOMMENDATION
function recommend() {
  if (!queue.length) return;
  searchSongs(queue[0]);
}

// 🕓 HISTORY (BACKEND)
async function addHistory(song) {
  await fetch("http://localhost:3000/history", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ userId, song })
  });
}
