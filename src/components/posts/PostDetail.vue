<template>
  <div class="post-detail container py-8">
    <div v-if="loading" class="loading">Cargando detalles del post...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <div v-else-if="post" class="post-detail">
      <div v-if="post.categories && post.categories.length > 0" class="category-tag">
        {{ post.categories[0] }}
      </div>
      <h1 class="title-h1">{{ post.title }}</h1>
      <div class="post-meta">
        <span class="time">{{ formatTimeAgo(post.createdAt) }}</span>
      </div>
      <div class="mb-8 mt-6">
        <img 
          v-if="post.img_url" 
          :src="post.img_url" 
          :alt="post.title"
          class="w-full h-auto max-h-[500px] object-cover"
        />
      </div>
      <div class="post-content" v-html="post.content"></div>
    </div>
    <div v-else class="error-message">
      Post no encontrado.
    </div>
  </div>
</template>

<script>
// import strapiService from '../services/strapiService';
import wordpressService from '@/services/wordpressService';

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      post: null,
      loading: false,
      error: null,
    };
  },
  mounted() {
    this.fetchPost();
  },
  methods: {
    async fetchPost() {
      this.loading = true;
      this.error = null;
      try {
        this.post = await wordpressService.getPostById(this.id);
      } catch (err) {
        this.error = err.message;
        console.error("Error al obtener los detalles del post:", err);
      } finally {
        this.loading = false;
      }
    },
    formatTimeAgo(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMinutes = Math.floor((now - date) / 1000 / 60);
      
      if (diffInMinutes < 1) return 'ahora';
      if (diffInMinutes < 60) return `${diffInMinutes} minutos`;
      
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return `${diffInHours} horas`;
      
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 30) return `${diffInDays} días`;
      
      const diffInMonths = Math.floor(diffInDays / 30);
      if (diffInMonths < 12) return `${diffInMonths} meses`;
      
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  },
};
</script>

<style scoped>
/* Add component-specific styles here if needed */
.post-detail {
  max-width: 52rem;
  margin: auto;
  padding: 1rem;
}
</style>
