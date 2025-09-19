// comentarios.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔑 Reemplaza con tu URL y key pública
const SUPABASE_URL = "https://jieecdusneosgemfbffo.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppZWVjZHVzbmVvc2dlbWZiZmZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyNzM3OTcsImV4cCI6MjA3Mzg0OTc5N30.JTikW9hjkZT9-XC_umYAPpzKrU1lckUaJCNowXGOQig";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const commentsContainer = document.getElementById("commentsContainer");
const commentForm = document.getElementById("commentForm");
const commentInput = document.getElementById("commentInput");

// 🟢 Cargar comentarios desde Supabase
async function loadComments() {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error cargando comentarios:", error);
    return;
  }

  console.log("Comentarios cargados:", data); // debug
  renderComments(data);
}

// 🟢 Renderizar comentarios en pantalla
function renderComments(comments) {
  commentsContainer.innerHTML = "";

  comments.forEach((c) => {
    const div = document.createElement("div");
    div.classList.add("comment-card");
    div.innerHTML = `
      <p>${c.content}</p>
      <small>${new Date(c.created_at).toLocaleString()}</small>
    `;
    commentsContainer.appendChild(div);
  });
}

// 🟢 Guardar nuevo comentario
async function addComment(content) {
  const { error } = await supabase.from("comments").insert([{ content }]);

  if (error) {
    console.error("Error insertando comentario:", error);
    return;
  }

  commentInput.value = "";
  loadComments(); // recargar lista después de insertar
}

// 🟢 Manejo del formulario
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const content = commentInput.value.trim();
  if (content) {
    addComment(content);
  }
});

// 🟢 Ejecutar al cargar la página
window.addEventListener("load", () => {
  loadComments();
});
