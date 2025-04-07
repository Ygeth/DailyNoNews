<template>
  <div id="app" class="body-style" :style="backgroundStyle">
    <header class="py-4 headerStyle ">
      <div @click="navigateTo('Home')" class="cursor-pointer container flex items-center">
        <img src="./assets/posibles-logos/logo.png" alt="SinapsisHub Logo" class="logo mr-4" />
        <h1 class="title-h1 mb-0">SinapsisHub</h1>
      </div>
    </header>
    <section class="categories">
      <div class="container">
        <span v-for="category in categoryList" :key="category" class="categories-link">
          <!-- <router-link :to="{ name: 'category', params: { category } }">{{ category.name }}</router-link> -->
          <span @click="navigateToCategory(category.name)">{{ category.name }}</span>
        </span>
        <span  class="categories-link" @click="navigateTo('AdminPanel')">AdminPanel</span>
        <span  class="categories-link" @click="navigateTo('StockAnalysis')">Stock Analysis</span>
      </div>
    </section>
    <main>
      <router-view />  
    </main>
    <footer class="py-4 mt-8 border-t border-blue-400">
      <div class="container text-center text-gray-500">
        &copy; 2025 SinapsisHub. All rights reserved.
      </div>
    </footer>
  </div>
</template>
<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useWordpressStore } from '@/stores/wordpressStore';

const router = useRouter();
const wordpressStore = useWordpressStore();
const categoryList = computed(() => wordpressStore.getCategoryList);
const loading = computed(() => wordpressStore.getLoading);
const error = computed(() => wordpressStore.getError);

const navigateToCategory = (category) => {
  router.push({ name: 'Category', params: { category } });
};
const navigateTo = (name) => {
  router.push({ name }); 
};


const backgroundStyle = computed(() => ({
  background: 'linear-gradient(to bottom, #022f5f, #000000)',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
}));


onMounted(async () => {
  try {
    // Llama a tu servicio para obtener los posts
    wordpressStore.fetchCategories(); 

    // const fetchedPosts = await wordpressService.getPosts();
    // posts.value = fetchedPosts;
  } catch (err) {
    console.error("Error fetching categorias:", err);
    error.value = 'No se pudieron cargar las noticias. Inténtalo de nuevo más tarde.';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.categories-link {
  cursor: pointer;
  padding-right: 1rem;
}
.categories{
  background-color: #0676c2;
}
.headerStyle {
  background-color: #00152b;
}
.logo {
  height: 8em;
  /* padding: 1.5em; */
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>