import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
const usePredictionData = (prediction) => {
  const [recommendation, setRecommendation] = useState("");
  const [type, setType] = useState("");
  const [diseaseData, setDiseaseData] = useState([]);
  const collectionRef = db.collection("disease");
  useEffect(() => {
    async function fetchData() {
      collectionRef.onSnapshot((querySnapshot) => {
        const diseases = [];
        querySnapshot.forEach((doc) => {
          const { image, symptom, recommendation } = doc.data();
          diseases.push({
            id: doc.id,
            image,
            symptom,
            recommendation,
          });
        });
        setDiseaseData(diseases);
      });
    }
    fetchData();
    async function recommendation() {
      const q = query(
        collection(db, "disease"),
        where("name", "==", prediction)
      );
      const querySnapshot = await getDocs(q);
      // const recommendations = doc.docs.map((doc) => {
      //   return {
      //     id: doc.id,
      //     image: doc.data().image,
      //     symptom: doc.data().symptom,
      //     recommendation: doc.data().recommendation,

      //   };
      querySnapshot.forEach((doc) => {
        const { recommendation, type } = doc.data();
        setRecommendation(recommendation);
        setType(type);
      });
    }
    recommendation();
  }, []);
  return { type, recommendation };
};

export default usePredictionData;

const styles = StyleSheet.create({});
