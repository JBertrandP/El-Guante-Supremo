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
      setTimeout(createWebSocket, 5000); 
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
      if (socket) socket.close(); 
    };
  }, []);

  const anteriores = traducciones.slice(0, -1);
  const reciente = traducciones[traducciones.length - 1];

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/guante1.gif')}  
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
    backgroundColor: '#33AAEE', 
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20, 
  },
  gif: {
    width: width * 0.9,  
    height: height * 0.4, 
    marginTop: 50, 
    marginBottom: 20, 
  },
  chatBox: {
    width: width * 0.9,  
    minHeight: height * 0.2, 
    padding: 20, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 15, 
    borderWidth: 2, 
    borderColor: '#CCCCCC',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    justifyContent: 'center', 
    alignItems: 'center',   
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', 
  },
  translation: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 5,
    textAlign: 'justify',
  },
  separator: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center', 
  },
  recentTranslation: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6347', 
    textAlign: 'center', 
  },
});

export default function App() {
  return <Traductor />;
}
