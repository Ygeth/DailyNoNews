<template>
  <div class="container">
    <h1 class="page-title">Noticias de {{ category }}</h1>

    <div v-if="loading" class="loading-message">Cargando posts...</div>
    <div v-if="error" class="error-message">{{ error }}</div>

    <div v-if="posts.length > 0" class="posts-grid">
      <template v-for="post in posts" :key="post.documentId" class="article-card">
        <PostCard :post="post" />
      </template>
    </div>
    <div v-else-if="!loading && !error">
      <p>No hay noticias en esta categoría.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import PostCard from '@/components/posts/PostCard.vue';
import { useWordpressStore } from '@/stores/wordpressStore';

const route = useRoute();
const wordpressStore = useWordpressStore();

// Get the category from the route params
const category = computed(() => route.params.category);

// Get the posts, loading, and error from the store
const posts = computed(() => wordpressStore.getPosts);
const loading = computed(() => wordpressStore.isLoading);
const error = computed(() => wordpressStore.getError);

onMounted(async () => {
  try {
    // Fetch posts by category when the component is mounted
    await wordpressStore.fetchPostsByCategory(category.value);
  } catch (err) {
    console.error(`Error fetching posts by category ${category.value}:`, err);
  }
});

// Watch for changes in the category and fetch posts accordingly
watch(category, async (newCategory) => {
  try {
    await wordpressStore.fetchPostsByCategory(newCategory);
  } catch (err) {
    console.error(`Error fetching posts by category ${newCategory}:`, err);
  }
});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
