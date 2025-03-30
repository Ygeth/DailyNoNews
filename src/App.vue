<template>
  <div id="app" class="body-style" :style="backgroundStyle">
    <header class="py-4 headerStyle border-b border-b-blue-400">
      <div class="container flex items-center">
        <img src="./assets/posibles-logos/logo.png" alt="SinapsisHub Logo" class="logo mr-4" />
        <h1 class="title-h1 mb-0">SinapsisHub</h1>
      </div>
    </header>
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

<script>
export default {
  name: 'App',
  computed: {
    backgroundStyle() {
      return {
        background: 'linear-gradient(to bottom, #022f5f, #000000)',
        // backgroundImage: 'url(@/assets/background-pattern.png)',
        // backgroundImage: 'url(@/assets/background-pattern.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      };
    }
  }
};
</script>

<style scoped>
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