import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;

  const upload = () => {
    console.log(user);
  };
  const signOut = () => {
    auth.signOut();
    navigation.navigate("Login");
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
    //console.log(coords)
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      // console.log(response)
      for (let item of response) {
        let address = `${item.city} ${item.subregion} ${item.country}`;
        setdisplayCurrentAddress(address);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground style={styles.image}>
          <Text style={styles.profile}>Profile</Text>
          <View gradientImage="Gradient_RiPhkqO.png" style={styles.gradient}>
            <View style={styles.imageRow}>
              <TouchableOpacity onPress={upload}>
                <Image
                  source={require("../assets/images/profile.png")}
                  resizeMode="contain"
                  style={styles.userImage}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.account}>
            <Text style={{ fontSize: 20 }}>Email :{user.email}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Change")}>
              <View style={styles.edit}>
                <Image
                  source={require("../assets/images/edit.png")}
                  resizeMode="contain"
                  style={styles.image3}
                />
                <Text style={styles.edittext}>ቁል ማስተካከል</Text>
                <Image
                  source={require("../assets/images/next.png")}
                  resizeMode="contain"
                  style={styles.image4}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sign} onPress={signOut}>
              <View style={styles.out}>
                <Image
                  source={require("../assets/images/exit.png")}
                  resizeMode="contain"
                  style={styles.image5}
                />
                <Text style={styles.logout}>ማዉጣት</Text>
                <Image
                  source={require("../assets/images/next.png")}
                  resizeMode="contain"
                  style={styles.image6}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <Image
        source={require("../assets/images/blob1.png")}
        resizeMode="contain"
        style={{
          bottom: -45,
          left: -190,
          width: 300,
          height: 257,
          position: "absolute",
        }}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    width: 416,
    height: 745,
    marginTop: -74,
    marginLeft: -23,
  },
  image: {
    top: 0,
    left: 10,
    width: 416,
    heght: 401,
    position: "absolute",
  },
  userImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    alignSelf: "center",
  },
  profile: {
    color: "rgba(255,255,255,1)",
    marginTop: 113,
    marginLeft: 183,
  },
  gradient: {
    width: 300,
    height: 78,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 20,
    marginTop: 25,
    marginLeft: 86,
  },
  imageRow: {
    height: 50,
    flexDirection: "row",
    marginTop: 14,
    marginLeft: 55,
    marginRight: 30,
  },
  image2: {
    width: 50,
    height: 50,
  },
  Col: {
    width: 200,
    marginLeft: 13,
    marginBottom: 9,
  },
  name: {
    color: "rgba(255,255,255,1)",
    fontSize: 18,
  },
  email: {
    color: "rgba(255,255,255,1)",
    marginTop: 2,
  },
  account: {
    top: 307,
    left: 33,
    width: 360,
    height: 438,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 27,
  },
  edit: {
    width: 294,
    height: 78,
    backgroundColor: "white",
    borderRadius: 97,
    flexDirection: "row",
    marginTop: 63,
    marginLeft: 36,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  image3: {
    width: 40,
    height: 46,
    marginTop: 6,
  },
  edittext: {
    color: "#121212",
    marginLeft: 10,
    marginTop: 22,
    fontSize: 16,
  },
  image4: {
    width: 29,
    height: 58,
    marginLeft: 59,
    marginTop: 6,
  },
  sign: {
    width: 294,
    height: 78,
    backgroundColor: "white",
    borderRadius: 100,
    flexDirection: "row",
    marginTop: 26,
    marginLeft: 36,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  out: {
    height: 58,
    flexDirection: "row",
    flex: 1,
    marginLeft: 26,
    marginRight: 21,
    marginTop: 10,
    justifyContent: "space-between",
  },
  image5: {
    width: 40,
    height: 40,
    marginTop: 6,
  },
  logout: {
    color: "#121212",
    // marginLeft: 14,
    marginTop: 20,
    fontSize: 16,
  },
  image6: {
    width: 29,
    height: 58,
    marginTop: 6,
  },
});
