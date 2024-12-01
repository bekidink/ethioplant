import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  Ionicons,
  Feather,
  AntDesign,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { Avatar } from "react-native-elements";
import { TextInput } from "react-native";
import { NetworkInfo } from "react-native-network-info";
import NetInfo from "@react-native-community/netinfo";
const HelpScreen = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [initial, setinitial] = useState(false);
  const [index, setIndex] = useState(0);
  const help = (message) => {
    setMessage(message);
    if (message.length > 0) {
      message;
      const data = new FormData();
      data.append("question", message);
      fetch("http://192.168.1.6:5000/chat", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setResponse(response);
          setIndex(1);
          setInput("");
        });
    }
  };
  useEffect(() => {
    // NetworkInfo.getIPV4Address().then((ipv4Address) => {
    //   console.log(ipv4Address);
    // });
    // NetInfo.fetch().then((state) => {
    //   console.log("Connection type", state.type);
    //   console.log("Is connected?", state.isConnected);
    // });
    if (index == 0) {
      setinitial(true);
      // setIndex(1);
    } else {
      setinitial(false);
    }
  }, []);
  return (
    <SafeAreaView style={styles.page}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text
          style={{ top: 80, marginLeft: 10, fontSize: 24, color: "#195F57" }}
        >
          እርዳታ መጠየቅያ
        </Text>
        <Image
          source={require("../assets/images/blob1.png")}
          resizeMode="contain"
          style={{
            top: -25,
            left: 10,
            width: 600,
            height: 267,
            position: "absolute",
            transform: [
              {
                rotate: "180deg",
              },
            ],
          }}
        />
      </View>

      <KeyboardAvoidingView style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
          <View style={styles.reciever}>
            <Avatar
              position="absolute"
              rounded
              containerStyle={{
                position: "absolute",
                bottom: -15,
                left: -5,
              }}
              bottom={-15}
              right={-5}
              size={30}
            />
            <Text style={styles.recieverText}>{message} </Text>
          </View>
          <View style={styles.sender}>
            <Avatar
              position="absolute"
              containerStyle={{
                position: "absolute",
                bottom: -15,
                left: -15,
              }}
              bottom={-15}
              left={-5}
              rounded
              size={30}
            />
            <Text style={styles.senderText}>
              {initial
                ? "የእርዳታ ጥያቄዎን መጠየቅ ይችላሉ"
                : response.length === 0
                ? "ጥያቂው አልተስተናገደም ከእንደገና ይሞክሩ"
                : response.Answer}
            </Text>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TextInput
            placeholder="message"
            value={input}
            onChangeText={(text) => setInput(text)}
            style={styles.inputContainer}
          />
          <TouchableOpacity onPress={() => help(input)}>
            <Ionicons name="send" size={24} color="#195F57" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HelpScreen;
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 200,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
    marginBottom: 5,
  },
  inputContainer: {
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
    textTransform: "lowercase",
  },
  sender: {
    padding: 15,
    backgroundColor: "#195F57",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
    color: "white",
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    marginRight: 15,
    marginBottom: 20,
    marginRight: 25,
    maxWidth: "80%",
    position: "absolute",
    borderRadius: 12,
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  sendername: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
    backgroundColor: "white",
  },
});
