import React, { useState } from "react";
import "./App.css";
import { FaLock } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6"; // Certifique-se de que este pacote está instalado corretamente.
import axios from "axios";
import "./Slides.css";
import { Navigate, useNavigate } from "react-router-dom";

function HomePage() {
  // Definindo os estados para os campos de nome e senha
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  localStorage.clear();
  // Função para lidar com a submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica de autenticação pode ser adicionada aqui
    console.log("Nome:", nome);
    console.log("Senha:", senha);


    const resp = await axios.post(
      "http://localhost:2601/Login",
      JSON.stringify({ nome, senha }),
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(resp.data.message);
    

    if ((resp.status = 200)) {
      const token = resp.data.Token;
      const userId = resp.data.id  
      localStorage.setItem("token", token);
      navigate(`/Chat/${userId}`);
    }
  };  

  return (
    <>
      <div id="body">
        <section id="Slides">
          <h1 id="tilt">Heaven.AI</h1>
          <div id="CardsPlacement">
            <div id="div1" className="Cards">
              <h1>SOBRE.</h1>
              <div className="Card_content">
                <p className="cardTitle">Sobre</p>
                <p className="ContentText">
                  HeavenAI é um projeto inovador focado no tratamento de
                  transtornos depressivos menores e moderados, oferecendo
                  suporte emocional e intervenções baseadas em inteligência
                  artificial. A plataforma utiliza IA para gerar respostas
                  terapêuticas personalizadas, baseando-se em técnicas de apoio
                  psicológico e práticas de autoajuda. HeavenAI tem como
                  objetivo proporcionar maior acessibilidade ao tratamento,
                  permitindo que usuários recebam suporte de maneira contínua,
                  com ênfase na prevenção e melhoria da saúde mental.
                </p>
              </div>
            </div>
            <div id="div2" className="Cards">
              <h1>OBJETIVO.</h1>
              <div className="Card_content">
                <p className="cardTitle">Objetivo</p>
                <p className="ContentText">
                  O objetivo do HeavenAI, enquanto projeto piloto de TCC, é
                  atrair a atenção de organizações e investidores que possam
                  contribuir para sua expansão. O foco principal é alcançar o
                  máximo de acessibilidade, especialmente para pessoas que não
                  conseguem acesso a tratamentos adequados para depressão.
                  HeavenAI busca oferecer uma solução tecnológica acessível, com
                  uma plataforma inovadora, facilitando o suporte emocional e o
                  acompanhamento de pacientes com transtornos depressivos,
                  contribuindo para a melhoria do bem-estar mental em larga
                  escala.
                </p>
              </div>
            </div>
            <div id="div3" className="Cards">
              <h1>CRIAÇÃO.</h1>
              <div className="Card_content">
                <p className="cardTitle">Criação</p>
                <p className="ContentText">
                  O motivo principal para a criação da HeavenAI é tratar
                  transtornos depressivos menores e moderados, visando ampliar o
                  acesso a tratamentos psicológicos para pessoas que não
                  conseguem um tratamento adequado. A IA é utilizada como
                  recurso fundamental, e o projeto também busca atrair a atenção
                  de pessoas e organizações que possam investir e expandir essa
                  acessibilidade, promovendo tratamentos mais acessíveis e
                  eficazes.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div id="lgDiv">
          <div className="LoginForm">
            <h1>Sign Up</h1>
            <form id="FormLogin" onSubmit={handleSubmit}>
              <span className="spans">
                <div className="Lin">
                  <FaUserLarge className="Icon" size={25} />
                  <input
                    type="text"
                    name="Nome"
                    className="inputs"
                    id="nomeInput"
                    autoComplete="off"  
                    required
                    maxLength={20}
                    placeholder="Nome de usuário"
                    value={nome} // Bind do estado ao input
                    onChange={(e) => setNome(e.target.value)} // Atualiza o estado
                  />
                </div>
              </span>
              <span className="spans">
                <div className="Lin">
                  <FaLock size={25} className="Icon" />
                  <input
                    type="password"
                    name="Senha"
                    id="senhaInput"
                    className="inputs"
                    autoComplete="off"
                    required
                    maxLength={20}
                    placeholder="Senha"
                    value={senha} // Bind do estado ao input
                    onChange={(e) => setSenha(e.target.value)} // Atualiza o estado
                  />
                </div>
              </span>
              <button id="btApp" type="submit">
                <span className="span-mother">
                  <span>L</span>
                  <span>o</span>
                  <span>g</span>
                  <span>i</span>
                  <span>n</span>
                </span>
                <span className="span-mother2">
                  <span>L</span>
                  <span>o</span>
                  <span>g</span>
                  <span>i</span>
                  <span>n</span>
                </span>
              </button>
            </form>
            <hr id="linha"></hr>
            <div id="callBacks">
              <a href="../RecSenha.html">Esqueceu a senha?</a>
              <a href="../Cadastro.html">Não possui Cadastro?</a>{" "}
              {/* Substitua o href com o caminho correto */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
