const CONFIG = {
  bookingUrl: "https://book.squareup.com/appointments/fmq60xo7tefxn9/location/LDASSRJMBXEFB/services?buttonTextColor=ffffff&color=000000&locale=en&referrer=so&team_member_id=TMlT9jP4nBm4KwH1",
  mixMasterUrl: "",

  // Edit these 10 beats however you want.
  // Put tagged MP3 previews in assets/audio/
  // Put cover images in assets/beats/ if you want custom artwork.
  beats: [
    {
      id: "beat1",
      title: "vennie [plugg]",
      producer: "@_jayy.wav",
      bpm: "151",
      key: "—",
      price: "$50",
      audio: "assets/audio/beat-01-preview.mp3",
      cover: "",
      leaseUrl: "https://payhip.com/b/d0PDW"
    },
    {
      id: "beat2",
      title: "Beat Title 02",
      producer: "jayy.wav",
      bpm: "152",
      key: "F MIN",
      price: "$30",
      audio: "assets/audio/beat-02-preview.mp3",
      cover: "",
      leaseUrl: ""
    },
    {
      id: "beat3",
      title: "Beat Title 03",
      producer: "jayy.wav",
      bpm: "128",
      key: "A MIN",
      price: "$30",
      audio: "assets/audio/beat-03-preview.mp3",
      cover: "",
      leaseUrl: ""
    },
    {
      id: "beat4",
      title: "Beat Title 04",
      producer: "jayy.wav",
      bpm: "145",
      key: "D MIN",
      price: "$30",
      audio: "assets/audio/beat-04-preview.mp3",
      cover: "",
      leaseUrl: ""
    },
    {
      id: "beat5",
      title: "Beat Title 05",
      producer: "jayy.wav",
      bpm: "136",
      key: "G MIN",
      price: "$30",
      audio: "assets/audio/beat-05-preview.mp3",
      cover: "",
      leaseUrl: ""
    },
    {
      id: "beat6",
      title: "Beat Title 06",
      producer: "jayy.wav",
      bpm: "150",
      key: "E MIN",
      price: "$30",
      audio: "assets/audio/beat-06-preview.mp3",
      cover: "",
      leaseUrl: ""
    },
    {
      id: "beat7",
      title: "Beat Title 07",
      producer: "jayy.wav",
      bpm: "132",
      key: "B MIN",
      price: "$30",
      audio: "assets/audio/beat-07-preview.mp3",
      cover: "",
      leaseUrl: ""
    },
    {
      id: "beat8",
      title: "Beat Title 08",
      producer: "jayy.wav",
      bpm: "158",
      key: "F# MIN",
      price: "$30",
      audio: "assets/audio/beat-08-preview.mp3",
      cover: "",
      leaseUrl: ""
    },
    {
      id: "beat9",
      title: "Beat Title 09",
      producer: "jayy.wav",
      bpm: "124",
      key: "C MIN",
      price: "$30",
      audio: "assets/audio/beat-09-preview.mp3",
      cover: "",
      leaseUrl: ""
    },
    {
      id: "beat10",
      title: "Beat Title 10",
      producer: "jayy.wav",
      bpm: "142",
      key: "A# MIN",
      price: "$30",
      audio: "assets/audio/beat-10-preview.mp3",
      cover: "",
      leaseUrl: ""
    }
  ]
};

document.querySelectorAll('a[href="https://jayywav.square.site/"]').forEach(a => {
  a.href = CONFIG.bookingUrl;
});

const formatTime = seconds => {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};

const beatStore = document.getElementById("beatStore");
let activeAudio = null;
let activeRow = null;

