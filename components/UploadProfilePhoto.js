import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Modal from "react-native-modal";
import Loader from "./Loader";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
const UploadProfilePhoto = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  ShowModal = () => {
    setIsVisible(true);
  };
  upload = (image) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: "Jane Q. User",
      photoURL: image,
    })
      .then(() => {
        console.log("profile updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  FromGallery = async () => {
    setIsVisible(true);
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
        upload(File);
      }
    } else {
      Alert.alert("Permission Denied");
    }
  };
  FromCamera = async () => {
    setIsVisible(true);
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
        upload(result);
      }
    } else {
      Alert.alert("Permission Denied");
    }
  };
  return (
    <View style={styles.rect5Stack}>
      <TouchableOpacity
        style={styles.rect5}
        onPress={() => setIsVisible(true)}
      ></TouchableOpacity>

      <Image
        source={require("../assets/images/photography.png")}
        resizeMode="contain"
        style={styles.image8}
      ></Image>
      <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        <View style={styles.view1}>
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
  );
};

export default UploadProfilePhoto;

const styles = StyleSheet.create({
  view1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
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
    fontFamily: "comicneuebold",
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
    fontFamily: "comicneuebold",
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
    fontFamily: "comicneueregular",
    color: "#121212",
    top: 5,
    left: 2,
  },
  gallery: {
    fontFamily: "comicneueregular",
    color: "#121212",
    marginLeft: 59,
    top: 5,
  },
  modalCancel: {
    fontFamily: "comicneuebold",
    color: "red",
    marginTop: 20,
    marginLeft: 180,
  },
});
