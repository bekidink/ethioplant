import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../constants/";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
const CustomerTabBar = (props) => {
  return (
    <View>
      <View style={styles.tabBar}>
        <BottomTabBar {...props} />
      </View>
    </View>
  );
};

export default CustomerTabBar;

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    right: 10,
    left: 10,
    bottom: 38,
    height: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
});
