import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function GroupForm({
  groupName,       // Valor atual do nome do grupo (controlado por estado externo)
  setGroupName,    // Função para atualizar o nome do grupo
  onSubmit,        // Função a ser chamada ao confirmar (criar/salvar)
  isEditing,       // Booleano indicando se é modo de edição ou criação
}) {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Nome do grupo"
        value={groupName}
        onChangeText={setGroupName}
      />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>
          {isEditing ? 'Salvar Alterações' : 'Criar'} {/* Texto dinâmico */}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',             // Input e botão na horizontal
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});