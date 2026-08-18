const CONFIG = {
  bookingUrl: "https://jayywav.square.site/",
  mixMasterUrl: "",      // Paste your Square Mix & Master payment link here.
  beat1Url: "",          // Paste beat lease payment links here.
  beat2Url: "",
  beat3Url: ""
};

document.querySelectorAll('a[href="https://jayywav.square.site/"]').forEach(a => {
  a.href = CONFIG.bookingUrl;
});

const placeholderMap = {
  mix: CONFIG.mixMasterUrl,
  beat1: CONFIG.beat1Url,
  beat2: CONFIG.beat2Url,
  beat3: CONFIG.beat3Url
};

document.querySelectorAll("[data-placeholder]").forEach(a => {
  const url = placeholderMap[a.dataset.placeholder];
  if (url) {
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
  } else {
    a.addEventListener("click", e => {
      e.preventDefault();
      alert("This purchase link is being added soon.");
    });
  }
});

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

document.getElementById("year").textContent = new Date().getFullYear();
