import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useLocalization } from "@/contexts/localization-context";
import { useTheme } from "@/hooks/use-theme";
import { languageNames } from "@/i18n/translations";

const languages = [
  { code: "en", label: languageNames.en },
  { code: "hi", label: languageNames.hi },
  { code: "mr", label: languageNames.mr },
  { code: "kn", label: languageNames.kn },
  { code: "bn", label: languageNames.bn },
] as const;

export function LanguageSelector() {
  const { language, setLanguage, t } = useLocalization();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.heading}>
        {t("languageLabel")}
      </ThemedText>
      <View style={styles.optionsRow}>
        {languages.map((lang) => (
          <Pressable
            key={lang.code}
            onPress={() => setLanguage(lang.code)}
            style={({ pressed }) => [
              styles.option,
              {
                borderColor: theme.text,
                backgroundColor:
                  lang.code === language ? theme.text : theme.background,
              },
              pressed && styles.pressed,
            ]}
          >
            <ThemedText
              style={
                lang.code === language
                  ? styles.optionTextActive
                  : styles.optionText
              }
            >
              {lang.label}
            </ThemedText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    gap: 12,
    paddingTop: 16,
  },
  heading: {
    textAlign: "center",
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  option: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minWidth: 90,
    alignItems: "center",
  },
  optionText: {
    textAlign: "center",
  },
  optionTextActive: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
