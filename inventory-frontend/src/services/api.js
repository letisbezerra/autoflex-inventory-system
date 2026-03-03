import axios from 'axios';

const api = axios.create({
    // URL do seu backend Quarkus
    baseURL: 'http://localhost:8080',
});

// Services based on your Swagger UI definitions
export const productService = {
    getAll: () => api.get('/products'),
    create: (data) => api.post('/products', data),
    update: (id, data) => api.put(`/products/${id}`, data),
    delete: (id) => api.delete(`/products/${id}`),
    sell: (id) => api.post(`/products/${id}/sell`),
};

export const materialService = {
    getAll: () => api.get('/raw-materials'),
    create: (data) => api.post('/raw-materials', data),
    update: (id, data) => api.put(`/raw-materials/${id}`, data),
    delete: (id) => api.delete(`/raw-materials/${id}`),
};

export const productionService = {
    getDashboard: () => api.get('/production/suggest'),
    associate: (data) => api.post('/compositions', data),
};

export default api;