<!-- filepath: c:\work\Mio\dailyNoNews\daily-nonews-front\src\components\stockAnalysis\stockAnalysis.vue -->
<template>
  <div class="stock-analysis">
    <h1>Stock Analysis</h1>
    <div class="stock-cards">
      <div
        v-for="symbol in stockSymbols"
        :key="symbol"
        class="stock-card"
        @click="fetchLatestPost(symbol)"
      >
        {{ symbol }}
      </div>
    </div>
    <div class="latest-post" v-if="latestPost">
      <h2>Latest Post for {{ selectedSymbol }}</h2>
      <h3>{{ latestPost.title }}</h3>
      <p>{{ latestPost.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stockSymbols: ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA"], // Lista de símbolos de stock
      selectedSymbol: null,
      latestPost: null,
    };
  },
  methods: {
    async fetchLatestPost(symbol) {
      this.selectedSymbol = symbol;
      try {
        const response = await fetch(
          `https://your-wordpress-site.com/wp-json/wp/v2/posts?search=${symbol}&per_page=1`
        );
        const posts = await response.json();
        if (posts.length > 0) {
          this.latestPost = {
            title: posts[0].title.rendered,
            content: posts[0].content.rendered,
          };
        } else {
          this.latestPost = { title: "No posts found", content: "" };
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        this.latestPost = { title: "Error fetching posts", content: "" };
      }
    },
  },
};
</script>

<style scoped>
.stock-analysis {
  padding: 20px;
}

.stock-cards {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.stock-card {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f9f9f9;
  transition: background-color 0.3s;
}

.stock-card:hover {
  background-color: #e0e0e0;
}

.latest-post {
  margin-top: 20px;
}

.latest-post h2 {
  margin-bottom: 10px;
}
</style>