import React, { useState } from 'react';
import { EMPRESA_DADOS, ENDPOINT_LEAD, SEGMENTOS } from './conteudo';

/**
 * Formulario da landing.
 *
 * Obrigatorios: nome e telefone. Todo o resto e coletado, mas nao trava o
 * envio.
 *
 * O raciocinio: com nome e telefone valido ja da para trabalhar o lead, e cada
 * campo obrigatorio a mais derruba a taxa de preenchimento. Os campos opcionais
 * continuam na tela porque boa parte das pessoas preenche assim mesmo — e
 * quando preenchem, o levantamento ja comeca adiantado.
 */

type Estado = 'parado' | 'enviando' | 'enviado' | 'erro';

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
          sobrenome: dados.get('sobrenome'),
          contato: dados.get('contato'),
          email: dados.get('email'),
          cidade: dados.get('cidade'),
          tipo_negocio: dados.get('tipo_negocio'),
          necessidade: dados.get('necessidade'),
          website: dados.get('website'),
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
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={rotulo} htmlFor={`${id}-nome`}>
              Nome
            </label>
            <input
              id={`${id}-nome`}
              name="nome"
              required
              autoComplete="given-name"
              className={campo}
            />
          </div>
          <div>
            <label className={rotulo} htmlFor={`${id}-sobrenome`}>
              Sobrenome <span className="normal-case font-normal text-slate-500">(opcional)</span>
            </label>
            <input
              id={`${id}-sobrenome`}
              name="sobrenome"
              autoComplete="family-name"
              className={campo}
            />
          </div>
        </div>

        <div>
          <label className={rotulo} htmlFor={`${id}-contato`}>
            Telefone / WhatsApp
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
            E-mail <span className="normal-case font-normal text-slate-500">(opcional)</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="nome@empresa.com.br"
            className={campo}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={rotulo} htmlFor={`${id}-tipo`}>
              Segmento <span className="normal-case font-normal text-slate-500">(opcional)</span>
            </label>
            <select id={`${id}-tipo`} name="tipo_negocio" defaultValue="" className={campo}>
              <option value="">Selecione</option>
              {SEGMENTOS.map((nome) => (
                <option key={nome} value={nome}>
                  {nome}
                </option>
              ))}
              <option value="Outro">Outro</option>
            </select>
          </div>
          <div>
            <label className={rotulo} htmlFor={`${id}-cidade`}>
              Cidade <span className="normal-case font-normal text-slate-500">(opcional)</span>
            </label>
            <input
              id={`${id}-cidade`}
              name="cidade"
              autoComplete="address-level2"
              className={campo}
            />
          </div>
        </div>

        <div>
          <label className={rotulo} htmlFor={`${id}-necessidade`}>
            O que precisa armazenar <span className="normal-case font-normal text-slate-500">(opcional)</span>
          </label>
          <textarea
            id={`${id}-necessidade`}
            name="necessidade"
            rows={2}
            placeholder="Ex.: carnes resfriadas, câmara de uns 3x3 no fundo da loja"
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
