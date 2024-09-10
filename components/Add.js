import { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

export default function Add({ add }) {
  const [input, setInput] = useState("");

  const addNewItem = () => {
    add(input);
    setInput("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, styles.default]}
        value={input}
        onChangeText={(text) => setInput(text)}
      />
      <Button
        buttonStyle={[styles.button, styles.default]}
        onPress={addNewItem}
        title="ADD ITEM"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 25,
    marginBottom: 25,
  },
  input: {
    width: 200,
    padding: 5,
    paddingLeft: 10,
    fontSize: 20,
  },
  button: {
    marginLeft: 15,
    width: 100,
  },
  default: {
    height: 50,
    borderWidth: 4,
    borderRadius: 8,
    borderColor: "black",
  },
});
