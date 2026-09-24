import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { colors, fonts } from "../theme";

type Props = {
  search?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
};

export default function Hero({
  search = "",
  onSearchChange,
  showSearch = false
}: Props) {
  return (
    <View style={styles.hero}>
      <Text style={styles.title}>Little Lemon</Text>
      <Text style={styles.city}>Chicago</Text>

      <View style={styles.row}>
        <Text style={styles.description}>
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </Text>
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/images/bruschetta.jpg"
          }}
          style={styles.image}
        />
      </View>

      {showSearch ? (
        <View style={styles.search}>
          <MaterialIcons name="search" size={24} color={colors.charcoal} />
          <TextInput
            value={search}
            onChangeText={onSearchChange}
            placeholder="Search dishes"
            placeholderTextColor={colors.muted}
            style={styles.input}
            autoCorrect={false}
            returnKeyType="search"
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.green,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 20
  },
  title: {
    color: colors.yellow,
    fontFamily: fonts.display,
    fontSize: 58,
    lineHeight: 58
  },
  city: {
    color: colors.white,
    fontFamily: fonts.display,
    fontSize: 38,
    lineHeight: 40,
    marginTop: -6
  },
  row: { flexDirection: "row", alignItems: "center", marginTop: 10, gap: 14 },
  description: {
    flex: 1,
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 17,
    lineHeight: 22
  },
  image: { width: 128, height: 128, borderRadius: 14 },
  search: {
    marginTop: 18,
    backgroundColor: colors.lightGray,
    height: 46,
    borderRadius: 23,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.charcoal
  }
});
