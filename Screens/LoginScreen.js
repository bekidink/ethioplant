import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
} from "react-native";
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { auth, db } from "../firebase";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const signup = () => {
    navigation.navigate("SignUp");
  };

  const login = async () => {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        db.collection("users")
          .doc(auth.currentUser.uid)
          .get()
          .then((user) => {
            setUser(user.data());
            setRole(user.data().role);
            setEmail("");
            setPassword("");
            Toast.show({
              type: "success",
              position: "top",
              text1: "Congrats,Your Login is Successful",
              visibilityTime: 2000,
              autoHide: true,
            });
          });
      })
      .catch((error)=> { 
        console.log(error)
        return alert(error)
      });
  };
  useEffect(() => {
    // if (user != null) {
    //   if (role === "Farmer") {
    //     navigation.navigate("main");
    //   } else {
    //     navigation.navigate("Admin");
    //   }
    // }
  }, [user, role]);
  const forgot = () => {
    navigation.navigate("Forgot");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.image1Stack}>
          <Image
            source={require("../assets/images/blob.png")}
            resizeMode="contain"
            style={styles.image1}
          ></Image>

          <View style={styles.group}>
            <TouchableOpacity
              style={styles.materialButtonPrimary1}
              onPress={login}
            >
              <Text style={styles.btnText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imageStack}>
          <ImageBackground
            source={require("../assets/images/blob.png")}
            resizeMode="contain"
            style={styles.image}
            imageStyle={styles.image_imageStyle}
          >
            <Image
              source={require("../assets/image/signin.png")}
              resizeMode="cover"
              style={styles.image2}
            ></Image>
          </ImageBackground>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.login}>LOG</Text>
            <Text style={styles.login1}>IN</Text>
          </View>
        </View>

        <KeyboardAvoidingView
          style={{
            paddingTop: 5,
            paddingLeft: 30,
            paddingRight: 30,
          }}
        >
          <Text style={styles.label}>Email</Text>

          <View style={{ flexDirection: "row", padding: 10 }}>
            <MaterialIcons
              name="email"
              size={24}
              color="black"
              style={{ marginRight: 5 }}
            />
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          {/* </Item> */}
        </KeyboardAvoidingView>

        <KeyboardAvoidingView
          style={{ paddingTop: 5, paddingLeft: 30, paddingRight: 30 }}
        >
          <Text style={styles.label}>Password</Text>

          <View style={{ flexDirection: "row", padding: 10 }}>
            <MaterialCommunityIcons
              name="key"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
            <TextInput
              placeholder="Enter your password"
              value={password}
              secureTextEntry={hidePassword ? true : false}
              onChangeText={(text) => setPassword(text)}
            />
            {password.length > 0 && (
              <TouchableOpacity
                onPress={() => setHidePassword(!hidePassword)}
                style={{ alignSelf: "flex-end" }}
              >
                {hidePassword ? (
                  <AntDesign name="eye" size={24} color="black" />
                ) : (
                  <Ionicons name="ios-eye-off" size={24} color="black" />
                )}
              </TouchableOpacity>
            )}
          </View>
          {/* </Item> */}
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={{ margin: 20, marginLeft: 30 }}
          onPress={signup}
        >
          <Text style={{ ...styles.label, ...styles.labelLine }}>
            Don't have account? SignUP
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  btnText: {
    color: "white",

    fontFamily: "comicneuebold",
  },
  label: {
    color: "#195F57",
    fontFamily: "comicneuebold",
  },
  labelLine: {
    textDecorationLine: "underline",
  },
  image1: {
    top: 0,
    left: 0,
    width: 307,
    height: 415,
    position: "absolute",
    transform: [
      {
        rotate: "-10.00deg",
      },
    ],
  },
  group: {
    top: 25,
    left: 232,
    width: 121,
    height: 40,
    position: "absolute",
  },
  materialButtonPrimary1: {
    width: 121,
    height: 40,
    borderRadius: 25,
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: "#195F57",
    justifyContent: "center",
    alignItems: "center",
  },
  image1Stack: {
    width: 338,
    height: 405,
    marginTop: 489,
    marginLeft: -18,
  },
  image: {
    top: 0,
    left: 18,
    width: 496,
    height: 473,
    position: "absolute",
  },
  image_imageStyle: {},
  image2: {
    width: 200,
    height: 217,
    marginTop: 186,
    marginLeft: 90,
  },
  login: {
    top: 356,
    left: 0,
    color: "#195F57",
    position: "absolute",
    fontSize: 40,
    fontFamily: "comicneuebold",
  },
  login1: {
    top: 356,
    left: 83,
    color: "white",
    position: "absolute",
    fontSize: 40,
    fontFamily: "comicneuebold",
  },
  imageStack: {
    width: 514,
    height: 473,
    marginTop: -1030,
    marginLeft: 28,
  },

  password: {
    color: "#1D446F",
    fontSize: 14,
    fontFamily: "comicneuebold",
    marginTop: -52,
    marginLeft: 28,
  },
  emailAddress: {
    color: "#1D446F",
    fontSize: 14,

    marginTop: -78,
    marginLeft: 28,
  },
  rect: {
    width: 292,
    marginTop: 11,
    marginLeft: 28,
  },
  rect1: {
    width: 292,
    marginTop: 111,
    marginLeft: 28,
  },
});
