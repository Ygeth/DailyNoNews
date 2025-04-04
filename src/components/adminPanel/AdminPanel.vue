<template>
  <div class="admin-panel">
    <h1>Admin Panel - WordPress Store Playground</h1>

    <section>
      <h2>Fetch Posts</h2>
      <button @click="fetchPosts" :disabled="loading">
        {{ loading ? 'Loading...' : 'Fetch Posts' }}
      </button>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="posts.length > 0">
        <h3>Posts:</h3>
        <ul>
          <li v-for="post in posts" :key="post.documentId">
            {{ post.title }} (ID: {{ post.documentId }})
          </li>
        </ul>
      </div>
    </section>

    <section>
      <h2>Fetch Post by ID</h2>
      <input type="number" v-model="postId" placeholder="Post ID" />
      <button @click="fetchPostById" :disabled="loading">
        {{ loading ? 'Loading...' : 'Fetch Post' }}
      </button>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="selectedPost">
        <h3>Selected Post:</h3>
        <p>Title: {{ selectedPost.title }}</p>
        <p>Content: {{ selectedPost.content }}</p>
      </div>
    </section>

    <section>
      <h2>Fetch Categories</h2>
      <button @click="fetchCategories" :disabled="loading">
        {{ loading ? 'Loading...' : 'Fetch Categories' }}
      </button>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="categoryList.length > 0">
        <h3>Categories:</h3>
        <ul>
          <li v-for="category in categoryList" :key="category">
            id: {{category.ID}} - name:{{ category.name }} - slug:{{ category.slug }} ({{ category.post_count }} posts)
          </li>
        </ul>
      </div>
    </section>

    <section>
      <h2>Fetch Posts by Category</h2>
      <select v-model="selectedCategory">
        <option value="">Select a category</option>
        <option v-for="category in categoryList" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
      <button @click="fetchPostsByCategory" :disabled="loading || !selectedCategory">
        {{ loading ? 'Loading...' : 'Fetch Posts by Category' }}
      </button>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="posts.length > 0">
        <h3>Posts by Category:</h3>
        <ul>
          <li v-for="post in posts" :key="post.documentId">
            {{ post.title }} (ID: {{ post.documentId }})
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { useWordpressStore } from '@/stores/wordpressStore';
import { onMounted, ref, computed } from 'vue';

export default {
  name: 'AdminPanel',
  setup() {
    const wordpressStore = useWordpressStore();

    const posts = computed(() => wordpressStore.getPosts);
    const loading = computed(() => wordpressStore.isLoading);
    const error = computed(() => wordpressStore.getError);
    const categoryList = computed(() => wordpressStore.getCategoryList);

    const postId = ref(null);
    const selectedPost = ref(null);
    const selectedCategory = ref('');

    const fetchPosts = async () => {
      await wordpressStore.fetchPosts();
    };

    const fetchPostById = async () => {
      if (postId.value) {
        selectedPost.value = await wordpressStore.fetchPostById(postId.value);
      }
    };

    const fetchCategories = async () => {
      await wordpressStore.fetchCategories();
    };

    const fetchPostsByCategory = async () => {
      if (selectedCategory.value) {
        await wordpressStore.fetchPostsByCategory(selectedCategory.value);
      }
    };

    onMounted(async () => {
      await fetchCategories();
      await fetchPosts();
    });

    return {
      posts,
      loading,
      error,
      categoryList,
      postId,
      selectedPost,
      selectedCategory,
      fetchPosts,
      fetchPostById,
      fetchCategories,
      fetchPostsByCategory,
    };
  },
};
</script>

<style scoped>
.admin-panel {
  padding: 20px;
  font-family: sans-serif;
}

section {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
