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
import { ref, onMounted, computed } from 'vue';
// import wordpressService from '../services/wordpressService'; // O strapiService
import PostCard from '@/components/Posts/PostCard.vue';
import { useWordpressStore } from '@/stores/wordpressStore';
const wordpressStore = useWordpressStore();

const posts = computed(() => wordpressStore.getPosts);
const loading = computed(() => wordpressStore.isLoading);
const error = computed(() => wordpressStore.getError);

onMounted(async () => {
  try {
    loading.value = true;
    error.value = null;
    // Llama a tu servicio para obtener los posts
    wordpressStore.fetchPosts(); 

    // const fetchedPosts = await wordpressService.getPosts();
    // posts.value = fetchedPosts;
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