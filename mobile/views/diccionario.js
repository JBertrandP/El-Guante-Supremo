import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Dimensions, Modal, Button, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';

const { height, width } = Dimensions.get('window');

// Definir la URL de la API
const API_URL = 'https://4980941ccc8e.ngrok-free.app';

// Configuración de axios para incluir headers comunes
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true'; // Necesario para ngrok
axios.defaults.headers.common['Accept'] = 'application/json';

const Diccionario = () => {
  const [wordsList, setWordsList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWord, setSelectedWord] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1); // Estado para la página
  const [totalPages, setTotalPages] = useState(1); // Total de páginas

  // Función para obtener datos del diccionario con paginación
  const fetchDictionaryData = async (pageNumber) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/dictionary/1?page=${pageNumber}`); // Ruta con el número de página
      console.log("Respuesta del diccionario:", response.data); // Log para ver el JSON de la respuesta
      if (response.data && response.data.dictionary && Array.isArray(response.data.dictionary)) {
        setWordsList(response.data.dictionary);
        setTotalPages(response.data.total_pages); // Establecer el total de páginas
      } else {
        setError('Formato de datos inesperado');
      }
    } catch (error) {
      console.error('Error al obtener diccionario:', error.message);
      setError(`Error al cargar datos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDictionaryData(page); // Llamar a la API cuando la página cambie
  }, [page]);

  // Función para obtener los detalles de la palabra
  const fetchWordDetails = async (word_id) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/dictionary/word/${word_id}`); // Ajustada la ruta para obtener la palabra por su ID
      console.log("Detalles de la palabra:", response.data); // Log para ver los detalles de la palabra
      if (response.data && response.data.word_info) {
        setSelectedWord(response.data.word_info); // Establecemos el word_info
        setModalVisible(true); // Mostrar el modal con los detalles de la palabra
      } else {
        setError('Formato de datos inesperado');
      }
    } catch (error) {
      console.error('Error al obtener detalles:', error.message);
      setError(`Error al cargar detalles: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleShow = (item) => {
    fetchWordDetails(item._id); // Llamada para obtener los detalles de la palabra por ID
  };

  const handleClose = () => setModalVisible(false);

  const filteredWords = wordsList.filter(word => 
    word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.safeArea}>
      {/* Barra de búsqueda */}
      <View style={styles.searchBar}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Buscar" 
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      {loading && <ActivityIndicator size="large" color="#054F7A" />}
      
      {/* Lista de palabras */}
      <View style={styles.entriesContainer}>
        {filteredWords.length > 0 ? (
          filteredWords.map((item, index) => (
            <View key={index} style={styles.entry}>
              <TouchableOpacity onPress={() => handleShow(item)}>
                <Text style={styles.word}>{item.word}</Text>
                <Text style={styles.definition} numberOfLines={2}>
                  {item.definition}
                </Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          !loading && <Text style={styles.noResults}>No se encontraron resultados</Text>
        )}
      </View>

      {/* Navegación por páginas */}
      <View style={styles.paginationContainer}>
        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={() => setPage(page > 1 ? page - 1 : 1)}
            disabled={page === 1}
            style={[styles.pageButton, page === 1 && styles.disabledButton]}
          >
            <Text style={styles.pageButtonText}>Anterior</Text>
          </TouchableOpacity>
          
          <Text style={styles.pageNumber}>{page} / {totalPages}</Text>

          <TouchableOpacity
            onPress={() => setPage(page < totalPages ? page + 1 : totalPages)}
            disabled={page === totalPages}
            style={[styles.pageButton, page === totalPages && styles.disabledButton]}
          >
            <Text style={styles.pageButtonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de detalles */}
      <Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={handleClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#054F7A" />
            ) : (
              <>
                <Text style={styles.modalWord}>{selectedWord.word}</Text>
                <Text style={styles.modalDefinition}>{selectedWord.explanation}</Text>
                {selectedWord.image && (
                  <Image 
                    source={{ uri: selectedWord.image }} 
                    style={styles.modalImage} 
                    resizeMode="contain"
                  />
                )}
                <Button title="Cerrar" onPress={handleClose} />
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Mensaje de error */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#33AAEE',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  searchBar: {
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 5,
    width: width * 0.9,
    alignSelf: 'center',
  },
  searchInput: {
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  entriesContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'center',
  },
  entry: {
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    width: width * 0.4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#054F7A',
  },
  word: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#054F7A',
    textAlign: 'center',
  },
  definition: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 5,
  },
  paginationContainer: {
    flex: 1, // Asegura que los botones de paginación vayan al final
    justifyContent: 'flex-end', // Coloca los botones de paginación en la parte inferior
    marginBottom: 20, // Para un pequeño espacio con los botones
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageButton: {
    backgroundColor: '#054F7A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  pageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pageNumber: {
    fontSize: 16,
    color: '#054F7A',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    width: width * 0.8,
    alignItems: 'center',
  },
  modalWord: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#054F7A',
    marginBottom: 10,
  },
  modalDefinition: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
    textAlign: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#fff',
  },
});

export default Diccionario;
