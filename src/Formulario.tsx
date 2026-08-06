import React, { useState } from 'react';
import { EMPRESA_DADOS, ENDPOINT_LEAD, SEGMENTOS } from './conteudo';
import { lerRastreio } from './rastreio';

/**
 * Formulario da landing.
 *
 * Os mesmos quatro campos do modal do site principal: nome completo, telefone,
 * e-mail e o que a pessoa precisa. Quem pede orcamento pelos dois caminhos
 * responde as mesmas perguntas, e os leads chegam comparaveis no painel.
 *
 * Obrigatorios: nome, telefone, cidade e tipo de negocio. Os dois ultimos
 * entraram como obrigatorios de proposito — custam preenchimento, mas sem eles
 * o comercial liga sem saber se o servico e viavel no endereco nem que
 * equipamento a pessoa usa, e a ligacao vira entrevista em vez de proposta.
 *
 * Para o custo ser o menor possivel, nenhum dos dois se digita do zero:
 * negocio e selecao, cidade tem sugestao das que mais aparecem e usa o
 * preenchimento automatico do proprio celular.
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
  /** 'hero' aparece sobre fundo escuro; 'claro' no fechamento da pagina. */
  variante?: 'hero' | 'claro';
  id?: string;
}

/** Avisa o Google Ads e o Analytics que o lead entrou. Sem isto a campanha
 *  otimiza no escuro e o dinheiro e gasto sem retorno mensuravel. */
function registrarConversao() {
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
  if (typeof w.gtag === 'function') {
    w.gtag('event', 'gerar_lead', { event_category: 'landing_camara_fria' });
  }
}

export const Formulario: React.FC<Props> = ({ variante = 'hero', id }) => {
  const [estado, setEstado] = useState<Estado>('parado');
  const [mensagem, setMensagem] = useState('');

  const escuro = variante === 'hero';

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado === 'enviando') return;

    const dados = new FormData(e.currentTarget);
    setEstado('enviando');
    setMensagem('');

    try {
      const resposta = await fetch(ENDPOINT_LEAD, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: dados.get('nome'),
          contato: dados.get('contato'),
          email: dados.get('email'),
          cidade: dados.get('cidade'),
          tipo_negocio: dados.get('tipo_negocio'),
          necessidade: dados.get('necessidade'),
          origem: 'landing-camara-fria',
          website: dados.get('website'),
          // De onde a pessoa veio: gclid do Ads, utm, referrer e aparelho.
          ...lerRastreio(),
        }),
      });

      const corpo = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        // A funcao devolve uma frase pronta para o visitante ler. Se por algum
        // motivo nao vier, damos um caminho de saida em vez de um erro seco.
        setEstado('erro');
        setMensagem(
          corpo.erro ??
            `Não consegui enviar agora. Ligue para ${EMPRESA_DADOS.telefone} que atendemos na hora.`,
        );
        return;
      }

      registrarConversao();
      setEstado('enviado');
    } catch {
      setEstado('erro');
      setMensagem(
        `Sem conexão com o servidor. Confira a internet ou ligue para ${EMPRESA_DADOS.telefone}.`,
      );
    }
  }

  if (estado === 'enviado') {
    return (
      <div
        id={id}
        className={`rounded-lg p-6 sm:p-8 text-center ${
          escuro ? 'bg-white/10 backdrop-blur-sm ring-1 ring-white/20' : 'bg-brand-50 ring-1 ring-brand-200'
        }`}
      >
        <p className={`text-xl font-bold mb-2 ${escuro ? 'text-white' : 'text-slate-900'}`}>
          Contato recebido
        </p>
        <p className={`text-sm ${escuro ? 'text-slate-300' : 'text-slate-600'}`}>
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
      onSubmit={enviar}
      noValidate
      className={`rounded-lg p-5 sm:p-6 ${
        escuro
          ? 'bg-slate-900/70 backdrop-blur-md ring-1 ring-white/15'
          : 'bg-white ring-1 ring-slate-200 shadow-lg'
      }`}
    >
      <p className={`text-lg font-bold mb-1 ${escuro ? 'text-white' : 'text-slate-900'}`}>
        Peça seu orçamento
      </p>
      <p className={`text-sm mb-5 ${escuro ? 'text-slate-300' : 'text-slate-600'}`}>
        Conte o que precisa armazenar e em que espaço. O orçamento sai do levantamento, não de
        tabela.
      </p>

      <div className="grid gap-4">
        <div>
          <label className={rotulo} htmlFor={`${id}-nome`}>
            Nome completo
          </label>
          <input
            id={`${id}-nome`}
            name="nome"
            required
            autoComplete="name"
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
            placeholder="(44) 99999-9999"
            className={campo}
          />
        </div>

        <div>
          <label className={rotulo} htmlFor={`${id}-email`}>
            E-mail <span className="font-normal normal-case text-slate-500">(opcional)</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="seu@email.com"
            className={campo}
          />
        </div>

        <div>
          <label className={rotulo} htmlFor={`${id}-cidade`}>
            Cidade da instalação
          </label>
          <input
            id={`${id}-cidade`}
            name="cidade"
            required
            list={`${id}-cidades`}
            /* address-level2 faz o proprio celular oferecer a cidade salva. */
            autoComplete="address-level2"
            placeholder="Onde o equipamento vai ficar"
            className={campo}
          />
          {/* Sugestao, nao restricao: atendemos todo o Parana, entao a lista
              acelera quem esta nas cidades comuns sem travar as demais. */}
          <datalist id={`${id}-cidades`}>
            {CIDADES_SUGERIDAS.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>

        <div>
          <label className={rotulo} htmlFor={`${id}-tipo-negocio`}>
            Seu negócio
          </label>
          <select
            id={`${id}-tipo-negocio`}
            name="tipo_negocio"
            required
            defaultValue=""
            className={campo}
          >
            <option value="" disabled>
              Selecione
            </option>
            {SEGMENTOS.map((seg) => (
              <option key={seg} value={seg}>
                {seg}
              </option>
            ))}
            <option value="Outro">Outro</option>
          </select>
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
            placeholder="Ex.: câmara fria para açougue, uns 3x3, em Cascavel"
            className={campo}
          />
        </div>

        {/* Campo isca contra robo: escondido de quem enxerga e de quem usa leitor de tela. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute h-0 w-0 overflow-hidden opacity-0"
        />

        <button
          type="submit"
          disabled={estado === 'enviando'}
          className="w-full rounded-lg bg-brand-600 px-6 py-3.5 text-base font-bold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        >
          {estado === 'enviando' ? 'Enviando…' : 'Pedir orçamento'}
        </button>

        {estado === 'erro' && (
          <p role="alert" className="text-sm font-medium text-red-400">
            {mensagem}
          </p>
        )}

        <p className={`text-xs ${escuro ? 'text-slate-400' : 'text-slate-500'}`}>
          Retornamos o contato para fazer o levantamento. Sem compromisso e sem cadastro.
        </p>
      </div>
    </form>
  );
};
