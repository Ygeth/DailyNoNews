<template>
  <article class="post-card cursor-pointer" @click="navigateToPost(post.documentId)">
    <div v-if="post.img_url" class="post-card-image">
      <img :src="post.img_url" :alt="post.title" width="200px" height="150px"/>
    </div>
    <div class="post-card-content">
      <div v-if="post.categories && post.categories.length > 0" class="category-tag">
        {{ post.categories[0] }}
      </div>
      <h3 class="title-h3 text-gray-800"> {{ post.title }} </h3>
      <!-- <p class="text-gray-600 text-sm line-clamp-5" v-html="post.content"></p> -->
      <div class="post-meta">
        <span class="time">hace {{ formatTimeAgo(post.createdAt) }}</span>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    post: { type: Object, required: true }
  },
  methods: {
    navigateToPost(postId) {
      this.$router.push({ name: 'PostDetail', params: { id: postId } });
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
  }
}
</script>

<style>
.title-h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0.5rem 0;
  color: green;
}

.post-card {
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  display: flex;
  flex-wrap: wrap;
}

.post-card:hover {
  transform: translateY(-5px);
}
.post-card-content {
  padding: 1rem;
}
</style>