const beatRowMarkup = (beat, index) => {
  const cover = beat.cover
    ? `<img src="${beat.cover}" alt="${beat.title} cover art">`
    : `<span>${String(index + 1).padStart(2, "0")}</span>`;

  return `
    <article class="beat-row" data-beat="${beat.id}">
      <button class="beat-play" type="button" aria-label="Play ${beat.title}">
        <span class="play-icon">▶</span>
      </button>

      <div class="beat-track">
        <div class="beat-cover">${cover}</div>
        <div class="beat-meta">
          <h3>${beat.title}</h3>
          <p>${beat.producer}</p>
          <div class="mobile-wave">
            <input class="beat-progress" type="range" min="0" max="100" value="0" aria-label="${beat.title} progress">
            <div class="time-row"><span class="current-time">0:00</span><span class="duration">0:00</span></div>
          </div>
        </div>
      </div>

      <div class="beat-info">
        <span>${beat.bpm} BPM</span>
        <span>${beat.key}</span>
      </div>

      <div class="beat-price">
        <small>LEASE FROM</small>
        <strong>${beat.price}</strong>
      </div>

      <a class="btn btn-small beat-buy" href="${beat.leaseUrl || "#"}">LEASE</a>

      <div class="beat-wave desktop-wave">
        <input class="beat-progress" type="range" min="0" max="100" value="0" aria-label="${beat.title} progress">
        <div class="time-row"><span class="current-time">0:00</span><span class="duration">0:00</span></div>
      </div>

      <audio preload="metadata" src="${beat.audio}"></audio>
    </article>
  `;
};

if (beatStore) {
  CONFIG.beats.forEach((beat, index) => {
    beatStore.insertAdjacentHTML("beforeend", beatRowMarkup(beat, index));
  });

  beatStore.querySelectorAll(".beat-row").forEach((row, index) => {
    const beat = CONFIG.beats[index];
    const audio = row.querySelector("audio");
    const playBtn = row.querySelector(".beat-play");
    const icon = row.querySelector(".play-icon");
    const progressBars = row.querySelectorAll(".beat-progress");
    const currentLabels = row.querySelectorAll(".current-time");
    const durationLabels = row.querySelectorAll(".duration");
    const buyBtn = row.querySelector(".beat-buy");

    if (beat.leaseUrl) {
      buyBtn.target = "_blank";
      buyBtn.rel = "noopener";
    } else {
      buyBtn.addEventListener("click", e => {
        e.preventDefault();
        alert("Add this beat's Square lease payment link in script.js.");
      });
    }

    const setPlayingUI = playing => {
      icon.textContent = playing ? "Ⅱ" : "▶";
      row.classList.toggle("is-playing", playing);
      playBtn.setAttribute("aria-label", `${playing ? "Pause" : "Play"} ${beat.title}`);
    };

    playBtn.addEventListener("click", async () => {
      if (activeAudio && activeAudio !== audio) {
        activeAudio.pause();
        if (activeRow) {
          activeRow.querySelector(".play-icon").textContent = "▶";
          activeRow.classList.remove("is-playing");
        }
      }

      if (audio.paused) {
        try {
          await audio.play();
          activeAudio = audio;
          activeRow = row;
          setPlayingUI(true);
        } catch (err) {
          alert(`Add ${beat.audio} to your repository, then try again.`);
        }
      } else {
        audio.pause();
        setPlayingUI(false);
      }
    });

    audio.addEventListener("loadedmetadata", () => {
      durationLabels.forEach(label => label.textContent = formatTime(audio.duration));
    });

    audio.addEventListener("timeupdate", () => {
      const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
      progressBars.forEach(bar => {
        bar.value = pct;
        bar.style.setProperty("--played", `${pct}%`);
      });
      currentLabels.forEach(label => label.textContent = formatTime(audio.currentTime));
    });

    audio.addEventListener("ended", () => setPlayingUI(false));

    progressBars.forEach(bar => {
      bar.addEventListener("input", () => {
        if (!audio.duration) return;
        const pct = Number(bar.value);
        audio.currentTime = (pct / 100) * audio.duration;
        bar.style.setProperty("--played", `${pct}%`);
      });
    });
  });
}

const mixBtn = document.querySelector('[data-placeholder="mix"]');
if (mixBtn) {
  if (CONFIG.mixMasterUrl) {
    mixBtn.href = CONFIG.mixMasterUrl;
    mixBtn.target = "_blank";
    mixBtn.rel = "noopener";
  } else {
    mixBtn.addEventListener("click", e => {
      e.preventDefault();
      alert("Add your Mix & Master Square payment link in script.js.");
    });
  }
}




const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

document.getElementById("year").textContent = new Date().getFullYear();
