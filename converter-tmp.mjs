import sharp from 'sharp';
import fs from 'node:fs';

// Cada foto vira duas larguras em WebP. A pagina e paga por clique: JPG de
// celular tem varios MB e derrubaria o carregamento.
const mapa = [
  ['128559.jpg', 'camara-dupla-resfriado-congelado'],
  ['128562.jpg', 'autosservico-bebidas-mercado'],
  ['154385.jpg', 'montagem-paineis-expositora'],
  ['154382.jpg', 'camara-expositora-conveniencia'],
  ['128570.jpg', 'camara-expositora-preta'],
  ['154384.jpg', 'montagem-camara-loja'],
  ['154396.jpg', 'expositora-carnes-acougue'],
  ['154397.jpg', 'expositora-bebidas-carnes'],
];

let total = 0;
for (const [origem, slug] of mapa) {
  const entrada = `/mnt/user-data/uploads/${origem}`;
  for (const largura of [640, 1280]) {
    const saida = `public/images/obras/${slug}-${largura}.webp`;
    await sharp(entrada)
      .rotate()
      .resize(largura, null, { withoutEnlargement: true })
      .webp({ quality: 74, effort: 6 })
      .toFile(saida);
    total += fs.statSync(saida).size;
  }
}
console.log(`${mapa.length} fotos, ${mapa.length * 2} arquivos, ${(total / 1024 / 1024).toFixed(2)} MB no total`);
