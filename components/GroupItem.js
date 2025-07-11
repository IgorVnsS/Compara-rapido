import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function GroupItem({
  group,           // Objeto do grupo atual (id, name, comparisons[])
  onPress,         // Função chamada ao tocar no grupo (normalmente navegação)
  onEdit,          // Função para editar o grupo
  onDelete,        // Função para deletar o grupo
  showActions = false, // Se true, exibe botões de editar e deletar
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={showActions ? 1 : 0.7} // Desativa efeito de clique se estiver em modo de ação
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{group.name}</Text>
        <Text style={styles.count}>
          {group.comparisons.length} comparação
          {group.comparisons.length !== 1 ? 's' : ''} {/* Pluralização */}
        </Text>
      </View>

      {/* Exibe botões de ação (editar/deletar) se showActions for true */}
      {showActions && (
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit(group)}>
            <Text style={styles.icon}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(group)}>
            <Text style={styles.icon}>🗑️</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  count: {
    fontSize: 12,
    color: '#666'
  },
  actions: {
    flexDirection: 'row',
    gap: 10
  },
  icon: {
    fontSize: 18,
    marginLeft: 10
  },
}); 