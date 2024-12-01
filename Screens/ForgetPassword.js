import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Image } from "react-native";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;
  const reset = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.image1Stack}>
        <Image
          source={require("../assets/images/blob1.png")}
          resizeMode="contain"
          style={styles.image1}
        ></Image>

        <View style={styles.group}>
          <TouchableOpacity
            style={styles.materialButtonPrimary1}
            onPress={reset}
          >
            <Text style={styles.btnText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ImageBackground
        source={require("../assets/images/blob.png")}
        resizeMode="contain"
        style={styles.image2}
        imageStyle={styles.image2_imageStyle}
      >
        <View style={styles.image22Row}>
          <Image
            source={require("../assets/image/reset-password.png")}
            resizeMode="contain"
            style={styles.image22}
          ></Image>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.login}>FORGOT</Text>
            <Text style={styles.login1}>PASSWORD</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={{ paddingLeft: 30, paddingRight: 30 }}>
        <Text style={{ color: "#195F57" }}>Email</Text>

        <View style={{ flexDirection: "row", padding: 10 }}>
          <MaterialIcons
            name="email"
            size={24}
            color="black"
            style={{ marginRight: 10 }}
          />
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        {/* </Item> */}
        <Text></Text>
      </View>
    </View>
  );
};

export default ForgetPassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image1: {
    top: 90,
    left: 59,
    width: 309,
    height: 415,
    position: "absolute",
    transform: [
      {
        rotate: "91.00deg",
      },
    ],
  },
  group: {
    top: 120,
    left: 0,
    width: 121,
    height: 40,
    position: "absolute",
  },
  materialButtonPrimary1: {
    width: 121,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#195F57",
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    // fontFamily: "comicneuebold",
  },
  image1Stack: {
    width: 368,
    height: 432,
    marginTop: 423,
    marginLeft: 25,
  },
  image2: {
    width: 496,
    height: 473,
    flexDirection: "row",
    marginTop: -1040,
    marginLeft: -182,
  },

  image22: {
    width: 200,
    height: 200,
  },
  login: {
    color: "#1D446F",
    fontSize: 40,
    marginLeft: 0,
    // fontFamily: "comicneuebold",
    marginTop: 170,
  },
  login1: {
    color: "#195F57",
    fontSize: 40,
    marginLeft: 2,
    marginTop: 170,
  },
  image22Row: {
    height: 240,
    flexDirection: "row",
    flex: 1,
    marginRight: 14,
    marginLeft: 160,
    marginTop: 200,
  },
});
