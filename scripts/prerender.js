// Gera o HTML final da landing no momento do build.
//
// Sem isto, o corpo da pagina chegaria vazio e so o JavaScript montaria o
// conteudo. Numa landing de Google Ads isso pesa duas vezes: o robo de
// qualidade do Ads le a pagina, e o visitante ve tela branca enquanto o JS
// carrega — justamente no clique que foi pago.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const arquivoHtml = path.join(raiz, 'dist', 'index.html');

const { render } = await import(path.join(raiz, 'dist-ssr', 'entry-server.js'));

if (!fs.existsSync(arquivoHtml)) {
  console.error('dist/index.html nao existe. Rode o build do cliente antes deste script.');
  process.exit(1);
}

const html = fs.readFileSync(arquivoHtml, 'utf-8');
const corpo = render();

if (!html.includes('<div id="root"></div>')) {
  console.error('Nao encontrei <div id="root"></div> no dist/index.html — o HTML mudou de forma?');
  process.exit(1);
}

fs.writeFileSync(arquivoHtml, html.replace('<div id="root"></div>', `<div id="root">${corpo}</div>`));
console.log(`  ✓ HTML pre-renderizado (${(corpo.length / 1024).toFixed(0)} KB de conteudo)`);
