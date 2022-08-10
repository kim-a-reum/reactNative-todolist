import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
} from "react-native";
import { theme } from "./colors";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const work = () => setWorking(true);
  const travel = () => setWorking(false);
  const onChangeText = (data) => {
    setText(data);
  };
  const addToDo = () => {
    if (text === "") return;
    setText("");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.3} onPress={work}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? "white" : theme.lightgrey,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? theme.lightgrey : "white",
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onChangeText={onChangeText}
          value={text}
          style={styles.TextInput}
          placeholderTextColor="darkblue"
          placeholder={working ? "Add to do ! " : "Where do U want to go ? "}
          onSubmitEditing={addToDo}
          returnKeyType="done"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
  },
  header: {
    flexDirection: "row",
    marginTop: 100,
    paddingHorizontal: 40,
    justifyContent: "space-between",
  },
  btnText: {
    color: theme.lightgrey,
    fontSize: 40,
    fontWeight: "900",
  },
  TextInput: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    fontSize: 20,
  },
});
