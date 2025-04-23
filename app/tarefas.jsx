import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getTarefas } from "@/api/tarefasApi";

export default function Tarefas() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["tarefas"],
    queryFn: getTarefas,
  });

  if (isPending) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Data</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isFetching && <Text style={styles.emptyText}>isFetching...</Text>}
      <FlatList
        style={styles.list}
        data={data.results}
        renderItem={({ item }) => <Text>{item.descricao}</Text>}
        keyExtractor={(item) => item.objectId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: "coral",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "white",
    fontSize: 40,
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "antiquewhite",
  },
  list: {
    backgroundColor: "bisque",
    width: "100%",
  },
});
