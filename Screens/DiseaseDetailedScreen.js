import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const DiseaseDetailedScreen = ({ route }) => {
  const { name, image, symptom, recommendation } = route.params;
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
              <Text style={styles.needlight}>የጸሃይ ብርሃን ያስፈልጋል</Text>
              <Image
                source={require("../assets/images/watering.png")}
                resizeMode="contain"
                style={styles.image2}
              />
              <Text style={styles.water}>ውሃ ማጠጣት</Text>
            </View>
          </View>
          <View style={styles.recommendation}>
            <Text style={styles.text}>ምልክቶች: {symptom}</Text>
            <Text style={styles.text2}>መፍትሄ: {recommendation}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DiseaseDetailedScreen;

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
    marginLeft: 59,
  },
  water: {
    color: "#121212",
    marginLeft: 2,
    marginTop: 2,
  },
  recommendation: {
    width: 326,
    height: 150,
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
    height: 156,
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
  },
});
