import { config } from "dotenv"; // Corrigido para importar apenas a função config
import { HfInference } from "@huggingface/inference";
import Contexto from "../Classes/contexto.js"; // Importação correta da classe Contexto
import { pipeline } from "@huggingface/transformers";
import { log } from "@tensorflow/tfjs";
// Carrega as variáveis de ambiente
config(); // Chama a função config() para carregar as variáveis do .env

// Acessa a variável de ambiente
const API_TOKEN = process.env.API_TOKEN; // Corrigido para usar process.env
const hf = new HfInference(API_TOKEN);

// Agora você pode usar hf para fazer chamadas à API do Hugging Face

class Ia {
  // Atributos privados
  #model;
  #name;
  #context;
  #id;
  #idUsuario;
  #conversas;

  /**
   * @param {string} model - O modelo de IA utilizado
   * @param {string} name - O nome da IA
   * @param {object} context - O contexto da IA
   * @param {number} id - O ID da IA
   * @param {number} idUsuario - ID do UsuarioRelacionado
   */

  constructor(model, name, context, id, idUsuario, conversas) {
    this.#model = model;
    this.#name = name;
    this.#context = context;
    this.#id = id;
    this.#idUsuario = idUsuario;
    this.#conversas = conversas;
  }

  /**
   * @returns {string} - O modelo de IA
   */
  getModel() {
    return this.#model;
  }

  /**
   * @returns {string} - O nome da IA
   */
  getName() {
    return this.#name;
  }

  getConversas() {
    return this.#conversas;
  }

  /**
   * @returns {object} - O contexto da IA
   */
  getContext() {
    return this.#context;
  }

  getId() {
    return this.#id;
  }

  /**
   * @returns {number} - O ID do usuário
   */
  getIdUsuario() {
    return this.#idUsuario;
  }

  // Métodos que utilizam API

  async processarConversas() {
    // Altere para o modelo Phi-3.5-mini-instruct-onnx-web
    const generator = await pipeline(
      "text-generation",
      "onnx-community/Phi-3.5-mini-instruct-onnx-web"
    );

    const output = await generator(this.#conversas, {
      max_new_tokens: 128,
      temperature: 0.7,
    });

    return output[0].generated_text; // Garantindo que a resposta seja extraída corretamente
  }

  async enviarInput(novoInput) {
    // Adiciona a nova mensagem do usuário ao array de conversas
    this.#conversas.push({ role: "user", content: novoInput });
    // Chama a função de processamento e obtém a resposta do assistente
    const resposta = await this.processarConversas();
    
    // Adiciona a resposta do assistente ao array de conversas
    this.#conversas.push({ role: "system", content: resposta });
    
    // Retorna a resposta do assistente
    console.log(this.#conversas);
    return resposta;
  }
}

export default Ia;
