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

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Variável para controlar o estado de carregamento
  const [isLoading, setIsLoading] = useState(false);

  // A função agora é 'async' porque vai esperar respostas da internet
  const handleRegister = async () => {
    
    // ETAPA 1: Validação Inicial
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return; // Para a execução da função aqui
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    // ETAPA 2: Feedback Visual
    setIsLoading(true); // Ativa o "loading" no botão

    try {
      // ETAPA 3: Comunicação com o Servidor (Exemplo com fetch)
      // Substitua a URL abaixo pela URL real da sua API
      const response = await fetch('https://sua-api.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: name,
          email: email,
          senha: password,
        }),
      });

      const data = await response.json();

      // ETAPA 4: Tratamento da Resposta
      if (!response.ok) {
        // Cenário de Erro retornado pela API (ex: e-mail já existe)
        Alert.alert('Erro no Cadastro', data.message || 'Ocorreu um erro ao registrar.');
        setIsLoading(false); // Desativa o carregamento
        return;
      }

      // ETAPA 5: Ação Final e Navegação (Cenário de Sucesso)
      // (Opcional) Aqui você salvaria o token recebido usando AsyncStorage
      // await AsyncStorage.setItem('userToken', data.token);

      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        { 
          text: 'OK', 
          onPress: () => navigation.replace('Home') // Vai para a Home após o usuário clicar em OK
        }
      ]);

    } catch (error) {
      // Cenário de Erro de conexão (ex: sem internet)
      Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor. Tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
        editable={!isLoading} // Bloqueia a digitação enquanto carrega
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
      />

      {/* O botão muda dependendo do estado de 'isLoading' */}
      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={handleRegister}
        disabled={isLoading} // Desativa o clique enquanto carrega
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Registrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} disabled={isLoading}>
        <Text style={styles.linkText}>Já tem uma conta? Faça Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#28A745', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  buttonDisabled: { backgroundColor: '#85d697' }, // Cor mais clara para indicar que está desativado
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  linkText: { color: '#007BFF', textAlign: 'center', marginTop: 10 }
});