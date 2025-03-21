import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";

const urlStarWars = "https://swapi.dev/api/people/?page=1";

const Item = ({ personagem }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{personagem.name}</Text>
  </View>
);

export default function starWars() {
  const [personagens, setPersonagens] = useState([]);
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);

  async function carregarURL(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPersonagens(data.results);
        setPrevious(data.previous);
        setNext(data.next);
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
        renderItem={({ item }) => <Item personagem={item} />}
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
