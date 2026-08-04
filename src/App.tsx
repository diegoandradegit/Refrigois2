import React, { useState } from 'react';
import { Formulario } from './Formulario';
import { ModalOrcamento } from './ModalOrcamento';
import { FaixaSegmentos, Revelar } from './Efeitos';
import {
  APLICACOES,
  DIFERENCIAIS,
  EMPRESA,
  EMPRESA_DADOS,
  ERROS,
  ETAPAS,
  FAQ,
  OBRAS,
  SEGMENTOS_FAIXA,
  SELOS,
  TIPOS,
} from './conteudo';

/**
 * Landing de camara fria. Pagina unica, sem menu, um objetivo so: orcamento.
 *
 * Regra de ouro daqui: todo caminho leva ao mesmo formulario. Nao ha link para
 * o site principal, nao ha WhatsApp e nao existe um segundo formulario — as
 * CTAs espalhadas abrem o modal, que reaproveita o mesmo componente do topo.
 *
 * A ordem dos blocos segue a duvida de quem chega frio do Google Ads:
 * o que e -> ja fizeram isso? -> por que faria errado -> por que voces ->
 * como funciona -> e as minhas duvidas -> pedir orcamento.
 */

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
    className={`text-2xl font-bold leading-tight sm:text-3xl md:text-[2rem] ${
      claro ? 'text-white' : 'text-slate-900'
    }`}
  >
    {children}
  </h2>
);

/** Botao de conversao. Existe um so, para nenhuma CTA sair do padrao. */
const BotaoOrcamento: React.FC<{
  aoClicar: () => void;
  children?: React.ReactNode;
  claro?: boolean;
  largo?: boolean;
}> = ({ aoClicar, children = 'Solicitar orçamento', claro, largo }) => (
  <button
    onClick={aoClicar}
    className={`rounded-lg px-7 py-3.5 text-base font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 ${
      largo ? 'w-full sm:w-auto' : ''
    } ${
      claro
        ? 'bg-white text-slate-900 hover:bg-slate-100'
        : 'bg-brand-600 text-white hover:bg-brand-700'
    }`}
  >
    {children}
  </button>
);

/** Linha de fechamento repetida depois de cada bloco de argumento. */
const ChamadaFinalDeBloco: React.FC<{ texto: string; aoClicar: () => void; claro?: boolean }> = ({
  texto,
  aoClicar,
  claro,
}) => (
  <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
    <BotaoOrcamento aoClicar={aoClicar} claro={claro} />
    <p className={`text-sm ${claro ? 'text-slate-400' : 'text-slate-500'}`}>{texto}</p>
  </div>
);

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

