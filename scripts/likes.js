// scripts/likes.js
import { addLike, getLikes } from "./supabase.js";

const likeBtn = document.getElementById("likeBtn");
const likeCount = document.getElementById("likeCount");

// Función para obtener IP del usuario
async function getUserIp() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch {
    return "unknown";
  }
}

// Actualiza contador y estado del ícono
async function updateLikeUI() {
  const workId = likeBtn.dataset.workId;
  if (!workId) return;

  const count = await getLikes(workId);
  likeCount.textContent = count;

  const userIp = await getUserIp();

  // Consultar si este usuario ya dio like
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("obra_id", workId)
    .eq("user_ip", userIp);

  if (error) {
    console.error("Error al verificar likes:", error);
    return;
  }

  if (data && data.length > 0) {
    // Usuario ya dio like → corazón relleno
    likeBtn.classList.remove("bx bx-heart");
    likeBtn.classList.add("bx bxs-heart");
  } else {
    // Usuario no ha dado like → corazón vacío
    likeBtn.classList.remove("bx bxs-heart");
    likeBtn.classList.add("bx bx-heart");
  }
}

// Manejo del click
async function handleLike() {
  const workId = likeBtn.dataset.workId;
  if (!workId) return;

  const userIp = await getUserIp();

  // Registrar el like en Supabase
  await addLike(workId, userIp);

  // Actualizar contador e ícono
  await updateLikeUI();
}

// Eventos
likeBtn.addEventListener("click", handleLike);

// Hacer accesible updateLikeUI para modal.js
window.updateLikeUI = updateLikeUI;
