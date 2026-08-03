import React from 'react';
import { Formulario } from './Formulario';
import { EMPRESA, ERROS, ETAPAS, FAQ, OBRAS, TELEFONE, linkWhatsApp } from './conteudo';

/**
 * Landing de camara fria. Pagina unica, sem menu, um objetivo so.
 *
 * A primeira versao tinha nove blocos, todos montados igual: titulo, paragrafo
 * de apoio e grade simetrica de cards. Repetido sete vezes, esse padrao e o que
 * faz uma pagina parecer gerada em serie. Aqui sao seis blocos e nenhum deles
 * repete a forma do anterior: foto grande, lista tipografica, faixa horizontal,
 * perguntas. A prova visual vem das fotos das obras, nao de icone.
 */

const MSG_WHATS = 'Olá! Quero um orçamento de câmara fria.';

const Foto: React.FC<{ nome: string; alt: string; className?: string }> = ({
  nome,
  alt,
  className,
}) => (
  <img
    src={`/images/${nome}-1280.webp`}
    srcSet={`/images/${nome}-640.webp 640w, /images/${nome}-1280.webp 1280w`}
    sizes="(max-width: 768px) 100vw, 33vw"
    alt={alt}
    loading="lazy"
    decoding="async"
    className={className}
  />
);

export const App: React.FC = () => (
  <div className="bg-white font-sans text-slate-900 antialiased">
    {/* ── Topo: promessa, alcance e formulario sem precisar rolar ───────── */}
    <header className="relative isolate overflow-hidden bg-slate-950">
      <picture className="absolute inset-0 -z-10 block h-full w-full">
        <source
          type="image/webp"
          srcSet="/images/camara-frigorifica-industrial-640.webp 640w, /images/camara-frigorifica-industrial-1280.webp 1280w"
          sizes="100vw"
        />
        <img
          src="/images/camara-frigorifica-industrial-1280.webp"
          alt=""
          width={1280}
          height={853}
          fetchPriority="high"
          className="h-full w-full object-cover opacity-45"
        />
      </picture>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-950/85 to-slate-950" />

      <div className="mx-auto max-w-6xl px-5 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-10">
        <img src="/logo.png" alt="Refrigóis" width={44} height={44} className="mb-10 h-11 w-auto" />

        <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
          <div className="max-w-xl">
            <h1 className="text-[2rem] font-bold leading-[1.1] text-white sm:text-5xl">
              Câmara fria dimensionada para o que você guarda
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              Projeto, fabricação e instalação em todo o Paraná. O cálculo parte da carga térmica
              real da sua operação, não do tamanho da câmara.
            </p>
            <p className="mt-8 text-sm text-slate-400">
              Prefere conversar?{' '}
              <a
                href={linkWhatsApp(MSG_WHATS)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-300 underline underline-offset-4 hover:text-brand-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400"
              >
                Chamar no WhatsApp
              </a>
            </p>
          </div>

          <Formulario id="orcamento-topo" variante="hero" />
        </div>
      </div>
    </header>

    {/* ── Prova primeiro: foto de obra propria vale mais que argumento ───── */}
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <h2 className="text-2xl font-bold sm:text-3xl">Obras nossas, fotografadas por nós</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {OBRAS.map((obra) => (
          <figure key={obra.imagem}>
            <Foto nome={obra.imagem} alt={obra.alt} className="aspect-[4/3] w-full object-cover" />
            <figcaption className="mt-2.5 text-sm text-slate-600">{obra.titulo}</figcaption>
          </figure>
        ))}
      </div>
    </section>

    {/* ── O custo do erro. Lista tipografica, sem card e sem numeracao: ───
        estes tres itens nao sao uma sequencia, sao um conjunto. ────────── */}
    <section className="bg-slate-950 px-5 py-16 text-slate-300 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
            Câmara mal instalada cobra a conta todo mês
          </h2>
          <p className="mt-4 text-slate-400">
            Nada disso aparece no dia da entrega. A câmara funciona, gela, e o problema só se
            manifesta depois. São os três que mais encontramos quando nos chamam para corrigir
            instalação de terceiros.
          </p>
        </div>

        <dl className="mt-10 max-w-3xl divide-y divide-white/10 border-y border-white/10">
          {ERROS.map((item) => (
            <div key={item.titulo} className="py-6">
              <dt className="text-lg font-semibold text-white">{item.titulo}</dt>
              <dd className="mt-2 leading-relaxed text-slate-400">{item.texto}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>

    {/* ── Quem atende. Vem logo depois dos erros de propósito: a seção
        anterior diz o que dá errado, esta responde quem faz certo. ─────── */}
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="grid gap-10 md:grid-cols-[minmax(0,300px)_1fr] md:items-start md:gap-14">
        <img
          src={EMPRESA.foto}
          alt={`${EMPRESA.nome}, ${EMPRESA.papel}`}
          loading="lazy"
          decoding="async"
          className="w-full max-w-[300px] object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Quem vai atender você</h2>
          {EMPRESA.paragrafos.map((p) => (
            <p key={p} className="mt-4 max-w-xl leading-relaxed text-slate-600">
              {p}
            </p>
          ))}
          <p className="mt-6 font-semibold">
            {EMPRESA.nome}
            <span className="ml-2 font-normal text-slate-500">{EMPRESA.papel}</span>
          </p>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-t border-slate-200 pt-6">
            {EMPRESA.numeros.map((n) => (
              <div key={n.rotulo}>
                <dt className="text-3xl font-bold text-brand-600">{n.valor}</dt>
                <dd className="mt-0.5 max-w-[10rem] text-sm text-slate-600">{n.rotulo}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>

    {/* ── Metodo: faixa horizontal enxuta. Aqui a ordem importa de verdade,
        entao a numeracao carrega informacao em vez de decorar. ─────────── */}
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <h2 className="text-2xl font-bold sm:text-3xl">Do primeiro contato à partida</h2>
      <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {ETAPAS.map((etapa, i) => (
          <li key={etapa.titulo}>
            <span className="text-sm font-bold text-brand-600">{i + 1}</span>
            <h3 className="mt-1 font-semibold">{etapa.titulo}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{etapa.texto}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex items-center gap-5 border-l-2 border-brand-500 pl-5">
        {/* Avatar da marca, o mesmo usado no site principal. Entra aqui para
            quebrar a sequência de texto sem virar mais um ícone genérico. */}
        <img
          src="/images/mascote/entrega.webp"
          alt=""
          width={110}
          height={110}
          loading="lazy"
          decoding="async"
          className="hidden h-28 w-28 shrink-0 object-contain sm:block"
        />
        <p className="max-w-2xl text-slate-600">
          Resfriados de 0 °C a 5 °C e congelados de −18 °C a −25 °C, em painel EPS ou PUR, com
          porta de giro, de correr ou de vidro. Instalação com 12 meses de garantia e manutenção
          feita pela mesma equipe.
        </p>
      </div>
    </section>

    {/* ── Perguntas: cada uma tira um motivo de nao preencher ────────────── */}
    <section className="bg-slate-50 px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold sm:text-3xl">Perguntas frequentes</h2>
        <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
          {FAQ.map((item) => (
            <details key={item.p} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
                {item.p}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-xl font-normal text-brand-600 transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-slate-600">{item.r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* ── Fechamento ────────────────────────────────────────────────────── */}
    <section id="orcamento" className="bg-slate-950 px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_400px] lg:items-center lg:gap-16">
        <div className="max-w-lg">
          <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
            Conte o que precisa armazenar
          </h2>
          <p className="mt-4 text-slate-400">
            A partir daí conseguimos dizer o que a sua operação pede: capacidade, painel, porta e
            degelo. O orçamento sai do levantamento, não de tabela.
          </p>
          <p className="mt-6 text-sm text-slate-400">
            <a
              href={linkWhatsApp(MSG_WHATS)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-300 underline underline-offset-4 hover:text-brand-200"
            >
              WhatsApp
            </a>
            <span className="px-3 text-slate-600">ou</span>
            <a
              href={`tel:${TELEFONE}`}
              className="font-semibold text-brand-300 underline underline-offset-4 hover:text-brand-200"
            >
              (44) 99936-8420
            </a>
          </p>
        </div>
        <Formulario id="orcamento-fim" variante="hero" />
      </div>
    </section>

    <footer className="bg-slate-950 px-5 pb-24 pt-2 text-xs text-slate-600 sm:px-8 sm:pb-10">
      <p className="mx-auto max-w-6xl">Refrigóis · Refrigeração comercial · Paraná</p>
    </footer>

    {/* Barra fixa no celular: o visitante rola bastante e o botao precisa
        estar sempre a um toque. Some no desktop, onde o formulario ja aparece. */}
    <div className="fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-slate-800 bg-slate-950/95 p-3 backdrop-blur sm:hidden">
      <a
        href="#orcamento"
        className="flex-1 rounded bg-brand-600 px-4 py-3 text-center text-sm font-bold text-white"
      >
        Pedir orçamento
      </a>
      <a
        href={linkWhatsApp(MSG_WHATS)}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded px-4 py-3 text-center text-sm font-bold text-brand-300 ring-1 ring-brand-500/40"
      >
        WhatsApp
      </a>
    </div>
  </div>
);
