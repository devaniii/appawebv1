import { useState } from 'react';
import './assets/css/App.css';
import hugImage from './assets/img/hug.png';

function App() {
  const [message, setMessage] = useState("Cargando...");
  const [key, setKey] = useState(0); // Estado para forzar el reinicio de la animación

  // Función para manejar el evento de la animación
  const handleAnimationEnd = () => {
    setMessage("Enviado!");

    // Reiniciar el proceso después de 3 segundos
    setTimeout(() => {
      setMessage("Cargando...");
      setKey(prevKey => prevKey + 1); 
    }, 2000); 
  };

  return (
    <>
      <div id="root">
        <div className="container">
          <div className="textTitle"><p>Enviando abrazo virtual</p></div>
          <div className="imgHug"><img src={hugImage} alt="" /></div>
          <div className="textLoad">
            <p id="loading-message">{message}</p>
          </div>
          <div className="box">
            <div className="loader">
              <div
                key={key} // Cambiar la key forzará el reinicio de la animación
                className="load"
                onAnimationEnd={handleAnimationEnd} // Añadimos el evento cuando la animación termine
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
