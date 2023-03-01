import { useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";

function TextEditor( {route} ) {
  const [note, setNote] = useState(route.params.note);

  const onSaveNote = () => {
    route.params.func(note);
  }

  const changeText = (text) => {
    setNote({
      ...note,
      text: text
    });
  };

  return (
    <View>
      <TextInput 
        style={styles.titleContainer}
        value={note.text}
        placeholder="write note here"
        onChangeText={changeText}
        onBlur={onSaveNote}
      />
    </View>
  );
}

  const styles = StyleSheet.create({
    titleContainer: {
      borderColor: 'lightgrey',
      borderBottomWidth: 1,
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 4,
      paddingLeft: 4,
      marginRight: 8,
      marginLeft: 8
    },
    bodyContainer: {
      borderColor: 'lightgrey',
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 4,
      paddingLeft: 4,
      marginRight: 8,
      marginLeft: 8
    },
  });

export default TextEditor