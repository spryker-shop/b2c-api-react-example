import { create } from 'apisauce';
import { config } from '@configs/server';
import { TAccessToken } from '@interfaces/login';

const api = create({
    baseURL: config.API_URL,
    headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/json',
        'Accept-Language': 'en',
    },
});

export const nodeApi = create({baseURL: `http://localhost:${config.WEB_PORT}/nodeServer/`});

export const setAuthToken = (userAuth: TAccessToken) => api.setHeader('Authorization', 'Bearer ' + userAuth);
export const removeAuthToken = () => api.deleteHeader('Authorization');

export default api;
