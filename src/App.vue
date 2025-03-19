<template>
  <div id="app" class="body-style">
    <header class="bg-gray-100 py-4 border-b border-gray-200">
      <div class="container">
        <h1 class="title-h1 mb-0">Daily NoNews</h1>
      </div>
    </header>
    <main>
      <router-view />  
    </main>
    <footer class="bg-gray-100 py-4 mt-8 border-t border-gray-200">
      <div class="container text-center text-gray-500">
        &copy; 2024 Daily NoNews. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script>
// ... (remove PostList import if you only use router-view)
export default {
  name: 'App'
};
</script>



<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
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
