import { getComments, addComment } from "./supabase.js";

const commentsContainer = document.getElementById("commentsContainer");
const commentInput = document.getElementById("commentInput");
const submitComment = document.getElementById("submitComment");

const btnLeft = document.querySelector(".comment-btn-left");
const btnRight = document.querySelector(".comment-btn-right");

let commentsData = [];
let currentCommentIndex = 0;
let autoSlideInterval = null;

// ---- RENDER ----
function renderComments(comments) {
  commentsContainer.innerHTML = "";

  comments.forEach((c, index) => {
    const div = document.createElement("div");
    div.classList.add("comment-slide");
    div.dataset.index = index;
    div.textContent = c.content;
    commentsContainer.appendChild(div);
  });

  currentCommentIndex = 0;
  updateCommentSlider();
}

function updateCommentSlider() {
  const slides = document.querySelectorAll(".comment-slide");
  if (!slides.length) return;

  const slideWidth = slides[0].getBoundingClientRect().width + 20; // margen
  commentsContainer.style.transform = `translateX(-${
    currentCommentIndex * slideWidth
  }px)`;
}

function nextSlide() {
  if (!commentsData.length) return;
  currentCommentIndex++;
  if (currentCommentIndex >= commentsData.length) currentCommentIndex = 0;
  updateCommentSlider();
}

function prevSlide() {
  if (!commentsData.length) return;
  currentCommentIndex--;
  if (currentCommentIndex < 0) currentCommentIndex = commentsData.length - 1;
  updateCommentSlider();
}

function startCommentCarousel() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 4000);
}

// ---- LOAD ----
async function loadComments() {
  commentsData = await getComments();
  renderComments(commentsData);
  startCommentCarousel();
}

// ---- ADD ----
async function handleAddComment() {
  const content = commentInput.value.trim();
  if (!content) return;

  const newComment = await addComment(content);
  if (newComment) {
    commentsData.push(newComment);
    renderComments(commentsData);
    startCommentCarousel();
    commentInput.value = "";
  }
}

// ---- EVENTOS ----
submitComment.addEventListener("click", handleAddComment);
commentInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleAddComment();
  }
});

btnRight.addEventListener("click", () => {
  nextSlide();
  startCommentCarousel(); // reiniciar timer
});

btnLeft.addEventListener("click", () => {
  prevSlide();
  startCommentCarousel(); // reiniciar timer
});

// ---- INIT ----
document.addEventListener("DOMContentLoaded", loadComments);
