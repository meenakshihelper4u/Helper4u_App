import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LanguageSelector } from "@/components/language-selector";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useLocalization } from "@/contexts/localization-context";
import { useTheme } from "@/hooks/use-theme";

export default function LanguageSelectionScreen() {
  const { t } = useLocalization();
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Hero Section - Enhanced with better visual hierarchy */}
        <View style={styles.heroSection}>
          <ThemedText type="title" style={styles.title}>
            {t("languageScreenTitle")}
          </ThemedText>
          <ThemedText type="small" style={styles.description}>
            {t("languageScreenDescription")}
          </ThemedText>
        </View>

        {/* Language Selector with improved container */}
        <View style={styles.selectorContainer}>
          <LanguageSelector />
        </View>

        {/* Enhanced Continue Button */}
        <Pressable
          onPress={() => router.push("/login")}
          style={({ pressed }) => [
            styles.continueButton,
            {
              backgroundColor: "#3AB0FF",
              opacity: pressed ? 0.85 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            },
          ]}
        >
          <ThemedText type="linkPrimary" style={styles.continueText}>
            {t("languageScreenContinue")}
          </ThemedText>
        </Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.five,
    paddingBottom: BottomTabInset + Spacing.four,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: Spacing.three,
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.two,
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "700",
  },
  description: {
    textAlign: "center",
    maxWidth: 600,
    opacity: 0.85,
    lineHeight: 22,
  },
  selectorContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing.three,
    // Subtle card-like container for selector
    backgroundColor: "rgba(58, 176, 255, 0.08)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(58, 176, 255, 0.15)",
  },
  continueButton: {
    minWidth: 260,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.five,
    marginTop: Spacing.two,
    shadowColor: "#3AB0FF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8, // Android shadow
  },
  continueText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
