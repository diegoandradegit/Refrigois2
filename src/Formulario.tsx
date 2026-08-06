import React, { useState } from 'react';
import { EMPRESA_DADOS, ENDPOINT_LEAD, SEGMENTOS } from './conteudo';
import { lerRastreio } from './rastreio';

/**
 * Formulario da landing, em tres etapas.
 *
 * A razao de ser tres nao e estetica. O lead e gravado no fim da PRIMEIRA
 * etapa, com nome e telefone: quem desistir da metade em diante ja esta no
 * sistema e pode ser retornado. No formulario de tela unica, fechar o modal
 * significava perder o contato inteiro.
 *
 * A ordem das perguntas segue o custo de responder, e nao a utilidade para o
 * comercial: primeiro o que a pessoa digita sem pensar, depois o que exige
 * escolha, por ultimo o que exige escrever. Pedir "descreva sua necessidade"
 * na abertura e o jeito mais rapido de perder alguem.
 *
 *   1. Nome e WhatsApp        -> grava o lead (incompleto)
 *   2. Cidade e tipo de negocio -> completa
 *   3. E-mail e necessidade     -> completa e encerra
 */

type Estado = 'parado' | 'enviando' | 'enviado' | 'erro';

/**
 * Cidades que mais aparecem — as mesmas citadas no FAQ como obras executadas.
 * Serve so para acelerar a digitacao; qualquer outra cidade e aceita.
 */
const CIDADES_SUGERIDAS = [
  'Maringá',
  'Sarandi',
  'Paiçandu',
  'Marialva',
  'Mandaguaçu',
  'Londrina',
  'Cascavel',
  'Foz do Iguaçu',
  'Guaíra',
  'Curitiba',
];

interface Props {
  /**
   * 'hero'  — cartao proprio sobre o fundo escuro da pagina
   * 'claro' — cartao proprio sobre fundo claro
   * 'modal' — sem cartao: o modal ja desenha fundo, borda e titulo
   */
  variante?: 'hero' | 'claro' | 'modal';
  id?: string;
}

/** Avisa o Google Ads e o Analytics que o contato foi capturado. */
function registrarConversao() {
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  if (typeof w.gtag === 'function') {
    w.gtag('event', 'gerar_lead', { event_category: 'landing_camara_fria' });
  }
}

