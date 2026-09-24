import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, fonts } from "../theme";

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function CategoryChip({ label, selected, onPress }: Props) {
  const pretty = label.charAt(0).toUpperCase() + label.slice(1);

  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, selected && styles.selected]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>{pretty}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center"
  },
  selected: { backgroundColor: colors.yellow },
  text: { fontFamily: fonts.extraBold, color: colors.green, fontSize: 15 },
  selectedText: { color: colors.charcoal }
});
