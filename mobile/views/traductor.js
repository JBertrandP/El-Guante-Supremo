import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

const Traductor = () => {
  const [traducciones, setTraducciones] = useState([]);
  const [socket, setSocket] = useState(null);

  const createWebSocket = () => {
    const ws = new WebSocket('wss://ea3bf73678e3.ngrok-free.app/ws/glove');

    ws.onopen = () => {
      console.log('Conexión WebSocket abierta');
      ws.send(JSON.stringify({ message: 'Hola, servidor!' }));
    };

    ws.onerror = (error) => {
      console.error('Error en WebSocket:', error);
      setTimeout(createWebSocket, 5000); // Intentar reconectar en 5 segundos
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.data && typeof data.data === 'string') {
          setTraducciones((prev) => {
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
      if (socket) socket.close(); // Cerrar el WebSocket cuando el componente se desmonte
    };
  }, []);

  const anteriores = traducciones.slice(0, -1); // las 3 más viejas
  const reciente = traducciones[traducciones.length - 1]; // la más reciente

  return (
    <View style={styles.container}>
      {/* Cargar el GIF desde la carpeta "assets" */}
      <Image
        source={require('./assets/guante1.gif')}  // Asegúrate de que el GIF esté en la carpeta assets
        style={styles.gif}
      />
      
      <View style={styles.chatBox}>
        <Text style={styles.heading}>Traducciones recientes:</Text>
        {traducciones.length === 0 ? (
          <Text style={styles.translation}>Esperando...</Text>
        ) : (
          <>
            {anteriores.map((item, index) => (
              <Text key={index} style={styles.translation}>{item}</Text>
            ))}
            
            <Text style={styles.recentTranslation}>{reciente}</Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#33AAEE', // Color de fondo
    justifyContent: 'flex-start', // Mover el contenido hacia arriba
    alignItems: 'center',
    padding: 20, // Añadir relleno para mayor espacio alrededor
  },
  gif: {
    width: width * 0.9,  // El GIF ocupará el 90% del ancho de la pantalla
    height: height * 0.4, // El GIF tendrá una altura del 40% de la pantalla
    marginTop: 50, // Subir el GIF más hacia la parte superior de la pantalla
    marginBottom: 20, // Reducir el espaciado entre el GIF y el cuadro de chat
  },
  chatBox: {
    width: width * 0.9,  // El cuadro ocupará el 90% del ancho de la pantalla
    minHeight: height * 0.2, // El cuadro tendrá una altura mínima del 20% de la pantalla
    padding: 20, // Relleno interno del cuadro
    backgroundColor: '#FFFFFF', // Fondo blanco para el cuadro de chat
    borderRadius: 15, // Bordes redondeados
    borderWidth: 2, // Borde del cuadro
    borderColor: '#CCCCCC', // Color del borde
    shadowColor: '#000', // Sombra para efecto de profundidad
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    justifyContent: 'center',  // Centrar el contenido dentro del cuadro
    alignItems: 'center',   // Centrar el contenido horizontalmente
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // Centrado del texto
  },
  translation: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 5,
    textAlign: 'justify', // Justificar el texto
  },
  separator: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center', // Centrado del texto
  },
  recentTranslation: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6347', // Un color resaltado para la traducción más reciente
    textAlign: 'center', // Centrado del texto
  },
});

export default function App() {
  return <Traductor />;
}
