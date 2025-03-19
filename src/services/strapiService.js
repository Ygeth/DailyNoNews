import axios from 'axios';

const STRAPI_API_URL = 'http://localhost:1337'; // Reemplaza con tu URL de Strapi

const strapiService = {
  async getPosts() {
    try {
      const response = await axios.get(`${STRAPI_API_URL}/api/posts?populate=*`);
      return response.data.data;
    } catch (error) {
      throw new Error('Error al obtener los posts: ' + error.message);
    }
  },
  
  async getPostById(documentId) {
    try {
      const response = await axios.get(`${STRAPI_API_URL}/api/posts/${documentId}?populate=*`);
      return response.data.data;
    } catch (error) {
      throw new Error('Error al obtener el post: ' + error.message);
    }
  }
};

export default strapiService;
