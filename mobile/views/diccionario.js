import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';


const { height, width } = Dimensions.get('window');

const Diccionario = () => {
  return (
    <View style={styles.safeArea}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput style={styles.searchInput} placeholder="Buscar" />
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryTabs}>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Saludos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Comida</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Lugares</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.entriesContainer}>
        <View style={styles.entry}>
          <Text style={styles.word}>Gracias</Text>
          <Text style={styles.definition}>Expresión de agradecimiento</Text>
        </View>

        <View style={styles.entry}>
          <Text style={styles.word}>Manzana</Text>
          <Text style={styles.definition}>Fruta roja y redonda</Text>
        </View>
      </View>
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
  },
  categoryTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tabButton: {
    backgroundColor: '#054F7A',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  tabText: {
    color: '#ffffff',
    fontWeight: 'bold',
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
    width: width * 0.4, // Ajustar el ancho a un porcentaje de la pantalla
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#054F7A',
  },
  word: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#054F7A',
  },
  definition: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#054F7A',
    paddingVertical: 10,
  },
  navButton: {
    paddingHorizontal: 10,
  },
  navText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default Diccionario;
