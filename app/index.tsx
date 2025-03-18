import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bb",
    title: "Fourth Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f64",
    title: "Fifth Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    title: "Sixth Item",
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function Index() {
  const [text, onChangeText] = useState("Useless Text");
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
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
      <Image
        style={[styles.logo, { width: logoSize, height: logoSize }]}
        source={require("@/assets/images/react-logo.png")}
      />
      {isEnabled && (
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
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <FlatList
        style={styles.list}
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
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
    tintColor: "white",
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
  list: {
    backgroundColor: "yellow",
    width: "100%",
  },
});
