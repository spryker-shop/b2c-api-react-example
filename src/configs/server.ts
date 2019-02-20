export const config = {
  API_URL: process.env.API_URL ? `${process.env.API_URL}` : 'http://localhost:8080/api/',
  WEB_PATH: process.env.WEB_PATH ? `${process.env.WEB_PATH }` : '/',
  WEB_PORT: process.env.WEB_PORT ? parseInt(process.env.WEB_PORT, 10) : 3000,
};

export default config;
