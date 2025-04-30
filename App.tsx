import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import SplashScreen from "./src/screens/SplashScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RecipeDetailScreen from "./src/screens/RecipeDetailScreen";
import HealthySubstitutesScreen from "./src/screens/HealthySubstitutesScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Dark theme palette
const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#2E3A24",
    card: "#4A5E3D",
    text: "#F0F3F4",
    border: "#4A5E3D",
    primary: "#6B8E23"
  }
};

// Stack Navigator inside Home Tab
function DiscoverStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
      <Stack.Screen name="HealthySubstitutes" component={HealthySubstitutesScreen} />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "#2E3A24", borderTopColor: "#4A5E3D" },
        tabBarActiveTintColor: "#6B8E23",
        tabBarInactiveTintColor: "#A9DFBF",
        tabBarIcon: ({ color, size }) => {
          let iconName: string = "home-outline";
          if (route.name === "HomeTab") {
            iconName = "home-outline";
          }
          return <Ionicons name={iconName as any} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="HomeTab" component={DiscoverStack} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={darkTheme}>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="HomeMain" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



