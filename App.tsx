import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Router } from "./src/router/Router";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <Router />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
