import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Screens/Home";
import PredictionScreen from "./Screens/PredictionScreen";
import LoginScreen from "./Screens/LoginScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import DiseaseListScreen from "./Screens/DiseaseListScreen";
import DiseaseDetailedScreen from "./Screens/DiseaseDetailedScreen";
import HelpScreen from "./Screens/HelpScreen";
import AddDiseaseScreen from "./Screens/AddDiseaseScreen";
import Dashboard from "./Screens/Dashboard";
import ProfileScreen from "./Screens/ProfileScreen";
import ViewUsers from "./Screens/ViewUsers";
import ForgetPassword from "./Screens/ForgetPassword";
import ChangePassword from "./Screens/ChangePassword";
import EditDiseaseScreen from "./Screens/EditDiseaseScreen";
import EditScreen from "./components/Edit";
import {
  AntDesign,
  Entypo,
  Ionicons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import SettingsScreen from "./Screens/SettingsScreen";
const StackNavigator = () => {
  const Stack = createStackNavigator();

  const Tab = createBottomTabNavigator();
  function AddminTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo
                  name="home"
                  size={24}
                  color="#002580"
                  style={{ marginBottom: -3 }}
                />
              ) : (
                <AntDesign
                  name="home"
                  size={24}
                  color="black"
                  style={{ marginBottom: -3 }}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddDiseaseScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="add-circle" size={24} color="black" />
              ) : (
                <Ionicons name="add-circle-outline" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="View"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialIcons name="settings" size={24} color="black" />
              ) : (
                <Feather name="settings" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  function BottomTabs({ navigation, route }) {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo
                  name="home"
                  size={24}
                  color="#195F57"
                  style={{ marginBottom: -3 }}
                />
              ) : (
                <AntDesign
                  name="home"
                  size={24}
                  color="black"
                  style={{ marginBottom: -3 }}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Diseases"
          component={DiseaseListScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons
                  name="md-leaf"
                  size={24}
                  color="black"
                  style={{ marginBottom: -3 }}
                />
              ) : (
                <Ionicons
                  name="md-leaf-outline"
                  size={24}
                  color="black"
                  style={{ marginBottom: -3 }}
                />
              ),
          }}
        />
        <Tab.Screen
          name="help"
          component={HelpScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons
                  name="chatbubble-ellipses-sharp"
                  size={24}
                  color="black"
                  style={{ marginBottom: -3 }}
                />
              ) : (
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={24}
                  color="black"
                  style={{ marginBottom: -3 }}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons
                  name="md-person-circle-sharp"
                  size={24}
                  color="black"
                />
              ) : (
                <Ionicons
                  name="md-person-circle-outline"
                  size={24}
                  color="black"
                />
              ),
            headerStyle: {
              backgroundColor: "#195F57",
            },
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Prediction" component={PredictionScreen} />
        <Stack.Screen name="DetailedScreen" component={DiseaseDetailedScreen} />
        <Stack.Screen name="EditDisease" component={EditScreen} />
        <Stack.Screen
          name="Admin"
          component={AddminTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgetPassword}
          options={{
            headerStyle: {
              backgroundColor: "#B1C9B1",
            },
            headerTitleStyle: {
              color: "#195F57",
              textTransform: "uppercase",
              marginLeft: 50,
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="Change"
          component={ChangePassword}
          options={{
            headerStyle: {
              backgroundColor: "#B1C9B1",
            },
            headerTitleStyle: {
              color: "#195F57",
              marginLeft: 50,
              textTransform: "uppercase",
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="EditDiseaseDetailed"
          component={EditDiseaseScreen}
        />
        <Stack.Screen name="ViewUsers" component={ViewUsers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigator;
