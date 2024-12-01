import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import usePredictionData from "../components/usePredictionData";
const PredictionScreen = ({ route }) => {
  const { result, image, confidence } = route.params;
  const [find, setFind] = useState("");
  const { type, recommendation } = usePredictionData(result);

  const collectionRef = db.collection("disease");

  useEffect(() => {
    setFind(result);
  }, [result, collectionRef, find]);

  return (
    <View style={styles.container}>
      <View style={styles.Stack}>
        <Image
          source={require("../assets/images/blob.png")}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.predictedImage}>
          <Image
            source={{ uri: image }}
            alt="photo"
            style={{ height: 250, width: 250, borderRadius: 12 }}
          />
        </View>
      </View>
      <View style={styles.plantDisease}>
        <Text style={styles.name}></Text>

        <View style={styles.diseaseStack}>
          <Image
            source={require("../assets/images/blob.png")}
            resizeMode="contain"
            style={styles.image1}
          />
          <View style={styles.disease}>
            <View style={styles.textStack}>
              {recommendation.length === 0 ? (
                <View>
                  <Text style={styles.text}>Keep plant health safe</Text>
                </View>
              ) : (
                <Text style={styles.text}>{recommendation}</Text>
              )}
            </View>
            <View style={styles.dislike}></View>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.resultStack}>
          <View style={styles.Row}>
            <View style={styles.Col}>
              <Text style={styles.name}>{type}</Text>

              <Text style={styles.confidence}>
                {" "}
                እርግጠኝነት : {confidence.toFixed(2)} %
              </Text>
            </View>
            <Image
              source={require("../assets/images/pest.png")}
              resizeMode="contain"
              style={styles.image4}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PredictionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  Stack: {
    width: 427,
    height: 422,
    marginTop: -90,
    marginLeft: 46,
  },
  image: {
    top: 0,
    left: 117,
    width: 310,
    height: 294,
    position: "absolute",
  },
  predictedImage: {
    top: 140,
    width: 256,
    height: 256,
    position: "absolute",
    backgroundColor: "white",
    left: 13,
    borderRadius: 12,

    elevation: 7,
    shadowOpacity: 0.16,
    shadowRadius: 12,
  },
  plantDisease: {
    height: 303,
    flexDirection: "row",
    marginTop: 146,
    marginLeft: -1371,
    marginRight: 41,
  },
  name: {
    color: "#195F57",
    fontSize: 20,
    marginTop: 25,
  },
  diseaseStack: {
    width: 405,
    height: 303,
    marginLeft: 1285,
    top: 14,
    left: 1,
  },
  image1: {
    top: -50,
    left: 0,
    width: 310,
    height: 294,
    position: "absolute",
  },
  disease: {
    top: 0,
    left: 132,
    padding: 10,
    width: 300,
    height: 156,
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 27,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  diseaename: {
    color: "#195F57",
    marginTop: 16,
    marginLeft: 16,
  },
  textStack: {
    width: 262,
    height: 100,
    marginTop: 10,
    marginLeft: 16,
  },
  text: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "#195F57",
    borderRadius: 56,
    paddingTop: 15,
    fontSize: 16,
  },

  dislike: {
    top: 150,
    left: 0,
    width: 47,
    height: 32,
    position: "absolute",
    borderRadius: 56,
  },
  image2: {
    width: 30,
    height: 25,
    marginTop: 3,
    marginLeft: 8,
  },
  like: {
    top: 68,
    left: 195,
    width: 47,
    height: 32,
    position: "absolute",
    backgroundColor: "rgba(65,117,5,1)",
    borderRadius: 56,
  },
  image3: {
    width: 30,
    height: 25,
    marginTop: 3,
    marginLeft: 8,
  },
  resultStack: {
    width: 274,
    height: 97,
    backgroundColor: "white",
    borderRadius: 27,
    marginTop: -418,
    marginLeft: 48,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  Row: {
    height: 69,
    flexDirection: "row",
    marginTop: 16,
    marginLeft: 21,
    marginRight: 20,
  },
  Col: {
    width: 149,
  },
  type: {
    color: "#195F57",
  },
  name: {
    color: "#195F57",
    marginTop: 16,
  },
  image4: {
    width: 60,
    height: 58,
    marginLeft: 24,
    marginTop: 7,
  },
  confidence: {
    color: "#195F57",
    marginTop: 4,
  },
});
