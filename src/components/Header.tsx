import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../theme";

type Props = {
  onProfilePress?: () => void;
  onBackPress?: () => void;
  showBack?: boolean;
  initials?: string;
};

export default function Header({
  onProfilePress,
  onBackPress,
  showBack = false,
  initials = "LL"
}: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.side}>
        {showBack ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            onPress={onBackPress}
            style={styles.back}
          >
            <MaterialIcons name="arrow-back" size={22} color={colors.white} />
          </Pressable>
        ) : null}
      </View>

      <View style={styles.logoWrap}>
        <View style={styles.lemon}>
          <Text style={styles.lemonText}>L</Text>
        </View>
        <Text style={styles.logo}>LITTLE LEMON</Text>
      </View>

      <View style={[styles.side, styles.right]}>
        {onProfilePress ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open profile"
            onPress={onProfilePress}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>{initials || "LL"}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 72,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  side: { width: 52 },
  right: { alignItems: "flex-end" },
  logoWrap: { flexDirection: "row", alignItems: "center", gap: 8 },
  lemon: {
    width: 28,
    height: 38,
    borderTopLeftRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "-10deg" }]
  },
  lemonText: { color: colors.green, fontFamily: fonts.extraBold, fontSize: 13 },
  logo: {
    color: colors.green,
    fontFamily: fonts.extraBold,
    fontSize: 16,
    letterSpacing: 2
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.lightPeach,
    borderWidth: 2,
    borderColor: colors.green,
    alignItems: "center",
    justifyContent: "center"
  },
  avatarText: { color: colors.green, fontFamily: fonts.bold, fontSize: 14 },
  back: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center"
  }
});
