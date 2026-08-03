import React, { useEffect, useRef, useState } from 'react';

/**
 * Faz o conteudo aparecer quando entra na tela.
 *
 * Usa IntersectionObserver, que e nativo do navegador: nenhuma biblioteca de
 * animacao entra na pagina, e o custo e proximo de zero.
 *
 * Dois cuidados que mudam o resultado numa pagina de anuncio:
 *
 * 1. O HTML e gerado no build. Se o estado inicial fosse invisivel, quem
 *    chegasse com o JavaScript ainda carregando veria tela em branco — e o
 *    clique foi pago. Por isso o conteudo comeca visivel e a animacao so e
 *    armada depois que o JavaScript assume.
 * 2. Quem pediu menos movimento no sistema nao recebe animacao nenhuma.
 */
export const Revelar: React.FC<{
  children: React.ReactNode;
  /** Atraso em segundos, para itens de uma mesma linha entrarem em sequencia. */
  atraso?: number;
  className?: string;
}> = ({ children, atraso = 0, className = '' }) => {
  const alvo = useRef<HTMLDivElement>(null);
  const [armado, setArmado] = useState(false);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (menosMovimento || !('IntersectionObserver' in window)) return;

    const elemento = alvo.current;
    if (!elemento) return;

    // Se ja estiver na tela na primeira medicao (caso do topo da pagina), nao
    // esconde: animar algo que a pessoa ja esta lendo causa piscada.
    const retangulo = elemento.getBoundingClientRect();
    if (retangulo.top < window.innerHeight) {
      setVisivel(true);
      setArmado(true);
      return;
    }

    setArmado(true);
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        setVisivel(true);
        observador.disconnect();
      },
      // Começa um pouco antes de encostar na borda: quando a pessoa chega,
      // o conteudo ja terminou de entrar.
      { rootMargin: '0px 0px -80px 0px', threshold: 0.05 },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      ref={alvo}
      className={`${className} ${
        armado
          ? `transition-[opacity,transform] duration-700 ease-out ${
              visivel ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`
          : ''
      }`}
      style={armado && !visivel ? { transitionDelay: `${atraso}s` } : undefined}
    >
      {children}
    </div>
  );
};

/** Faixa horizontal que corre sozinha com os segmentos atendidos. */
export const FaixaSegmentos: React.FC<{ itens: readonly string[] }> = ({ itens }) => {
  // A lista vai duplicada de proposito: e o que permite o laco parecer
  // continuo, sem salto no ponto em que recomeça.
  const dobrada = [...itens, ...itens];

  return (
    <div
      className="relative flex overflow-hidden border-y border-white/10 bg-slate-900 py-4"
      aria-label={`Segmentos atendidos: ${itens.join(', ')}`}
    >
      {/* Bordas esmaecidas nas pontas, para os itens surgirem e sumirem em vez
          de aparecerem cortados na beirada. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-900 to-transparent" />

      <ul
        aria-hidden="true"
        className="flex shrink-0 animate-correr items-center gap-10 pr-10 motion-reduce:animate-none"
      >
        {dobrada.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-10 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.18em] text-slate-400"
          >
            {item}
            <span className="text-brand-500">·</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
