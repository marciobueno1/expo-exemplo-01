import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { useStore } from "@/zustand";

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

const isAndroid = Platform.OS === "android";
// const isIOS = Platform.OS === "ios";

export default function Index() {
  const [text, onChangeText] = useState("Useless Text");
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });
  const router = useRouter();
  const showTextInput = useStore((state) => state.showTextInput);
  const toggleShowTextInput = useStore((state) => state.toggleShowTextInput);

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  });
  console.log("dimensions", dimensions);
  let logoSize = dimensions.window.width / 2;
  return (
    <View style={[styles.container, styles.scrollViewContainer]}>
      <Text className="text-white" style={{ fontSize: 40 }}>
        Titulo
      </Text>
      <Image
        style={[styles.logo, { width: logoSize, height: logoSize }]}
        source={require("@/assets/images/DanceBot-3-Med.gif")}
      />
      {showTextInput && (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Valor digitado no input: {text}</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
      )}
      <Button
        title="Pressione"
        onPress={() => {
          Alert.alert("Atenção", "Este é um aviso!", [
            {
              text: "Entendi",
              onPress: () => {
                console.log("Entendi pressionado!");
              },
            },
            {
              text: "Não entendi",
              onPress: () => {
                console.log("Não entendi pressionado!");
              },
            },
          ]);
        }}
      />
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={showTextInput ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleShowTextInput}
        value={showTextInput}
      />
      <Link href="/starWars">Star Wars</Link>
      <Link href="/tarefas">Tarefas</Link>
      <Button
        title="Flat List"
        color={isAndroid ? "black" : "green"}
        onPress={() => router.navigate("/exLista")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
  scrollViewContainer: {
    backgroundColor: "burlywood",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    padding: 10,
  },
  input: {
    width: "90%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputLabel: {
    alignSelf: "center",
  },
  logo: {
    marginBottom: 20,
    // tintColor: "white",
  },
});
