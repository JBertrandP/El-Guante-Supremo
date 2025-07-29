import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView, Platform, Modal, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

const API_URL = 'https://5e5380afe9d5.ngrok-free.app'; // Tu URL de la API

const Alfabeto = () => {
  const [alphabet, setAlphabet] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  // Fetch alphabet data from API
  useEffect(() => {
    axios
      .get(`${API_URL}/alphabet_ids`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json',
        },
      })
      .then((response) => {
        console.log('Datos recibidos:', response.data.alphabet);  // Verifica los datos
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

  // Obtener información detallada de una letra
  const handleLetterPress = (letterId) => {
    console.log('ID de letra seleccionada:', letterId);  // Verifica el ID
    axios
      .get(`${API_URL}/alphabet/${letterId}`)
      .then((response) => {
        console.log('Datos de la letra seleccionada:', response.data.letter_info);  // Verifica los datos
        setSelectedLetter(response.data.letter_info);
        setModalVisible(true);  // Abre el modal con la información
      })
      .catch((error) => {
        console.error('Error al obtener la información de la letra:', error);
      });
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

      {/* Modal de letra seleccionada */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedLetter ? (
              <>
                <Text style={styles.modalTitle}>{selectedLetter.letter}</Text>
                {selectedLetter.image && (
                  <Image source={{ uri: selectedLetter.image }} style={styles.modalImage} />
                )}
                <Text style={styles.modalDescription}>{selectedLetter.explanation}</Text> {/* Cambié description a explanation */}
              </>
            ) : (
              <Text>Cargando...</Text>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
