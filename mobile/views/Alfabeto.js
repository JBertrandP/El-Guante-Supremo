import React from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView, Platform } from 'react-native';

const Alfabeto = () => {
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'LL', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {alphabet.map((letter, index) => (
          <View key={index} style={styles.square}>
            <Text style={styles.letter}>{letter}</Text>
          </View>
        ))}
      </ScrollView>
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
});

export default Alfabeto;
