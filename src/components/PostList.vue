<template>
  <div class="container">
    <h1 class="page-title">Últimas Noticias</h1>

    <div v-if="loading" class="loading-message">Cargando posts...</div>
    <div v-if="error" class="error-message">{{ error }}</div>

    <div v-if="posts.length > 0" class="posts-grid">
      <template v-for="post in posts" :key="post.documentId" class="article-card">
        <PostCard :post="post"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
// Asumiendo que tienes un servicio para obtener los posts (wordpressService o strapiService)
import wordpressService from '../services/wordpressService'; // O strapiService
import PostCard from './PostCard.vue';

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

// Funciones auxiliares (podrían estar en un archivo utils)
const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options); // Formato español
};

const stripHtml = (html) => {
  if (!html) return '';
  let doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

// Función para color placeholder (si la usas)
const getRandomColor = () => {
  const letters = '89ABCDEF'; // Colores más claros para placeholder sobre fondo oscuro
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}


onMounted(async () => {
  try {
    loading.value = true;
    error.value = null;
    // Llama a tu servicio para obtener los posts
    const fetchedPosts = await wordpressService.getPosts();
    posts.value = fetchedPosts;
  } catch (err) {
    console.error("Error fetching posts:", err);
    error.value = 'No se pudieron cargar las noticias. Inténtalo de nuevo más tarde.';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>

</style>