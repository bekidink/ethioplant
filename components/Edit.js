import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
const Edit = ({ route }) => {
  const [image, setImage] = useState("");
  const [symptom, setSymptom] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState("");
  const navigation = useNavigation();
  const {
    id,
    image: url,
    type: disease,
    symptom: sign,
    recommendation: control,
  } = route.params;
  useEffect(() => {
    setImage(url);
    setType(disease);
    setSymptom(sign);
    setRecommendation(control);
    console.log(url);
  }, [url, sign, disease, control, id]);
  const edit = () => {
    // db.collection("disease")
    //   .doc(id)
    //   .update({
    //     image,
    //     symptom,
    //     recommendation,
    //     type,
    //   })
    //   .then(() => {
    //     // Toast.show({
    //     //   type: "success",
    //     //   position: "top",
    //     //   text1: "Updated Successfully",
    //     // });
    //     navigation.navigate("Dashboard");
    //   })
    //   .catch((error) => {
    //     console.log("error");
    //   });
    console.log("edit");
  };
  const update = () => {
    console.log("update");
  };
  FromGallery = async () => {
    setIsVisible(false);
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        let File = {
          uri: result.uri,
          type: `test/${result.uri.split(".")[1]}`,
          name: `text.${result.uri.split(".")[1]}`,
        };
        setImage(result.assets[0].uri);
        setFileName(result.assets[0].fileName);
      }
    } else {
      Alert.alert("Permission Denied");
    }
  };
  FromCamera = async () => {
    setIsVisible(false);
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        let File = {
          uri: result.uri,
          type: `test/${result.uri.split(".")[1]}`,
          name: `test.${result.uri.split(".")[1]}`,
        };
        setImage(result.assets[0].uri);
        setFileName(result.assets[0].fileName);
      }
    } else {
      Alert.alert("Permission Denied");
    }
  };
  const submit = async () => {
    if (image != "" && type != "" && symptom != "" && recommendation != "") {
      const docRef = collection(db, "disease");

      const blobImage = await new Promise((resolve, rejects) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          rejects(new TypeError("network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });
      const metadata = {
        contentType: "image/png",
      };
      const storageRef = ref(storage, "Disease/" + Date.now());
      const uploadtask = uploadBytesResumable(storageRef, blobImage, metadata);
      uploadtask.on(
        "state_changed",
        (snapshot) => {
          const percentage = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("uploading" + percentage);
        },
        (error) => {
          Toast.show({
            type: "Error",
            text1: "Error Information",
            text2: error,
          });
        },
        () => {
          getDownloadURL(uploadtask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available" + downloadURL);
            await addDoc(docRef, {
              type,
              image: downloadURL,
              symptom: symptom,
              recommendation,
            }).then((res) => {
              Toast.show({
                text1: "Adding Disease",
                text2: "Disease Successfully Added",
              });
              setImage("");
              setSymptom("");
              setRecommendation("");
              setType("");
            });
          });
        }
      );
    } else {
      Toast.show({
        type: "info",
        text1: "Requirement Information",
        text2: "Fill all required information",
      });
    }
  };
  return (
    <View style={styles.container1}>
      <View>
        <Image
          source={require("../assets/images/blob1.png")}
          resizeMode="contain"
          style={{
            top: -20,
            left: 80,
            width: 490,
            height: 237,
            position: "absolute",
            transform: [
              {
                rotate: "200.0deg",
              },
            ],
          }}
        />
        <View style={{ padding: 10 }}>
          <Text style={{ marginTop: 70, fontSize: 24, color: "#195F57" }}>
            EDIT DISEASE
          </Text>
        </View>
      </View>
      <View style={styles.form}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.take}
            onPress={() => setIsVisible(true)}
          >
            <Text style={styles.picture}>Take a Picture</Text>
          </TouchableOpacity>
          <Image
            source={require("../assets/images/photography.png")}
            resizeMode="contain"
            style={styles.image}
          />
          <Modal
            isVisible={isVisible}
            onBackdropPress={() => setIsVisible(false)}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <View style={styles.modalView}>
                <Text style={styles.modalHeader}>Choose</Text>
                <View style={styles.modalBody}>
                  <TouchableOpacity onPress={FromCamera}>
                    <Image
                      source={require("../assets/images/photo.png")}
                      resizeMode="contain"
                      style={styles.modalImage1}
                    ></Image>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={FromGallery}>
                    <Image
                      source={require("../assets/images/memories.png")}
                      resizeMode="contain"
                      style={styles.modalImage2}
                    ></Image>
                  </TouchableOpacity>
                </View>
                <View style={styles.cameraRow}>
                  <Text style={styles.camera}>Camera</Text>
                  <Text style={styles.gallery}>Gallery</Text>
                </View>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <Text style={styles.modalCancel}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <KeyboardAvoidingView>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                marginLeft: 5,
                color: "#195F57",
                fontSize: 20,
              }}
            >
              ስም
            </Text>
            <TextInput
              placeholder="type"
              value={type}
              onChangeText={(text) => setType(text)}
              style={{
                marginLeft: 10,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                paddingTop: 5,
              }}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                alignSelf: "flex-start",
                marginLeft: 5,
                color: "#195F57",
                fontSize: 20,
              }}
            >
              ምልክቶች
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="Symptom"
              value={symptom}
              onChangeText={(text) => setSymptom(text)}
              style={{
                marginLeft: 10,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
              }}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              borderRadius: 10,
              borderColor: "black",
              // width: 200,
              // alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                alignSelf: "flex-start",
                marginLeft: 5,
                color: "#195F57",
                fontSize: 20,
              }}
            >
              Recommendation
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="recommendation"
              value={recommendation}
              onChangeText={(text) => setRecommendation(text)}
              style={{
                marginLeft: 10,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: "#195F57",
                height: 50,
                width: 100,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
                padding: 10,
                alignSelf: "center",
              }}
              onPress={() => {
                update();
              }}
            ></TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
      <Image
        source={require("../assets/images/blob1.png")}
        resizeMode="contain"
        style={{
          bottom: 50,
          left: -250,
          width: 630,
          height: 167,
          position: "relative",
          transform: [
            {
              rotate: "0deg",
            },
          ],
        }}
      />
    </View>
  );
};
export default Edit;
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "white",
  },
  form: {
    marginTop: 40,
    flexDirection: "column",
    // alignItems: "center",
  },
  imageInput: {
    margin: 20,
  },
  container: {
    width: 201,
    height: 44,
    marginTop: 9,
    marginLeft: 19,
  },
  take: {
    top: 1,
    left: 0,
    width: 201,
    height: 43,
    position: "absolute",
    backgroundColor: "#195F57",
    borderRadius: 56,
  },
  picture: {
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    marginTop: 13,
    marginLeft: 84,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  image: {
    top: 0,
    left: 25,
    width: 35,
    height: 42,
    position: "absolute",
  },
  modalView: {
    width: 239,
    height: 157,
    backgroundColor: "#fff",
    borderRadius: 17,
    alignSelf: "center",
  },
  modalText: {
    color: "#121212",
    fontSize: 18,
    marginTop: 12,
    marginLeft: 14,
  },
  modalbody: {
    height: 30,
    flexDirection: "row",
    marginTop: 21,
    marginLeft: 55,
    marginRight: 54,
  },
  camera: {
    width: 50,
    height: 50,
    bottom: 9,
    right: 10,
  },
  gallery: {
    width: 50,
    height: 50,
    marginLeft: 40,
    bottom: 10,
  },
  Row: {
    height: 17,
    flexDirection: "row",
    marginTop: 7,
    marginLeft: 45,
    marginRight: 48,
  },
  textCamera: {
    color: "#121212",
    top: 5,
    left: 2,
  },
  textGallery: {
    color: "#121212",
    marginLeft: 59,
    top: 5,
  },
  textCancel: {
    color: "red",
    marginTop: 20,
    marginLeft: 180,
  },
  rect5Stack: {
    width: 201,
    height: 44,
    marginTop: 9,
    marginLeft: 19,
  },
  rect5: {
    top: 1,
    left: 0,
    width: 201,
    height: 43,
    position: "absolute",
    backgroundColor: "#195F57",
    borderRadius: 56,
  },
  takeAPicture: {
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    marginTop: 13,
    marginLeft: 84,
  },
  image8: {
    top: 0,
    left: 25,
    width: 35,
    height: 42,
    position: "absolute",
  },
  modalView: {
    width: 239,
    height: 157,
    backgroundColor: "white",
    borderRadius: 17,

    alignSelf: "center",
  },
  modalHeader: {
    color: "#121212",
    fontSize: 18,
    marginTop: 12,
    marginLeft: 14,
  },
  modalBody: {
    height: 30,
    flexDirection: "row",
    marginTop: 21,
    marginLeft: 55,
    marginRight: 54,
  },
  modalImage1: {
    width: 50,
    height: 50,
    bottom: 9,
    right: 10,
  },
  modalImage2: {
    width: 50,
    height: 50,
    marginLeft: 40,
    bottom: 10,
  },
  cameraRow: {
    height: 17,
    flexDirection: "row",
    marginTop: 7,
    marginLeft: 45,
    marginRight: 48,
  },
  camera: {
    color: "#121212",
    top: 5,
    left: 2,
  },
  gallery: {
    color: "#121212",
    marginLeft: 59,
    top: 5,
  },
  modalCancel: {
    color: "red",
    marginTop: 20,
    marginLeft: 180,
  },
});
