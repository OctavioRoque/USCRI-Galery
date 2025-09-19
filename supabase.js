
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://jieecdusneosgemfbffo.supabase.co'
const supabaseKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppZWVjZHVzbmVvc2dlbWZiZmZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyNzM3OTcsImV4cCI6MjA3Mzg0OTc5N30.JTikW9hjkZT9-XC_umYAPpzKrU1lckUaJCNowXGOQig
const supabase = createClient(supabaseUrl, supabaseKey)

const commentsContainer = document.getElementById('commentsContainer');
const commentInput = document.getElementById('commentInput');
const submitComment = document.getElementById('submitComment');

let commentsData = [];
let currentCommentIndex = 0;

async function testSupabase() {
    const { data, error } = await supabase.from('comments').select('*').limit(1);
    if (error) {
        console.log('Error al conectar:', error);
    } else {
        console.log('Conectado a Supabase, comentarios:', data);
    }
}

testSupabase();

// ----------------- COMMENTS -----------------
async function loadComments() {
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) return console.error('Error cargando comentarios:', error);

    commentsData = data;
    renderComments();
}

async function addComment(content) {
    if (!content.trim()) return;
    const { error } = await supabase
        .from('comments')
        .insert([{ content }]);
    if (error) return console.error('Error agregando comentario:', error);

    commentInput.value = '';
    loadComments();
}

function renderComments() {
    commentsContainer.innerHTML = '';
    commentsData.forEach((comment, index) => {
        const div = document.createElement('div');
        div.classList.add('comment-slide');
        div.dataset.index = index;
        div.textContent = comment.content;
        commentsContainer.appendChild(div);
    });
    currentCommentIndex = 0;
    updateCommentSlider();
}

function updateCommentSlider() {
    const slides = document.querySelectorAll('.comment-slide');
    if (!slides.length) return;
    const slideWidth = slides[0].getBoundingClientRect().width + 20; // 20px margen
    commentsContainer.style.transform = `translateX(-${currentCommentIndex * slideWidth}px)`;
}

function startCommentCarousel() {
    setInterval(() => {
        if (!commentsData.length) return;
        currentCommentIndex++;
        if (currentCommentIndex >= commentsData.length) currentCommentIndex = 0;
        updateCommentSlider();
    }, 4000);
}

// ----------------- EVENT LISTENERS -----------------
submitComment.addEventListener('click', () => addComment(commentInput.value));
commentInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addComment(commentInput.value);
    }
});

// ----------------- INICIALIZAR -----------------
document.addEventListener('DOMContentLoaded', () => {
    loadComments();
    startCommentCarousel();
});
