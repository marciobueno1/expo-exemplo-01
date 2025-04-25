import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { updateTarefa } from "@/api/tarefasApi";

export const Tarefa = ({ item, disabled }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateTarefa,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
  });

  const backgroundColor = item.concluida ? "lightseagreen" : "lightcoral";
  const opacity = disabled ? 0.3 : 1.0;
  return (
    <Pressable
      disabled={disabled}
      onPress={() => {
        console.log("a");
        mutation.mutate({
          objectId: item.objectId,
          concluida: !item.concluida,
        });
      }}
    >
      <View style={[styles.container, { backgroundColor, opacity }]}>
        <Text>{item.descricao}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 3,
    borderColor: "black",
    alignItems: "center",
  },
});
