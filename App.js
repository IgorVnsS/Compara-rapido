import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import db from './db';
import BottomTabs from './navigation/BottomTabs'; // Seu componente de navegação

export default function App() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    (async () => {
      await db.initDB();
      const loadedGroups = await db.getGroups();
      // Para cada grupo, carregar comparações
      const groupsWithComparisons = await Promise.all(
        loadedGroups.map(async (g) => ({
          ...g,
          comparisons: await db.getComparisons(g.id),
        }))
      );
      setGroups(groupsWithComparisons);
    })();
  }, []);

  const addGroup = async (group) => {
    await db.insertGroup(group);
    setGroups((prev) => [...prev, { ...group, comparisons: [] }]);
  };

  const editGroup = async (group) => {
    await db.updateGroup(group);
    setGroups((prev) =>
      prev.map((g) => (g.id === group.id ? { ...g, name: group.name } : g))
    );
  };

  const removeGroup = async (id) => {
    await db.deleteGroup(id);
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  const addComparison = async (comp) => {
    await db.insertComparison(comp);
    setGroups((prev) =>
      prev.map((g) =>
        g.id === comp.groupId
          ? { ...g, comparisons: [...g.comparisons, comp] }
          : g
      )
    );
  };

  const updateComparison = async (id, fieldName, value) => {
    await db.updateComparisonField(id, fieldName, value);
    setGroups((prev) =>
      prev.map((g) => ({
        ...g,
        comparisons: g.comparisons.map((c) =>
          c.id === id ? { ...c, [fieldName]: value } : c
        ),
      }))
    );
  };

  const deleteComparison = async (id, groupId) => {
    await db.deleteComparison(id);
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, comparisons: g.comparisons.filter((c) => c.id !== id) }
          : g
      )
    );
  };

  return (
    <NavigationContainer>
      <BottomTabs
        groups={groups}
        addGroup={addGroup}
        editGroup={editGroup}
        removeGroup={removeGroup}
        addComparison={addComparison}
        updateComparison={updateComparison}
        deleteComparison={deleteComparison}
      />
    </NavigationContainer>
  );
}
