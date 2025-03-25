import { Personagem } from "@/components/Personagem";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";

const urlStarWars = "https://swapi.dev/api/people/?page=1";

export default function starWars() {
  const [personagens, setPersonagens] = useState([]);
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);

  async function carregarURL(url) {
    try {
      const response = await axios.get(url);
      console.log("response", response.data);
      if (response.status / 100 == 2) {
        setPersonagens(response.data.results);
        setPrevious(response.data.previous);
        setNext(response.data.next);
      } else {
        console.log("status", response.status);
        console.log("statusText", response.statusText);
      }
    } catch (err) {
      console.log("err", err);
    }
  }

  useEffect(() => {
    carregarURL(urlStarWars);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button
          title="Anterior"
          onPress={() => carregarURL(previous)}
          disabled={previous == null}
        />
        <Button
          title="Próxima"
          onPress={() => carregarURL(next)}
          disabled={next == null}
        />
      </View>
      <FlatList
        data={personagens}
        renderItem={({ item }) => <Personagem personagem={item} />}
        keyExtractor={(item) => item.url}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
