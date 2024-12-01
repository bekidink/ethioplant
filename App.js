import { StyleSheet } from "react-native";
import StackNavigator from "./StackNavigator";

import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreAllLogs(true);

  return <StackNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
