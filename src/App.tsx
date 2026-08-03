import React from 'react';
import { Formulario } from './Formulario';
import {
  DIFERENCIAIS,
  ERROS,
  ETAPAS,
  FAQ,
  FICHA,
  OBRAS,
  SEGMENTOS,
  TELEFONE,
  linkWhatsApp,
} from './conteudo';

/**
 * Landing de camara fria — pagina unica, sem menu.
 *
 * Regra que vale para o arquivo inteiro: a pagina tem um objetivo so. Nao ha
 * link para o site principal, para o blog nem para o portfolio. Toda saida que
 * nao seja o formulario ou o WhatsApp e conversao perdida.
 *
 * A ordem dos blocos segue o framework aprovado: hero com formulario a vista,
 * qualificacao por segmento, custo do erro, metodo, prova, diferenciais,
 * ficha tecnica, FAQ e fechamento.
 */

const MSG_WHATS = 'Olá! Quero um orçamento de câmara fria.';

/** Imagem responsiva com as duas larguras que geramos para cada foto. */
const Foto: React.FC<{ nome: string; alt: string; className?: string; eager?: boolean }> = ({
  nome,
  alt,
  className,
  eager,
}) => (
  <img
    src={`/images/${nome}-1280.webp`}
    srcSet={`/images/${nome}-640.webp 640w, /images/${nome}-1280.webp 1280w`}
    sizes="(max-width: 640px) 100vw, 400px"
    alt={alt}
    loading={eager ? 'eager' : 'lazy'}
    decoding="async"
    className={className}
  />
);

const Secao: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
}> = ({ children, className = '', id }) => (
  <section id={id} className={`px-5 py-16 sm:px-8 sm:py-20 ${className}`}>
    <div className="mx-auto max-w-6xl">{children}</div>
  </section>
);

const Titulo: React.FC<{ children: React.ReactNode; claro?: boolean }> = ({ children, claro }) => (
  <h2
    className={`mb-3 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl ${
      claro ? 'text-white' : 'text-slate-900'
    }`}
  >
    {children}
  </h2>
);

