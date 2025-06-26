import React, { useEffect, useState } from 'react';
import PantallaPrincipal from './views/splash_screen';
import Login from './views/Login'; // Importa la pantalla de login

export default function App() {
  const [mostrarSplash, setMostrarSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarSplash(false);
    }, 3000); // 3 segundos

    return () => clearTimeout(timer);
  }, []);

  return mostrarSplash ? <PantallaPrincipal /> : <Login />;
}
