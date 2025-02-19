import "./input.css"; // Certifique-se de que o caminho está correto
import { FaLocationArrow } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
// import chatRes from './chatReturn'; // Verifique se o caminho e a exportação estão corretos
// FUNÇÃO DE PEGAR INPUT
function Appinput(funcao, inputValue) {
  // Definir um estado para armazenar o valor do input

  return (
    <>
      <input
        id="input"
        type="text"
        value={inputValue}
        autoComplete="off" // Alterado para "off"
        onChange={funcao}
        placeholder="Digite Algo"
        style={{ marginRight: "10px", padding: "5px" }}
      />

      <button id="EnviarInput" onClick={(e) => handleSubmit(e)}>
        <span className="button_top">
          {" "}
          {/* Alterado para className */}
          <FaLocationArrow id="IconBt" size={20} />{" "}
          {/* Aumentei o tamanho do ícone */}
        </span>
      </button>
    </>
  );
}

export default Appinput; // Adicione a exportação do componente
