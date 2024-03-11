import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function useLoadAnim() {
  const loadAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(loadAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(loadAnim, {
          toValue: 0,
          duration: 500,
          delay: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return loadAnim;
}
