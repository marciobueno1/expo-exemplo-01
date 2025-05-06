import "@/global.css";

import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="starWars/index" />
        <Stack.Screen name="starWars/[id]" />
        <Stack.Screen name="exLista" />
        <Stack.Screen name="tarefas" />
      </Stack>
    </QueryClientProvider>
  );
}
