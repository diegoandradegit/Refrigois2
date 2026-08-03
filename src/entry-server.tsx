import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';

/** Usado pelo prerender para gerar o HTML estatico da pagina. */
export function render(): string {
  return renderToString(<App />);
}
