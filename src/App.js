import { useState, useEffect } from 'react';


import './App.css';


function App() {
  const [paises, setPaises] = useState([]);
  const [pais, setPais] = useState({});

  useEffect(() => {
    (
      async () => {
        try {
          const resposta = await fetch('https://restcountries.com/v3/all');
          const body = await resposta.json()
          setPaises(body);
        } catch (error) {
          console.log(error)
        }
      }
    )()
  }, []);

  function handleKeyDown(event) {
    if (event.code === 'Enter') {
      listarPaises(event.target.value);
      event.target.value = '';
    }
  }

  function listarPaises(input) {
    const paisBuscado = paises.find(pais => {
      return pais.name.common.toLowerCase().includes(input.toLowerCase());
    }
    )
    if (paisBuscado) {
      setPais(paisBuscado)
    }
  }

  console.log(pais)

  return (
    <div className="App">
      <input type='text'
        onKeyDown={handleKeyDown}
      ></input>
      <div className='card'>
        <div className='infos'>
          {pais.name && <h1>{pais.name.common}</h1>}
          <span>{pais.capital}</span> <br />
          <span>{pais.subregion}</span>
          {/* <span>{idiomas(pais)}</span> */}
        </div>
        {pais.flags && <img src={pais.flags[0]} />}
      </div>
    </div>
  );
}

export default App;
