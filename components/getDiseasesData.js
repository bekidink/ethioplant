import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const getDiseasesData = () => {
  const collectionRef = db.collection("disease");
  const [all, setAll] = useState([]);
  useEffect(() => {
    async function fetchData() {
     await collectionRef.onSnapshot((querySnapshot) => {
        const diseases = [];
        querySnapshot.forEach((doc) => {
          const { image, symptom, recommendation, type } =  doc.data();
          diseases.push({
            id: doc.id,
            type,
            image,
            symptom,
            recommendation,
          });
        });
        setAll(diseases);
      });
    }
    fetchData();
  }, []);
  return { all };
};

export default getDiseasesData;

const styles = StyleSheet.create({});
