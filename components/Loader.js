import { StyleSheet, Text, View, Modal, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";

const Loader = ({ isLoader }) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(isLoader);
  }, [isLoader]);
  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={isLoading}
      style={{ zIndex: 1100 }}
      onRequestClose={() => {}}
    >
      <View style={styles.background}>
        <View style={styles.activityIndicator}>
          <ActivityIndicator animating={isLoading} color={"green"} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#rgba(0,0,0,0.5)",
    zIndex: 1000,
  },
  activityIndicator: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
