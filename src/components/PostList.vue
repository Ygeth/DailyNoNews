<template>
  <div class="container py-8">
    <h1 class="title-h1">Actualidad</h1>
    <div v-if="loading" class="loading">Cargando posts...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    
        <!-- Lista de posts-->
    <div v-else class="posts-grid">
      <div v-for="post in posts" :key="post.documentId" :post="post">
        <PostCard :post="post"/>
      </div> 
      
    </div> 

    <!-- Lista de posts-->
    <!-- <div v-else class="posts-list">
      <div v-for="post in posts" :key="post.documentId" :post="post">
        <PostCard :post="post"/>
      </div> 
      
    </div>  -->


  </div>
</template>

<script>
// Remove axios import:  import axios from 'axios';
import strapiService from '../services/strapiService'; // Import the service
import PostCard from './PostCard.vue';

export default {
  data() {
    return {
      posts: [],
      loading: false,
      error: null,
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      this.loading = true;
      this.error = null;
      try {
        this.posts = await strapiService.getPosts(); // Use the service method
      } catch (err) {
        this.error = err.message; // Error message from service
        console.error("Error al obtener los posts:", err);
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
  components: {
    PostCard,
  },
};
</script>



<style scoped>
/* Add component-specific styles here if needed */

.posts-grid {
  display: grid;
  grid-column: 1;
  /* grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: auto; */
  gap: 1.5rem;
  
}

.posts-list {
  display: flex;
  flex-direction: column;
  /* grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); */
  gap: 1.5rem;
}


</style>
