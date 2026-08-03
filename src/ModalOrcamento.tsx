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
      className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto bg-slate-950/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={(e) => e.target === e.currentTarget && aoFechar()}
    >
      <div ref={caixa} className="relative w-full max-w-md">
        <button
          onClick={aoFechar}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-10 rounded-lg px-3 py-1 text-2xl leading-none text-slate-400 hover:text-white"
        >
          ×
        </button>
        <Formulario id="orcamento-modal" variante="hero" />
      </div>
    </div>
  );
};
