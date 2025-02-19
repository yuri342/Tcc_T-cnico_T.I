import { createElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Cadastro from "./Cadastro";

createRoot(document.getElementById('InputArea')).render(
  <StrictMode>
    <Cadastro/>
  </StrictMode>
);