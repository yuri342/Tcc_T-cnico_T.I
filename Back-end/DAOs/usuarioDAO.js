import {
  cat,
  ElectraForSequenceClassification,
} from "@huggingface/transformers";
import Conexao from "../Classes/conexao.js";
var conexao = new Conexao();
class usuarioDAO {
  async create(nome, senha, email) {
    const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
    const params = [nome, senha, email];

    try {
      const result = await conexao.query(sql, params);
      console.log("Novo Usuário Inserido");
      return result; // Retorna o ID do novo usuário
    } catch (error) {
      console.error("Erro ao inserir usuário:", error);
      throw error; // Relança o erro para tratamento posterior
    }
  }

  async findById(id) {
    const sql = "SELECT * FROM usuarios WHERE id = ?";
    const params = [id];
    const results = await conexao.query(sql, params);
    return results; // Retorna o usuário encontrado
  }

  findAll() {
    const sql = "SELECT * FROM usuarios";
    let res = conexao.query(sql);
    return res; // Retorna todos os usuários
  }

  async AtualizUltAcess(id) {
    const sql = "UPDATE usuarios SET ultimo_acesso = CURRENT_TIMESTAMP WHERE id = ?"
    const params = id;
    const result = await conexao.query(sql,params);
    return result;
  }

  async AtualizFoto(id,foto) {
    const sql = "UPDATE usuarios SET foto = ? WHERE id = ?"
    const params = [foto, id];
    const result = await conexao.query(sql,params);
    return result;
  }

  async update(id, userData) { 
    const sql =
      "UPDATE usuarios SET nome = ?, email = ?, senha = ?, ultimo_acesso = ? WHERE id = ?";
    const params = [
      usuario.getNome(),
      usuario.getEmail(),
      usuario.getSenha(),
      usuario.getUltimoAcessso(),
      usuario.getId(),
    ];
    const result = await conexao.query(sql, params);
    return result; // Retorna o número de linhas afetadas
  }

  async delete(id) {
    const sql = "DELETE FROM usuarios WHERE id = ?";
    const params = [id];
    const result = await conexao.query(sql, params);
    return result; // Retorna o número de linhas afetadas
  }

  async verificarLogin(nome, senha) {
    const sql = "SELECT * FROM usuarios WHERE nome = ? AND senha = ?";
    const params = [nome, senha];
    const result = await conexao.query(sql, params);
    return result; // Retorna o resultado da consulta
  }

  async create(nome, senha, email) {
    const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
    const sql2 = "SELECT * FROM usuarios WHERE nome = ?";
    const sql3 = "SELECT * FROM usuarios WHERE email = ?";
    const params =[   
      nome,
      email,
      senha
    ];
    
    
    try {
      const pesquisa = await conexao.query(sql2,[nome]);
      const pesquisa2 = await conexao.query(sql3, [email]);
      if (pesquisa.length > 0) {
        console.log(pesquisa[0].nome);
        // Se o nome já existe, lança um erro customizado ou retorna uma resposta informando o problema
        throw new Error('Nome de usuário já existe');
      }
      if (pesquisa2.length > 0) {
        console.log(pesquisa2[0].email);
        throw new Error("Email de usuario já existe");
      }

      const result = await conexao.query(sql, params);
      console.log("Cadastrado Com Sucesso");
      return result;
    } catch (error) {
      console.log(error  + "-ERRO CADASTRO");
      return error;
    }
  }



}

export default usuarioDAO;
