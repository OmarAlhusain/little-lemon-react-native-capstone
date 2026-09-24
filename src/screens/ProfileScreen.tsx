import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import {
  clearUserData,
  emptyProfile,
  loadProfile,
  saveProfile,
  type UserProfile
} from "../storage";
import { colors, fonts } from "../theme";
import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;
type NotificationKey = keyof UserProfile["notifications"];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ProfileScreen({ navigation, route }: Props) {
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);
  const [saved, setSaved] = useState<UserProfile>(emptyProfile);

  useEffect(() => {
    loadProfile().then((p) => {
      setProfile(p);
      setSaved(p);
    });
  }, []);

  const valid =
    profile.firstName.trim().length > 0 &&
    emailPattern.test(profile.email.trim());

  async function save() {
    if (!valid) return;
    const cleaned = {
      ...profile,
      firstName: profile.firstName.trim(),
      lastName: profile.lastName.trim(),
      email: profile.email.trim(),
      phone: profile.phone.trim()
    };
    await saveProfile(cleaned);
    setProfile(cleaned);
    setSaved(cleaned);
    Alert.alert("Saved", "Your profile changes have been saved.");
  }

  async function logout() {
    await clearUserData();
    route.params?.onLoggedOut?.();
  }

  function toggle(key: NotificationKey) {
    setProfile((current) => ({
      ...current,
      notifications: {
        ...current.notifications,
        [key]: !current.notifications[key]
      }
    }));
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <Header
        showBack
        onBackPress={() => navigation.goBack()}
        initials={`${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Personal information</Text>

        <View style={styles.avatarRow}>
          <View style={styles.largeAvatar}>
            <Text style={styles.largeAvatarText}>
              {`${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}` ||
                "LL"}
            </Text>
          </View>
          <View>
            <Text style={styles.avatarName}>
              {profile.firstName || "Little Lemon"} {profile.lastName}
            </Text>
            <Text style={styles.avatarHelp}>Profile avatar preview</Text>
          </View>
        </View>

        <Field
          label="First name"
          value={profile.firstName}
          onChangeText={(firstName) => setProfile({ ...profile, firstName })}
        />
        <Field
          label="Last name"
          value={profile.lastName}
          onChangeText={(lastName) => setProfile({ ...profile, lastName })}
        />
        <Field
          label="Email"
          value={profile.email}
          onChangeText={(email) => setProfile({ ...profile, email })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Field
          label="Phone number"
          value={profile.phone}
          onChangeText={(phone) => setProfile({ ...profile, phone })}
          keyboardType="phone-pad"
          placeholder="(217) 555-0113"
        />

        <Text style={styles.section}>Email notifications</Text>

        {(
          [
            ["orderStatuses", "Order statuses"],
            ["passwordChanges", "Password changes"],
            ["specialOffers", "Special offers"],
            ["newsletter", "Newsletter"]
          ] as [NotificationKey, string][]
        ).map(([key, label]) => (
          <View style={styles.switchRow} key={key}>
            <Text style={styles.switchLabel}>{label}</Text>
            <Switch
              value={profile.notifications[key]}
              onValueChange={() => toggle(key)}
              trackColor={{ false: colors.border, true: colors.green }}
            />
          </View>
        ))}

        <Pressable style={styles.logout} onPress={logout}>
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>

        <View style={styles.footer}>
          <Pressable
            style={styles.outlineButton}
            onPress={() => setProfile(saved)}
          >
            <Text style={styles.outlineButtonText}>Discard changes</Text>
          </Pressable>

          <Pressable
            disabled={!valid}
            style={[styles.saveButton, !valid && { opacity: 0.4 }]}
            onPress={save}
          >
            <Text style={styles.saveButtonText}>Save changes</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type FieldProps = React.ComponentProps<typeof TextInput> & {
  label: string;
};

function Field({ label, ...props }: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...props} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20, paddingBottom: 40 },
  title: {
    color: colors.charcoal,
    fontFamily: fonts.bold,
    fontSize: 24,
    marginBottom: 18
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 12
  },
  largeAvatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.lightPeach,
    borderWidth: 2,
    borderColor: colors.green,
    alignItems: "center",
    justifyContent: "center"
  },
  largeAvatarText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.green
  },
  avatarName: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.charcoal
  },
  avatarHelp: { fontFamily: fonts.body, color: colors.muted, marginTop: 4 },
  field: { marginTop: 15 },
  label: {
    fontFamily: fonts.bold,
    color: colors.charcoal,
    marginBottom: 7
  },
  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.charcoal
  },
  section: {
    fontFamily: fonts.bold,
    color: colors.charcoal,
    fontSize: 20,
    marginTop: 26,
    marginBottom: 8
  },
  switchRow: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  switchLabel: { fontFamily: fonts.body, fontSize: 16, color: colors.charcoal },
  logout: {
    marginTop: 24,
    borderRadius: 10,
    backgroundColor: colors.yellow,
    paddingVertical: 14
  },
  logoutText: {
    textAlign: "center",
    fontFamily: fonts.bold,
    fontSize: 17,
    color: colors.charcoal
  },
  footer: { flexDirection: "row", gap: 12, marginTop: 22 },
  outlineButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 10,
    paddingVertical: 13
  },
  outlineButtonText: {
    textAlign: "center",
    fontFamily: fonts.bold,
    color: colors.green
  },
  saveButton: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: colors.green,
    paddingVertical: 13
  },
  saveButtonText: {
    textAlign: "center",
    fontFamily: fonts.bold,
    color: colors.white
  }
});
