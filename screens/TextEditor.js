import React, { useState } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";

function TextEditor( {route} ) {
    const [title, setTitle] = useState(route.params.note.title)
    const [body, setBody] = useState(route.params.note.body)
    const updateBody = route.params.updateBody
    const index = route.params.index


    return (
      <View>
        <TextInput 
          style={styles.titleContainer}
          value={title}
          onChangeText={(text) => {
            setTitle(text)
            updateBody({title: text, body: body}, index)
          }}
        />
        <TextInput 
          style={styles.bodyContainer}
          value={body} 
          onChangeText={(text) => {
            setBody(text)
            updateBody({title: title, body: text}, index)
          }}
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