import { Router } from "express";
import usuarioDAO from "../Back-end/DAOs/usuarioDAO.js";
import Ia from "./Classes/IA copy.js";
import express from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { uploadFile } from "@huggingface/hub";

const routes = Router();

var uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuração do Multer para armazenamento de arquivos
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Diretório para armazenar os arquivos
  },
  filename: function (req, file, cb) {
    var uniqueName = Date.now() + path.extname(file.originalname); // Nome único para o arquivo
    cb(null, uniqueName);
  }
});

// Inicializando o middleware do Multer
var upload = multer({ storage: storage });

// Rota para upload da foto
routes.post('/Photo', upload.single('foto'), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'Nenhum arquivo enviado' });
  }

  var fotoUrl = 'http://localhost:2601/uploads/' + req.file.filename; // URL da foto
  res.status(200).json({
    message: 'Foto recebida com sucesso!',
    photoUrl: fotoUrl
  });
});

routes.post("/Chat", async (req, res) => {
  const { idusuario } = req.body;
  let udao = new usuarioDAO();
  try {
    const resp2 = await udao.AtualizUltAcess(idusuario);
    const resp = await udao.findById(idusuario);
    if (resp != []) {
      console.log("- RESPOSTA -");
      console.log(resp);
      res.send({
         Usuario: resp,
         TimeResp: resp2
      });
    }else{
      res.status(401).send({ message: "Usuario não existe!!!" });
      console.log("Usuario Não existe");
    }
  } catch (error) {
    console.error("Erro ao verificar Usuario:", error);
    res.status(500).send({ message: "Erro interno do servidor" });
    console.log("ERRO SERVER - AXIOS");
  }
});

//IA
routes.post("/Ia", async (req, res) => {
  const { inputValue } = req.body;
  console.log(inputValue);
  //Conversa modelo para DEMO de PRÈ BANCA
  const conversas = [
    { role: "system", content: "Você é um assistente virtual especializado em auxiliar pessoas com sintomas de depressão leve e moderada. Seu objetivo é oferecer suporte empático, sugestões práticas e encorajar os usuários a buscarem ajuda profissional quando necessário. Ao responder, use uma linguagem acolhedora, respeitosa e simples. Não forneça diagnósticos ou conselhos médicos. Em vez disso, recomende atividades que promovam bem-estar, como exercícios físicos leves, prática de mindfulness, ou conversas com amigos e familiares. Lembre-se de reforçar a importância de consultar um profissional de saúde mental para um suporte mais aprofundado. Se o usuário expressar pensamentos negativos persistentes ou sinais de depressão severa, encoraje-o a procurar ajuda de emergência ou entrar em contato com uma linha de apoio imediatamente." }
  ];
  const ia = new Ia("ModeloTeste", null, "TESTE ADMIN", 1, 1, conversas);
  try {
    let resp = await ia.enviarInput(inputValue);
    res.send(
      {
        respota: resp
      }
    );
  } catch (error) {
    console.error("Erro ao enviar input:", error);
    res.status(500).send({ message: "Erro interno do servidor" });
    console.log("ERRO SERVER - AXIOS");
  }
});

//login
routes.post("/Login", async (req, res) => {
  let udao = new usuarioDAO();
  const { nome, senha } = req.body;
  console.log(nome, senha);
  try {
    const resp = await udao.verificarLogin(nome, senha);

    if (resp != "") {
      // Se o usuário foi encontrado
      res.send({
        message: "Login bem-sucedido",
        Token: "TrueLogin",
        id: resp[0].id,
      });
      console.log(resp[0].id);
    } else {
      res.status(401).send({ message: "Nome ou senha inválidos" });
      console.log("LoginERRADO");
    }
  } catch (error) {
    console.error("Erro ao verificar login:", error);
    res.status(500).send({ message: "Erro interno do servidor" });
    console.log("ERRO SERVER");
  }
});

//regitro
routes.post("/Cadastro", async (req, res) => {
  let udao = new usuarioDAO();
  const { nome, senha, email } = req.body;
  try {
    const resp = await udao.create(nome, senha, email);
    if (resp != Error) {
      console.log("RESP = " + resp);
      // Resposta bem-sucedida - Cadastro realizado
      res.status(200).send({
        message: "Requisição Feita Com Sucesso",
        data: resp.message,
      });
    } else {

      // Caso o cadastro falhe ou não retorne resultados
      res.status(401).send({
        message: "Erro ao Realizar Requisição",
      });
      console.log("Erro ao cadastrar. Código de status 401.");

    }

  } catch (error) {
    // Caso ocorra algum erro inesperado (ex: erro no banco de dados)
    console.log("Erro no servidor:", error);
    res.status(500).send({
      message: "Erro interno no servidor. Não foi possível realizar o cadastro.",
    });
  }
});

export default routes;
