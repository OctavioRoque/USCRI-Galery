// scripts/supabase.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Configuración Supabase
const supabaseUrl = "https://jieecdusneosgemfbffo.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppZWVjZHVzbmVvc2dlbWZiZmZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyNzM3OTcsImV4cCI6MjA3Mzg0OTc5N30.JTikW9hjkZT9-XC_umYAPpzKrU1lckUaJCNowXGOQig";

export const supabase = createClient(supabaseUrl, supabaseKey);

// ---- FUNCIONES COMENTARIOS ----
export async function getComments() {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("❌ Error cargando comentarios:", error);
    return [];
  }
  return data;
}

export async function addComment(content) {
  if (!content.trim()) return null;

  const { data, error } = await supabase
    .from("comments")
    .insert([{ content }])
    .select();

  if (error) {
    console.error("❌ Error agregando comentario:", error);
    return null;
  }

  return data[0];
}
