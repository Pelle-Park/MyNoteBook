import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";

function HomeScreen( {navigation}) {
  const [notes, setNotes] = useState([
    {title: 'shopping', body: 'remember eggs and milk'},
    {title: 'programming', body: 'NO INFINITE LOOPS!'},
    {title: 'daily reminder', body: 'have a good day :)'},
  ])

  const updateBody = (text, index) => {
    setNotes((prevNotes) => {
      prevNotes[index] = text;
      return [...prevNotes]
    });
  }

  const editNote = (item, index) => {
    navigation.navigate('TextEditor', {note: item, index: index, updateBody: updateBody});
  }
  
  const addNote = () => {
    setNotes((prevNotes) => [
      ...prevNotes,
      { title: '', body: '' },
    ]);
    navigation.navigate('TextEditor', { note: [{title: '', body: ''}], index: notes.length, updateBody: updateBody });
  };

    return (
      <View style={styles.container}>
        <FlatList 
          data={notes}
          renderItem={({item, index}) => (
            <TouchableOpacity style={styles.textContainer} onPress={() => editNote(item, index)}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.button} onPress={addNote}>
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