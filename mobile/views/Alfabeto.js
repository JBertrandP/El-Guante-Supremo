import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView, Platform, Modal, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

const API_URL = 'https://5e5380afe9d5.ngrok-free.app';

const Alfabeto = () => {
  const [alphabet, setAlphabet] = useState([]);
  const [modalVisibility, setModalVisibility] = useState({}); // Almacenar la visibilidad de cada modal

  useEffect(() => {
    axios
      .get(`${API_URL}/alphabet_ids`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json',
        },
      })
      .then((response) => {
        if (Array.isArray(response.data.alphabet)) {
          setAlphabet(response.data.alphabet);
        } else {
          console.error('No se recibieron los datos del alfabeto');
        }
      })
      .catch((error) => {
        console.error('Error al obtener los datos de la API:', error);
      });
  }, []);

  // Función para manejar la apertura de un modal por letra
  const handleLetterPress = (letterId) => {
    setModalVisibility((prevState) => ({
      ...prevState,
      [letterId]: !prevState[letterId], // Toggle the modal visibility for the selected letter
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {alphabet.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.square}
            onPress={() => handleLetterPress(item._id)} // Usa _id para obtener detalles
          >
            <Text style={styles.letter}>{item.letter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modales de letra seleccionada */}
      {alphabet.map((item) => (
        <Modal
          key={item._id}
          transparent={true}
          visible={modalVisibility[item._id] || false} // Solo mostrar el modal si la visibilidad es true
          onRequestClose={() => handleLetterPress(item._id)} // Cerrar el modal al presionar fuera
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {item ? (
                <>
                  <Text style={styles.modalTitle}>{item.letter}</Text>
                  {item.image && (
                    <Image source={{ uri: item.image }} style={styles.modalImage} />
                  )}
                  <Text style={styles.modalDescription}>{item.explanation}</Text>
                </>
              ) : (
                <Text>Cargando...</Text>
              )}
              <TouchableOpacity onPress={() => handleLetterPress(item._id)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#33AAEE',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'center',
  },
  square: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#054F7A',
    margin: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  letter: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalImage: {
    width: 250,
    height: 250,
    marginVertical: 15,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#054F7A',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Alfabeto;
