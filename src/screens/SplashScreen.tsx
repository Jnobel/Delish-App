import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import colors from "../../theme/colors"; // ✅ centralized color palette

const window = Dimensions.get("window");

export default function SplashScreen() {
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeMain" }]
      });
    }, 5000); // ⏱️ zoom-in effect duration

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animatable.Image
        source={require("../../assets/delish-logo.png")}
        animation="zoomIn"
        duration={5000}
        easing="ease-out"
        style={styles.logo}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: window.width * 0.8,
    height: window.width * 0.8,
    borderRadius: 20
  }
});
