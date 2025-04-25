import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { getTarefas, createTarefa } from "@/api/tarefasApi";
import { Tarefa } from "@/components/Tarefa";
import { useState } from "react";

export default function Tarefas() {
  const [descricao, setDescricao] = useState("");
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["tarefas"],
    queryFn: getTarefas,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createTarefa,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
      setDescricao("");
    },
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
      <View style={styles.addContainer}>
        <TextInput
          placeholder="Digite a descrição da tarefa"
          value={descricao}
          onChangeText={setDescricao}
        />
        <Button title="ADD" onPress={() => mutation.mutate({ descricao })} />
      </View>
      <FlatList
        style={styles.list}
        data={data.results}
        renderItem={({ item }) => <Tarefa item={item} disabled={isFetching} />}
        keyExtractor={(item) => item.objectId}
      />
      {isFetching && <Text style={styles.emptyText}>isFetching...</Text>}
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
  addContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
