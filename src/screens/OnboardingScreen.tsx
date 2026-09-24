import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { completeOnboarding, emptyProfile } from "../storage";
import { colors, fonts } from "../theme";

type Props = { onComplete: () => void };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function OnboardingScreen({ onComplete }: Props) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const valid = firstName.trim().length > 0 && emailPattern.test(email.trim());

  async function next() {
    if (!valid) return;
    await completeOnboarding({
      ...emptyProfile,
      firstName: firstName.trim(),
      email: email.trim()
    });
    onComplete();
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <Header />
          <Hero />

          <View style={styles.form}>
            <Text style={styles.heading}>Welcome to Little Lemon</Text>
            <Text style={styles.help}>
              Enter your details to continue to the restaurant menu.
            </Text>

            <Text style={styles.label}>First name *</Text>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Your first name"
              style={styles.input}
              autoCapitalize="words"
            />

            <Text style={styles.label}>Email *</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="name@example.com"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text
              accessibilityRole="button"
              onPress={valid ? next : undefined}
              style={[styles.next, !valid && styles.disabled]}
            >
              Next
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  flex: { flex: 1 },
  form: { padding: 20 },
  heading: {
    fontFamily: fonts.bold,
    fontSize: 23,
    color: colors.charcoal,
    marginBottom: 6
  },
  help: {
    fontFamily: fonts.body,
    color: colors.muted,
    fontSize: 15,
    marginBottom: 20
  },
  label: {
    fontFamily: fonts.bold,
    color: colors.charcoal,
    marginTop: 12,
    marginBottom: 7
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    minHeight: 50,
    paddingHorizontal: 14,
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.charcoal
  },
  next: {
    marginTop: 26,
    backgroundColor: colors.yellow,
    borderRadius: 10,
    paddingVertical: 14,
    textAlign: "center",
    fontFamily: fonts.bold,
    color: colors.charcoal,
    fontSize: 17,
    overflow: "hidden"
  },
  disabled: { opacity: 0.4 }
});
