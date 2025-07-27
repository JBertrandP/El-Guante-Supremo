import { useState, useEffect } from 'react';
import CustomNavbar from '../components/navbar';    
import Footer from '../components/footer';
import '../styles/traductor.css';

function Traductor() {
  const [seña, setSeña] = useState('');
  const [traduccion, setTraduccion] = useState('');

  useEffect(() => {
    const ejemplo = setInterval(() => {
      const señasSimuladas = ['Hola', 'Gracias', 'Por favor', 'Te quiero'];
      const señaAleatoria = señasSimuladas[Math.floor(Math.random() * señasSimuladas.length)];
      setSeña(señaAleatoria);
      setTraduccion(`${señaAleatoria}`);
    }, 3000);

    return () => clearInterval(ejemplo);
  }, []);

  return (
    <div className="layout-traductor">
        <CustomNavbar/>
        
        <main>
            <div className="banner-traductor">
                <p>Detectando señas...</p>

                <div className="traduciendo">
                    <h3>Traducción:</h3>
                    <p>{traduccion}</p>
                </div>
            </div>
        </main>
        
        <Footer/>
    </div>
  );
}

export default Traductor;
