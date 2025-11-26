import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withSequence,
  withDelay,
} from "react-native-reanimated";
import { Circle, Path, Svg } from "react-native-svg";
import colors from "../../config/colors";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function SuccessAnimation({ onDone }) {
  const circleProgress = useSharedValue(0);
  const checkOpacity = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    circleProgress.value = withTiming(1, { duration: 900 });
    checkOpacity.value = withDelay(500, withTiming(1, { duration: 400 }));
    scale.value = withDelay(
      800,
      withSequence(
        withTiming(1.15, { duration: 180 }),
        withTiming(1, { duration: 180 })
      )
    );

    setTimeout(() => onDone && onDone(), 1700);
  }, []);

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: 100 * (1 - circleProgress.value),
  }));

  const animatedCheckProps = useAnimatedProps(() => ({
    opacity: checkOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
      <Svg width="140" height="140" viewBox="0 0 100 100">
        <AnimatedCircle
          cx="50"
          cy="50"
          r="40"
          stroke={colors.primary}
          strokeWidth="10"
          fill="none"
          strokeDasharray="100"
          animatedProps={animatedCircleProps}
          strokeLinecap="round"
        />
        <AnimatedPath
          d="M30 52 L45 67 L72 38"
          stroke={colors.primary}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          animatedProps={animatedCheckProps}
        />
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
});
