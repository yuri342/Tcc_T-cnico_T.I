import { config } from 'dotenv'; // Corrigido para importar apenas a função config
import { HfInference } from '@huggingface/inference';
import { pipeline } from "@xenova/transformers";
import Contexto from "../Classes/contexto.js"; // Importação correta da classe Contexto

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
  
    /**
     * @param {string} model - O modelo de IA utilizado
     * @param {string} name - O nome da IA
     * @param {object} context - O contexto da IA
     * @param {number} id - O ID da IA
     * @param {number} idUsuario - ID do UsuarioRelacionado
     */
    constructor(model, name, context, id, idUsuario) {
      this.#model = model;
      this.#name = name;
      this.#context = context;
      this.#id = id;
      this.#idUsuario = idUsuario;
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
    

    //Metodos que Utilizam API.
        
    /**
     * @param {string} inputDoUsuario - Input fornecido pelo usuário
     * @param {object} contexto - Objeto contexto que inclui sintomas e objetivo
     * @returns {string} - Input processado com base no objetivo e sintomas do contexto
     */
    preFiltroResposta(inputDoUsuario, contexto) {
      const sintomas = contexto.getSintomas(); // Ajustado para getSintomas() corretamente
      const objetivo = contexto.getObjetivo();
      const inputFinal = "IA: according to the following parameter: " + objetivo + " answer the User: " + inputDoUsuario;
      return inputFinal;
    }
  
    /**
     * @param {string} input - O input processado para o modelo de IA
     * @returns {Promise<string>} - Texto gerado pelo modelo de IA
     */
    async response(input) {
      const Gerador = await pipeline('text2text-generation', 'Xenova/LaMini-Flan-T5-783M');
      const output = await Gerador(input, {
        max_new_tokens: 100,
        temperature: 0.9,

      });
  
      const generatedText = output[0].generated_text;
      return generatedText;
    }
  

    /**
     * @param {string} input - Texto em inglês para traduzir
     * @returns {Promise<string>} - Texto traduzido para o português
     */
    async traduzir(input) {
      const tradutor = await pipeline('translation', 'Xenova/nllb-200-distilled-600M');
  
      const resultado = await tradutor(input, {
        src_lang: 'eng_Latn', // Idioma de origem: Inglês
        tgt_lang: 'por_Latn', // Idioma de destino: Português
        temperature: 0.5, // Temperatura para ajustar a fidelidade e criatividade
      });
  
      return resultado[0].translation_text;
    }
  
    
    async traduzir2(input) {
      const tradutor = await pipeline('translation', 'Xenova/mbart-large-50-many-to-many-mmt');

      const resultado = await tradutor(input, {
        src_lang: 'pt_XX', // Idioma de origem: Português
        tgt_lang: 'en_XX', // Idioma de destino: Inglês
        temperature: 0.1,  // Menor temperatura para maior fidelidade
      });
    
      return resultado[0].translation_text;
    }
  }

  
  
export default Ia;


// var input = ia.preFiltroResposta("i am very sad, i need to talk about how i fell. i have thoughts of killing myself, dont know what to do.", contexto);
// var text = await ia.response(input);
// console.log(text);
