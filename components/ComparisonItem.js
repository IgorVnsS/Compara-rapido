import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ComparisonItem({
  item,       // Objeto da comparação (com before e after já salvos)
  onDelete,   // Função chamada ao excluir
}) {
  return (
    <View style={styles.item}>
      {/* Imagem do estado "antes" */}
      <Image source={{ uri: item.before }} style={styles.image} />
      
      {/* Imagem do estado "depois" */}
      <Image source={{ uri: item.after }} style={styles.image} />
      
      {/* Botão de deletar (ícone de lixeira) */}
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
        <Text style={styles.trash}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 6,
    marginRight: 10,
  },
  deleteBtn: {
    marginLeft: 'auto',          // Empurra para a direita
    padding: 10,
  },
  trash: {
    fontSize: 18,
    color: '#d00',
  },
});