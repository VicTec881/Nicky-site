// SUPABASE CONFIGURATION
const SUPABASE_URL = "https://ldnxwezprrhpydfvicaf.supabase.co";
const SUPABASE_KEY = "sb_publishable_BHN5tmkFmpHeRkwKA1RClg_s8zdOQtj";

const TABLE_NAME = "her_birthday_wishes";

// HTML ELEMENTS
const form = document.getElementById("wishForm");
const wall = document.getElementById("wishWall");
const modal = document.getElementById("surpriseModal");

const statusText = document.getElementById("formStatus");
const submitButton = form.querySelector('button[type="submit"]');

// CONNECT TO SUPABASE
const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// DISPLAY STATUS MESSAGES
function showStatus(message, error = false) {
    if (!statusText) return;

    statusText.textContent = message;
    statusText.style.color = error ? "red" : "green";
}

// DISPLAY BIRTHDAY WISHES
async function renderWishes() {

    const { data, error } = await db
        .from(TABLE_NAME)
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);

        wall.innerHTML =
            '<div class="empty-state">Could not load birthday wishes. Please try again.</div>';

        return;
    }

    wall.innerHTML = "";

    if (!data.length) {

        wall.innerHTML =
            '<div class="empty-state">💌 Your message could be the first one here.</div>';

        return;
    }

    data.forEach(wish => {

        const card = document.createElement("article");

        card.className = "wish-card";

        const message = document.createElement("p");

        message.textContent = wish.message;

        const name = document.createElement("strong");

        name.textContent = "— " + wish.sender_name + " 💗";

        card.append(message, name);

        wall.appendChild(card);

    });
}

// SUBMIT BIRTHDAY WISH
form.addEventListener("submit", async event => {

    event.preventDefault();

    const name = document
        .getElementById("senderName")
        .value.trim();

    const message = document
        .getElementById("wishMessage")
        .value.trim();

    if (!name || !message) {

        showStatus("Please fill in both fields.", true);

        return;
    }

    submitButton.disabled = true;

    submitButton.textContent = "Sending...";

    const { error } = await db
        .from(TABLE_NAME)
        .insert([
            {
                sender_name: name,
                message: message
            }
        ]);

    submitButton.disabled = false;

    submitButton.textContent = "Send Birthday Wish 🎈";

    if (error) {

        console.error(error);

        showStatus("Could not send your wish. Please try again.", true);

        return;
    }

    form.reset();

    showStatus("Your birthday wish has been sent successfully! 💗");

    await renderWishes();

    launchConfetti();

});

// SURPRISE MODAL
function openModal() {

    modal.classList.add("show");

    modal.setAttribute("aria-hidden", "false");

    launchConfetti();

}

function closeModal() {

    modal.classList.remove("show");

    modal.setAttribute("aria-hidden", "true");

}

document
    .getElementById("surpriseBtn")
    .addEventListener("click", openModal);

document
    .getElementById("closeModal")
    .addEventListener("click", closeModal);

document
    .getElementById("modalCelebrate")
    .addEventListener("click", () => {

        closeModal();

        launchConfetti();

    });

modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeModal();

    }

});

// CONFETTI BUTTON
document
    .getElementById("confettiBtn")
    .addEventListener("click", launchConfetti);

// CONFETTI ANIMATION
function launchConfetti() {

    const symbols = ["✨", "💗", "🎉", "🌸", "⭐", "💛"];

    for (let i = 0; i < 34; i++) {

        const bit = document.createElement("span");

        bit.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        bit.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}vw;
            top: -30px;
            font-size: ${16 + Math.random() * 17}px;
            z-index: 20;
            pointer-events: none;
            transition: transform 2.3s ease-in, opacity 2.3s ease-in;
        `;

        document.body.appendChild(bit);

        requestAnimationFrame(() => {

            bit.style.transform = `
                translate(
                    ${(Math.random() - 0.5) * 150}px,
                    ${window.innerHeight + 80}px
                )
                rotate(${Math.random() * 700}deg)
            `;

            bit.style.opacity = "0";

        });

        setTimeout(() => bit.remove(), 2400);

    }

}

// AUTOMATICALLY REFRESH WISHES WHEN SOMEONE POSTS
db.channel("birthday-wishes")
    .on(
        "postgres_changes",
        {
            event: "INSERT",
            schema: "public",
            table: TABLE_NAME
        },
        () => renderWishes()
    )
    .subscribe();

// LOAD WISHES WHEN WEBSITE OPENS
renderWishes();