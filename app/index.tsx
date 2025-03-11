import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

export default function Index() {
  const [text, onChangeText] = useState("Useless Text");
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContainer}
    >
      <Image
        style={[styles.logo, { width: logoSize, height: logoSize }]}
        source={require("@/assets/images/react-logo.png")}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Valor digitado no input: {text}</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
      </View>
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
    </ScrollView>
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
    tintColor: "white",
  },
});
