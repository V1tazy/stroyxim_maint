import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// Определение хоста и порта сервера
const serverHost = 'http://localhost'; // Имя контейнера сервера
const serverPort = 8080; // Порт, на котором работает сервер

export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': '/src',
        }
    },
    server: {
        proxy: {
            // 
            '^/api': {
                target: `${serverHost}:${serverPort}`,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '') 
            }
        },
        port: 5173,
        https: false // Если не требуется HTTPS
    }
});