import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

// O HTML ja chega pronto do build (ver scripts/prerender.js), entao aqui e
// hidratacao, nao renderizacao do zero.
hydrateRoot(document.getElementById('root')!, <App />);
