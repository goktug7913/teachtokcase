import { Tabs } from "expo-router/tabs";
import Home from "../assets/BottomNavIcons/Home.svg";
import Discover from "../assets/BottomNavIcons/Discover.svg";
import Bookmarks from "../assets/BottomNavIcons/Bookmarks.svg";
import Activity from "../assets/BottomNavIcons/Activity.svg";
import Profile from "../assets/BottomNavIcons/Profile.svg";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useCallback } from "react";

export default function AppLayout() {
  const queryClient = new QueryClient();

  const [fontsLoaded] = useFonts({
    "SF-Pro-Rounded": require("../assets/SF-Pro-Rounded-Regular.otf"),
  });

  useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // We don't want to render anything until fonts have loaded
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Tabs
          sceneContainerStyle={{
            backgroundColor: "#000000",
          }}
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#000000",
              height: 50,
              borderTopWidth: 0,
            },
            tabBarActiveTintColor: "#ffffff",
            tabBarLabelStyle: {
              fontFamily: "SF-Pro-Rounded",
              fontSize: 12,
              margin: 0,
              padding: 0,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{ title: "Home", tabBarIcon: () => <Home /> }}
          />

          <Tabs.Screen
            name="Discover"
            options={{ title: "Discover", tabBarIcon: () => <Discover /> }}
          />

          <Tabs.Screen
            name="Activity"
            options={{ title: "Activity", tabBarIcon: () => <Activity /> }}
          />

          <Tabs.Screen
            name="Bookmarks"
            options={{ title: "Bookmarks", tabBarIcon: () => <Bookmarks /> }}
          />

          <Tabs.Screen
            name="Profile"
            options={{ title: "Profile", tabBarIcon: () => <Profile /> }}
          />
        </Tabs>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
