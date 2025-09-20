// scripts/likes.js
import { addLike, getLikes } from "./supabase.js";

const likeBtn = document.getElementById("likeBtn");
const likeCount = document.getElementById("likeCount");

// Obtener IP del usuario
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
export async function updateLikeUI() {
  const workId = likeBtn.dataset.workId;
  if (!workId) return;

  // Actualizar contador
  const count = await getLikes(workId);
  likeCount.textContent = count;

  const userIp = await getUserIp();

  // Verificar si este usuario ya dio like
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("obra_id", workId)
    .eq("user_ip", userIp);

  if (error) {
    console.error("Error al verificar likes:", error);
    return;
  }

  // Cambiar ícono según estado
  if (data && data.length > 0) {
    likeBtn.classList.remove("bx bx-heart");
    likeBtn.classList.add("bx bxs-heart");
  } else {
    likeBtn.classList.remove("bx bxs-heart");
    likeBtn.classList.add("bx bx-heart");
  }
}

// Manejo del click
async function handleLike() {
  const workId = likeBtn.dataset.workId;
  if (!workId) return;

  const userIp = await getUserIp();

  // Optimismo visual: cambiar corazón antes de esperar respuesta
  likeBtn.classList.toggle("bx bx-heart");
  likeBtn.classList.toggle("bx bxs-heart");

  // Registrar el like en Supabase
  await addLike(workId, userIp);

  // Actualizar contador real
  const count = await getLikes(workId);
  likeCount.textContent = count;
}

// Evento click
likeBtn.addEventListener("click", handleLike);

// Hacer accesible updateLikeUI para modal.js
window.updateLikeUI = updateLikeUI;
