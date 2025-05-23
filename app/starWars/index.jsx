import { Personagem } from "@/components/Personagem";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getPersonagens } from "@/api/starWarsApi";

const urlStarWars = "https://swapi.dev/api/people/?page=1";

export default function starWars() {
  const [url, setURL] = useState(urlStarWars);
  const query = useQuery({
    queryKey: [url],
    queryFn: () => getPersonagens(url),
  });
  console.log("query", query);

  const [personagens, setPersonagens] = useState([]);
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);

  async function carregarURL(url) {
    const data = await getPersonagens(url);
    setPersonagens(data.results);
    setPrevious(data.previous);
    setNext(data.next);
  }

  // useEffect(() => {
  //   carregarURL(urlStarWars);
  // }, []);

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
