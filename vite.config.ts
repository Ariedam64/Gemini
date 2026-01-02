import { defineConfig, ViteDevServer, HmrContext, ModuleNode, Plugin } from 'vite';
import monkey from 'vite-plugin-monkey';

function geminiHmrPlugin(): Plugin {
    let manualReload = false;
    return {
        name: 'gemini-hmr-control',
        handleHotUpdate({ server, modules }: HmrContext): ModuleNode[] | void {
            if (manualReload) {
                server.ws.send({
                    type: 'custom',
                    event: 'gemini:update-pending',
                    data: { timestamp: Date.now() }
                });
                return []; // Block HMR
            }
            return modules;
        },
        configureServer(server: ViteDevServer) {
            server.ws.on('gemini:toggle-manual-hmr', (data: { enabled: boolean }) => {
                manualReload = !!data.enabled;
            });
            server.ws.on('gemini:force-reload', () => {
                server.ws.send({ type: 'full-reload' });
            });
        }
    };
}

export default defineConfig({
    plugins: [
        geminiHmrPlugin(),
        monkey({
            entry: 'src/main.ts',
            userscript: {
                name: 'Gemini',
                namespace: 'Gemini',
                version: '1.0.0',
                match: [
                    'https://1227719606223765687.discordsays.com/*',
                    'https://magiccircle.gg/r/*',
                    'https://magicgarden.gg/r/*',
                    'https://starweaver.org/r/*'
                ],
                'run-at': 'document-start',
                'inject-into': 'page',
                license: false as any,
                grant: [
                    'GM_xmlhttpRequest',
                    'GM_info',
                    'GM_getValue',
                    'GM_setValue',
                    'GM_openInTab',
                    'GM_registerMenuCommand'
                ],
                resource: {
                    ICON: 'https://imgur.com/a/nf1ZKbp'
                },
                connect: ['i.imgur.com']
            },
            build: {
                fileName: 'gemini.user.js',
                // @ts-ignore
                cssSideEffects: (css) => {
                    if (!css) return '';
                    return `(function() { const style = document.createElement('style'); style.textContent = ${JSON.stringify(css)}; document.head.appendChild(style); })();`;
                }
            },
            server: {
                mountGmApi: true
            }
        }),
    ],
    build: {
        minify: true,
        target: 'es2020'
    }
});
