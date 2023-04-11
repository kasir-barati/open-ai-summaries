import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    // define: {
    //     'process.env': {},
    // },
    // build: {
    //     emptyOutDir: true,
    //     outDir: resolve(__dirname, 'dist'),
    //     lib: {
    //         formats: ['iife'],
    //         entry: resolve(__dirname, './src/main.tsx'),
    //         name: 'Open AI Summaries',
    //     },
    //     rollupOptions: {
    //         output: {
    //             entryFileNames: 'index.js',
    //             extend: true,
    //         },
    //     },
    // },
});
