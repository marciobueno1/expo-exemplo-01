import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const Personagem = ({ personagem }) => {
  const router = useRouter();
  const id = personagem.url.split("/")[5];
  return (
    <Pressable
      onPress={() => {
        router.navigate(`/starWars/${id}`);
      }}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{personagem.name}</Text>
      </View>
    </Pressable>
  );
};

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
