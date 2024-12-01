import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Modal from "react-native-modal";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import Toast from "react-native-toast-message";
const AddDiseaseScreen = () => {
  const [image, setImage] = useState(null);
  const [filename, setFileName] = useState(null);
  const [type, setType] = useState("");
  const [sysmptom, setSysmptom] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    console.log(filename);
  }, [image, filename]);
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
    if (image != "" && type != "" && sysmptom != "" && recommendation != "") {
      const docRef = collection(db, "disease");
      // const storageRef = ref(storage);
      // const uploadTask = uploadBytesResumable(storageRef, image.uri);
      // uploadTask.on(
      //   (err) => console.log(err),
      //   () => {
      //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      //       await addDoc(docRef, {
      //         type,
      //         image: downloadURL,
      //         symptom: sysmptom,
      //         recommendation,
      //       });
      //       console.log(downloadURL);
      //     });
      //   }
      // );
      // const storageRef = app.storage().ref();
      // const uploadTask = storageRef.child(filename);
      // uploadTask.put(image.uri).then(() => {
      //   console.log("uploaded");
      // });
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
              symptom: sysmptom,
              recommendation,
            }).then((res) => {
              Toast.show({
                text1: "Adding Disease",
                text2: "Disease Successfully Added",
              });
              setImage("");
              setSysmptom("");
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
    <SafeAreaView style={styles.container1}>
      <Toast ref={(ref) => Toast.setRef(ref)} style={{ top: 0, left: 0 }} />
      <View>
        <Image
          source={require("../assets/images/blob1.png")}
          resizeMode="contain"
          style={{
            top: -20,
            left: 35,
            width: 530,
            height: 267,
            position: "absolute",
            transform: [
              {
                rotate: "180.0deg",
              },
            ],
          }}
        />
        <View style={{ padding: 10 }}>
          <Text
            style={{
              marginTop: 80,
              fontSize: 24,
              color: "#195F57",
              marginLeft: 20,
            }}
          >
            አዲስ የበሽታ ዝርዝር ጨምር
          </Text>
        </View>
      </View>
      <View style={styles.form}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.take}
            onPress={() => setIsVisible(true)}
          >
            <Text style={styles.picture}>ፎቶ ማንሳት</Text>
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView>
            <View style={{ marginTop: 20, position: "relative" }}>
              <TextInput
                placeholder="የበሽታ ስም"
                value={type}
                onChangeText={(text) => setType(text)}
                style={{
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  paddingTop: 5,
                  marginLeft: 5,
                }}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder="ምልክት"
                value={sysmptom}
                onChangeText={(text) => setSysmptom(text)}
                style={{
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  marginLeft: 5,
                }}
              />
            </View>
            <View
              style={{
                marginTop: 20,
                borderRadius: 10,
                borderColor: "black",
                left: 0,

                position: "relative",
              }}
            >
              <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder="ምክር"
                value={recommendation}
                onChangeText={(text) => setRecommendation(text)}
                style={{
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  marginLeft: 5,
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <TouchableOpacity
          style={{
            backgroundColor: "#195F57",
            height: 50,
            width: 70,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginTop: 50,
          }}
          onPress={submit}
        >
          <Text style={{ color: "white" }}>Submit</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require("../assets/images/blob1.png")}
        resizeMode="contain"
        style={{
          bottom: -29,
          left: -250,
          width: 630,
          height: 190,
          position: "relative",
          transform: [
            {
              rotate: "10deg",
            },
          ],
        }}
      />
    </SafeAreaView>
  );
};

export default AddDiseaseScreen;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "white",
  },
  form: {
    marginTop: 80,
    flexDirection: "column",
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
