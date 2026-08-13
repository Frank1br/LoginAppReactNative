import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator 
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estado para controlar o carregamento
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // 1. Validação Inicial
    if (!email || !password) {
      Alert.alert('Atenção', 'Por favor, preencha seu e-mail e senha.');
      return;
    }

    // 2. Feedback Visual
    setIsLoading(true);

    try {
      // 3. Comunicação com o Servidor
      // Substitua pela URL da sua API de autenticação
      const response = await fetch('https://sua-api.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          senha: password,
        }),
      });

      const data = await response.json();

      // 4. Tratamento da Resposta
      if (!response.ok) {
        // Erro de credenciais (ex: senha incorreta ou usuário não encontrado)
        Alert.alert('Erro no Login', data.message || 'E-mail ou senha incorretos.');
        setIsLoading(false);
        return;
      }

      // 5. Ação Final e Navegação
      // Aqui é onde você normalmente salva o token para o usuário não precisar logar de novo amanhã
      // Exemplo: await AsyncStorage.setItem('userToken', data.token);
      
      // Diferente do registro, no login geralmente não mostramos um "Alert" de sucesso, 
      // simplesmente mandamos o usuário direto para a Home para ser mais rápido.
      navigation.replace('Home');

    } catch (error) {
      Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor. Verifique sua internet.');
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo de volta!</Text>
      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading} // Bloqueia durante o login
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
      />

      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')} disabled={isLoading}>
        <Text style={styles.linkText}>Não tem uma conta? Registre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  buttonDisabled: { backgroundColor: '#7abaff' }, // Azul mais claro
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  linkText: { color: '#007BFF', textAlign: 'center', marginTop: 10 }
});