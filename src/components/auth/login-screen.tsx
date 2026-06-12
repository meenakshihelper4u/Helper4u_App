import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLocalization } from "@/contexts/localization-context";
import { useTheme } from "@/hooks/use-theme";

const DEFAULT_API_BASE =
  Platform.OS === "android"
    ? "http://10.0.2.2:5000/api/v1/Login"
    : "http://localhost:5000/api/v1/Login";

export function LoginScreen() {
  const theme = useTheme();
  const isDark = theme.background === "#000000";
  const palette = isDark
    ? {
        background: "#08111f",
        card: "#0f1b2d",
        text: "#f5f7fb",
        muted: "#9aa6b7",
        border: "rgba(255,255,255,0.08)",
        accent: "#28d0b3",
        accentSoft: "rgba(40,208,179,0.14)",
        input: "rgba(255,255,255,0.05)",
      }
    : {
        background: "#f3f7fb",
        card: "#ffffff",
        text: "#0f1726",
        muted: "#5f6b7a",
        border: "rgba(15,23,42,0.08)",
        accent: "#0f766e",
        accentSoft: "rgba(15,118,110,0.12)",
        input: "#f7fafc",
      };

  const { t, language } = useLocalization();
  const localization = useLocalization();
  console.log("Localization:", localization);

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    const trimmedPhone = phone.trim();

    if (!trimmedPhone) {
      setMessage(t("loginScreenPleaseEnterPhone"));
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${DEFAULT_API_BASE}/LoginCheck`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: trimmedPhone, language: language }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data?.message ?? t("loginScreenUnableLogin"));
        return;
      }

      if (data?.allowLogin) {
        setMessage(t("loginScreenSuccessful"));
        router.replace("/explore");
        return;
      }

      const nextMessage = data?.message ?? t("loginScreenNotAllowed");
      setMessage(nextMessage);
      if (nextMessage) {
        Alert.alert(t("loginScreenAlertTitle"), nextMessage);
      }
    } catch (error) {
      console.error("Login check failed:", error);
      setMessage(t("loginScreenError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: palette.background }]}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <View
            style={[
              styles.card,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            <View
              style={[
                styles.logoShell,
                { borderColor: palette.border, backgroundColor: palette.input },
              ]}
            >
              <Image
                source={require("@/Images/h4u_logo.jpg")}
                style={styles.logo}
                contentFit="contain"
                transition={180}
              />
            </View>

            {/* <Text style={[styles.title, { color: palette.text }]}>Helper4U</Text> */}
            <Text style={[styles.subtitle, { color: palette.muted }]}>
              {t("loginScreenSubtitle")}
            </Text>
            <View style={styles.form}>
              <Text style={[styles.label, { color: palette.text }]}>
                {t("loginScreenMobileLabel")}
              </Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder={t("loginScreenPhonePlaceholder")}
                placeholderTextColor={palette.muted}
                keyboardType="phone-pad"
                autoComplete="tel"
                textContentType="telephoneNumber"
                style={[
                  styles.input,
                  {
                    color: palette.text,
                    backgroundColor: palette.input,
                    borderColor: palette.border,
                  },
                ]}
              />

              <Pressable
                onPress={handleLogin}
                disabled={loading}
                style={({ pressed }) => [
                  styles.button,
                  {
                    backgroundColor: palette.accent,
                    opacity: pressed || loading ? 0.88 : 1,
                  },
                ]}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.buttonText}>
                    {t("loginScreenButton")}
                  </Text>
                )}
              </Pressable>

              {!!message && (
                <Text style={[styles.message, { color: palette.muted }]}>
                  {message}
                </Text>
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    paddingHorizontal: 22,
    paddingVertical: 26,
    borderRadius: 28,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
    alignItems: "center",
  },
  logoShell: {
    width: 208,
    height: 128,
    borderRadius: 36,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  logo: {
    width: 208,
    height: 128,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  form: {
    width: "100%",
    marginTop: 22,
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
  },
  input: {
    minHeight: 54,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  button: {
    minHeight: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  message: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 4,
  },
});
