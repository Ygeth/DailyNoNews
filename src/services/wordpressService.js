import axios from 'axios';
import postTransformer from './postTransformer';

const WORDPRESS_API_URL = 'https://public-api.wordpress.com/rest/v1.1/sites/dailynonoticias.wordpress.com'; // Reemplaza con tu URL de Wordpress

const strapiService = {
  async getPosts() {
    try {
      const response = await axios.get(`${WORDPRESS_API_URL}/posts?page=1`);
      let posts = postTransformer.fromWorpressList(response.data.posts)
      return posts;
    } catch (error) {
      throw new Error('Error al obtener los posts: ' + error.message);
    }
  },
  
  async getPostById(postId) {
    try {
      const response = await axios.get(`${WORDPRESS_API_URL}/posts/${postId}`);
      let post = postTransformer.fromWordpress(response.data)
      return post;
    } catch (error) {
      throw new Error('Error al obtener el post: ' + error.message);
    }
  },

  async getCategories() { 
    try {
      const response = await axios.get(`${WORDPRESS_API_URL}/categories`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener las categorías: ' + error.message);
    }
  },

  async getPostsByCategory(category) {
    try {
      const response = await axios.get(`${WORDPRESS_API_URL}/posts?category=${category}`);
      let posts = postTransformer.fromWorpressList(response.data.posts)
      return posts;
    } catch (error) {
      throw new Error('Error al obtener los posts por categoría: ' + error.message);
    }
  },

  async createCategory(category) { // requires authentication
    try {
      const response = await axios.post(`${WORDPRESS_API_URL}/categories/new`, category);
      return response.data;
    } catch (error) {
      throw new Error('Error al crear la categoría: ' + error.message);
    }
  },

  async getStockAnalysisBySymbol(symbol) {
    getPostsByCategory("stockanalysis")
  },
};

export default strapiService;
