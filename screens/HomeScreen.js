import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { collection, addDoc, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { database } from '../config/firebase';

function HomeScreen( {navigation} ) {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const unsub = onSnapshot(collection(database, 'notes'), (snapshot) => {
      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesData);
    });
    return unsub;
  }, []);

  const saveNoteToFirestore = async (note) => {
    const newNote = {
      text: note.text,
    };
    const docRef = await addDoc(collection(database, 'notes'), newNote);
    console.log('Document written with ID: ', docRef.id);
  };

  const updateNoteInFirestore = async (note) => {
    const newNote = {
      text: note.text,
    };
    await updateDoc(doc(database, 'notes', note.id), newNote);
    console.log('Document updated with ID: ', note.id);
  };

  return (
    <View style={styles.container}>
      <FlatList 
        data={notes}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.textContainer} onPress={() => {
            navigation.navigate('TextEditor', {func: updateNoteInFirestore, note: item})
          }}>
            <Text>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate('TextEditor', {func: saveNoteToFirestore, note: {id: '', text: ''}})
      }}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    textContainer: {
      borderColor: 'lightgrey',
      borderBottomWidth: 1,
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 4,
      paddingLeft: 4,
      marginRight: 8,
      marginLeft: 8
    },
    button: {
      position: 'absolute',
      bottom: 25,
      right: 25,
      paddingHorizontal: 17.5,
      backgroundColor: 'blue',
      borderRadius: 40,
      
    },
    buttonText: {
      bottom: 3,
      color: 'white',
      fontSize: 45
    }
  });

export default HomeScreen