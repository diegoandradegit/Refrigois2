import React, { useState } from 'react';
import { EMPRESA_DADOS, ENDPOINT_LEAD, SEGMENTOS } from './conteudo';
import { lerRastreio } from './rastreio';

/**
 * Formulario da landing: uma tela so.
 *
 * As etapas foram removidas porque o ganho delas (gravar o contato de quem
 * desiste) nao compensou o custo: mais toques, troca de tela e a sensacao de
 * processo longo em algo que leva vinte segundos.
 *
 * Para nao virar o "formularao" de antes, o que enxuga aqui e a densidade, e
 * nao a quantidade de perguntas: campos que a pessoa responde no mesmo folego
 * ficam lado a lado, os rotulos sao menores e o espacamento e mais apertado.
 * Sao os mesmos seis campos, ocupando bem menos altura.
 *
 * A validacao roda no proprio aparelho, com mensagem propria. O balao nativo do
 * navegador e pequeno, some sozinho e nao diz o que fazer.
 */

type Estado = 'parado' | 'enviando' | 'enviado' | 'erro';

/** Cidades que mais aparecem. Acelera a digitacao; qualquer outra e aceita. */
const CIDADES_SUGERIDAS = [
  'Maringá', 'Sarandi', 'Paiçandu', 'Marialva', 'Mandaguaçu',
  'Londrina', 'Cascavel', 'Foz do Iguaçu', 'Guaíra', 'Curitiba',
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

function registrarConversao() {
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  if (typeof w.gtag === 'function') {
    w.gtag('event', 'gerar_lead', { event_category: 'landing_camara_fria' });
  }
}

const emailValido = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const telefoneValido = (v: string) => {
  const d = v.replace(/\D/g, '');
  return d.length >= 10 && d.length <= 13;
};

export const Formulario: React.FC<Props> = ({ variante = 'hero', id }) => {
  const [estado, setEstado] = useState<Estado>('parado');
  const [erro, setErro] = useState('');
  const [dados, setDados] = useState({
    nome: '', contato: '', email: '',
    cidade: '', tipo_negocio: '', necessidade: '', website: '',
  });

  const escuro = variante === 'hero' || variante === 'modal';
  const dentroDoModal = variante === 'modal';

  const mudar = (campo: keyof typeof dados) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setDados((d) => ({ ...d, [campo]: e.target.value }));
    if (erro) setErro('');
  };

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (estado === 'enviando') return;

    if (!dados.nome.trim()) return setErro('Preencha seu nome.');
    if (!telefoneValido(dados.contato)) {
      return setErro('O telefone precisa ter DDD e número. Exemplo: (44) 99999-9999.');
    }
    if (!dados.cidade.trim()) return setErro('Preencha a cidade.');
    if (!dados.tipo_negocio) return setErro('Selecione o tipo de negócio.');
    if (dados.email.trim() && !emailValido(dados.email.trim())) {
      return setErro('Confira o e-mail, ou deixe o campo em branco.');
    }

    setEstado('enviando');
    setErro('');

    try {
      const resposta = await fetch(ENDPOINT_LEAD, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: dados.nome,
          contato: dados.contato,
          email: dados.email || null,
          cidade: dados.cidade,
          tipo_negocio: dados.tipo_negocio,
          necessidade: dados.necessidade || null,
          website: dados.website,
          origem: 'landing-camara-fria',
          completo: true,
          ...lerRastreio(),
        }),
      });
      const corpo = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        setEstado('erro');
        setErro(
          corpo.erro ??
            `Não consegui enviar agora. Ligue para ${EMPRESA_DADOS.telefone} que atendemos na hora.`,
        );
        return;
      }
      registrarConversao();
      setEstado('enviado');
    } catch {
      setEstado('erro');
      setErro(
        `Sem conexão com o servidor. Confira a internet ou ligue para ${EMPRESA_DADOS.telefone}.`,
      );
    }
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

  // Rótulo menor e mais claro, campo mais baixo: é onde a altura é ganha,
  // sem tirar nenhuma pergunta.
  const rotulo = `mb-1 block text-[11px] font-semibold uppercase tracking-wider ${
    escuro ? 'text-slate-400' : 'text-slate-500'
  }`;
  const campo = `w-full rounded-lg px-3 py-2.5 text-[15px] outline-none transition ${
    escuro
      ? 'bg-white/[0.07] text-white ring-1 ring-white/15 placeholder:text-slate-500 focus:bg-white/10 focus:ring-2 focus:ring-brand-400'
      : 'bg-white text-slate-900 ring-1 ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500'
  }`;

  return (
    <form
      id={id}
      onSubmit={enviar}
      noValidate
      className={
        dentroDoModal
          ? ''
          : `rounded-lg p-5 ${
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

      <div className="grid gap-3">
        <div>
          <label className={rotulo} htmlFor={`${id}-nome`}>Nome completo</label>
          <input
            id={`${id}-nome`} name="nome" autoComplete="name" placeholder="Seu nome"
            value={dados.nome} onChange={mudar('nome')} className={campo}
          />
        </div>

        {/* Telefone e e-mail: preenchidos no mesmo fôlego, então dividem a
            linha a partir do tablet. No celular ficam empilhados, porque o
            telefone formatado não cabe em meia largura. */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className={rotulo} htmlFor={`${id}-contato`}>WhatsApp</label>
            <input
              id={`${id}-contato`} name="contato" type="tel" inputMode="tel" autoComplete="tel"
              placeholder="(44) 99999-9999"
              value={dados.contato} onChange={mudar('contato')} className={campo}
            />
          </div>
          <div>
            <label className={rotulo} htmlFor={`${id}-email`}>
              E-mail <span className="normal-case opacity-60">(opcional)</span>
            </label>
            <input
              id={`${id}-email`} name="email" type="email" inputMode="email" autoComplete="email"
              placeholder="seu@email.com"
              value={dados.email} onChange={mudar('email')} className={campo}
            />
          </div>
        </div>

        {/* Cidade e tipo de negócio dividem a linha em qualquer tela: as duas
            respostas são curtas e cabem lado a lado mesmo no celular. */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={rotulo} htmlFor={`${id}-cidade`}>Cidade</label>
            <input
              id={`${id}-cidade`} name="cidade" list={`${id}-cidades`}
              autoComplete="address-level2" placeholder="Sua cidade"
              value={dados.cidade} onChange={mudar('cidade')} className={campo}
            />
            <datalist id={`${id}-cidades`}>
              {CIDADES_SUGERIDAS.map((c) => <option key={c} value={c} />)}
            </datalist>
          </div>
          <div>
            <label className={rotulo} htmlFor={`${id}-tipo`}>Negócio</label>
            <select
              id={`${id}-tipo`} name="tipo_negocio"
              value={dados.tipo_negocio} onChange={mudar('tipo_negocio')} className={campo}
            >
              <option value="">Selecione</option>
              {SEGMENTOS.map((seg) => <option key={seg} value={seg}>{seg}</option>)}
              <option value="Outro">Outro</option>
            </select>
          </div>
        </div>

        <div>
          <label className={rotulo} htmlFor={`${id}-necessidade`}>
            O que você precisa? <span className="normal-case opacity-60">(opcional)</span>
          </label>
          <textarea
            id={`${id}-necessidade`} name="necessidade" rows={2}
            placeholder="Ex.: câmara fria para açougue, uns 3x3"
            value={dados.necessidade} onChange={mudar('necessidade')}
            className={`${campo} resize-none`}
          />
        </div>

        {/* Campo isca contra robô. */}
        <input
          type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
          value={dados.website} onChange={mudar('website')}
          className="absolute h-0 w-0 overflow-hidden opacity-0"
        />

        <button
          type="submit"
          disabled={estado === 'enviando'}
          className="mt-1 w-full rounded-lg bg-brand-600 px-6 py-3 text-base font-bold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        >
          {estado === 'enviando' ? 'Enviando…' : 'Pedir orçamento'}
        </button>

        {erro && <p role="alert" className="text-sm font-medium text-red-400">{erro}</p>}

        <p className={`text-center text-xs ${escuro ? 'text-slate-500' : 'text-slate-500'}`}>
          Retornamos o contato para fazer o levantamento.
        </p>
      </div>
    </form>
  );
};
