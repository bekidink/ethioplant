import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import TakePicture from "../components/TakePicture";
import * as Location from "expo-location";
import axios from "axios";

const Home = () => {
  const APIKEY = "6f19ebd7700051605833c1cb978997b0";
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongtude] = useState(null);
  const [date, setDate] = useState(null);
  const [weather, setWeather] = useState([]);
  const [daily, setDaily] = useState("");
  // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  useEffect(() => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    setDate(date);

    checkLE();
    getComputedStyle();
    handleWeather();
  }, [APIKEY, longitude]);
  const handleWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`
      )
      .then((res) => {
        setWeather(res.data.weather);
        setDaily(res.data.weather.main);
        setData(res.data.main);
      });
  };
  const checkLE = async () => {
    let enable = await Location.hasServicesEnabledAsync();
    if (!enable) {
      Alert.alert(
        "location services not enabled",
        "please enable the location serivices",
        [
          {
            text: "Cancel",
            onPress: () => console.log("canced"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => console.log(),
          },
        ],
        { cance }
      );
    } else {
    }
  };
  const getComputedStyle = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status != "granted") {
      Alert.alert(
        "permission denied",
        "please enable the location serivices",
        [
          {
            text: "Cancel",
            onPress: () => console.log("canced"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => console.log(),
          },
        ],
        { cancelable: false }
      );
    }
    const { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;
      setLatitude(latitude);
      setLongtude(longitude);
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      for (let item of response) {
        let address = `${item.city} ${item.subregion} ${item.country}`;
        setdisplayCurrentAddress(address);
      }
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground style={{ height: "100%", width: "100%" }}>
        <View style={styles.home}>
          <View style={styles.Stack}>
            <Image
              source={require("../assets/images/blob1.png")}
              resizeMode="cover"
              style={styles.cover}
            />

            <View style={styles.scan}>
              <Text style={styles.text}>የኢትዮ እጽዋት</Text>

              <View style={styles.health}>
                <Text style={styles.treat}> አዝርቶን ያክሙ</Text>
                <View style={styles.bord}>
                  <Image
                    source={require("../assets/images/qr.png")}
                    resizeMode="contain"
                    style={styles.image1}
                  />
                  <Image
                    source={require("../assets/images/next.png")}
                    resizeMode="contain"
                    style={styles.image2}
                  />
                  <Image
                    source={require("../assets/images/paper.png")}
                    resizeMode="contain"
                    style={styles.image3}
                  />
                  <Image
                    source={require("../assets/images/next.png")}
                    resizeMode="contain"
                    style={styles.image4}
                  />
                  <Image
                    source={require("../assets/images/healthcare-and-medical.png")}
                    resizeMode="contain"
                    style={styles.image5}
                  />
                </View>
                <TakePicture />
              </View>
              <View style={styles.weather}>
                <View style={styles.Row}>
                  <View style={styles.Column}>
                    <Text style={styles.today}>
                      {"Current Date"} - {date}
                    </Text>

                    {weather.map((item) => (
                      <View key={item.id}>
                        <Text style={styles.degree}>Main: {item.main}</Text>
                        <Text style={styles.sunset}>
                          Description: {item.description}
                        </Text>
                      </View>
                    ))}
                  </View>
                  {daily === "clouds" ? (
                    <Image
                      source={require("../assets/images/rain.png")}
                      resizeMode="contain"
                      style={styles.image9}
                    ></Image>
                  ) : daily === "rain" ? (
                    <Image
                      source={require("../assets/images/rain.png")}
                      resizeMode="contain"
                      style={styles.image9}
                    ></Image>
                  ) : daily === "sun" ? (
                    <Image
                      source={require("../assets/images/sunny.png")}
                      resizeMode="contain"
                      style={styles.image9}
                    ></Image>
                  ) : (
                    <Image
                      source={require("../assets/images/rain.png")}
                      resizeMode="contain"
                      style={styles.image9}
                    ></Image>
                  )}
                  {/*  */}
                </View>
              </View>
            </View>
            <Image
              source={require("../assets/images/animation_500_kcit151v.gif")}
              resizeMode="contain"
              style={{
                top: 492,
                left: 270,
                width: 131,
                height: 155,
                position: "absolute",
              }}
            ></Image>
            <Image
              source={require("../assets/images/mylogo.png")}
              resizeMode="contain"
              style={{
                top: 5,
                bottom: 20,
                left: -35,
                width: 200,
                height: 85,
                position: "absolute",
              }}
            ></Image>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  home: {
    width: 459,
    height: 692,
    marginLeft: -50,
  },
  Stack: {
    top: 0,
    left: 57,
    width: 402,
    height: 647,
    position: "absolute",
  },
  cover: {
    top: -40,
    left: 110,
    height: 350,
    position: "absolute",
  },
  scan: {
    top: 90,
    width: 278,
    height: 513,
    position: "absolute",
    backgroundColor: "#ffffff",
    borderRadius: 35,
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 7,
    shadowOpacity: 1,
    shadowRadius: 4,
    left: 28,
  },
  text: {
    color: "#195F57",
    fontSize: 20,
    marginTop: 19,
    marginLeft: 24,
  },
  health: {
    width: 238,
    height: 206,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 27,
    marginTop: 30,
    margin: 20,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  treat: {
    color: "#195F57",
    fontSize: 18,
    marginTop: 14,
    marginLeft: 21,
  },
  bord: {
    height: 53,
    flexDirection: "row",
    marginTop: 27,
    marginLeft: 31,
    marginRight: 20,
  },
  image1: {
    width: 38,
    height: 39,
    marginTop: 11,
  },
  image2: {
    width: 16,
    height: 34,
    marginLeft: 12,
    marginTop: 14,
  },
  image3: {
    width: 48,
    height: 48,
    marginLeft: 7,
    marginTop: 3,
  },
  image4: {
    width: 16,
    height: 34,
    marginLeft: 1,
    marginTop: 13,
  },
  image5: {
    width: 47,
    height: 53,
    marginLeft: 2,
  },
  weather: {
    width: 300,
    height: 126,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 27,
    marginTop: 17,
    marginLeft: 22,
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
    height: 72,
    flexDirection: "row",
    marginTop: 14,
    marginLeft: 14,
    marginRight: 16,
  },
  Column: {
    width: 150,
    marginTop: 2,
  },
  today: {
    color: "#195F57",
    fontSize: 14,
    width: 150,
  },
  degree: {
    color: "#195F57",
    fontSize: 18,
    marginTop: 6,
    width: 150,
  },
  sunset: {
    color: "#195F57",
    fontSize: 13,
    marginTop: 3,
    marginLeft: 1,
    width: 150,
  },
  condition: {
    color: "#195F57",
    fontSize: 13,
    marginTop: 18,
    marginLeft: 15,
  },
  image9: {
    width: 78,
    height: 71,
    marginLeft: 46,
  },
});
