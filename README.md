# Landing de câmara fria — Refrigóis

Página de vendas única, sem menu, feita para receber tráfego pago do Google Ads
e converter em contato. É um projeto **separado** do site principal
(`diegoandradegit/Refrigois`), para que experimento de anúncio não encoste na
estrutura de SEO e no sitemap do site que já está indexado.

## Como funciona

- Uma página só, nove blocos (hero com formulário à vista, segmentos, custo do
  erro, método, obras, diferenciais, ficha técnica, FAQ, fechamento).
- HTML gerado no build (`scripts/prerender.js`), não montado pelo JavaScript no
  navegador — o robô de qualidade do Ads lê a página e o visitante não vê tela
  branca no clique pago.
- `noindex, follow`: a landing não disputa a busca orgânica com as páginas de
  serviço do site principal, que já estão indexadas.

## Formulário

Envia para a Edge Function `lead-landing` no Supabase, que grava na tabela
`leads` com `origem = 'landing-camara-fria'` — a mesma tabela usada pelo
assistente do site, para o painel ler tudo em um lugar só.

Para apontar para outro endpoint, defina `VITE_ENDPOINT_LEAD` nas variáveis de
ambiente do Netlify.

## Comandos

```
npm install
npm run dev      # desenvolvimento
npm run build    # cliente + SSR + HTML pré-renderizado
```

## Pendências

- Conversão do Google Ads: o formulário dispara o evento `gerar_lead` no
  dataLayer. Falta criar a conversão na conta de Ads apontando para esse evento.
- Domínio: hoje roda no endereço do Netlify. O `canonical` e a imagem de
  compartilhamento já apontam para `refrigois.com.br/camara-fria/` — ajustar se
  o endereço final for outro.
