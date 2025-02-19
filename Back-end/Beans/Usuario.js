class Usuario {
  #nome;
  #email;
  #senha;
  #id;
  #ultimoAcesso;
  #sintomas = [];

  /**
   * @param {string} nome - Nome do usuário
   * @param {string} email - Email do usuário
   * @param {string} senha - Senha do usuário
   * @param {ìnt} id
   * @param {string[]} sintomas;
   */
  constructor(nome, email, senha, id, sintomas) {
    this.#nome = nome;
    this.#email = email;
    this.#senha = senha;
    this.#id = id;
    this.#sintomas = sintomas;
  }

  /**
   * Método para obter o nome do usuário
   * @returns {string} - Nome do usuário
   */
  getNome() {
    return this.#nome;
  }
  /**
   * Método para obter o email do usuário
   * @returns {string} - Email do usuário
   */
  getEmail() {
    return this.#email;
  }
  /**
   * Método para obter o email do usuário
   * @returns {string} - Email do usuário
   */
  getSenha() {
    return this.#senha;
  }
  /**
   * Método para obter o email do usuário
   * @returns {int} - Email do usuário
   */
  getId() {
    return this.#id;
  }

  /**
   * @returns {string[]}
   */
  getSintomas(){
    return this.#sintomas;
  }

  getUltimoAcessso(){
    return this.#ultimoAcesso;
  }

  setUltimoAcessso(ultmAcss){
    this.#ultimoAcesso = ultmAcss;
  }
}

export default Usuario;