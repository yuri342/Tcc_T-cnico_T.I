import mysql from "mysql"; // Ajustando a importação do mysql
import dotenv from "dotenv"; // Importando dotenv

dotenv.config(); // Carregando variáveis de ambiente

class Conexao {
  // Usar PascalCase
  #pool;

  constructor() {
    this.#pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_DB,
      connectionLimit: 10, // Limite de conexões no pool (opcional, ajuste conforme necessário)
    });
  }

  // Método para obter uma conexão
  async getConnection() {
    return new Promise((resolve, reject) => {
      this.#pool.getConnection((err, connection) => {
        if (err) {
          console.error("ERRO AO CONECTAR: ", err); // Usar console.error para erros
          return reject(err);
        }
        console.log("CONEXÃO BEM SUCESSIDA");
        resolve(connection); // Retorna a conexão
      });
    });
  }

  async query(sql, params) {
    return new Promise((resolve, reject) => {
      this.#pool.query(sql, params, (error, results) => {
        if (error) {
          console.error("Erro na query:", error);
          return reject(error);
        }
        return resolve(results);
      });   
    });
  }
}

export default Conexao; // Exporta uma instância da classe Conexao
