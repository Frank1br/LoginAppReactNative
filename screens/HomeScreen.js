import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// Em um app real, você importaria o AsyncStorage aqui:
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  
  // A função agora é async para esperar a limpeza da memória
  const handleLogout = async () => {
    try {
      // 1. Limpa o token da memória do celular
      // await AsyncStorage.removeItem('userToken');

      // 2. Redireciona para a tela de Login
      navigation.replace('Login');
      
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um problema ao tentar sair.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.subtitle}>Você está logado com sucesso!</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
  button: { backgroundColor: '#DC3545', padding: 15, borderRadius: 8, width: 200, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});