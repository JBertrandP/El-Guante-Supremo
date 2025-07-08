import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView, Platform, Modal, TouchableOpacity } from 'react-native';

const Alfabeto = () => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const alphabet = [
    { letter: 'A', description: 'Descripción de A' },
    { letter: 'B', description: 'Descripción de B' },
    { letter: 'C', description: 'Descripción de C' },
    { letter: 'D', description: 'Descripción de D' },
    { letter: 'E', description: 'Descripción de E' },
    { letter: 'F', description: 'Descripción de F' },
    { letter: 'G', description: 'Descripción de G' },
    { letter: 'H', description: 'Descripción de H' },
    { letter: 'I', description: 'Descripción de I' },
    { letter: 'J', description: 'Descripción de J' },
    { letter: 'K', description: 'Descripción de K' },
    { letter: 'L', description: 'Descripción de L' },
       { letter: 'M', description: 'Descripción de M' },
    { letter: 'N', description: 'Descripción de N' },
    { letter: 'Ñ', description: 'Descripción de Ñ' },
    { letter: 'O', description: 'Descripción de O' },
    { letter: 'P', description: 'Descripción de P' },
    { letter: 'Q', description: 'Descripción de Q' },
    { letter: 'R', description: 'Descripción de R' },
    { letter: 'S', description: 'Descripción de S' },
    { letter: 'T', description: 'Descripción de T' },
    { letter: 'U', description: 'Descripción de U' },
    { letter: 'V', description: 'Descripción de V' },
    { letter: 'W', description: 'Descripción de W' },
    { letter: 'X', description: 'Descripción de X' },
    { letter: 'Y', description: 'Descripción de Y' },
    { letter: 'Z', description: 'Descripción de Z' },
  ];

  const handleLetterPress = (letter) => {
    setSelectedLetter(letter);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {alphabet.map((item, index) => (
          <TouchableOpacity key={index} style={styles.square} onPress={() => handleLetterPress(item)}>
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
            <Text style={styles.modalTitle}>{selectedLetter?.letter}</Text>
            {/* Aquí puedes agregar la imagen cuando esté disponible */}
            <Text style={styles.modalImage}>Imagen de {selectedLetter?.letter}</Text>
            <Text style={styles.modalDescription}>{selectedLetter?.description}</Text>
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
    fontSize: 16,
    marginVertical: 15,
    color: '#888',  // Placeholder color for image text
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
