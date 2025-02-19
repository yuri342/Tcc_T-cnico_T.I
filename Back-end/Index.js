import express from 'express'; // Importa express
import routes from './routes.js'; // Certifique-se de que o arquivo 'routes.js' está na mesma pasta
import cors from 'cors'; // Importa cors
import path from 'path';
import multer from 'multer';
import fs from 'fs';

// Obtenha o diretório do arquivo atual
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express(); // Cria uma instância do aplicativo Express

// Use a variável __dirname para configurar a rota estática de uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json()); // Middleware para processar JSON
app.use(cors()); // Middleware para habilitar CORS
app.use(routes); // Monta as rotas

app.get("/", (req, res) => {
  res.send("OK SERVER"); // Responde com "OK SERVER" na rota raiz
});

app.listen(2601, () => {
  console.log("SERVER rodando na porta 2601"); // Informa que o servidor está em execução
});
