import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';
import { capturarRastreio } from './rastreio';

// Antes de montar a tela: guarda gclid e utm da URL, que se perdem na navegacao.
capturarRastreio();

// O HTML ja chega pronto do build (ver scripts/prerender.js), entao aqui e
// hidratacao, nao renderizacao do zero.
hydrateRoot(document.getElementById('root')!, <App />);
