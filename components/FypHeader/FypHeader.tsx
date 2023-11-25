import { Animated, Easing, Text, View } from "react-native";
import ClockIcon from "../../assets/ForYouPage/ClockIcon.svg";
import SearchIcon from "../../assets/ForYouPage/SearchIcon.svg";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";

export default function FypHeader() {
  // Timer countdown from 10m to 0m
  // Initial value is 1000ms * 60s * 10m = 600000ms
  const [timer, setTimer] = useState(10 * 60 * 1000);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1000 : 0)); // Check if timer is greater than 0 before decrementing
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  const widthAnimation = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    // Animate the width when 'selected' changes
    Animated.timing(widthAnimation, {
      easing: Easing.bounce,
      toValue: 30,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            marginTop: insets.top,
            marginHorizontal: 16,
            zIndex: 100,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              left: 0,
            }}
          >
            <ClockIcon />
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.60)",
                fontSize: 14,
                fontFamily: "SF-Pro-Rounded",
                fontWeight: "400",
                marginLeft: 4,
              }}
            >
              {
                // Timer countdown from 10m to 0m
                // Initial value is 1000ms * 60s * 10m = 600000ms
                Math.floor(timer / 60000) + "m"
              }
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                fontFamily: "SF-Pro-Rounded",
              }}
            >
              For You
            </Text>
            <Animated.View
              style={{
                marginTop: 4,
                height: 4,
                width: widthAnimation,
                backgroundColor: "#fff",
              }}
            />
          </View>

          <SearchIcon
            style={{
              position: "absolute",
              right: 0,
            }}
          />
        </View>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
}
