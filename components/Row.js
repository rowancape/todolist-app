import { useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";

export default function Row({ item, listItems, setListItems, crossedIds, setCrossedIds }) {
  
  const crossOver = (itemId) => {
    if (crossedIds.includes(itemId)) {
      setCrossedIds(crossedIds.filter((item) => item !== itemId));
    } else {
      setCrossedIds([...crossedIds, itemId]);
    }
  };

  const remove = (itemId) => {
    setListItems(listItems.filter((item) => item.id !== itemId));
    setCrossedIds(crossedIds.filter((item) => item !== itemId));
  };

  return (
    <Pressable
      onPress={() => crossOver(item.id)}
      onLongPress={() => remove(item.id)}
    >
      <Text
        style={[styles.text, crossedIds.includes(item.id) && styles.crossed]}
      >
        {item.item}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginBottom: 5,
  },
  crossed: {
    textDecorationLine: "line-through",
    backgroundColor: "lightgreen",
    borderRadius: 10,
  },
});
