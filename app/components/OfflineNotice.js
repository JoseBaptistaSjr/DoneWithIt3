import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";

import AppText from "./AppText";
import colors from "../config/colors";

const HEIGHT = 50; // altura da barra

export default function OfflineNoticeAnimated() {
  const netInfo = useNetInfo();

  // posição inicial (fora da tela)
  const translateY = useSharedValue(-120);

  useEffect(() => {
    const offline =
      netInfo.type !== "unknown" && netInfo.isInternetReachable === false;

    if (offline) {
      // entra de cima pra baixo com delay de 1s
      translateY.value = withDelay(1000, withTiming(0, { duration: 600 }));
    } else {
      // sai de baixo pra cima com delay de 1s
      translateY.value = withDelay(1000, withTiming(-120, { duration: 600 }));
    }
  }, [netInfo.isInternetReachable]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <AppText style={styles.text}>Você está offline no momento.</AppText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    height: HEIGHT,
    width: "100%",
    position: "absolute",
    top: Constants.statusBarHeight,
    zIndex: 10,
  },
  text: {
    color: colors.white,
    fontWeight: "bold",
  },
});
