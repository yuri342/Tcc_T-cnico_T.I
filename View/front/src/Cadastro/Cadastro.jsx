import "./CadastroStyle.css";
import React, { useState } from "react";
import axios from "axios";
function RecSenha() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [msg, setMsg] = useState("");
  const [id, setId] = useState("");
  const [id2, setId2] = useState("");
  //Ação do Botão//

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        console.log(nome, senha, email);
    
        const resp = await axios.post(
          "http://localhost:2601/Cadastro",
          { nome, senha, email },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("Resposta do servidor:", resp.data.message);
        let msg = resp.data.data;
        console.log(msg);
        if (msg == "") {msg = "Cadastro Efetuado com Sucesso";}
        setMsg(msg);

      } catch (error) {
        console.error("Erro ao enviar dados:", error);
        console.log(resp.data);
      }
  };

  return (
    <>
      <form onSubmit={handleSubmit} id={id}>
        <div className="coolinput" id="input1">
          <label  className="text">
            Email:
          </label>
          <input
            id={id2}
            required
            type="email"
            placeholder="Email"
            name="email" // Corrigido para refletir o campo de e-mail
            maxLength={50}
            className="input"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="coolinput" id="input2">
          <label className="text">
            Nome:
          </label>
          <input
            id={id2}
            type="text"
            placeholder="Nome"
            name="input"
            maxLength={20}
            minLength={4}
            className="input"
            autoComplete="off"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="coolinput" id="input2">
          <label className="text">
            Senha:
          </label>
          <input
            id={id2}
            type="password"
            placeholder="Senha"
            name="input"  
            maxLength={20}
            minLength={10}
            className="input"
            autoComplete="off"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <button className="button" type="submit">
          Enviar
        </button>
        <h1>{msg}</h1>
      </form>
    </>
  );
}

export default RecSenha;
