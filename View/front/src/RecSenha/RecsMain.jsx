import { createElement, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RecSenha from "./RecSenha";

createRoot(document.getElementById('InputArea')).render(
  <StrictMode>
    <RecSenha/>
  </StrictMode>
);