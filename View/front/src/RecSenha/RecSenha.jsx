import "./RsStyle.css";
import React, { useState } from "react";

function RecSenha() {
  const [input, setInput] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (e) => {
    const response = "criar Axios conect";
    console.log(input);
  };

  return (
    <>
      <div class="coolinput">
        <label for="input" className="text">
          Email:
        </label>
        <input
          type="email"
          placeholder="Digite Aqui!"
          name="input"
          className="input"
          autoComplete="off"
          required
          value={input}
          onChange={handleInputChange}
        />
      </div>

      <button class="button" onClick={handleSubmit}>Enviar</button>
    </>
  );
}

export default RecSenha;
