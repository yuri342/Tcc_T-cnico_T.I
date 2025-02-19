import fs from "fs";
class Contexto {
  // Atributos privados
  #data;
  #json;
  #sintomas;
  #objetivo;
  #abordagem;
  #aviso;
  #Fprimario;
  #etica;
  #id;

  /**
   * Construtor que inicializa o contexto a partir de um objeto global `info`.
   * @throws {Error} - Se houver um erro ao acessar os dados do contexto
   */
  constructor() {
    // let infos = fs.readFileSync(this.#data, "utf-8");
    this.#json = JSON.parse(infos);

    try {
      this.#sintomas = this.#json[0].AI_assist_Context.User_Profile.Symptoms;
      this.#objetivo = this.#json[0].AI_assist_Context.Objective;
      this.#abordagem = this.#json[0].AI_assist_Context.Tone_and_Approach;
      this.#aviso = this.#json[0].AI_assist_Context.User_Profile.Awareness;
      this.#Fprimario = this.#json[0].AI_assist_Context.Primary_Functions;
      this.#etica = this.#json[0].AI_assist_Context.Ethical_Considerations;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Retorna os sintomas do contexto.
   * @returns {string[]} - Lista de sintomas
   */
  getSintomas() {
    return this.#sintomas;
  }

  /**
   * Retorna o objetivo do contexto.
   * @returns {string} - O objetivo
   */
  getObjetivo() {
    return this.#objetivo;
  }

  /**
   * Retorna a abordagem do contexto.
   * @returns {string} - A abordagem
   */
  getAbordagem() {
    return this.#abordagem;
  }

  /**
   * Retorna o aviso de conscientização do usuário.
   * @returns {string} - O aviso de conscientização
   */
  getAviso() {
    return this.#aviso;
  }

  /**
   * Retorna a função primária do contexto.
   * @returns {string} - A função primária
   */
  getFprimario() {
    return this.#Fprimario;
  }

  /**
   * Retorna as considerações éticas do contexto.
   * @returns {string} - As considerações éticas
   */
  getEtica() {
    return this.#etica;
  }
  /**
   * 
   * @returns {string}
   */
  getData(){
    return this.#data
  }

  /**
   * @returns {number}
   */
  get id(){
    return this.#id;
  }
  /**
   * Sets the data.
   * @param {string} data - The data to set.
   */
  setData(data) {
    this.#data = data;
  }

  setId(id){
    this.#id = id;
  }

}
export default Contexto;


