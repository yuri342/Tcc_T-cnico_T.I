import { config } from "dotenv"; // Corrigido para importar apenas a função config
import { HfInference } from "@huggingface/inference";
import Contexto from "../Classes/contexto.js"; // Importação correta da classe Contexto
import { pipeline } from "@huggingface/transformers";
import { log } from "@tensorflow/tfjs";
import NodeCache from "node-cache";

// Carrega as variáveis de ambiente
config(); // Chama a função config() para carregar as variáveis do .env

// Acessa a variável de ambiente
const API_TOKEN = process.env.API_TOKEN; // Corrigido para usar process.env
const hf = new HfInference(API_TOKEN);

// Criação do pipeline de geração de texto fora da classe para evitar a recriação em cada chamada
const generator = await pipeline(
  "text-generation",
  "onnx-community/Llama-3.2-1B-Instruct-q4f16",
  {
    device: "gpu",
    dtype: "q4f16",
  }
);
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

  updateConversas(role, content) {
    this.#conversas.push({ role, content });
  }

  async processarConversas() {
    const cache = new NodeCache({ stdTTL: 300 }); // TTL de 5 minutos
    const conversasHash = JSON.stringify(this.#conversas);
    const cachedResponse = cache.get(conversasHash);

    if (cachedResponse) {
      return cachedResponse;
    }

    try {
      const output = await generator(this.#conversas, {
        max_new_tokens: 150,
        temperature: 0.9,
      });
      const resposta = output[0].generated_text.at(-1).content;

      cache.set(conversasHash, resposta);
      return resposta;
    } catch (error) {
      console.error("Erro ao processar conversas:", error);
      return "Desculpe, houve um erro ao processar sua solicitação.";
    }
  }

  async enviarInput(novoInput) {
    // Atualiza as conversas com o novo input do usuário
    this.updateConversas("user", novoInput);

    // Processa as conversas para gerar a resposta
    const resposta = await this.processarConversas();

    // Atualiza as conversas com a resposta do assistente
    this.updateConversas("assistant", resposta);

    console.log(this.#conversas); // Pode ser removido ou substituído por logs mais detalhados, se necessário
    return resposta;
  }
}

export default Ia;