export const App: React.FC = () => {
  const [modal, setModal] = useState(false);
  const abrir = () => setModal(true);

  return (
    <div className="bg-white font-sans text-slate-900 antialiased">
      {/* ── Topo: o que é, para quem, por que nós, e como pedir ─────────── */}
      <header className="relative isolate flex min-h-[640px] items-center overflow-hidden bg-slate-950 lg:min-h-[720px]">
        {/* Mesma arte da hero do site principal: quem clica no anuncio e depois
            procura a empresa no Google encontra a mesma imagem, e nao parece
            que caiu em outro lugar. O .jpg fica so de reserva para navegador
            sem WebP; o resto baixa a versao do tamanho da tela. */}
        <picture className="absolute inset-0 -z-10 block h-full w-full">
          <source
            type="image/webp"
            srcSet="/images/hero-640.webp 640w, /images/hero-1280.webp 1280w, /images/hero-1920.webp 1920w"
            sizes="100vw"
          />
          <img
            src="/images/hero.jpg"
            alt=""
            width={1600}
            height={854}
            fetchPriority="high"
            className="h-full w-full object-cover object-[68%_center] sm:object-center"
          />
        </picture>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40 lg:via-slate-950/70 lg:to-slate-950/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/60" />

        <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          {/* Logo oficial na horizontal. Sobre o fundo escuro do topo ela vai
              em branco (brightness-0 invert), como no site principal: o azul
              da marca some contra o slate-950.
              width e height batem com a proporcao real do arquivo, para o
              navegador reservar o espaco certo e o topo nao pular ao carregar. */}
          <img
            src="/logo-v2.png"
            alt="Refrigóis Refrigeração Comercial"
            width={169}
            height={45}
            className="mb-9 h-10 w-auto object-contain brightness-0 invert sm:h-12"
          />

          <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-16">
            <div className="max-w-xl animate-fade-in-up">
              <span className="mb-5 inline-block rounded-full border border-brand-400/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-300 backdrop-blur-sm md:text-xs">
                Câmaras Frias · Todo o Paraná
              </span>

              <h1 className="text-[2rem] font-bold leading-[1.1] text-white drop-shadow-lg sm:text-5xl">
                Câmara fria <span className="text-brand-400">sob medida</span>, do projeto à
                instalação
              </h1>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-200 drop-shadow-md sm:text-lg">
                Resfriadas, de congelados, expositoras com portas de vidro, de bebidas e chopp ou
                frigoríficas industriais. Uma só empresa projeta, fabrica, instala e assiste
                depois, em todo o Paraná.
              </p>

              {/* Os quatro selos respondem "por que a Refrigóis" antes de a
                  pessoa rolar. Ficam curtos porque sao lidos de relance. */}
              <ul className="mt-7 grid gap-2.5 text-[15px] text-slate-100 sm:grid-cols-2">
                {SELOS.map((selo) => (
                  <li key={selo} className="flex items-center gap-2.5">
                    <span aria-hidden="true" className="font-bold text-brand-400">
                      ✓
                    </span>
                    {selo}
                  </li>
                ))}
              </ul>

              {/* No celular o formulario vira botao: manter as duas colunas
                  empilhadas empurrava a prova e os selos para fora da tela. */}
              <div className="mt-9 lg:hidden">
                <BotaoOrcamento aoClicar={abrir} largo>
                  Solicitar orçamento
                </BotaoOrcamento>
                <p className="mt-3 text-sm text-slate-400">
                  Só nome e telefone. Sem compromisso e sem cadastro.
                </p>
              </div>
            </div>

            {/* No desktop sobra espaco: o formulario fica aberto, porque campo
                a vista converte mais do que campo atras de um clique. */}
            <div className="hidden lg:block">
              <Formulario id="orcamento-topo" variante="hero" />
            </div>
          </div>
        </div>
      </header>

      <FaixaSegmentos itens={SEGMENTOS_FAIXA} />

      {/* ── Prova: obra real, com o segmento no titulo ───────────────────── */}
      <Secao>
        <Titulo>Câmaras que já entregamos</Titulo>
        <p className="mt-3 max-w-2xl text-slate-600">
          Fotos das nossas próprias instalações, não imagens de catálogo.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OBRAS.map((obra, i) => (
            <Revelar key={obra.imagem} atraso={(i % 3) * 0.08}>
              <figure className="group h-full overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-900/10">
                <div className="relative overflow-hidden">
                  <Foto
                    nome={obra.imagem}
                    alt={obra.alt}
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  {/* Etiqueta do tipo sobre a foto: quem esta procurando um
                      caso especifico reconhece o dele so passando o olho. */}
                  <span className="absolute left-3 top-3 rounded-full bg-slate-950/75 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    {obra.tipo}
                  </span>
                </div>
                <figcaption className="p-4">
                  <p className="font-bold text-slate-900">{obra.titulo}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{obra.linha}</p>
                </figcaption>
              </figure>
            </Revelar>
          ))}
        </div>

        <ChamadaFinalDeBloco
          aoClicar={abrir}
          texto="Conte o que você precisa armazenar e dizemos o que a sua operação pede."
        />
      </Secao>

      {/* ── Tipos: camara fria nao e uma coisa so, e cada tipo tem um nome
          proprio pelo qual as pessoas buscam. ─────────────────────────── */}
      <Secao className="bg-slate-50">
        <div className="max-w-3xl">
          <Titulo>Que tipo de câmara você precisa?</Titulo>
          <p className="mt-3 text-slate-600">
            Fabricamos todos eles. O que muda de um para o outro é a temperatura de trabalho, a
            espessura do painel, o tipo de porta e o degelo — e é isso que o levantamento define.
          </p>

          {/* Cards com etiqueta: a faixa de temperatura ou o nome de mercado
              vira ancora visual, e a pessoa acha o caso dela sem ler tudo. */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {TIPOS.map((tipo, i) => (
              <Revelar key={tipo.nome} atraso={(i % 2) * 0.08}>
                <div className="group h-full rounded-xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-900/5">
                  <span className="inline-block rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-700 transition group-hover:bg-brand-100">
                    {tipo.etiqueta}
                  </span>
                  <p className="mt-3 font-bold text-slate-900">{tipo.nome}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{tipo.linha}</p>
                </div>
              </Revelar>
            ))}
          </div>

          <ChamadaFinalDeBloco
            aoClicar={abrir}
            texto="Não sabe qual é o seu caso? Descrevemos junto com você no levantamento."
          />
        </div>
      </Secao>

      {/* ── O custo de errar: transforma "quanto custa" em "quanto custa
          errar", que é o terreno onde a fabricante ganha do intermediário. ── */}
      <Secao className="bg-slate-950 text-slate-300">
        <div className="max-w-2xl">
          <Titulo claro>Câmara mal dimensionada cobra a conta todo mês</Titulo>
          <p className="mt-4 text-slate-400">
            Nada disso aparece na entrega. A câmara gela, tudo parece certo, e o problema só se
            manifesta depois. São os três que mais encontramos quando nos chamam para corrigir
            instalação de terceiros.
          </p>
        </div>

        <div className="mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
          {ERROS.map((item, i) => (
            <Revelar key={item.titulo} atraso={i * 0.08}>
              <div className="group h-full border-l-2 border-white/15 bg-white/[0.04] p-5 transition duration-300 hover:border-brand-500 hover:bg-white/[0.07]">
                <p className="font-bold leading-snug text-white">{item.titulo}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.texto}</p>
              </div>
            </Revelar>
          ))}
        </div>

        <ChamadaFinalDeBloco
          claro
          aoClicar={abrir}
          texto="O dimensionamento sai de cálculo de carga térmica, não de estimativa."
        />
      </Secao>

      {/* ── Diferenciais como argumento, não como lista de adjetivos ─────── */}
      <Secao>
        <Titulo>Por que fechar com a Refrigóis</Titulo>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DIFERENCIAIS.map((d, i) => (
            <Revelar key={d.titulo} atraso={(i % 3) * 0.08}>
              {/* Barra de acento no topo em vez de borda inteira: distingue
                  destes cards dos de tipo, para as duas secoes nao parecerem a
                  mesma coisa repetida. */}
              <div className="group h-full border-t-2 border-slate-200 bg-slate-50 p-5 transition duration-300 hover:border-brand-500 hover:bg-white hover:shadow-lg hover:shadow-brand-900/5">
                <p className="font-bold text-slate-900">{d.titulo}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{d.texto}</p>
              </div>
            </Revelar>
          ))}
        </div>

        <ChamadaFinalDeBloco
          aoClicar={abrir}
          texto="Levantamento sem custo, feito por quem vai executar a obra."
        />
      </Secao>

      {/* ── A empresa. Mesma copy do site principal, para quem pesquisar a
          Refrigois no Google encontrar a mesma historia. ───────────────── */}
      <Secao className="bg-slate-50">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Composicao de duas fotos, igual a do site principal: uma no
              escritorio e outra em campo. A de campo mostra atendimento
              acontecendo, que e o que a foto posada sozinha nao diz.
              Espaco a esquerda e embaixo para as duas pecas sobrepostas. */}
          <div className="relative pb-10 sm:pb-0 sm:pl-8">
            <img
              src={EMPRESA.foto}
              alt={EMPRESA.fotoAlt}
              width={1100}
              height={825}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl"
            />

            {/* Some no celular: sobreposta numa tela estreita, ela cobriria a
                foto principal em vez de complementar. */}
            <img
              src={EMPRESA.fotoSecundaria}
              alt={EMPRESA.fotoSecundariaAlt}
              width={760}
              height={1140}
              loading="lazy"
              decoding="async"
              className="absolute -bottom-8 left-0 hidden aspect-[3/4] w-32 rounded-xl border-4 border-slate-50 object-cover shadow-2xl sm:block md:w-44"
            />
            {/* Selo de tempo de casa, como no site principal: e o numero que a
                pessoa guarda depois de fechar a pagina. */}
            <div className="absolute -bottom-5 right-4 z-10 flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-xl ring-1 ring-slate-100 sm:-right-4">
              <span className="text-4xl font-extrabold leading-none text-brand-600">15</span>
              <span className="text-[11px] font-bold uppercase leading-tight tracking-wide text-slate-700">
                anos de
                <br />
                experiência
              </span>
            </div>
          </div>

          <Revelar>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-600">
              {EMPRESA.chapeu}
            </p>
            <Titulo>{EMPRESA.titulo}</Titulo>

            {EMPRESA.paragrafos.map((p) => (
              <p key={p} className="mt-5 leading-relaxed text-slate-600">
                {p}
              </p>
            ))}

            <div className="mt-7">
              <p className="text-lg font-bold text-slate-900">{EMPRESA.assinatura.nome}</p>
              <p className="text-sm text-slate-500">{EMPRESA.assinatura.papel}</p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {EMPRESA.valores.map((v) => (
                <div key={v.titulo} className="rounded-xl border border-slate-200 bg-white p-4">
                  <h4 className="text-sm font-bold text-slate-900">{v.titulo}</h4>
                  <p className="mt-1 text-xs leading-snug text-slate-500">{v.texto}</p>
                </div>
              ))}
            </div>
          </Revelar>
        </div>
      </Secao>

      {/* ── Como funciona: seis passos, do pedido à entrega ──────────────── */}
      <Secao>
        <Titulo>Do pedido à entrega</Titulo>
        <p className="mt-3 max-w-2xl text-slate-600">
          O orçamento sai do levantamento, não de tabela. Por isso a primeira conversa é sobre a sua
          operação, e não sobre o equipamento.
        </p>

        <ol className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ETAPAS.map((etapa, i) => (
            <Revelar key={etapa.titulo} atraso={(i % 3) * 0.08}>
              <li className="group flex h-full gap-4 rounded-xl bg-slate-50 p-5 transition duration-300 hover:bg-white hover:shadow-lg hover:shadow-brand-900/5">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white transition group-hover:scale-110"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">{etapa.titulo}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{etapa.texto}</p>
                </div>
              </li>
            </Revelar>
          ))}
        </ol>

        <ChamadaFinalDeBloco aoClicar={abrir} texto="O passo 1 leva menos de um minuto." />
      </Secao>

      {/* ── Perguntas: cada uma remove um motivo de não pedir ────────────── */}
      <Secao className="bg-slate-50">
        <div className="max-w-3xl">
          <Titulo>Perguntas frequentes</Titulo>
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

          <ChamadaFinalDeBloco aoClicar={abrir} texto="Ficou outra dúvida? Pergunte no formulário." />
        </div>
      </Secao>

      {/* ── Fechamento ──────────────────────────────────────────────────── */}
      <Secao className="bg-slate-950" id="orcamento">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-center lg:gap-16">
          <div className="max-w-lg">
            <Titulo claro>Conte o que você precisa armazenar</Titulo>
            <p className="mt-4 text-slate-400">
              A partir daí conseguimos dizer o que a sua operação pede: capacidade, painel, porta e
              degelo. Projetamos para {APLICACOES}.
            </p>
          </div>
          <Formulario id="orcamento-fim" variante="hero" />
        </div>
      </Secao>

      <footer className="border-t border-white/10 bg-slate-950 px-5 pb-12 pt-10 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 text-sm text-slate-400 sm:grid-cols-2">
          <div>
            <p className="font-semibold text-slate-200">{EMPRESA_DADOS.razao}</p>
            <p className="mt-2">CNPJ {EMPRESA_DADOS.cnpj}</p>
            <p className="mt-1">{EMPRESA_DADOS.endereco}</p>
            <p>{EMPRESA_DADOS.cidade}</p>
          </div>
          <div className="sm:text-right">
            <p>
              <a href={`mailto:${EMPRESA_DADOS.email}`} className="hover:text-slate-200">
                {EMPRESA_DADOS.email}
              </a>
            </p>
            <p className="mt-1">
              <a href={`tel:${EMPRESA_DADOS.telefoneLink}`} className="hover:text-slate-200">
                {EMPRESA_DADOS.telefone}
              </a>
            </p>
            <p className="mt-4 text-xs text-slate-600">
              Atendimento em todo o Paraná · Refrigeração comercial
            </p>
          </div>
        </div>
      </footer>

      <ModalOrcamento aberto={modal} aoFechar={() => setModal(false)} />
    </div>
  );
};
