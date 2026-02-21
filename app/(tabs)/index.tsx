import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Entry = {
  id: string;
  title: string;
  content: string;
  date: string;
};

export default function HomeScreen() {

  const [entries, setEntries] = useState<Entry[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteContent, setNoteContent] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const addEntry = () => {
    if (!noteTitle.trim() || !noteContent.trim()) {
      alert('Please fill in both title and content!');
      return;
    }

    const newEntry: Entry = {
      id: Date.now().toString(),
      title: noteTitle,
      content: noteContent,
      date: new Date().toLocaleDateString(),
    };

    setEntries(prev => [newEntry, ...prev]);
    clearForm();
  };

  const updateEntry = () => {
    setEntries(prev =>
      prev.map(entry =>
        entry.id === editingId
          ? { ...entry, title: noteTitle, content: noteContent }
          : entry
      )
    );
    clearForm();
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const openEditModal = (entry: Entry) => {
    setNoteTitle(entry.title);
    setNoteContent(entry.content);
    setEditingId(entry.id);
    setModalVisible(true);
  };

  const clearForm = () => {
    setNoteTitle('');
    setNoteContent('');
    setEditingId(null);
    setModalVisible(false);
  };

  const renderEntry = ({ item }: { item: Entry }) => (
    <View style={styles.entryCard}>
      <Text style={styles.entryTitle}>{item.title}</Text>
      <Text style={styles.entryContent}>{item.content}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => openEditModal(item)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteEntry(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>+ New Entry</Text>
      </TouchableOpacity>

      <FlatList
        data={entries}
        keyExtractor={item => item.id}
        renderItem={renderEntry}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={clearForm}
      >
        <View style={styles.modal}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={noteTitle}
            onChangeText={setNoteTitle}
          />

          <TextInput
            style={styles.input}
            placeholder="Content"
            value={noteContent}
            onChangeText={setNoteContent}
            multiline
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={editingId ? updateEntry : addEntry}
          >
            <Text style={styles.buttonText}>
              {editingId ? 'Update' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0f172a',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  entryCard: {
    backgroundColor: '#1e293b',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  entryTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  entryContent: {
    color: '#cbd5e1',
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    backgroundColor: '#10b981',
    padding: 8,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  modal: {
    backgroundColor: '#1e293b',
    margin: 30,
    padding: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#0f172a',
    color: 'white',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
  },
});
