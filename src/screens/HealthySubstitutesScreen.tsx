import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { customSubstitutions } from "../constants/customSubstitutions";

const SPOONACULAR_API_KEY = "98affbdf667c43edad241add2a4be640"; // ✅ Your real API key

export default function HealthySubstitutesScreen({ route }: any) {
  const { ingredientName } = route.params;
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [substitutes, setSubstitutes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const backgroundColor = "#2E3A24";
  const cardBackground = "#4A5E3D";
  const textColor = "#F0F3F4";
  const accentColor = "#6B8E23";

  useEffect(() => {
    checkCustomSubstitutes();
  }, []);

  const checkCustomSubstitutes = async () => {
  const lowerIngredient = ingredientName.toLowerCase().trim();

  let found = false;
  for (const categoryKey in customSubstitutions) {
    const category = customSubstitutions[categoryKey as keyof typeof customSubstitutions];
    for (const ing in category.ingredients) {
      const lowerIng = ing.toLowerCase().trim();
      if (
        lowerIngredient.includes(lowerIng) ||
        lowerIng.includes(lowerIngredient)
      ) {
        setCategoryName(category.name);
        setSubstitutes(category.ingredients[ing]);
        found = true;
        break;
      }
    }
    if (found) break;
  }

  if (!found) {
    fetchSpoonacularSubstitutes();
  } else {
    setLoading(false);
  }
};

  const fetchSpoonacularSubstitutes = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=${ingredientName}&apiKey=${SPOONACULAR_API_KEY}`
      );
      const data = await response.json();
      if (data.status === "success" && data.substitutes) {
        setSubstitutes(data.substitutes);
      } else {
        setMessage(data.message || "No healthy substitutes found.");
      }
    } catch (error) {
      console.error("Error fetching Spoonacular substitutes:", error);
      setMessage("Failed to fetch substitutes.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.loaderContainer, { backgroundColor: backgroundColor }]}>
        <ActivityIndicator size="large" color={accentColor} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Healthy Substitutes for:</Text>
      <Text style={[styles.ingredientName, { color: accentColor }]}>{ingredientName}</Text>

      {substitutes.length > 0 ? (
        <>
          {categoryName && (
            <Text style={[styles.categoryName, { color: "#A9DFBF" }]}>
              Category: {categoryName}
            </Text>
          )}
          <FlatList
            data={substitutes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={[styles.substituteCard, { backgroundColor: cardBackground }]}>
                <Text style={[styles.substituteText, { color: textColor }]}>{item}</Text>
              </View>
            )}
          />
        </>
      ) : (
        <Text style={[styles.message, { color: textColor }]}>{message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  ingredientName: { fontSize: 20, textAlign: "center", marginBottom: 10 },
  categoryName: { fontSize: 18, textAlign: "center", marginBottom: 10 },
  substituteCard: { padding: 15, marginVertical: 8, borderRadius: 10 },
  substituteText: { fontSize: 18, textAlign: "center" },
  message: { fontSize: 16, textAlign: "center", marginTop: 20 }
});

