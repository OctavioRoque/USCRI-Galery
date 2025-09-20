import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('TU_SUPABASE_URL', 'TU_SUPABASE_ANON_KEY');

async function registrarVisita() {
  try {
    // Obtener IP del usuario
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    const ip = data.ip || 'unknown';
    
    // Registrar en Supabase
    await supabase.from('visitas').insert([{
      ip,
      user_agent: navigator.userAgent,
      page: window.location.href
    }]);
  } catch (err) {
    console.error("Error registrando visita:", err);
  }
}

// Ejecutar al cargar la página
registrarVisita();