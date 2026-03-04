import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8080',
});

/**
 * Product API services
 */
export const productService = {
    getAll: () => api.get('/products'),
    create: (data) => api.post('/products', data),
    update: (code, data) => api.put(`/products/${code}`, data),
    delete: (code) => api.delete(`/products/${code}`),
    sell: (code) => api.post(`/products/${code}/sell`),
};

/**
 * Raw Material API services
 */
export const materialService = {
    getAll: () => api.get('/raw-materials'),
    create: (data) => api.post('/raw-materials', data),
    update: (code, data) => api.put(`/raw-materials/${code}`, data),
    delete: (code) => api.delete(`/raw-materials/${code}`),
};

/**
 * Production and Composition API services
 */
export const productionService = {
    getDashboard: () => api.get('/production/suggest'),
    associate: (data) => api.post('/compositions', data),
};

export default api;