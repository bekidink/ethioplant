import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";
const EditDiseaseScreen = ({ route }) => {
  const { name, image, symptom, recommendation, id } = route.params;
  const navigation = useNavigation();
  const edit = () => {
    navigation.navigate("EditDisease", {
      id: id,
      type: name,
      image,
      symptom,
      recommendation,
    });
  };
  const deleteDisease = async (id) => {
    await deleteDoc(doc(db, "disease", id)).then(() => {
      navigation.goBack();
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageStack}>
        <Image
          source={{ uri: image }}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.detail}>
          <View style={styles.Row}>
            <View style={styles.Col}>
              <Text style={styles.name}>{name}</Text>
              <View></View>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.ImageRow}>
              <Image
                source={require("../assets/images/summer.png")}
                resizeMode="contain"
                style={styles.image1}
              />
              <Text style={styles.needlight}>የጸሃይ ብርሃን</Text>
              <Image
                source={require("../assets/images/watering.png")}
                resizeMode="contain"
                style={styles.image2}
              />
              <Text style={styles.water}> ዘውትር ውሃ ማጠጣት</Text>
            </View>
          </View>
          <View style={styles.recommendation}>
            <Text style={styles.text}>ምልክት: {symptom}</Text>
            <Text style={styles.text2}>ምክር: {recommendation}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 20,
              marginTop: 30,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                borderRadius: 10,
                padding: 5,
                marginLeft: 20,
                width: 80,
              }}
              onPress={() => {
                deleteDisease(id);
              }}
            >
              <Text style={{ color: "#fff", alignSelf: "center" }}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#195F57",
                borderRadius: 10,
                padding: 10,
                marginRight: 75,
                width: 80,
              }}
              onPress={edit}
            >
              <Text style={{ color: "#fff", alignSelf: "center" }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditDiseaseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStack: {
    width: 482,
    height: 718,
    marginTop: -16,
    marginLeft: -61,
  },
  image: {
    top: 0,
    width: 482,
    height: 315,
    position: "absolute",
    left: 0,
  },
  detail: {
    top: 249,
    left: 61,
    width: 360,
    height: 469,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 27,
  },
  Row: {
    height: 54,
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 16,
    marginRight: 15,
  },
  Col: {
    width: 159,
  },
  name: {
    color: "#121212",
    fontSize: 20,
    marginLeft: 2,
  },
  list: {
    width: 326,
    height: 50,
    backgroundColor: "white",
    borderRadius: 16,
    flexDirection: "row",
    marginTop: 13,
    marginLeft: 18,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  ImageRow: {
    flexDirection: "row",
  },
  image1: {
    width: 20,
    height: 20,
  },
  needlight: {
    color: "#121212",
    marginLeft: 7,
    marginTop: 2,
  },
  image2: {
    width: 25,
    height: 20,
    marginLeft: 69,
  },
  water: {
    color: "#121212",
    marginLeft: 2,
    marginTop: 2,
  },
  recommendation: {
    width: 326,
    height: 222,
    backgroundColor: "white",
    borderRadius: 12,
    marginTop: 30,
    marginLeft: 18,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  text: {
    color: "#121212",
    width: 315,
    height: 106,
    textAlign: "justify",
    marginTop: 30,
    marginLeft: 6,
  },
  text2: {
    color: "#121212",
    textAlign: "justify",
    fontSize: 15,
    top: 10,
    marginLeft: 6,
    backgroundColor: "white",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
});
