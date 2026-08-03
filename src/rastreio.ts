/**
 * Guarda de onde o visitante veio, para o lead chegar com origem identificada.
 *
 * Le da URL na primeira visita e grava na sessao, porque a pessoa costuma rolar,
 * abrir outra aba e voltar — e nesse caminho os parametros da URL se perdem. Sem
 * isso, o lead chega sem saber qual anuncio pagou por ele.
 */

const CHAVE = 'refrigois_rastreio';

export interface Rastreio {
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  pagina?: string;
  referrer?: string;
  dispositivo?: string;
}

function tipoDeAparelho(): string {
  if (typeof navigator === 'undefined') return 'desconhecido';
  const ua = navigator.userAgent;
  if (/iPad|Tablet/i.test(ua)) return 'tablet';
  if (/Mobi|Android|iPhone/i.test(ua)) return 'celular';
  return 'computador';
}

export function capturarRastreio(): void {
  if (typeof window === 'undefined') return;
  try {
    if (sessionStorage.getItem(CHAVE)) return;

    const p = new URLSearchParams(window.location.search);
    const dados: Rastreio = {
      pagina: window.location.pathname,
      dispositivo: tipoDeAparelho(),
    };

    // gclid so aparece quando o clique veio de anuncio do Google.
    const gclid = p.get('gclid') ?? p.get('wbraid') ?? p.get('gbraid');
    if (gclid) dados.gclid = gclid;

    (['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const).forEach(
      (k) => {
        const v = p.get(k);
        if (v) dados[k] = v;
      },
    );

    // Referrer de outra origem: quando veio do Google organico, do Instagram
    // ou de qualquer site. Ignoramos o proprio dominio para nao registrar
    // navegacao interna como se fosse origem nova.
    const ref = document.referrer;
    if (ref && !ref.includes(window.location.host)) dados.referrer = ref.slice(0, 300);

    sessionStorage.setItem(CHAVE, JSON.stringify(dados));
  } catch {
    // Navegador com armazenamento bloqueado: seguimos sem rastreio. O lead
    // continua sendo gravado, so chega sem a origem.
  }
}

export function lerRastreio(): Rastreio {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(sessionStorage.getItem(CHAVE) ?? '{}') as Rastreio;
  } catch {
    return {};
  }
}
