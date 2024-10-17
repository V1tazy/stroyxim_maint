import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// ����������� ����� � ����� �������
const serverHost = 'http://localhost'; // ��� ���������� �������
const serverPort = 8080; // ����, �� ������� �������� ������

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
        https: true // ���� �� ��������� HTTPS
    }
});