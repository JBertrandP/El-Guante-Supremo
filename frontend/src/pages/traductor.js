import { useState, useEffect } from 'react';
import CustomNavbar from '../components/navbar';    
import Footer from '../components/footer';
import '../styles/traductor.css';

function Traductor() {
  const [traducciones, setTraducciones] = useState([]);
  const [socket, setSocket] = useState(null);
  const WS_URL = process.env.REACT_APP_WS_URL;

  const createWebSocket = () => {
    const ws = new WebSocket(`wss://${WS_URL}/ws/front`);

    ws.onopen = () => {
      console.log('Conexión WebSocket abierta');
    };

    ws.onerror = (error) => {
      console.error('Error en WebSocket:', error);
      setTimeout(createWebSocket, 5000);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.data && typeof data.data === 'string') {
          setTraducciones(prev => {
            const nuevas = [...prev, data.data];
            if (nuevas.length > 4) nuevas.shift();
            return nuevas;
          });
        }
      } catch (err) {
        console.error('Error al parsear JSON:', err);
      }
    };

    ws.onclose = () => {
      console.log('Conexión WebSocket cerrada');
      setTimeout(createWebSocket, 5000);
    };

    setSocket(ws);
  };

  useEffect(() => {
    createWebSocket();

    return () => {
      if (socket) socket.close();
    };
  }, []);

  // Separar en recientes y más nueva
  const anteriores = traducciones.slice(0, -1); // las 3 más viejas
  const reciente = traducciones[traducciones.length - 1]; // la más reciente

  return (
    <div className="layout-traductor">
      <CustomNavbar/>

      <main>
        <div className="banner-traductor">
          <p>Detectando señas...</p>

          <div className="traduciendo">
            <h3>Traducciones recientes:</h3>

            {traducciones.length === 0 ? (
              <p>Esperando...</p>
            ) : (
              <>
                {anteriores.map((item, i) => (
                  <p className='textoT' key={i}>{item}</p>
                ))}

                <p style={{ marginTop: '1em', fontWeight: 'bold' }}>-----Reciente-----</p>

                <p style={{ fontSize: '1.5em' }}>{reciente}</p>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
}

export default Traductor;
