import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryChip from "../components/CategoryChip";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MenuCard from "../components/MenuCard";
import { getCategories, initMenu, MenuItem, queryMenu } from "../database";
import { loadProfile } from "../storage";
import { colors, fonts } from "../theme";
import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [initials, setInitials] = useState("LL");
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      loadProfile().then((p) => {
        const value = `${p.firstName?.[0] ?? ""}${p.lastName?.[0] ?? ""}`.trim();
        setInitials(value || "LL");
      });
    }, [])
  );

  useEffect(() => {
    (async () => {
      try {
        await initMenu();
        setCategories(await getCategories());
      } catch {
        setError("The menu could not be loaded. Check your internet connection.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (loading || error) return;
    queryMenu(search, selected).then(setItems);
  }, [search, selected, loading, error]);

  const emptyMessage = useMemo(() => {
    if (loading) return "";
    if (error) return error;
    return "No dishes match your current filters.";
  }, [loading, error]);

  function toggle(category: string) {
    setSelected((current) =>
      current.includes(category)
        ? current.filter((x) => x !== category)
        : [...current, category]
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <Header
        initials={initials}
        onProfilePress={() => navigation.navigate("Profile")}
      />

      <FlatList
        data={items}
        keyExtractor={(item) => item.name}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <Hero
              showSearch
              search={search}
              onSearchChange={setSearch}
            />
            <View style={styles.breakdown}>
              <Text style={styles.breakdownTitle}>ORDER FOR DELIVERY!</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chips}
              >
                {categories.map((category) => (
                  <CategoryChip
                    key={category}
                    label={category}
                    selected={selected.includes(category)}
                    onPress={() => toggle(category)}
                  />
                ))}
              </ScrollView>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.itemWrap}>
            <MenuCard item={item} />
          </View>
        )}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              style={styles.empty}
              size="large"
              color={colors.green}
            />
          ) : (
            <Text style={styles.emptyText}>{emptyMessage}</Text>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  list: { paddingBottom: 24 },
  breakdown: { paddingHorizontal: 20, paddingVertical: 20 },
  breakdownTitle: {
    color: colors.charcoal,
    fontFamily: fonts.extraBold,
    fontSize: 20,
    marginBottom: 14
  },
  chips: { gap: 10, paddingRight: 20 },
  itemWrap: { paddingHorizontal: 20 },
  empty: { marginTop: 38 },
  emptyText: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    textAlign: "center",
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 16
  }
});
