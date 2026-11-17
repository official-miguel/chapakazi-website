// Fill these in before publishing.
var APP_URL = "https://app.chapabiz.co.ke"; // where people open and install the app
var WHATSAPP = "254182319029"; // digits only, country code first (same number as bidiischools.co.ke)

document.querySelectorAll("[data-app]").forEach(function (a) {
  if (APP_URL) a.href = APP_URL;
});
// The Download button opens the app's /install page, which shows the phone's own install box.
document.querySelectorAll("[data-install]").forEach(function (a) {
  if (APP_URL) a.href = APP_URL.replace(/\/$/, "") + "/install";
});
document.querySelectorAll("[data-wa]").forEach(function (a) {
  if (WHATSAPP) {
    a.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent("Hi, I'd like to try Chapa Biz");
    a.target = "_blank";
    a.rel = "noopener";
  }
});
document.getElementById("yr").textContent = new Date().getFullYear();

// Highlight the install steps that match this phone
var ua = navigator.userAgent;
var isIos = /iPhone|iPad|iPod/i.test(ua);
var isAndroid = /Android/i.test(ua);
if (isIos) document.getElementById("dl-ios").classList.add("hi");
else if (isAndroid) document.getElementById("dl-android").classList.add("hi");

// Intro screen
var splash = document.getElementById("splash");
function hideSplash() {
  splash.classList.add("done");
  document.body.classList.remove("loading");
}
setTimeout(hideSplash, 1800);
splash.addEventListener("click", hideSplash);

// Mobile menu
var burger = document.getElementById("burger");
var links = document.getElementById("links");
burger.addEventListener("click", function () {
  var open = links.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
links.addEventListener("click", function () {
  links.classList.remove("open");
  burger.setAttribute("aria-expanded", false);
});

// Pricing toggle
var PLANS = {
  day:   { kick: "PAY AS YOU GO", amt: "49",    per: "/ day",   note: "Pay only for the days you need.", extra: "for your first shop · + KSh 29 / day for each extra shop" },
  week:  { kick: "SAVE KSH 44",   amt: "299",   per: "/ week",  note: "Save KSh 44 every week against daily.", extra: "for your first shop · + KSh 179 / week for each extra shop" },
  month: { kick: "BEST VALUE",    amt: "1,199", per: "/ month", note: "Under KSh 40 a day. Save KSh 271 against daily.", extra: "for your first shop · + KSh 699 / month for each extra shop" }
};
var tabs = document.querySelectorAll(".toggle button");
tabs.forEach(function (b) {
  b.addEventListener("click", function () {
    var p = PLANS[b.dataset.plan];
    tabs.forEach(function (x) { x.classList.toggle("on", x === b); });
    document.getElementById("p-kick").textContent = p.kick;
    document.getElementById("p-amt").textContent = p.amt;
    document.getElementById("p-per").textContent = p.per;
    document.getElementById("p-note").textContent = p.note;
    document.getElementById("p-extra").textContent = p.extra;
  });
});

// Reveal on scroll
var rev = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  rev.forEach(function (r) { io.observe(r); });
} else {
  rev.forEach(function (r) { r.classList.add("in"); });
}