export const App: React.FC = () => {
  return (
    <div className="bg-white font-sans antialiased">
      {/* ── 1. Hero: promessa, prova de alcance e formulario sem rolar ───── */}
      <header className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <picture className="block h-full w-full">
            <source
              type="image/webp"
              srcSet="/images/camara-frigorifica-industrial-640.webp 640w, /images/camara-frigorifica-industrial-1280.webp 1280w"
              sizes="100vw"
            />
            <img
              src="/images/camara-frigorifica-industrial-1280.webp"
              alt="Câmara frigorífica em painéis isotérmicos instalada pela Refrigóis"
              width={1280}
              height={853}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/90 to-slate-950/95 lg:bg-gradient-to-r lg:from-slate-950 lg:via-slate-950/90 lg:to-slate-950/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="mb-8 flex items-center gap-3">
            <img src="/logo.png" alt="Refrigóis" width={40} height={40} className="h-10 w-auto" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">
              Refrigóis · Maringá, PR
            </span>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_minmax(0,420px)] lg:gap-14">
            <div className="animate-fade-in-up">
              <h1 className="mb-5 text-3xl font-bold leading-[1.15] text-white sm:text-4xl md:text-5xl">
                Câmara fria dimensionada para o seu produto, o seu movimento e o espaço que você
                tem
              </h1>
              <p className="mb-7 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Projeto, fabricação e instalação de câmara fria e câmara frigorífica. Base em
                Maringá, atendimento em todo o Paraná — com obras entregues em Guaíra, Cascavel,
                Londrina e Foz do Iguaçu.
              </p>

              <ul className="mb-8 grid gap-2.5 text-sm text-slate-200 sm:grid-cols-2">
                {[
                  'Cálculo de carga térmica, não estimativa',
                  'Fabricação própria e equipe própria',
                  'Resfriados e congelados',
                  '12 meses de garantia na instalação',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1 text-brand-400">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={linkWhatsApp(MSG_WHATS)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-1 text-sm font-semibold text-brand-300 underline underline-offset-4 transition hover:text-brand-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
              >
                Prefere conversar agora? Chamar no WhatsApp
              </a>
            </div>

            <Formulario id="orcamento-topo" variante="hero" />
          </div>
        </div>
      </header>

      {/* ── 2. Qualificacao: as buscas reais sao "camara fria PARA ..." ──── */}
      <Secao className="bg-slate-50">
        <Titulo>Para o que você precisa conservar</Titulo>
        <p className="mb-8 max-w-2xl text-slate-600">
          Cada operação exige um cálculo diferente. O que muda não é só o tamanho — é a temperatura
          de trabalho, a frequência de abertura da porta e o estado em que o produto entra.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SEGMENTOS.map((s) => (
            <div
              key={s.slug}
              className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-brand-300 hover:shadow-sm"
            >
              <p className="mb-1 font-bold text-slate-900">{s.nome}</p>
              <p className="text-sm leading-relaxed text-slate-600">{s.linha}</p>
            </div>
          ))}
        </div>
      </Secao>

      {/* ── 3. O custo do erro. Bloco assinatura da pagina. ──────────────── */}
      <Secao className="bg-slate-950">
        <Titulo claro>Câmara mal instalada cobra a conta todo mês</Titulo>
        <p className="mb-10 max-w-2xl text-slate-400">
          Nenhum dos erros abaixo aparece no dia da entrega. A câmara funciona, gela, e o problema
          só se manifesta depois — na temperatura que não segura no calor, no compressor que liga
          demais, na conta de energia que sobe sem explicação. São os quatro que mais encontramos
          quando somos chamados para corrigir instalação de terceiros.
        </p>
        <ol className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
          {ERROS.map((item, i) => (
            <li key={item.erro} className="bg-slate-950 p-6 sm:p-7">
              <span
                aria-hidden="true"
                className="mb-3 block font-mono text-xs font-bold text-brand-400"
              >
                erro {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mb-2 text-lg font-bold leading-snug text-white">{item.erro}</p>
              <p className="text-sm leading-relaxed text-slate-400">{item.consequencia}</p>
            </li>
          ))}
        </ol>
      </Secao>

      {/* ── 4. Metodo: etapa com nome proprio e prova de processo ────────── */}
      <Secao>
        <Titulo>Como fazemos</Titulo>
        <p className="mb-10 max-w-2xl text-slate-600">
          O orçamento não sai de tabela. Sai do levantamento — e é por isso que a primeira conversa
          é sobre a sua operação, não sobre o equipamento.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPAS.map((etapa, i) => (
            <div key={etapa.titulo} className="border-t-2 border-brand-500 pt-4">
              <span aria-hidden="true" className="mb-2 block text-xs font-bold text-brand-600">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mb-2 font-bold text-slate-900">{etapa.titulo}</p>
              <p className="text-sm leading-relaxed text-slate-600">{etapa.texto}</p>
            </div>
          ))}
        </div>
      </Secao>

      {/* ── 5. Prova: obra real com foto ─────────────────────────────────── */}
      <Secao className="bg-slate-50">
        <Titulo>Obras que já entregamos</Titulo>
        <p className="mb-8 max-w-2xl text-slate-600">
          Fotos das nossas próprias instalações — não são imagens de catálogo.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OBRAS.map((obra) => (
            <figure
              key={obra.imagem}
              className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-200"
            >
              <Foto
                nome={obra.imagem}
                alt={obra.alt}
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="p-4">
                <p className="font-bold text-slate-900">{obra.titulo}</p>
                <p className="mt-1 text-sm text-slate-600">{obra.linha}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Secao>

      {/* ── 6. Diferenciais que respondem a receios concretos ────────────── */}
      <Secao>
        <Titulo>Por que falar com a Refrigóis</Titulo>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DIFERENCIAIS.map((d) => (
            <div key={d.titulo}>
              <p className="mb-1.5 font-bold text-slate-900">{d.titulo}</p>
              <p className="text-sm leading-relaxed text-slate-600">{d.texto}</p>
            </div>
          ))}
        </div>
      </Secao>

      {/* ── 7. Ficha tecnica curta ───────────────────────────────────────── */}
      <Secao className="bg-slate-50">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Titulo>O que instalamos</Titulo>
            <dl className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
              {FICHA.map((linha) => (
                <div key={linha.rotulo} className="flex justify-between gap-6 py-3">
                  <dt className="text-sm font-semibold text-slate-500">{linha.rotulo}</dt>
                  <dd className="text-right text-sm font-medium text-slate-900">{linha.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Foto
            nome="camara-fria-prateleiras"
            alt="Interior de câmara fria com prateleiras em aço inox"
            className="aspect-[4/3] w-full rounded-xl object-cover"
          />
        </div>
      </Secao>

      {/* ── 8. FAQ: remove o motivo de nao preencher ─────────────────────── */}
      <Secao>
        <Titulo>Perguntas frequentes</Titulo>
        <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
          {FAQ.map((item) => (
            <details key={item.p} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-slate-900 marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
                {item.p}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-brand-600 transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">{item.r}</p>
            </details>
          ))}
        </div>
      </Secao>

      {/* ── 9. Fechamento com o mesmo formulario ─────────────────────────── */}
      <Secao className="bg-slate-950" id="orcamento">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,440px)] lg:items-center">
          <div>
            <Titulo claro>Conte o que você precisa armazenar</Titulo>
            <p className="mb-6 max-w-lg text-slate-400">
              A partir daí conseguimos dizer o que a sua operação pede — capacidade, painel, porta e
              degelo. O orçamento sai do levantamento, não de tabela.
            </p>
            <div className="flex flex-col gap-3 text-sm text-slate-300 sm:flex-row sm:gap-6">
              <a
                href={linkWhatsApp(MSG_WHATS)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-300 underline underline-offset-4 hover:text-brand-200"
              >
                WhatsApp
              </a>
              <a
                href={`tel:${TELEFONE}`}
                className="font-semibold text-brand-300 underline underline-offset-4 hover:text-brand-200"
              >
                (44) 99936-8420
              </a>
            </div>
          </div>
          <Formulario id="orcamento-fim" variante="hero" />
        </div>
      </Secao>

      <footer className="bg-slate-950 px-5 pb-28 pt-4 text-center text-xs text-slate-500 sm:px-8 sm:pb-10">
        <p>Refrigóis · Refrigeração comercial · Maringá, Paraná</p>
      </footer>

      {/* Barra fixa no celular: o visitante rola muito e o botao precisa estar
          sempre a um toque. Some no desktop, onde o formulario fica visivel. */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-slate-800 bg-slate-950/95 p-3 backdrop-blur sm:hidden">
        <a
          href="#orcamento"
          className="flex-1 rounded-lg bg-brand-600 px-4 py-3 text-center text-sm font-bold text-white"
        >
          Pedir orçamento
        </a>
        <a
          href={linkWhatsApp(MSG_WHATS)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg px-4 py-3 text-center text-sm font-bold text-brand-300 ring-1 ring-brand-500/50"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
};
