import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Function to add user to the list
  const addUser = () => {
    if (name !== '' && phone !== '') {
      setUsers([...users, { name, phone }]);
      setName('');
      setPhone('');
      setIsFormVisible(false);  // Hide form after submission
    }
  };

  // Function to delete a user from the list
  const deleteUser = (index) => {
    const updatedUsers = users.filter((user, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.userRow}>
            <Text style={styles.userText}>{item.name} - {item.phone}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteUser(index)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {isFormVisible && (
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Enter Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter Phone Number"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            keyboardType="phone-pad"
          />
          <Button title="Submit" onPress={addUser} />
        </View>
      )}

      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => setIsFormVisible(!isFormVisible)}
      >
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e0e0e0',
    marginVertical: 5,
    borderRadius: 5,
  },
  userText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 5,
    borderRadius: 5,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  formContainer: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  plusButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  plusText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default App;
