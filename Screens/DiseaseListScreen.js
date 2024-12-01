import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import Disease from "../components/Disease";
import { TextInput } from "react-native";
import { db } from "../firebase";
import { AntDesign } from "@expo/vector-icons";
const DiseaseListScreen = () => {
  const [all, setAll] = useState([]);
  const [search, setSearch] = useState("");
  const searchNow = async (search) => {
    if (search === "") {
    } else {
      const filterBestSales = await all.filter((item) => item.type === search);
      setAll(filterBestSales);
    }
  };
  const collectionRef = db.collection("disease");

  useEffect(() => {
    async function fetchData() {
      collectionRef.onSnapshot((querySnapshot) => {
        const diseases = [];
        querySnapshot.forEach((doc) => {
          const { image, symptom, recommendation, type } = doc.data();
          diseases.push({
            id: doc.id,
            type,
            image,
            symptom,
            recommendation,
          });
        });
        setAll(diseases);
      });
    }
    fetchData();
    fetch();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.diseaselist}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {all.map((item, index) => (
            <Disease item={item} key={index} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.imageStack}>
        <Image
          source={require("../assets/images/blob1.png")}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.header}>
          <View style={styles.Row}>
            <View style={styles.Col}>
              <Text style={styles.text}>የበሽታዎች ዝርዝር</Text>
            </View>
            <Image
              source={require("../assets/images/agriculture.png")}
              resizeMode="contain"
              style={styles.image2}
            />
          </View>
          <Text style={styles.browse}>ከዝርዝር ውስጥ ይፈልጉ</Text>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={{ marginTop: 10, padding: 5 }}
              onPress={() => searchNow(search)}
            >
              <AntDesign name="search1" size={24} color="black" />
            </Pressable>
            <TextInput
              placeholder="Search"
              style={{
                color: "#fff",
                backgroundColor: "#ECECEC",
                marginTop: 10,
                borderRadius: 10,
                padding: 5,
                width: "80%",
              }}
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
          </View>
        </View>
        <View style={{ height: 40 }}></View>
      </View>
    </View>
  );
};

export default DiseaseListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  diseaselist: {
    width: 450,
    height: 453,
    marginTop: 230,
    marginLeft: -109,
  },
  imageStack: {
    width: 507,
    height: 287,
    marginTop: -754,
    marginLeft: 33,
  },
  image: {
    top: 0,
    left: 17,
    width: 490,
    height: 347,
    position: "absolute",
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
  header: {
    top: 111,
    width: 293,
    height: 100,
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 15,
    left: 0,
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
    height: 64,
    flexDirection: "row",
    marginTop: 4,
    marginLeft: 20,
  },
  Col: {
    width: 180,
    marginBottom: 10,
    padding: 5,
  },
  text: {
    color: "#195F57",
    fontSize: 18,
    marginTop: -1,
    right: 25,
    paddingLeft: 15,
  },
  image2: {
    width: 71,
    height: 53,
    marginLeft: 17,
    marginTop: 1,
  },
  browse: {
    color: "#195F57",
    marginTop: 4,
    marginLeft: 20,
  },
});
