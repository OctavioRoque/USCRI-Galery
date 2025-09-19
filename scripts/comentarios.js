// scripts/comentarios.js
import { getComments, addComment } from "./supabase.js";

const commentsContainer = document.getElementById("commentsContainer");
const commentInput = document.getElementById("commentInput");
const submitComment = document.getElementById("submitComment");

let commentsData = [];

// --- RENDER ---
function renderComments(comments) {
  commentsContainer.innerHTML = "";

  comments.forEach(c => {
    const div = document.createElement("div");
    div.classList.add("comment-card");
    div.innerHTML = `<p>${c.content}</p>`;
    commentsContainer.appendChild(div);
  });
}

// --- LOAD ---
async function loadComments() {
  commentsData = await getComments();
  renderComments(commentsData);
}

// --- ADD ---
async function handleAddComment() {
  const content = commentInput.value.trim();
  if (!content) return;

  const newComment = await addComment(content);
  if (newComment) {
    commentsData.push(newComment);
    renderComments(commentsData);
    commentInput.value = "";
  }
}

// --- EVENTOS ---
submitComment.addEventListener("click", handleAddComment);
commentInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleAddComment();
  }
});

// --- INIT ---
document.addEventListener("DOMContentLoaded", loadComments);
