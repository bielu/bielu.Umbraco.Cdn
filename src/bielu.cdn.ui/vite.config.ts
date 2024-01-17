import {resolve} from "path";
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts'
// https://vitejs.dev/config/
import { cert, key } from "./build/certs"
export default defineConfig({
    plugins: [   dts(),vue({
        template: {
            compilerOptions: {
                // treat all tags with a dash as custom elements
                isCustomElement: (tag) => true
            }
        }
    })],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            name: "BieluCdnUi",
            fileName: "bielu.cdn.ui"
        },
        outDir: './wwwroot/App_Plugins/bielu.Cdn.UI/',
        emptyOutDir: false,
        target: 'esnext',
     
    },
    define: {
        'process.env': {}
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
    resolve: {
        alias: {
            "@": resolve(__dirname, "src")
        }
    }
});