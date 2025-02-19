import "./chat.css";
import { useParams } from "react-router-dom";
import Appinput from "./Input/input";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Input/input.css"; // Certifique-se de que o caminho está correto
import { FaLocationArrow } from "react-icons/fa";

function MensagemIA({ texto, isLoading }) {
  return (
    <section id="IARESP">
      <div id="BalaoMsg">
        <p id="TextBOX">{texto}</p>
      </div>
    </section>
  );
}
function Loading({ isl }) {
  return (
    <section id="IARESP" className={isl ? "Loading-visible" : "Loading-hidden"}>
      <div id="BalaoMsg">
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  );
}

function MensagemUsuario({ texto }) {
  return (
    <section id="PRESP">
      <div id="BalaoMsg">
        <p id="TextBOX">{texto}</p>
      </div>
    </section>
  );
}

/**
 * @param {JSON} Json - JSON fornecido pelo usuário
 * @param {String} input  Input fornecido pelo usuario
 * @param {String} sender - que enviou
 * @param {number} TimeDif - diferneca do time stamp
 */
function atualizaJson(Json, input, sender, TimeDif) {
  const date = new Date().getTime() + TimeDif;
  const newMessage = {
    id: date,
    texto: input,
    sender: sender,
    timestamp: new Date().toISOString(),
  };

  return {
    ...Json,
    [newMessage.id]: newMessage,
  };
}

function Render({ json, isl }) {
  // Converte as mensagens em um array e renderiza
  return (
    <div>
      {Object.values(json).map((msg, index) => {
        if (msg.sender == "Usuario") {
          return <MensagemUsuario key={index} texto={msg.texto} />;
        } else {
          return <MensagemIA key={index} texto={msg.texto} isLoading={isl} />;
        }
      })}
    </div>
  );
}
// setMessages((prevMessages) => [
//   ...prevMessages,
//   { message: <MensagemUsuario texto={msg1} />, sender: "usuario" },
// ]);

// setMessages((prevMessages) => [
//   ...prevMessages,
//   { message: <MensagemIA texto={msg2} />, sender: "Ia" },
// ]);

function Chat() {
  const { idusuario } = useParams();
  const [inputValue, setInputValue] = useState("");
  const [resposta, setResposta] = useState("");
  const [photoUsuario, setPhotoU] = useState("");
  const [nome, setNome] = useState("NOME");
  const [historico, setHistorico] = useState({});
  const [messages, setmessages] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [isViPlaceHldr, setIsViPlaceHldr] = useState(true);

  const PDusuario = async (e) => {
    const resp = await axios.post(
      "http://localhost:2601/Chat",
      { idusuario },
      { headers: { "Content-Type": "application/json" } }
    );

    setNome(resp.data.Usuario[0].nome);
    console.log("USUARIO = " + resp.data.Usuario[0].nome);
    console.log(resp.data.TimeResp.message);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      buttonRef.current.click(); // Simula o clique no botão
    }
  };

  //logout (gpt-tava com preguiça)//
  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem("token");

    // Redireciona o usuário para a página inicial
    window.location.href = "/";
  };

  //nome acabou nao sendo alterado, função nao condiz com o nome!!!
  const HandleInputIA = (event) => {
    setInputValue(event.target.value); // Atualiza o estado com o valor digitado
  };



  const handlePhotoUpload = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    if (file) {
      formData.append("foto", file); // O campo precisa ser 'foto', conforme configurado no backend
  
      try {
        const response = await axios.post(
          "http://localhost:2601/Photo", // Certifique-se de que a URL está correta conforme a configuração do backend
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Se necessário, manter o token de autorização
            },
          }
        );
  
        const photoUrl = response.data.photoUrl; // URL da foto recebida do servidor
        setPhotoU(photoUrl); // Atualiza a foto do usuário
        console.log("Foto carregada com sucesso:", photoUrl);
      } catch (error) {
        console.error("Erro ao carregar a foto:", error);
      }
    }
  };
  // Função para lidar com o envio do input

  const enviarInputIA = async (e) => {
    setIsViPlaceHldr(false);
    const userMessage = inputValue; // Salva o valor do input do usuário
    setInputValue(""); // Limpa o input imediatamente após salvar

    //alteração feita pelo gpt. não se altera um elemnto sem usar o SET pois não computa na interface
    setHistorico((prevHistorico) =>
      atualizaJson(prevHistorico, userMessage, "Usuario", 0)
    );
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:2601/Ia",
        { inputValue: userMessage },
        { headers: { "Content-Type": "application/json" } }
      );
      const resposta = response.data.respota;
      setIsLoading(false);
      setHistorico((prevHistorico) =>
        atualizaJson(prevHistorico, resposta, "Ia", 1)
      );
    } catch (error) {
      setIsViPlaceHldr(false);
      console.error("Erro ao obter resposta da IA:", error);
    }
  };

  useEffect(() => {
    PDusuario(); // Chama a função ao carregar o componente
    handlePhotoUpload();
  }, []);

  return (
    <div id="Body">
      <section id="CHAT">
        <div id="SideMenuDiv">
          <aside id="SideMenu">
            <div id="LogoTitleAside">
              HavenAI.
              <img src="./src/assets/HVicon.png" alt="" id="HVicon" />
            </div>
            <div id="AboutAcount">
              <section id="AbCSec">
                <div id="userFrame">
                  <h1 id="NomeUSSESR">
                    {
                      nome.charAt(0).toUpperCase() + nome.charAt(1).toLowerCase()
                    }
                  </h1>
                  <div id="LogOutDiv" onClick={handleLogout}>
                    <h1>LogOut</h1>
                  </div>
                </div>
                <span>{nome}</span>
                <div id="custom-file-upload">
                  <input
                    name="foto"
                    type="file"
                    id="file"
                    className="file"
                    accept="image/png, image/jpeg"
                    onChange={handlePhotoUpload}
                  />
                  <label htmlFor="file">MudarFoto</label>
                </div>
              </section>
            </div>
            <nav id="NavHistory">
              <h1>Historico</h1>
              <div id="history"></div>
            </nav>
          </aside>
        </div>
        <div id="ChatArea">
          <section id="sectionChat">
            <header id="HeaderChatArea">
              <span id="LogoTitleHeader">
                <h1>HeavenAssistant.</h1>
              </span>
            </header>
            <section id="ChatSection">
              <div id="ChatOutIN">
                <div id="INOUTAREA">
                  <div
                    className={
                      isViPlaceHldr
                        ? "placeholder Loading-visible"
                        : "placeholder Loading-hidden"
                    }
                  >
                    <h1>Envie algo! 😋</h1>
                  </div>
                  <Loading isl={isloading} />
                  <Render json={historico} isl={isloading} />
                </div>
              </div>
              <section id="InputArea">
                <input
                  id="input"
                  type="text"
                  value={inputValue}
                  autoComplete="off"
                  onChange={HandleInputIA}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      enviarInputIA(); // Chama a função quando Enter for pressionado
                    }
                  }}
                  placeholder="Digite Algo"
                  style={{ marginRight: "10px", padding: "5px" }}
                />
                <button id="EnviarInput" onClick={enviarInputIA} tabIndex="0">
                  <span className="button_top">
                    <FaLocationArrow id="IconBt" size={20} />
                  </span>
                </button>
              </section>
            </section>
          </section>
        </div>
      </section>
    </div>
  );
}

export default Chat;
