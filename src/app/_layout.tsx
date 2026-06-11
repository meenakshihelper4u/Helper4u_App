import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { LocalizationProvider } from "@/contexts/localization-context";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <LocalizationProvider>
        <AnimatedSplashOverlay />
        <Stack screenOptions={{ headerShown: false }} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
