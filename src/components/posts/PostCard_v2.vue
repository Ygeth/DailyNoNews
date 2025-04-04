<template>
  <article class="article-card">
    <router-link :to="{ name: 'PostDetail', params: { id: post.documentId } }" class="card-image">
      <img v-if="post.img_url" :src="post.img_url" :alt="`Imagen de ${post.title}`" loading="lazy">
      <div v-else class="placeholder-image" :style="{ backgroundColor: getRandomColor() }">
        <span>{{ post.categories?.[0] || 'Artículo' }}</span>
      </div>
      <h1 class="card-title">{{ post.title }}</h1>
    </router-link>

    <!-- <div class="card-content">
      <div class="card-categories" v-if="post.categories && post.categories.length">
        <span v-for="category in post.categories.slice(0, 2)" :key="category" class="category-tag">
          {{ category }}
        </span>
      </div>

      <router-link :to="{ name: 'PostDetail', params: { id: post.documentId } }">
        <h3 class="card-title" v-html="post.title"></h3>
      </router-link>

      <div class="card-excerpt" v-html="stripHtml(post.excerpt)"></div>

      <div class="article-meta">
        <span v-if="post.author" class="author-name">Por {{ post.author.name }}</span>
        <time :datetime="post.createdAt">{{ formatDate(post.createdAt) }}</time>
      </div>
    </div> -->
  </article>
</template>

<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

// --- Props ---
// Definimos que el componente espera recibir un objeto 'post'
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

// --- Funciones Auxiliares (Específicas de la Card) ---
const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  // Usando localización española por defecto
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

const stripHtml = (html) => {
  if (!html) return '';
  // Una forma sencilla y segura de quitar HTML básico para el excerpt
  let doc = new DOMParser().parseFromString(html, 'text/html');
  let text = doc.body.textContent || "";
  // Reemplazar múltiples espacios/saltos de línea con uno solo para limpieza
  return text.replace(/\s+/g, ' ').trim();
}

// Función para color placeholder aleatorio (si se usa)
const getRandomColor = () => {
  const letters = '789ABCD'; // Tonos un poco más oscuros/menos brillantes que antes
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}
</script>
<style scoped>
/* --- Estilos específicos de la Card --- */

/* Heredados de style.css pero importantes para el scope local */
.article-card {
  position: relative; /* Necesario para posicionar el pseudo-elemento */
  width: 500px; /* Ancho fijo para la tarjeta */
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

/* .article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
} */

/* Degradado en la parte inferior */
.article-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%; /* Ajusta la altura del degradado */
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  pointer-events: none; /* Asegura que no interfiera con los eventos */
}


.card-image {
  display: block;
  text-decoration: none;
  position: relative; /* Para posicionar el texto del placeholder */
}

.card-image img {
    display: block;
    object-fit: cover;
    background-color: #333; /* Color de fondo mientras carga la img */
}


.placeholder-image {
  width: 500px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: rgba(255, 255, 255, 0.8); /* Texto blanco semitransparente sobre fondo de color */
  font-size: 1.1rem;
  font-weight: bold;
  padding: 10px;
}

.card-content {
  /* Estilos base en style.css */
   padding: 20px;
   flex-grow: 1;
   display: flex;
   flex-direction: column;
}

/* Estilo para enlace que envuelve título */
.card-content > a {
  color: inherit; /* Hereda color primario de texto */
  text-decoration: none;
  display: block; /* Asegura que ocupa el espacio */
  margin: 0.5em 0; /* Mismo margen que tenía el h3 */
}
.card-content > a:hover .card-title {
  color: var(--color-accent);
  text-decoration: underline;
}

.card-title {
   /* Estilos base en style.css */
   margin: 0; /* Quitamos margen porque el enlace contenedor ya lo tiene */
   font-size: 1.3rem;
   color: var(--color-text-primary);
   line-height: 1.4;
}

.card-categories {
  margin-bottom: 0.5em;
  /* Los estilos de .category-tag vienen de style.css */
}

.card-excerpt {
  /* Estilos base en style.css */
  font-size: 1rem;
  color: var(--color-text-secondary);
  flex-grow: 1;
  margin-bottom: 1rem;
  /* Clamp viene de style.css globalmente o aplicar aquí si se prefiere */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  /* Estilos base en style.css */
  margin-top: auto; /* Empuja al final */
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}
.article-meta span {
    margin-right: 1em;
}

</style>