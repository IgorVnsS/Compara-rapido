import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('meuBanco');

async function initDB() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS groups (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL
    );
  `);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS comparisons (
      id TEXT PRIMARY KEY,
      groupId TEXT,
      name TEXT,
      description TEXT,
      before TEXT,
      after TEXT,
      createdAt TEXT,
      FOREIGN KEY(groupId) REFERENCES groups(id)
    );
  `);
}

async function getGroups() {
  return await db.getAllAsync('SELECT * FROM groups');
}

async function insertGroup({ id, name }) {
  await db.runAsync('INSERT INTO groups (id, name) VALUES (?, ?)', id, name);
}

async function updateGroup({ id, name }) {
  await db.runAsync('UPDATE groups SET name = ? WHERE id = ?', name, id)
}

async function deleteGroup(id) {
  await db.runAsync('DELETE FROM comparisons WHERE groupId = ?', id);
  await db.runAsync('DELETE FROM groups WHERE id = ?', id);
}

async function getComparisons(groupId) {
  return await db.getAllAsync(
    'SELECT * FROM comparisons WHERE groupId = ?',
    groupId
  );
}

async function insertComparison(comp) {
  const { id, groupId, name, description, before, after, createdAt } = comp;
  await db.runAsync(
    `INSERT INTO comparisons
     (id, groupId, name, description, before, after, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    id, groupId, name, description, before, after, createdAt
  );
}

async function updateComparisonField(id, fieldName, fieldValue) {
  await db.runAsync(
    `UPDATE comparisons SET ${fieldName} = ? WHERE id = ?`,
    fieldValue, id
  );
}

async function deleteComparison(id) {
  await db.runAsync('DELETE FROM comparisons WHERE id = ?', id);
}

export default {
  initDB,
  getGroups,
  insertGroup,
  updateGroup,
  deleteGroup,
  getComparisons,
  insertComparison,
  updateComparisonField,
  deleteComparison,
};

