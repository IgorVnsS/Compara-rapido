import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation, groups }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.groupItem}
            onPress={() => navigation.navigate('GroupView', { groupId: item.id })}
          >
            <Text style={styles.groupName}>{item.name}</Text>
            <Text style={styles.count}>
              {item.comparisons.length} comparações.
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>Nenhum grupo criado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  groupItem: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  groupName: { fontSize: 18, fontWeight: 'bold' },
  count: { fontSize: 14, color: '#666', marginTop: 5 },
});
