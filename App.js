import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { theme } from "./colors";
import { Fontisto } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@toDos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDo, setToDos] = useState({});
  const work = () => setWorking(true);
  const travel = () => setWorking(false);

  useEffect(() => {
    loadToDo();
  }, []);

  const saveToDo = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      alert(e);
    }
  };
  const loadToDo = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    if (s) {
      setToDos(JSON.parse(s));
    }
  };

  const onChangeText = (data) => {
    setText(data);
  };
  const addToDo = async () => {
    if (text === "") return;
    // Object.assign 을 굳이 쓸 필요 없음. ES6를 쓰니까!
    // const newToDos = Object.assign({}, toDo, {
    //   [Date.now()]: { text, work: working },
    // });
    const newToDos = { ...toDo, [Date.now()]: { text, working } };
    setToDos(newToDos);
    await saveToDo(newToDos);
    setText("");
  };

  const onClickDelete = async (key) => {
    if (Platform.OS === "web") {
      const ok = confirm("Do you want to delete this To Do?");
      if (ok) {
        const newTodo = { ...toDo };
        delete newTodo[key];
        setToDos(newTodo);
        saveToDo(newTodo);
      }
    } else {
      Alert.alert("Delete To Do", "Are you sure?", [
        { text: "Cancel" },
        {
          text: "I'm Sure",
          onPress: () => {
            const newTodo = { ...toDo };
            delete newTodo[key];
            setToDos(newTodo);
            saveToDo(newTodo);
          },
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.3} onPress={work}>
          <Text
            style={{
              color: theme.lightgrey,
              fontSize: 40,
              fontWeight: "900",
              color: working ? "white" : theme.lightgrey,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} onPress={travel}>
          <Text
            style={{
              color: theme.lightgrey,
              fontSize: 40,
              fontWeight: "900",
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
      <ScrollView>
        {Object.keys(toDo).map((key) =>
          toDo[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDo[key].text}</Text>
              <TouchableOpacity onPress={() => onClickDelete(key)}>
                <Fontisto
                  name="trash"
                  size={18}
                  color={theme.lightgrey}
                ></Fontisto>
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 100,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  TextInput: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
    borderRadius: 15,
    fontSize: 20,
  },
  toDo: {
    backgroundColor: "#6680CC",
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    // /
  },
});
