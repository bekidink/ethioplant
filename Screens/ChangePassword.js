import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { getAuth, updatePassword } from "firebase/auth";
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
const ChangePassword = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const ChangePassword = () => {
    updatePassword(user, newPassword)
      .then(() => {
        console.log("Password Updated");
      })
      .catch((error) => {
        console.log(error);
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
            onPress={this.onSubmit}
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
            source={require("../assets/image/signin.png")}
            resizeMode="contain"
            style={styles.image22}
          ></Image>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.login}>ቁል</Text>
            <Text style={styles.login1}>ማስተካከል</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={{ paddingBottom: 15, paddingLeft: 30, paddingRight: 30 }}>
        <Text style={{ color: "#195F57", fontFamily: "comicneuebold" }}>
          Email
        </Text>

        <View style={{ flexDirection: "row" }}>
          <MaterialIcons
            name="email"
            size={32}
            color="black"
            style={{ marginRight: 10, marginTop: 10, padding: 5 }}
          />
          <TextInput
            placeholder="Enter your email"
            onChangeText={(value) => {
              this.setState({ fullname: value });
            }}
          />
        </View>
        {/* </Item> */}
      </View>
      <View style={{ paddingLeft: 30, paddingRight: 30 }}>
        <Text style={{ color: "#195F57", fontFamily: "comicneuebold" }}>
          Old Password
        </Text>

        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name="key"
            size={32}
            color="black"
            style={{ marginRight: 10, padding: 5 }}
          />
          <TextInput
            placeholder="Enter your old password"
            value={oldPassword}
            onChangeText={(text) => setOldPassword(text)}
            secureTextEntry={true}
          />
        </View>

        <Text></Text>
      </View>
      <View style={{ paddingLeft: 30, paddingRight: 30 }}>
        <Text style={{ color: "#195F57", fontFamily: "comicneuebold" }}>
          Passwords
        </Text>

        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name="key"
            size={32}
            color="black"
            style={{ marginRight: 10, padding: 5 }}
          />
          <TextInput
            placeholder="Enter your new password"
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            secureTextEntry={true}
          />
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;

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
    fontFamily: "comicneuebold",
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
    fontSize: 33,
    marginLeft: 0,
    fontFamily: "comicneuebold",
    marginTop: 170,
  },
  login1: {
    color: "#195F57",
    fontSize: 33,
    marginLeft: 2,
    fontFamily: "comicneuebold",
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
