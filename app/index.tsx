import { StyleSheet, Text, View } from "react-native";

export default function AppScreen() {
  return (
    <View style={styles.view}>
      <View style={{ backgroundColor: "yellow" }}>
        <Text style={styles.title}>Olá Turma!</Text>
        <Text style={styles.text}>Um texto normal / um parágrafo!</Text>
      </View>
      <View style={{ backgroundColor: "yellowgreen" }}>
        <Text style={styles.footer}>Rodapé</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "beige",
  },
  title: {
    color: "darkGray",
    fontSize: 50,
  },
  text: {
    color: "darkGray",
    fontSize: 15,
  },
  footer: {
    color: "darkGray",
    fontSize: 10,
  },
});
