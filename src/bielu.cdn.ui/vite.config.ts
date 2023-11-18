import {resolve} from "path";
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            formats: ['es']
        },
        outDir: './App_Plugins/bielu.Cdn.UI/',
        emptyOutDir: true
    }
})
