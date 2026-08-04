import React, { useEffect, useState } from 'react';

/**
 * Aviso de cookies.
 *
 * Regra que orienta o arquivo: nada de medição carrega antes da escolha. O
 * Google Analytics, o Google Ads e o pixel da Meta só entram depois do aceite —
 * o contrário seria pedir permissão para algo que já aconteceu.
 *
 * O que NÃO depende de consentimento: a origem da visita guardada na sessão
 * (gclid e utm) e a própria escolha registrada aqui. São necessários para o
 * formulário chegar identificado e para o aviso não reaparecer a cada rolagem.
 */

const CHAVE = 'refrigois_cookies';

export type Escolha = 'aceito' | 'recusado';

export function escolhaSalva(): Escolha | null {
  try {
    const v = localStorage.getItem(CHAVE);
    return v === 'aceito' || v === 'recusado' ? v : null;
  } catch {
    return null;
  }
}

/** Sobe as ferramentas de medição. Chamado só após o aceite. */
export function ligarMedicao(): void {
  const w = window as unknown as {
    __medicaoLigada?: boolean;
    dataLayer?: unknown[];
    gtag?: (...a: unknown[]) => void;
    fbq?: ((...a: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
    _fbq?: unknown;
  };
  if (w.__medicaoLigada) return;
  w.__medicaoLigada = true;

  // Google: o dataLayer e a função gtag já existem no HTML e vão enfileirando
  // desde o início, então nada do que aconteceu até aqui se perde.
  w.gtag?.('consent', 'update', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
  });

  const ga = document.createElement('script');
  ga.async = true;
  ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-ME19B7BEPB';
  document.head.appendChild(ga);

  // Meta: só entra se houver um ID configurado. Sem ID, nada é carregado —
  // é o que evita um script de terceiro pesando na página à toa.
  const pixel = import.meta.env.VITE_META_PIXEL;
  if (pixel) {
    const f = function (...args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      (f as unknown as { callMethod?: (...a: unknown[]) => void }).callMethod
        ? (f as unknown as { callMethod: (...a: unknown[]) => void }).callMethod(...args)
        : ((f as unknown as { queue: unknown[] }).queue ||= []).push(args);
    } as unknown as NonNullable<typeof w.fbq>;
    if (!w.fbq) {
      w.fbq = f;
      w._fbq = f;
      f.queue = [];
      f.loaded = true;
      f.version = '2.0';
    }
    const fb = document.createElement('script');
    fb.async = true;
    fb.src = 'https://connect.facebook.net/pt_BR/fbevents.js';
    document.head.appendChild(fb);
    w.fbq?.('init', pixel);
    w.fbq?.('track', 'PageView');
  }
}

export const AvisoCookies: React.FC = () => {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const escolha = escolhaSalva();
    if (escolha === 'aceito') {
      // Já aceitou antes: sobe a medição sem mostrar nada de novo.
      ligarMedicao();
      return;
    }
    if (escolha === null) setVisivel(true);
  }, []);

  function decidir(escolha: Escolha) {
    try {
      localStorage.setItem(CHAVE, escolha);
    } catch {
      // Armazenamento bloqueado: respeitamos a escolha nesta visita e o aviso
      // volta na próxima. Melhor perguntar de novo do que medir sem permissão.
    }
    if (escolha === 'aceito') ligarMedicao();
    setVisivel(false);
  }

  if (!visivel) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-white/10 bg-slate-950/97 px-5 py-4 backdrop-blur sm:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-slate-300">
          Usamos cookies para medir o resultado dos nossos anúncios. Recusar não muda nada no
          seu atendimento.{' '}
          <a
            href="/cookies"
            className="font-semibold text-brand-300 underline underline-offset-4 hover:text-brand-200"
          >
            Saiba mais
          </a>
        </p>

        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => decidir('recusado')}
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-300 ring-1 ring-white/20 transition hover:bg-white/5"
          >
            Recusar
          </button>
          <button
            onClick={() => decidir('aceito')}
            className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-500"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
};
