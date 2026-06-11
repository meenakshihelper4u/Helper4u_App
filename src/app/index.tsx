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
        <View style={styles.heroSection}>
          <ThemedText type="title" style={styles.title}>
            {t("languageScreenTitle")}
          </ThemedText>
          <ThemedText type="small" style={styles.description}>
            {t("languageScreenDescription")}
          </ThemedText>
        </View>

        <LanguageSelector />

        <Pressable
          onPress={() => router.push("/login")}
          style={({ pressed }) => [
            styles.continueButton,
            { backgroundColor: theme.text, opacity: pressed ? 0.8 : 1 },
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
    gap: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: Spacing.three,
    paddingVertical: Spacing.four,
  },
  title: {
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    maxWidth: 600,
  },
  continueButton: {
    minWidth: 240,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    paddingVertical: Spacing.three,
    marginTop: Spacing.four,
  },
  continueText: {
    color: "white",
  },
});
