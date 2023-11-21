import {resolve} from "path";
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets'
import basicSsl from '@vitejs/plugin-basic-ssl'
// https://vitejs.dev/config/
import { cert, key } from "./build/certs"
export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            formats: ['es']
        },
        outDir: './App_Plugins/bielu.Cdn.UI/',
        emptyOutDir: true
    },
    server: {
        https: {
            cert: cert,
            key: key
        },
        hmr: {
            clientPort: 5173 //Always use default port, ASP.NET doesn't seem to proxy websocket properly.
        }
    },
})
