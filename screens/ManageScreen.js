import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

export default function ManageScreen({
  groups,
  addGroup,
  editGroup,
  removeGroup,
}) {
  const [newGroupName, setNewGroupName] = useState("");
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editingGroupName, setEditingGroupName] = useState("");

  const createGroup = () => {
    if (!newGroupName.trim()) return;
    const id = Date.now().toString();
    addGroup({ id, name: newGroupName.trim() });
    setNewGroupName("");
  };

  const startEdit = (group) => {
    setEditingGroupId(group.id);
    setEditingGroupName(group.name);
  };

  const saveEdit = () => {
    if (!editingGroupName.trim()) return;
    editGroup({ id: editingGroupId, name: editingGroupName.trim() });
    setEditingGroupId(null);
    setEditingGroupName("");
  };

  const cancelEdit = () => {
    setEditingGroupId(null);
    setEditingGroupName("");
  };

  const confirmDelete = (id) => {
    Alert.alert("Excluir grupo?", "", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => removeGroup(id),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Grupos</Text>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Nome do grupo"
          value={newGroupName}
          onChangeText={setNewGroupName}
          style={styles.input}
        />
        <TouchableOpacity style={styles.btnAdd} onPress={createGroup}>
          <Text style={styles.btnText}>➕</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          editingGroupId === item.id ? (
            <View style={styles.groupRow}>
              <TextInput
                value={editingGroupName}
                onChangeText={setEditingGroupName}
                style={[styles.input, { flex: 1 }]}
              />
              <TouchableOpacity style={styles.btnSave} onPress={saveEdit}>
                <Text>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnCancel} onPress={cancelEdit}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.groupRow}>
              <Text style={styles.groupName}>{item.name}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => startEdit(item)}>
                  <Text style={styles.actionText}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                  <Text style={[styles.actionText, { color: "#d00" }]}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  inputRow: { flexDirection: "row", marginBottom: 15 },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
    paddingHorizontal: 10,
    height: 40,
  },
  btnAdd: {
    marginLeft: 10,
    backgroundColor: "#007AFF",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 8,
  },
  btnText: { color: "white", fontSize: 22 },
  groupRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  groupName: { flex: 1, fontSize: 16 },
  actions: { flexDirection: "row", width: 60, justifyContent: "space-between" },
  actionText: { fontSize: 18 },
  btnSave: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  btnCancel: {
    backgroundColor: "#ccc",
    padding: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
});
