import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import uuid from "react-native-uuid";
import Add from "./components/Add";
import Row from "./components/Row";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@items"

export default function App() {
  const [listItems, setListItems] = useState([]);
  const [crossedIds, setCrossedIds] = useState([]);

  useEffect(() => {
    getListItems()
    alert("Tap to mark as done/undone.\nHold to delete item")
  }, [])

  useEffect(() => {
    setListItem(listItems)
  }, [listItems])

  const add = useCallback(
    (item) => {
      const newItem = {
        id: uuid.v4(),
        item: item,
      };
      setListItems([...listItems, newItem]);
    },
    [listItems]
  );

  const removeAll = () => {
    setListItems([])
    setCrossedIds([])
  }

  const getListItems = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      const json = JSON.parse(value)
      if (json === null) {
        json = []
      }
      setListItems(json)
    } catch (err) {
      console.log(err)
    }
  }

  const setListItem = async (value) => {
    try {
      const json = JSON.stringify(value)
      await AsyncStorage.setItem(STORAGE_KEY, json)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>TODO LIST</Text>
      <Add add={add} />
      <FlatList
        style={styles.list}
        data={listItems}
        renderItem={({ item }) => (
          <Row
            item={item}
            listItems={listItems}
            setListItems={setListItems}
            crossedIds={crossedIds}
            setCrossedIds={setCrossedIds}
          />
        )}
      />
      <Pressable style={{ alignItems: "center", paddingTop: 15}} onPress={removeAll}>
        <Ionicons name="trash-outline" size={24} color="black"></Ionicons>
        <Text>ALL</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    paddingBottom: 15,
  },
  list: {
    alignSelf: "flex-start",
    width: "100%",
  },
  headerText: {
    marginTop: 20,
    marginRight: 30,
    fontSize: 30,
  },
});
