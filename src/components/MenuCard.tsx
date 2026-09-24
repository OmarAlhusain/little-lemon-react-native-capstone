import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import type { MenuItem } from "../database";
import { colors, fonts } from "../theme";

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <View style={styles.card}>
      <View style={styles.copy}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 126,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray
  },
  copy: { flex: 1, paddingRight: 14 },
  name: {
    color: colors.charcoal,
    fontFamily: fonts.bold,
    fontSize: 19,
    marginBottom: 8
  },
  description: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 21
  },
  price: {
    color: colors.green,
    fontFamily: fonts.bold,
    fontSize: 16,
    marginTop: 9
  },
  image: { width: 92, height: 92, borderRadius: 6 }
});
