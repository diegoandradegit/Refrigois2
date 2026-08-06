import React, { useCallback, useEffect, useRef } from 'react';
import { Formulario } from './Formulario';

/**
 * Modal de orcamento.
 *
 * Reaproveita o mesmo componente de formulario da pagina — nao existe um
 * segundo formulario, so um jeito a mais de chegar nele. Assim toda CTA leva
 * ao mesmo lugar e os campos, a validacao e o registro da conversao continuam
 * em um arquivo so.
 *
 * Sem biblioteca de modal: sao poucas linhas e evitam peso extra numa pagina
 * que vive de tempo de carregamento pago.
 */

interface Props {
  aberto: boolean;
  aoFechar: () => void;
}

export const ModalOrcamento: React.FC<Props> = ({ aberto, aoFechar }) => {
  const caixa = useRef<HTMLDivElement>(null);
  const anterior = useRef<HTMLElement | null>(null);

  const fecharComEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') aoFechar();
    },
    [aoFechar],
  );

  useEffect(() => {
    if (!aberto) return;

    // Guarda quem abriu, para devolver o foco ao fechar: quem navega por
    // teclado ou leitor de tela nao pode ser jogado de volta ao topo.
    anterior.current = document.activeElement as HTMLElement;

    // Trava a rolagem do fundo, senao o dedo rola a pagina em vez do modal.
    const rolagem = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', fecharComEsc);
    caixa.current?.querySelector<HTMLInputElement>('input, select, textarea')?.focus();

    return () => {
      document.body.style.overflow = rolagem;
      document.removeEventListener('keydown', fecharComEsc);
      anterior.current?.focus();
    };
  }, [aberto, fecharComEsc]);

  if (!aberto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Solicitar orçamento de câmara fria"
      className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/70 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={(e) => e.target === e.currentTarget && aoFechar()}
    >
      {/* No celular abre como painel deslizante, preso à base e ocupando no
          máximo 92% da altura: sobra faixa escura no topo, que mostra que há
          página atrás e dá o caminho de volta. Ocupar a tela inteira parecia
          outra página, e não um passo dentro da mesma.
          A rolagem fica aqui dentro, e não na página, senão o fundo rola junto
          quando o dedo chega ao fim do formulário. */}
      <div
        ref={caixa}
        className="relative flex max-h-[92dvh] w-full max-w-md animate-subir flex-col overflow-hidden rounded-t-2xl bg-slate-900 shadow-2xl ring-1 ring-white/10 motion-reduce:animate-none sm:max-h-[88dvh] sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 px-5 pb-2 pt-4 sm:px-6 sm:pt-5">
          <div>
            {/* Puxador: sinaliza painel arrastável, o gesto que a pessoa já
                conhece de outros aplicativos. Só no celular. */}
            <div aria-hidden="true" className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20 sm:hidden" />
            <p className="text-lg font-bold text-white">Peça seu orçamento</p>
            <p className="mt-1 text-sm text-slate-400">
              Retornamos o contato para fazer o levantamento.
            </p>
          </div>
          <button
            onClick={aoFechar}
            aria-label="Fechar"
            className="-mr-2 shrink-0 rounded-lg px-3 py-1 text-2xl leading-none text-slate-500 transition hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-5 sm:px-6 sm:pb-6">
          <Formulario id="orcamento-modal" variante="modal" />
        </div>
      </div>
    </div>
  );
};
