const CONFIG = {
  bookingUrl: "#request",
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
      leaseUrl: "https://payhip.com/b/d0PDW",
      licenseUrls: { mp3: "https://payhip.com/b/d0PDW", wav: "", trackouts: "", unlimited: "" }
    },
    {
      id: "beat2",
      title: "Beat Title 02",
      producer: "jayy.wav",
      bpm: "152",
      key: "F MIN",
      price: "$50",
      audio: "assets/audio/beat-02-preview.mp3",
      cover: "",
      leaseUrl: "",
      licenseUrls: { mp3: "", wav: "", trackouts: "", unlimited: "" }
    },
    {
      id: "beat3",
      title: "Beat Title 03",
      producer: "jayy.wav",
      bpm: "128",
      key: "A MIN",
      price: "$50",
      audio: "assets/audio/beat-03-preview.mp3",
      cover: "",
      leaseUrl: "",
      licenseUrls: { mp3: "", wav: "", trackouts: "", unlimited: "" }
    },
    {
      id: "beat4",
      title: "Beat Title 04",
      producer: "jayy.wav",
      bpm: "145",
      key: "D MIN",
      price: "$50",
      audio: "assets/audio/beat-04-preview.mp3",
      cover: "",
      leaseUrl: "",
      licenseUrls: { mp3: "", wav: "", trackouts: "", unlimited: "" }
    },
    {
      id: "beat5",
      title: "Beat Title 05",
      producer: "jayy.wav",
      bpm: "136",
      key: "G MIN",
      price: "$50",
      audio: "assets/audio/beat-05-preview.mp3",
      cover: "",
      leaseUrl: "",
      licenseUrls: { mp3: "", wav: "", trackouts: "", unlimited: "" }
    },
    {
      id: "beat6",
      title: "Beat Title 06",
      producer: "jayy.wav",
      bpm: "150",
      key: "E MIN",
      price: "$50",
      audio: "assets/audio/beat-06-preview.mp3",
      cover: "",
      leaseUrl: "",
      licenseUrls: { mp3: "", wav: "", trackouts: "", unlimited: "" }
    },
    {
      id: "beat7",
      title: "Beat Title 07",
      producer: "jayy.wav",
      bpm: "132",
      key: "B MIN",
      price: "$50",
      audio: "assets/audio/beat-07-preview.mp3",
      cover: "",
      leaseUrl: "",
      licenseUrls: { mp3: "", wav: "", trackouts: "", unlimited: "" }
    },
    {
      id: "beat8",
      title: "Beat Title 08",
      producer: "jayy.wav",
      bpm: "158",
      key: "F# MIN",
      price: "$50",
      audio: "assets/audio/beat-08-preview.mp3",
      cover: "",
      leaseUrl: "",
      licenseUrls: { mp3: "", wav: "", trackouts: "", unlimited: "" }
    },
    {
      id: "beat9",
      title: "Beat Title 09",
      producer: "jayy.wav",
      bpm: "124",
      key: "C MIN",
      price: "$50",
      audio: "assets/audio/beat-09-preview.mp3",
      cover: "",
      leaseUrl: "",
      licenseUrls: { mp3: "", wav: "", trackouts: "", unlimited: "" }
    },
    {
      id: "beat10",
      title: "Beat Title 10",
      producer: "jayy.wav",
      bpm: "142",
      key: "A# MIN",
      price: "$50",
      audio: "assets/audio/beat-10-preview.mp3",
      cover: "",
      leaseUrl: "",
      licenseUrls: { mp3: "", wav: "", trackouts: "", unlimited: "" }
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

      <a class="btn btn-small beat-buy" href="${beat.leaseUrl || "#"}">VIEW LICENSES</a>

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

    buyBtn.addEventListener("click", e => {
      e.preventDefault();
      openLicenseModal(beat);
    });

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




// Beat license chooser
const licenseModal = document.getElementById("licenseModal");
const licenseBeatName = document.getElementById("licenseBeatName");
let selectedBeatForLicense = null;

function openLicenseModal(beat) {
  selectedBeatForLicense = beat;
  licenseBeatName.textContent = `${beat.title} — ${beat.producer}`;
  licenseModal.classList.add("is-open");
  licenseModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLicenseModal() {
  licenseModal.classList.remove("is-open");
  licenseModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-close-license]").forEach(el => {
  el.addEventListener("click", closeLicenseModal);
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && licenseModal?.classList.contains("is-open")) closeLicenseModal();
});

document.querySelectorAll(".license-buy").forEach(btn => {
  btn.addEventListener("click", () => {
    if (!selectedBeatForLicense) return;
    const tier = btn.dataset.tier;
    const url = selectedBeatForLicense.licenseUrls?.[tier] || "";
    if (url) {
      window.open(url, "_blank", "noopener");
    } else {
      alert(`Add the ${tier.toUpperCase()} Payhip link for ${selectedBeatForLicense.title} in script.js.`);
    }
  });
});


