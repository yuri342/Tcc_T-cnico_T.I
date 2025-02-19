class Conversas {
    #id;
    #idUsuario;
    #idIA;
    #ultimoAcesso;
    #contexto;
    #historico;

    /**
     * Construtor da classe Conversas
     * @param {number} id - ID da conversa
     * @param {number} idUsuario - ID do usuário
     * @param {number} idIA - ID da IA
     * @param {string} ultimoAcesso - Última data de acesso
     * @param {JSON} contexto - Contexto da conversa
     * @param {JSON} historico - Histórico da conversa
     */
    constructor(id, idUsuario, idIA, ultimoAcesso, contexto, historico) {
        this.#id = id;
        this.#idUsuario = idUsuario;
        this.#idIA = idIA;
        this.#ultimoAcesso = ultimoAcesso;
        this.#contexto = contexto;
        this.#historico = historico;
    }

    // Getters
    getId() {
        return this.#id;
    }

    getIdUsuario() {
        return this.#idUsuario;
    }

    getIdIA() {
        return this.#idIA;
    }

    getUltimoAcesso() {
        return this.#ultimoAcesso;
    }

    getContexto() {
        return this.#contexto;
    }

    getHistorico() {
        return this.#historico;
    }

    // Setters
    setId(id) {
        this.#id = id;
    }

    setIdUsuario(idUsuario) {
        this.#idUsuario = idUsuario;
    }

    setIdIA(idIA) {
        this.#idIA = idIA;
    }

    setUltimoAcesso(ultimoAcesso) {
        this.#ultimoAcesso = ultimoAcesso;
    }

    setContexto(contexto) {
        this.#contexto = contexto;
    }

    setHistorico(historico) {
        this.#historico = historico;
    }
}
