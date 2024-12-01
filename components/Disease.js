import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const Disease = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("DetailedScreen", {
          name: item.type,
          image: item.image,
          symptom: item.symptom,
          recommendation: item.recommendation,
        });
      }}
    >
      <View style={styles.Row}>
        <View style={styles.imageStack}>
          <Image
            source={{ uri: item.image }}
            resizeMode="cover"
            style={styles.cover}
          />
        </View>
        <View style={styles.list}>
          <Text style={styles.text}>{item.type}</Text>
        </View>
        <Image
          source={require("../assets/images/next.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Disease;

const styles = StyleSheet.create({
  container: {
    top: 15,
    left: 120,
    width: 323,
    height: 99,
    backgroundColor: "white",
    borderRadius: 27,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    marginTop: 20,
    shadowRadius: 10,
  },
  Row: {
    height: 76,
    flexDirection: "row",
    marginTop: 11,
    marginLeft: 13,
    marginRight: 13,
  },
  imageStack: {
    width: 97,
    height: 76,
    backgroundColor: "green",
    borderRadius: 12,
  },
  cover: {
    borderRadius: 12,
    width: 97,
    height: 76,
  },
  list: {
    width: 137,
    marginTop: 10,
    marginLeft: 17,
    marginBottom: 2,
  },
  text: {
    color: "#195F57",
    bottom: 7,
  },
  image: {
    width: 29,
    height: 58,
    marginLeft: 13,
    marginTop: 11,
    marginRight: 13,
  },
});
