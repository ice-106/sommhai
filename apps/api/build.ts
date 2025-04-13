import { execSync } from 'child_process';
import { build } from 'esbuild';
import { Plugin } from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import fs from 'fs';

// https://github.com/evanw/esbuild/issues/1311
const jsdomPatch: Plugin = {
  name: 'jsdom-patch',
  setup(build) {
    build.onLoad({ filter: /jsdom\/living\/xhr\/XMLHttpRequest-impl\.js$/ }, async (args) => {
      let contents = await fs.promises.readFile(args.path, 'utf8');
      contents = contents.replace(
        'const syncWorkerFile = require.resolve ? require.resolve("./xhr-sync-worker.js") : null;',
        `const syncWorkerFile = "${require.resolve('jsdom/lib/jsdom/living/xhr/xhr-sync-worker.js')}";`,
      );
      return { contents, loader: 'js' };
    });
  },
};

async function main() {
  const appVersion = execSync('git describe --exact-match --tags 2>/dev/null || git rev-parse --short HEAD')
    .toString()
    .trim();

  await build({
    entryPoints: ['./src/index.ts'],
    minify: true,
    bundle: true,
    target: 'node20',
    outfile: './build/index.js',
    platform: 'node',
    define: {
      __APP_VERSION__: JSON.stringify(appVersion),
    },
    plugins: [
      jsdomPatch,
      copy({
        assets: [
          {
            from: ['./node_modules/prisma/*.node'],
            to: ['./'],
          },
          {
            from: ['./prisma/schema.prisma'],
            to: ['./'],
          },
          {
            from: [
              './node_modules/swagger-ui-dist/swagger-ui-bundle.js',
              './node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js',
              './node_modules/swagger-ui-dist/swagger-ui.css',
            ],
            to: ['./'],
          },
        ],
      }),
    ],
  });
}
main();
