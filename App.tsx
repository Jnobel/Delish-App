import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import SplashScreen from "./src/screens/SplashScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RecipeDetailScreen from "./src/screens/RecipeDetailScreen";
import HealthySubstitutesScreen from "./src/screens/HealthySubstitutesScreen";
import colors from "./theme/colors"; // ✅ use centralized theme

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 🍃 Fresh & Clean Theme (centralized)
const freshTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.card,
    text: colors.text,
    border: "#E0E0E0",
    primary: colors.accent
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
        tabBarStyle: {
          backgroundColor: colors.navBar,
          borderTopColor: colors.card
        },
        tabBarActiveTintColor: colors.navIcon,
        tabBarInactiveTintColor: colors.navInactive,
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
    <NavigationContainer theme={freshTheme}>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="HomeMain" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
