// scripts/supabase.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// --- Configuración ---
const SUPABASE_URL = "https://jieecdusneosgemfbffo.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppZWVjZHVzbmVvc2dlbWZiZmZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyNzM3OTcsImV4cCI6MjA3Mzg0OTc5N30.JTikW9hjkZT9-XC_umYAPpzKrU1lckUaJCNowXGOQig"; // solo anon key
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --------------------
// COMENTARIOS
// --------------------

// Obtener todos los comentarios ordenados por fecha
export async function getComments() {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) {
    console.error("Error al obtener comentarios:", error);
    return [];
  }
  return data;
}

// Agregar un nuevo comentario y devolverlo
export async function addComment(content) {
  if (!content.trim()) return null;

  const { data, error } = await supabase
    .from("comments")
    .insert([{ content }])
    .select()
    .single(); // devuelve el registro insertado

  if (error) {
    console.error("Error al agregar comentario:", error);
    return null;
  }
  return data;
}

// --------------------
// LIKES
// --------------------

// Agregar un like a una obra
export async function addLike(work_id, user_ip = "unknown") {
  const { data, error } = await supabase
    .from("likes")
    .insert([{ work_id, user_ip }])
    .select()
    .single();

  if (error) {
    console.error("Error al agregar like:", error);
    return null;
  }
  return data;
}

// Obtener la cantidad de likes de una obra
export async function getLikes(work_id) {
  const { count, error } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("work_id", work_id);

  if (error) {
    console.error("Error al obtener likes:", error);
    return 0;
  }
  return count;
}
