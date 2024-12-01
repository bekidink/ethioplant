import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc } from "firebase/firestore";
const ViewUsers = () => {
  // const { data: usersData } = useGetData("users");
  const [usersData, setUsersData] = useState([]);
  const deleteUser = (id) => {
    const docRef = doc(db, "users", id);
  };
  const collectionRef = db.collection("users");
  useEffect(() => {
    async function fetchData() {
      collectionRef.onSnapshot((querySnapshot) => {
        const diseases = [];
        querySnapshot.forEach((doc) => {
          const { name, email } = doc.data();
          diseases.push({
            id: doc.id,
            name,
            email,
          });
        });
        setUsersData(diseases);
      });
    }
    fetchData();
  }, [usersData]);
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/blob1.png")}
        resizeMode="contain"
        style={{
          top: -25,
          left: 20,
          width: 550,
          height: 267,
          position: "absolute",
          transform: [
            {
              rotate: "180deg",
            },
          ],
        }}
      />
      <View style={styles.title}>
        <Text style={styles.text}>የተጠቃሚዎች ዝርዝር</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.txtName}>ስም</Text>
        <Text style={styles.txtEmail}>ኢሜል</Text>
      </View>
      <View>
        {usersData.map((item) => (
          <View key={item.id} style={styles.user}>
            <View style={styles.name}>
              <Text>{item.name}</Text>
            </View>
            <View style={styles.email}>
              <Text>{item.email}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ViewUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    marginTop: 56,
    alignItems: "center",
    justifyContent: "center",
    left: -60,
  },
  text: {
    color: "#195F57",
    fontSize: 24,
  },
  header: {
    flexDirection: "row",
    marginTop: 135,
  },
  txtName: {
    width: "30%",
    marginRight: 20,
    paddingLeft: 25,
    fontSize: 18,
    color: "#195F57",
  },
  txtEmail: {
    paddingLeft: 20,
    fontSize: 18,
    color: "#195F57",
  },
  user: {
    flexDirection: "row",
    marginTop: 15,
    border: 3,
    borderColor: "black",
  },
  name: {
    paddingLeft: 20,
    marginRight: 20,
    width: "30%",
  },
});
