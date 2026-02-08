// Mobile nav toggle
const toggle = document.querySelector(".nav__toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  // close nav when clicking a link (mobile)
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    });
  });
}

// Accordion
document.querySelectorAll("[data-accordion] .accordion__btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!isOpen));
    if (content) content.hidden = isOpen;
  });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Back to top button
const toTop = document.querySelector(".toTop");
window.addEventListener("scroll", () => {
  if (!toTop) return;
  if (window.scrollY > 600) toTop.classList.add("show");
  else toTop.classList.remove("show");
});
toTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Contact form: basic validation + mailto submit
const form = document.getElementById("enquiryForm");
const statusEl = document.getElementById("formStatus");
const emailTo = "info@atlanticsecuritysolutions.co.uk";

function setError(fieldId, message) {
  const el = document.querySelector(`[data-error-for="${fieldId}"]`);
  if (el) el.textContent = message || "";
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const type = document.getElementById("type");
  const message = document.getElementById("message");

  // reset errors
  ["name","email","type","message"].forEach(id => setError(id, ""));

  let ok = true;

  if (!name.value.trim()) { setError("name", "Please enter your name."); ok = false; }
  if (!email.value.trim() || !validateEmail(email.value.trim())) { setError("email", "Please enter a valid email."); ok = false; }
  if (!type.value) { setError("type", "Please select an enquiry type."); ok = false; }
  if (!message.value.trim() || message.value.trim().length < 10) { setError("message", "Please add a bit more detail."); ok = false; }

  if (!ok) {
    statusEl.textContent = "Please fix the highlighted fields.";
    return;
  }

  const subject = encodeURIComponent(`Website enquiry: ${type.value}`);
  const body = encodeURIComponent(
`Name: ${name.value.trim()}
Email: ${email.value.trim()}
Enquiry type: ${type.value}

Message:
${message.value.trim()}`
  );

  const mailto = `mailto:${emailTo}?subject=${subject}&body=${body}`;

  statusEl.textContent = "Opening your email app…";
  window.location.href = mailto;
});
