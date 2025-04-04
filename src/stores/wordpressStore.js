// src/stores/wordpressStore.js

import { defineStore } from 'pinia';
import wordpressService from '../services/wordpressService';

export const useWordpressStore = defineStore('wordpress', {
  state: () => ({
    posts: [],
    loading: false,
    error: null,
    categoryList: [],
  }),
  getters: {
    getPosts: (state) => state.posts,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
    getCategoryList: (state) => state.categoryList,
  },
  actions: {
    async fetchPosts() {
      this.loading = true;
      this.error = null;
      try {
        const fetchedPosts = await wordpressService.getPosts();
        this.posts = fetchedPosts;
      } catch (err) {
        console.error('Error fetching posts:', err);
        this.error = 'No se pudieron cargar las noticias. Inténtalo de nuevo más tarde.';
      } finally {
        this.loading = false;
      }
    },
    async fetchPostById(postId) {
      this.loading = true;
      this.error = null;
      try {
        const fetchedPost = await wordpressService.getPostById(postId);
        return fetchedPost;
      } catch (err) {
        console.error(`Error fetching post with ID ${postId}:`, err);
        this.error = `No se pudo cargar la noticia con ID ${postId}. Inténtalo de nuevo más tarde.`;
        return null;
      } finally {
        this.loading = false;
      }
    },
    async fetchPostsByCategory(category) {
      this.loading = true;
      this.error = null;
      try {
        const fetchedPosts = await wordpressService.getPostsByCategory(category);
        this.posts = fetchedPosts;
      } catch (err) {
        console.error(`Error fetching posts by category ${category}:`, err);
        this.error = `No se pudieron cargar las noticias de la categoría ${category}. Inténtalo de nuevo más tarde.`;
      } finally {
        this.loading = false;
      }
    },
    async fetchCategories() {
      this.loading = true;
      this.error = null;
      try {
        const fetchedCategories = await wordpressService.getCategories();
        // Process the categories to extract the names.
        this.categoryList = fetchedCategories.categories;
      } catch (err) {
        console.error('Error fetching categories:', err);
        this.error = 'No se pudieron cargar las categorías. Inténtalo de nuevo más tarde.';
      } finally {
        this.loading = false;
      }
    }
    
  },
});