import React, { useRef, useState } from 'react';
import { EMPRESA_DADOS, ENDPOINT_LEAD, SEGMENTOS } from './conteudo';
import { lerRastreio } from './rastreio';

/**
 * Formulario da landing, em duas etapas.
 *
 *   1. Nome, telefone e e-mail   -> grava o lead (incompleto)
 *   2. Cidade, negocio e detalhes -> completa
 *
 * Duas decisoes explicam o resto do arquivo.
 *
 * A PRIMEIRA etapa ja grava. Quem desistir depois dela esta no sistema e pode
 * ser retornado; no formulario de tela unica, fechar o modal significava perder
 * o contato inteiro.
 *
 * A etapa avanca ANTES de o servidor responder. A versao anterior esperava a
 * resposta para trocar de tela, e no 4G isso dava a sensacao de travamento
 * justo no meio do preenchimento. Agora a validacao acontece aqui, a tela troca
 * na hora e a gravacao segue em segundo plano — se ela demorar, quem esta
 * preenchendo nao percebe.
 *
 * O envio final espera a promessa da primeira etapa antes de completar. Se ela
 * tiver falhado, manda tudo de uma vez como registro novo: em nenhum caminho o
 * contato se perde ou vira dois leads da mesma pessoa.
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
  const [etapa, setEtapa] = useState(1);
  const [estado, setEstado] = useState<Estado>('parado');
  const [erro, setErro] = useState('');

  const [dados, setDados] = useState({
    nome: '', contato: '', email: '',
    cidade: '', tipo_negocio: '', necessidade: '', website: '',
  });

  /** Gravação da etapa 1, em andamento. O envio final espera por ela. */
  const gravacao = useRef<Promise<string | null> | null>(null);

  const escuro = variante === 'hero' || variante === 'modal';
  const dentroDoModal = variante === 'modal';

  const mudar = (campo: keyof typeof dados) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setDados((d) => ({ ...d, [campo]: e.target.value }));
    if (erro) setErro('');
  };

  /** Fala com o servidor. Devolve a sessão do lead, ou null se falhar. */
  async function enviarAoServidor(corpo: Record<string, unknown>): Promise<string | null> {
    try {
      const r = await fetch(ENDPOINT_LEAD, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...corpo,
          website: dados.website,
          origem: 'landing-camara-fria',
        }),
      });
      if (!r.ok) return null;
      const json = await r.json().catch(() => ({}));
      return json.sessao ?? null;
    } catch {
      return null;
    }
  }

  function avancar(e: React.FormEvent) {
    e.preventDefault();

    if (!dados.nome.trim()) return setErro('Preencha seu nome.');
    if (!telefoneValido(dados.contato)) {
      return setErro('O telefone precisa ter DDD e número. Exemplo: (44) 99999-9999.');
    }
    if (dados.email.trim() && !emailValido(dados.email.trim())) {
      return setErro('Confira o e-mail, ou deixe o campo em branco.');
    }

    // Troca de tela imediata. A gravação vai atrás, sem segurar a interface.
    setEtapa(2);
    setErro('');
    registrarConversao();

    gravacao.current = enviarAoServidor({
      nome: dados.nome,
      contato: dados.contato,
      email: dados.email || null,
      completo: false,
      ...lerRastreio(),
    });
  }

  async function concluir(e: React.FormEvent) {
    e.preventDefault();
    if (estado === 'enviando') return;

    if (!dados.cidade.trim()) return setErro('Preencha a cidade.');
    if (!dados.tipo_negocio) return setErro('Selecione o tipo de negócio.');

    setEstado('enviando');
    setErro('');

    const sessao = await (gravacao.current ?? Promise.resolve(null));

    const resultado = sessao
      ? await enviarAoServidor({
          sessao,
          cidade: dados.cidade,
          tipo_negocio: dados.tipo_negocio,
          necessidade: dados.necessidade || null,
          completo: true,
        })
      : // A etapa 1 falhou: manda tudo de uma vez, como registro novo.
        await enviarAoServidor({
          nome: dados.nome,
          contato: dados.contato,
          email: dados.email || null,
          cidade: dados.cidade,
          tipo_negocio: dados.tipo_negocio,
          necessidade: dados.necessidade || null,
          completo: true,
          ...lerRastreio(),
        });

    if (resultado === null && !sessao) {
      setEstado('erro');
      setErro(`Não consegui enviar agora. Ligue para ${EMPRESA_DADOS.telefone} que atendemos na hora.`);
      return;
    }
    setEstado('enviado');
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

  return (
    <form
      id={id}
      onSubmit={etapa === 1 ? avancar : concluir}
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

      {/* Dois traços: mostram que o fim está a um passo. */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex flex-1 gap-1.5">
          {[1, 2].map((n) => (
            <div
              key={n}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                n <= etapa ? 'bg-brand-500' : escuro ? 'bg-white/15' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
        <span className={`shrink-0 text-xs font-medium ${escuro ? 'text-slate-400' : 'text-slate-500'}`}>
          Etapa {etapa} de 2
        </span>
      </div>

      {/* key por etapa: o React remonta o bloco e a transição roda de novo,
          o que dá a sensação de avanço em vez de troca seca de campos. */}
      <div key={etapa} className="grid animate-fade-in-up gap-4 motion-reduce:animate-none">
        {etapa === 1 ? (
          <>
            <div>
              <label className={rotulo} htmlFor={`${id}-nome`}>Nome completo</label>
              <input
                id={`${id}-nome`} name="nome" autoComplete="name" placeholder="Seu nome"
                value={dados.nome} onChange={mudar('nome')} className={campo}
              />
            </div>
            <div>
              <label className={rotulo} htmlFor={`${id}-contato`}>WhatsApp / Telefone</label>
              <input
                id={`${id}-contato`} name="contato" type="tel" inputMode="tel" autoComplete="tel"
                placeholder="(44) 99999-9999"
                value={dados.contato} onChange={mudar('contato')} className={campo}
              />
            </div>
            <div>
              <label className={rotulo} htmlFor={`${id}-email`}>
                E-mail <span className="font-normal normal-case text-slate-500">(opcional)</span>
              </label>
              <input
                id={`${id}-email`} name="email" type="email" inputMode="email" autoComplete="email"
                placeholder="seu@email.com"
                value={dados.email} onChange={mudar('email')} className={campo}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className={rotulo} htmlFor={`${id}-cidade`}>Cidade</label>
              <input
                id={`${id}-cidade`} name="cidade" list={`${id}-cidades`}
                autoComplete="address-level2" placeholder="Onde será a instalação"
                value={dados.cidade} onChange={mudar('cidade')} className={campo}
              />
              <datalist id={`${id}-cidades`}>
                {CIDADES_SUGERIDAS.map((c) => <option key={c} value={c} />)}
              </datalist>
            </div>
            <div>
              <label className={rotulo} htmlFor={`${id}-tipo`}>Tipo de negócio</label>
              <select
                id={`${id}-tipo`} name="tipo_negocio"
                value={dados.tipo_negocio} onChange={mudar('tipo_negocio')} className={campo}
              >
                <option value="">Selecione</option>
                {SEGMENTOS.map((seg) => <option key={seg} value={seg}>{seg}</option>)}
                <option value="Outro">Outro</option>
              </select>
            </div>
            <div>
              <label className={rotulo} htmlFor={`${id}-necessidade`}>
                O que você precisa?{' '}
                <span className="font-normal normal-case text-slate-500">(opcional)</span>
              </label>
              <textarea
                id={`${id}-necessidade`} name="necessidade" rows={3}
                placeholder="Ex.: câmara fria para açougue, uns 3x3, no fundo da loja"
                value={dados.necessidade} onChange={mudar('necessidade')} className={campo}
              />
            </div>
          </>
        )}

        {/* Campo isca contra robô. */}
        <input
          type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
          value={dados.website} onChange={mudar('website')}
          className="absolute h-0 w-0 overflow-hidden opacity-0"
        />

        <button
          type="submit"
          disabled={estado === 'enviando'}
          className="w-full rounded-lg bg-brand-600 px-6 py-3.5 text-base font-bold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        >
          {etapa === 1 ? 'Continuar' : estado === 'enviando' ? 'Enviando…' : 'Enviar pedido'}
        </button>

        {erro && (
          <p role="alert" className="text-sm font-medium text-red-400">{erro}</p>
        )}

        {etapa === 2 && (
          <button
            type="button"
            onClick={() => { setEtapa(1); setErro(''); }}
            className={`text-sm underline underline-offset-4 ${
              escuro ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Voltar
          </button>
        )}

        <p className={`text-xs ${escuro ? 'text-slate-400' : 'text-slate-500'}`}>
          {etapa === 1
            ? 'Nome e telefone para começar. Sem compromisso.'
            : 'Retornamos o contato para fazer o levantamento.'}
        </p>
      </div>
    </form>
  );
};
