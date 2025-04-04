<template>
  <div class="home">
    <LatestPost />
    <section class="categorized-news">
      <div class="container">
        <h2 class="section-title">Noticias por Categoría</h2>
        <div v-if="categoriesLoading" class="loading-message">Cargando categorías...</div>
        <div v-if="categoriesError" class="error-message">{{ categoriesError }}</div>
        <div v-for="category in categoryList" :key="category.slug" class="category-section">
          <h3 class="category-title">
            <router-link :to="{ name: 'Category', params: { category: category.slug } }">
              {{ category.name }}
            </router-link>
          </h3>
          <div v-if="categoryPostsLoading[category.slug]" class="loading-message">Cargando noticias...</div>
          <div v-if="categoryPostsError[category.slug]" class="error-message">{{ categoryPostsError[category.slug] }}</div>
          <div v-if="categoryPosts[category.slug] && categoryPosts[category.slug].length > 0" class="posts-grid">
            <PostCard v-for="post in categoryPosts[category.slug]" :key="post.documentId" :post="post" />
          </div>
          <div v-else-if="!categoryPostsLoading[category.slug] && !categoryPostsError[category.slug]">
            <p>No hay noticias en esta categoría.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useWordpressStore } from '@/stores/wordpressStore';
import PostCard from '@/components/Posts/PostCard.vue';
import LatestPost from '@/components/Posts/LatestPost.vue';

const wordpressStore = useWordpressStore();

// Categories
const categoryList = computed(() => wordpressStore.getCategoryList);
const categoriesLoading = ref(false);
const categoriesError = ref(null);

// Category Posts
const categoryPosts = reactive({});
const categoryPostsLoading = reactive({});
const categoryPostsError = reactive({});

const fetchLatestPosts = async () => {
  try {
    await wordpressStore.fetchPosts();
  } catch (err) {
    console.error('Error fetching latest posts:', err);
  }
};

const fetchCategoryPosts = async (category) => {
  categoryPostsLoading[category] = true;
  categoryPostsError[category] = null;
  try {
    // Fetch all posts for the category
    await wordpressStore.fetchPostsByCategory(category);
    // Get the last two posts
    categoryPosts[category] = wordpressStore.getPosts.slice(0, 2);
  } catch (err) {
    console.error(`Error fetching posts for category ${category}:`, err);
    categoryPostsError[category] = 'Error al cargar las noticias de esta categoría.';
  } finally {
    categoryPostsLoading[category] = false;
  }
};

const fetchCategories = async () => {
  categoriesLoading.value = true;
  categoriesError.value = null;
  try {
    await wordpressStore.fetchCategories();
  } catch (err) {
    console.error('Error fetching categories:', err);
    categoriesError.value = 'Error al cargar las categorías.';
  } finally {
    categoriesLoading.value = false;
  }
};

onMounted(async () => {
  await fetchCategories();
  // Fetch posts for each category
  // for (const category of categoryList.value) {
  //   await fetchCategoryPosts(category.slug);
  // }
});
</script>

<style scoped>
.section-title {
  margin-bottom: 1rem;
}

.category-section {
  margin-bottom: 2rem;
}

.category-title {
  margin-bottom: 0.5rem;
}
</style>
