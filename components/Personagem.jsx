import { StyleSheet, Text, View } from "react-native";

export const Personagem = ({ personagem }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{personagem.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 3,
    borderColor: "black",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
  },
});
