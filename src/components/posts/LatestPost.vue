<template>
  <section class="latest-news">
      <div class="container">
        <h2 class="section-title">Últimas Noticias</h2>
        <div v-if="latestPostsLoading" class="loading-message">Cargando noticias...</div>
        <div v-if="latestPostsError" class="error-message">{{ latestPostsError }}</div>
        <!-- <div v-if="latestPosts.length > 0" class="posts-grid"> -->
          <PostCard v-for="post in latestPosts.slice(0,1)" :key="post.documentId" :post="post" />
        <!-- </div> -->
      </div>
    </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useWordpressStore } from '@/stores/wordpressStore';
import PostCard from '@/components/Posts/PostCard_v2.vue';


const wordpressStore = useWordpressStore();
// Latest Posts
const latestPosts = computed(() => wordpressStore.getPosts.slice(0, 5)); // Get the first 3 posts
const latestPostsLoading = computed(() => wordpressStore.isLoading);
const latestPostsError = computed(() => wordpressStore.getError);

const fetchLatestPosts = async () => {
  try {
    await wordpressStore.fetchPosts();
  } catch (err) {
    console.error('Error fetching latest posts:', err);
  }
};


onMounted(async () => {
  await fetchLatestPosts();
});
</script>
