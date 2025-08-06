import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView, Platform, Modal, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';

const API_URL = 'https://4980941ccc8e.ngrok-free.app';

const Alfabeto = () => {
  const [alphabet, setAlphabet] = useState([]);
  const [modalVisibility, setModalVisibility] = useState({});
  const [letterDetails, setLetterDetails] = useState({});
  const [loadingImages, setLoadingImages] = useState({});

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

  const handleLetterPress = (letterId) => {
    setModalVisibility((prevState) => ({
      ...prevState,
      [letterId]: !prevState[letterId],
    }));

    if (!letterDetails[letterId]) {
      setLoadingImages(prev => ({...prev, [letterId]: true}));  // Indicador de carga
      
      axios
        .get(`${API_URL}/alphabet/${letterId}`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Accept': 'application/json',
          },
        })
        .then((response) => {
          if (response.data.letter_info) {
            setLetterDetails((prevState) => ({
              ...prevState,
              [letterId]: response.data.letter_info,
            }));
          }
        })
        .catch((error) => {
          console.error('Error al obtener los detalles de la letra:', error);
        })
        .finally(() => {
          setLoadingImages(prev => ({...prev, [letterId]: false}));  // Detener indicador de carga
        });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {alphabet.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.square}
            onPress={() => handleLetterPress(item._id)}
          >
            <Text style={styles.letter}>{item.letter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {alphabet.map((item) => (
        <Modal
          key={item._id}
          transparent={true}
          visible={modalVisibility[item._id] || false}
          onRequestClose={() => handleLetterPress(item._id)}
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{item.letter}</Text>
              
              <View style={styles.imageContainer}>
                {loadingImages[item._id] ? (
                  <ActivityIndicator size="large" color="#054F7A" />
                ) : (
                  letterDetails[item._id]?.image ? (
                    <Image
                      source={{ 
                        uri: `${letterDetails[item._id].image}?t=${new Date().getTime()}`, // Evitar caché con un timestamp
                      }}
                      style={styles.modalImage}
                      resizeMode="contain"
                      onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
                    />
                  ) : (
                    <Text style={styles.noImageText}>Imagen no disponible</Text>
                  )
                )}
              </View>
              
              <Text style={styles.modalDescription}>
                {letterDetails[item._id]?.explanation || 'No hay explicación disponible'}
              </Text>
              
              <TouchableOpacity 
                onPress={() => handleLetterPress(item._id)} 
                style={styles.closeButton}
              >
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
  imageContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  noImageText: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
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
