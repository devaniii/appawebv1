import { useState } from "react";
import "./assets/css/App.css";
import appa from "./assets/img/appa.png"; // Imagen de Appa
import card from "./assets/img/carda.png"; // Fondo de tarjeta

function App() {
  // Mensajes que aparecerán en las tarjetas
  const messages = [
    "Sos lo más lindo que vi",
    "La persona más divertida que conocí",
    "La mujer con la que sueño hoy en día",
  ];

  // Estado para la cantidad de clics y posición del mensaje final
  const [clickCount, setClickCount] = useState(0);
  const [messagePosition, setMessagePosition] = useState({ top: "50%", left: "50%" });
  
  // Estado para manejar las tarjetas y los mensajes
  const [activeCards, setActiveCards] = useState({});
  const [showMessage, setShowMessage] = useState({});
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  // Manejador de clics en las tarjetas
  const handleCardClick = (index) => {
    setActiveCards((prev) => ({
      ...prev,
      [index]: !prev[index], // Alterna la visibilidad de Appa y la flecha
    }));
    setShowMessage((prev) => ({
      ...prev,
      [index]: false, // Oculta el mensaje al hacer clic en la tarjeta
    }));
  };

  // Manejador de clics en las flechas para mostrar el mensaje
  const handleArrowClick = (index) => {
    setShowMessage((prev) => ({
      ...prev,
      [index]: !prev[index], // Alterna entre mostrar Appa o el mensaje
    }));
  };

  // Manejador de clics en el botón
  const handleButtonClick = () => {
    setShowFinalMessage(true);
    setClickCount(1);
  };

  // Manejador de clics en el mensaje final
  const handleFinalMessageClick = () => {
    if (clickCount < 6) {
      setClickCount(clickCount + 1);
    } else {
      setClickCount(0);
    }
    
    // Generar nuevas posiciones aleatorias para el mensaje final
    const newTop = Math.random() * 80 + 10; // Posición aleatoria en Y (entre 10% y 90%)
    const newLeft = Math.random() * 80 + 10; // Posición aleatoria en X (entre 10% y 90%)
    setMessagePosition({ top: `${newTop}%`, left: `${newLeft}%` });
  };

  // Comprobamos si todas las tarjetas están activas
  const allCardsActive = Object.values(activeCards).filter(Boolean).length === messages.length;

  return (
    <>
      <div id="root">
        {!showFinalMessage ? (
          <div className="container">
            <div className="boxCard">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`card ${activeCards[index] ? "active" : ""}`}
                  style={{ backgroundImage: `url(${card})` }}
                  onClick={() => handleCardClick(index)}
                >
                  {showMessage[index] ? (
                    <p className="love-message">{msg}</p>
                  ) : (
                    <img src={appa} alt="Appa" className="appa-image" />
                  )}

                  {activeCards[index] && (
                    <div className="arrow" onClick={(e) => { e.stopPropagation(); handleArrowClick(index); }}>
                      ▼
                    </div>
                  )}
                </div>
              ))}
            </div>

            {allCardsActive && (
              <button className="press-button" onClick={handleButtonClick}>
                Presioname
              </button>
            )}
          </div>
        ) : (
          <div
            className="final-message"
            onClick={handleFinalMessageClick}
            style={{ top: messagePosition.top, left: messagePosition.left, position: "absolute" }}
          >
            {clickCount < 4 ? "No funciona" : "Mi vida no funciona sin vos"}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
