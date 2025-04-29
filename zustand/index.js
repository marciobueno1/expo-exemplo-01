import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStore = create(
  persist(
    (set) => ({
      showTextInput: false,
      toggleShowTextInput: () =>
        set((state) => ({ showTextInput: !state.showTextInput })),
    }),
    {
      name: "expo-exemplo-01-setting",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
