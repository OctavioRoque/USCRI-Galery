// scripts/likes.js
import { addLike, getLikes } from "./supabase.js";

// Asumiendo que en tu modal tienes:
// <i id="likeBtn" class="bx bx-heart" data-work-id="1"></i>
// <span id="likeCount">0</span>

const likeBtn = document.getElementById("likeBtn");
const likeCount = document.getElementById("likeCount");

async function updateLikeUI() {
  const workId = likeBtn.dataset.workId;
  const count = await getLikes(workId);
  likeCount.textContent = count;
}

async function handleLike() {
  const workId = likeBtn.dataset.workId;

  // Obtener IP del usuario (opcional)
  let userIp = "unknown";
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    userIp = data.ip;
  } catch {}

  await addLike(workId, userIp);
  await updateLikeUI();
}

// Eventos
likeBtn.addEventListener("click", handleLike);

// Inicializar
document.addEventListener("DOMContentLoaded", updateLikeUI);
