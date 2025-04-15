import axios from "axios";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function starWarsDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [personagem, setPersonagem] = useState({});

  async function carregarURL(url) {
    try {
      const response = await axios.get(url);
      console.log("response", response.data);
      if (response.status / 100 == 2) {
        setPersonagem(response.data);
        router.console.log("data", response.data);
      } else {
        console.log("status", response.status);
        console.log("statusText", response.statusText);
      }
    } catch (err) {
      console.log("err", err);
    }
  }

  useEffect(() => {
    carregarURL(`https://swapi.dev/api/people/${id}/`);
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: personagem.name ? personagem.name : `ID = ${id}`,
        }}
      />
      <Text style={styles.title}>Star Wars Details: {id}</Text>
      <Text style={styles.title}>Name: {personagem.name}</Text>
      <Text style={styles.title}>Height: {personagem.height}</Text>
      <Text style={styles.title}>Hair Color: {personagem.hair_color}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "beige" },
  title: { fontSize: 25 },
});
