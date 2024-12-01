import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Text,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [role, setRole] = useState("Admin");
  const [hidePassword, setHidePassword] = useState();
  const navigation = useNavigation();
  const Signup = () => {
    console.log(name,"name")
    if (name == "") {
      alert("Fullname is required");
    } else if (email == "") {
      alert();
    }
    setRole("Admin");
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection("users")
          .doc(auth.currentUser.uid)
          .set({
            uid: auth.currentUser.uid,
            name,
            email,
            role,
          })
          .then(() => {
            alert("Account created successfully");
            navigation.navigate("Login");
          });
        setDoc(doc(db, "users", "ne"), {
          name,
          email,
          role,
        }).then(() => {
          navigation.navigate("Login");
        });
        const docRef = collection(db, "user");
        addDoc(docRef, {
          name,
          email,
          role,
        });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error Information",
          text2: error,
        });
      });
  };
  const back = () => {
    navigation.navigate("Login");
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
            onPress={Signup}
          >
            <Text style={styles.btnText}>SUBMIT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 15, width: 180 }}
            onPress={back}
          >
            <Text>Have an account?Login</Text>
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
            source={require("../assets/image/signup.png")}
            resizeMode="contain"
            style={styles.image22}
          ></Image>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.login}>SIGN</Text>
            <Text style={styles.login1}>UP</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={{ paddingBottom: 15, paddingLeft: 30, paddingRight: 30 }}>
        <Text style={{ color: "#195F57" }}>Fullname</Text>

        <View style={{ flexDirection: "row", padding: 10 }}>
          <Ionicons
            name="ios-person"
            size={24}
            color="black"
            style={{ marginRight: 10 }}
          />
          <TextInput
            placeholder="Enter your fullname"
            value={name}
            onChangeText={(text) => setname(text)}
          />
        </View>
      </View>
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

        <Text></Text>
      </View>
      <View style={{ paddingLeft: 30, paddingRight: 30 }}>
        <Text style={{ color: "#195F57" }}>Passwords</Text>

        <View style={{ flexDirection: "row", padding: 10 }}>
          <MaterialCommunityIcons
            name="key"
            size={24}
            color="black"
            style={{ marginRight: 10 }}
          />
          <TextInput
            secureTextEntry={hidePassword ? true : false}
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {password.length > 0 && (
            <TouchableOpacity
              onPress={() => setHidePassword(!hidePassword)}
              style={{ margin: 20 }}
            >
              {hidePassword ? (
                <Ionicons name="ios-eye-off" size={24} color="black" />
              ) : (
                <Ionicons name="ios-eye" size={24} color="black" />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

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
    flexDirection: "row",
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
