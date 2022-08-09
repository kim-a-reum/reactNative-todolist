import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { theme } from "./colors";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableHighlight
          onPress={() => console.log("눌렸다")}
          underlayColor="#DDDDDD"
        >
          <Text style={styles.btnText}>Work</Text>
        </TouchableHighlight>
        <TouchableOpacity activeOpacity={0.3}>
          <Text style={styles.btnText}>Travel</Text>
        </TouchableOpacity>
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
});