// Same-day contact chooser
const sameDayBtn = document.getElementById("sameDayContactBtn");
const sameDayModal = document.getElementById("sameDayModal");
const sameDayTextLink = document.getElementById("sameDayTextLink");
const sameDayMessage = "Hey Jayy.wav, I’m looking for a same-day recording session today. Do you have any studio availability?";

if (sameDayTextLink) {
  sameDayTextLink.href = `sms:6785515333?&body=${encodeURIComponent(sameDayMessage)}`;
}

if (sameDayBtn && sameDayModal) {
  sameDayBtn.addEventListener("click", () => {
    sameDayModal.classList.add("is-open");
    sameDayModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
}

document.querySelectorAll("[data-close-sameday]").forEach(el => {
  el.addEventListener("click", () => {
    sameDayModal?.classList.remove("is-open");
    sameDayModal?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  });
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && sameDayModal?.classList.contains("is-open")) {
    sameDayModal.classList.remove("is-open");
    sameDayModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
});


// Reliable session request flow:
// 1) Build the request on-page.
// 2) Prefer the iPhone/Android native Share Sheet.
// 3) Always provide Copy + plain SMS + Instagram fallbacks.
const sessionRequestForm = document.getElementById("sessionRequestForm");
const requestReady = document.getElementById("requestReady");
const requestPreview = document.getElementById("requestPreview");
const requestStatus = document.getElementById("requestStatus");
const shareRequestBtn = document.getElementById("shareRequestBtn");
const copyRequestBtn = document.getElementById("copyRequestBtn");

const formatRequestDate = value => {
  if (!value) return "Not provided";
  const [y, m, d] = value.split("-");
  return `${m}/${d}/${y}`;
};

const formatRequestTime = value => {
  if (!value) return "Not provided";
  const [h, m] = value.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
};

const buildSessionRequest = () => {
  const name = document.getElementById("requestName").value.trim();
  const phone = document.getElementById("requestPhone").value.trim();
  const length = document.getElementById("requestLength").value;
  const date = formatRequestDate(document.getElementById("requestDate").value);
  const time = formatRequestTime(document.getElementById("requestTime").value);
  const backupDate = formatRequestDate(document.getElementById("backupDate").value);
  const backupTime = formatRequestTime(document.getElementById("backupTime").value);
  const notes = document.getElementById("requestNotes").value.trim() || "None";

  return [
    "SESSION REQUEST — jayy.wav",
    "",
    `Name/Artist: ${name}`,
    `Phone: ${phone}`,
    `Session: ${length}`,
    `Preferred: ${date} at ${time}`,
    `Backup: ${backupDate} at ${backupTime}`,
    `Notes: ${notes}`,
    "",
    "I understand this is a request and my session is not confirmed until studio availability is verified and the $100 deposit is paid."
  ].join("\n");
};

const copyRequestText = async message => {
  try {
    await navigator.clipboard.writeText(message);
    return true;
  } catch (err) {
    const temp = document.createElement("textarea");
    temp.value = message;
    temp.style.position = "fixed";
    temp.style.opacity = "0";
    document.body.appendChild(temp);
    temp.select();
    const ok = document.execCommand("copy");
    temp.remove();
    return ok;
  }
};

if (sessionRequestForm) {
  sessionRequestForm.addEventListener("submit", e => {
    e.preventDefault();

    if (!sessionRequestForm.reportValidity()) return;

    const message = buildSessionRequest();
    requestPreview.textContent = message;
    requestReady.hidden = false;
    requestStatus.textContent = "";
    requestReady.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

if (shareRequestBtn) {
  shareRequestBtn.addEventListener("click", async () => {
    const message = buildSessionRequest();

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Session Request — jayy.wav",
          text: message
        });
        requestStatus.textContent = "Share sheet opened. Choose Messages or your preferred app, then send.";
        return;
      } catch (err) {
        if (err?.name === "AbortError") {
          requestStatus.textContent = "Share cancelled. You can still copy the request or open Text/Instagram below.";
          return;
        }
      }
    }

    const copied = await copyRequestText(message);
    requestStatus.textContent = copied
      ? "Your request was copied. Tap TEXT JAYY.WAV or DM ON INSTAGRAM, paste, and send."
      : "Use COPY REQUEST, then paste the message into Text or Instagram.";
  });
}

if (copyRequestBtn) {
  copyRequestBtn.addEventListener("click", async () => {
    const copied = await copyRequestText(buildSessionRequest());
    requestStatus.textContent = copied
      ? "Request copied — open Text or Instagram, paste it, and send."
      : "Copy failed on this browser. Press and hold the request above to copy it manually.";
  });
}

document.querySelectorAll(".package-request").forEach(link => {
  link.addEventListener("click", () => {
    const select = document.getElementById("requestLength");
    if (select) select.value = link.dataset.package;
  });
});