export const Formulario: React.FC<Props> = ({ variante = 'hero', id }) => {
  const [etapa, setEtapa] = useState(1);
  const [estado, setEstado] = useState<Estado>('parado');
  const [mensagem, setMensagem] = useState('');
  /** Devolvida pelo servidor na etapa 1; identifica o lead nas seguintes. */
  const [sessao, setSessao] = useState<string | null>(null);

  const [dados, setDados] = useState({
    nome: '',
    contato: '',
    cidade: '',
    tipo_negocio: '',
    email: '',
    necessidade: '',
    website: '',
  });

  const escuro = variante === 'hero' || variante === 'modal';
  const dentroDoModal = variante === 'modal';

  const mudar = (campo: keyof typeof dados) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setDados((d) => ({ ...d, [campo]: e.target.value }));

  /** Envia ao servidor. Sem sessao cria o lead; com sessao, completa. */
  async function enviar(corpoExtra: Record<string, unknown>): Promise<boolean> {
    setEstado('enviando');
    setMensagem('');
    try {
      const resposta = await fetch(ENDPOINT_LEAD, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...corpoExtra,
          website: dados.website,
          origem: 'landing-camara-fria',
          ...(sessao ? { sessao } : lerRastreio()),
        }),
      });
      const corpo = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        setEstado('erro');
        setMensagem(
          corpo.erro ??
            `Não consegui enviar agora. Ligue para ${EMPRESA_DADOS.telefone} que atendemos na hora.`,
        );
        return false;
      }
      if (corpo.sessao && !sessao) setSessao(corpo.sessao);
      setEstado('parado');
      return true;
    } catch {
      setEstado('erro');
      setMensagem(
        `Sem conexão com o servidor. Confira a internet ou ligue para ${EMPRESA_DADOS.telefone}.`,
      );
      return false;
    }
  }

  async function avancar(e: React.FormEvent) {
    e.preventDefault();
    if (estado === 'enviando') return;

    if (etapa === 1) {
      // Grava aqui: a partir deste ponto o contato existe, aconteça o que
      // acontecer com o resto do formulário.
      const ok = await enviar({
        nome: dados.nome,
        contato: dados.contato,
        completo: false,
      });
      if (!ok) return;
      registrarConversao();
      setEtapa(2);
      return;
    }

    if (etapa === 2) {
      const ok = await enviar({
        cidade: dados.cidade,
        tipo_negocio: dados.tipo_negocio,
        completo: false,
      });
      if (ok) setEtapa(3);
      return;
    }

    const ok = await enviar({
      email: dados.email,
      necessidade: dados.necessidade,
      completo: true,
    });
    if (ok) setEstado('enviado');
  }

  // ─── Confirmação ───────────────────────────────────────────────────────
  if (estado === 'enviado') {
    return (
      <div
        id={id}
        className={`text-center ${
          dentroDoModal
            ? 'py-6'
            : `rounded-lg p-6 sm:p-8 ${
                escuro ? 'bg-white/10 ring-1 ring-white/20' : 'bg-brand-50 ring-1 ring-brand-200'
              }`
        }`}
      >
        <p className={`text-xl font-bold ${escuro ? 'text-white' : 'text-slate-900'}`}>
          Pedido recebido
        </p>
        <p className={`mt-2 text-sm ${escuro ? 'text-slate-300' : 'text-slate-600'}`}>
          Entramos em contato pelo número que você deixou para fazer o levantamento.
        </p>
      </div>
    );
  }

  const rotulo = `block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
    escuro ? 'text-slate-300' : 'text-slate-500'
  }`;
  const campo = `w-full rounded-lg px-3.5 py-3 text-base outline-none transition ${
    escuro
      ? 'bg-white/10 text-white ring-1 ring-white/20 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-400'
      : 'bg-white text-slate-900 ring-1 ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500'
  }`;

  const rotuloEtapa = ['Seus dados', 'Onde e para quê', 'Detalhes'][etapa - 1];
  const textoBotao =
    estado === 'enviando'
      ? 'Enviando…'
      : etapa === 1
        ? 'Continuar'
        : etapa === 2
          ? 'Continuar'
          : 'Enviar pedido';

  return (
    <form
      id={id}
      onSubmit={avancar}
      noValidate
      className={
        dentroDoModal
          ? ''
          : `rounded-lg p-5 sm:p-6 ${
              escuro
                ? 'bg-slate-900/70 backdrop-blur-md ring-1 ring-white/15'
                : 'bg-white ring-1 ring-slate-200 shadow-lg'
            }`
      }
    >
      {!dentroDoModal && (
        <p className={`mb-4 text-lg font-bold ${escuro ? 'text-white' : 'text-slate-900'}`}>
          Peça seu orçamento
        </p>
      )}

      {/* Indicador de progresso. Três traços mostram que o formulário é curto e
          que o fim está perto — o que reduz desistência mais do que qualquer
          texto de incentivo. */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex flex-1 gap-1.5">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                n <= etapa ? 'bg-brand-500' : escuro ? 'bg-white/15' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
        <span className={`shrink-0 text-xs font-medium ${escuro ? 'text-slate-400' : 'text-slate-500'}`}>
          {etapa} de 3 · {rotuloEtapa}
        </span>
      </div>

      <div className="grid gap-4">
        {etapa === 1 && (
          <>
            <div>
              <label className={rotulo} htmlFor={`${id}-nome`}>
                Nome completo
              </label>
              <input
                id={`${id}-nome`}
                name="nome"
                required
                autoFocus
                autoComplete="name"
                value={dados.nome}
                onChange={mudar('nome')}
                placeholder="Seu nome"
                className={campo}
              />
            </div>
            <div>
              <label className={rotulo} htmlFor={`${id}-contato`}>
                WhatsApp / Telefone
              </label>
              <input
                id={`${id}-contato`}
                name="contato"
                required
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={dados.contato}
                onChange={mudar('contato')}
                placeholder="(44) 99999-9999"
                className={campo}
              />
            </div>
          </>
        )}

        {etapa === 2 && (
          <>
            <div>
              <label className={rotulo} htmlFor={`${id}-cidade`}>
                Cidade
              </label>
              <input
                id={`${id}-cidade`}
                name="cidade"
                required
                autoFocus
                list={`${id}-cidades`}
                autoComplete="address-level2"
                value={dados.cidade}
                onChange={mudar('cidade')}
                placeholder="Onde será a instalação"
                className={campo}
              />
              <datalist id={`${id}-cidades`}>
                {CIDADES_SUGERIDAS.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
            <div>
              <label className={rotulo} htmlFor={`${id}-tipo`}>
                Tipo de negócio
              </label>
              <select
                id={`${id}-tipo`}
                name="tipo_negocio"
                required
                value={dados.tipo_negocio}
                onChange={mudar('tipo_negocio')}
                className={campo}
              >
                <option value="">Selecione</option>
                {SEGMENTOS.map((seg) => (
                  <option key={seg} value={seg}>
                    {seg}
                  </option>
                ))}
                <option value="Outro">Outro</option>
              </select>
            </div>
          </>
        )}

        {etapa === 3 && (
          <>
            <div>
              <label className={rotulo} htmlFor={`${id}-email`}>
                E-mail <span className="font-normal normal-case text-slate-500">(opcional)</span>
              </label>
              <input
                id={`${id}-email`}
                name="email"
                type="email"
                inputMode="email"
                autoFocus
                autoComplete="email"
                value={dados.email}
                onChange={mudar('email')}
                placeholder="seu@email.com"
                className={campo}
              />
            </div>
            <div>
              <label className={rotulo} htmlFor={`${id}-necessidade`}>
                O que você precisa?{' '}
                <span className="font-normal normal-case text-slate-500">(opcional)</span>
              </label>
              <textarea
                id={`${id}-necessidade`}
                name="necessidade"
                rows={3}
                value={dados.necessidade}
                onChange={mudar('necessidade')}
                placeholder="Ex.: câmara fria para açougue, uns 3x3, no fundo da loja"
                className={campo}
              />
            </div>
          </>
        )}

        {/* Campo isca contra robô: escondido de quem enxerga e de leitor de tela. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={dados.website}
          onChange={mudar('website')}
          className="absolute h-0 w-0 overflow-hidden opacity-0"
        />

        <button
          type="submit"
          disabled={estado === 'enviando'}
          className="w-full rounded-lg bg-brand-600 px-6 py-3.5 text-base font-bold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        >
          {textoBotao}
        </button>

        {estado === 'erro' && (
          <p role="alert" className="text-sm font-medium text-red-400">
            {mensagem}
          </p>
        )}

        {etapa > 1 && (
          <button
            type="button"
            onClick={() => setEtapa((n) => n - 1)}
            className={`text-sm underline underline-offset-4 ${
              escuro ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Voltar
          </button>
        )}

        <p className={`text-xs ${escuro ? 'text-slate-400' : 'text-slate-500'}`}>
          {etapa === 1
            ? 'Só o nome e o telefone para começar. Sem compromisso.'
            : 'Retornamos o contato para fazer o levantamento.'}
        </p>
      </div>
    </form>
  );
};
