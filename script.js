const form = document.getElementById("wishForm");
const wall = document.getElementById("wishWall");
const modal = document.getElementById("surpriseModal");

function getWishes() {
  try { return JSON.parse(localStorage.getItem("birthdayGirlWishes") || "[]"); }
  catch { return []; }
}
function renderWishes() {
  const wishes = getWishes();
  wall.innerHTML = "";
  if (!wishes.length) {
    wall.innerHTML = '<div class="empty-state">💌 Your message could be the first one here.</div>';
    return;
  }
  wishes.slice().reverse().forEach(wish => {
    const card = document.createElement("article");
    card.className = "wish-card";
    const message = document.createElement("p");
    message.textContent = wish.message;
    const name = document.createElement("strong");
    name.textContent = "— " + wish.name + " 💗";
    card.append(message, name);
    wall.appendChild(card);
  });
}
form.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("senderName").value.trim();
  const message = document.getElementById("wishMessage").value.trim();
  if (!name || !message) return;
  const wishes = getWishes();
  wishes.push({ name, message });
  localStorage.setItem("birthdayGirlWishes", JSON.stringify(wishes));
  form.reset();
  renderWishes();
  launchConfetti();
});
function openModal() { modal.classList.add("show"); modal.setAttribute("aria-hidden", "false"); launchConfetti(); }
function closeModal() { modal.classList.remove("show"); modal.setAttribute("aria-hidden", "true"); }
document.getElementById("surpriseBtn").addEventListener("click", openModal);
document.getElementById("closeModal").addEventListener("click", closeModal);
document.getElementById("modalCelebrate").addEventListener("click", () => { closeModal(); launchConfetti(); });
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
document.getElementById("confettiBtn").addEventListener("click", launchConfetti);

function launchConfetti() {
  const symbols = ["✨", "💗", "🎉", "🌸", "⭐", "💛"];
  for (let i = 0; i < 34; i++) {
    const bit = document.createElement("span");
    bit.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    bit.style.cssText = `position:fixed;left:${Math.random()*100}vw;top:-30px;font-size:${16+Math.random()*17}px;z-index:20;pointer-events:none;transition:transform 2.3s ease-in,opacity 2.3s ease-in`;
    document.body.appendChild(bit);
    requestAnimationFrame(() => {
      bit.style.transform = `translate(${(Math.random()-.5)*150}px,${window.innerHeight+80}px) rotate(${Math.random()*700}deg)`;
      bit.style.opacity = "0";
    });
    setTimeout(() => bit.remove(), 2400);
  }
}
renderWishes();
