import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { customSubstitutions } from "../constants/customSubstitutions";

const SPOONACULAR_API_KEY = "98affbdf667c43edad241add2a4be640"; // ✅ Your real API key

export default function RecipeDetailScreen({ route, navigation }: any) {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const backgroundColor = "#2E3A24";
  const cardBackground = "#4A5E3D";
  const textColor = "#F0F3F4";
  const accentColor = "#6B8E23";
  const errorColor = "red";

  useEffect(() => {
    fetchRecipeDetails();
  }, []);

  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true&apiKey=${SPOONACULAR_API_KEY}`
      );
      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    } finally {
      setLoading(false);
    }
  };

  const findUnhealthyIngredient = (ingredient: string): string | null => {
    const lowerIngredient = ingredient.toLowerCase();
    const ingredientWords = lowerIngredient.split(/\s|,|-/);

    for (const categoryKey in customSubstitutions) {
      const category = customSubstitutions[categoryKey as keyof typeof customSubstitutions];
      for (const unhealthyIngredient in category.ingredients) {
        const lowerUnhealthy = unhealthyIngredient.toLowerCase();
        if (
          ingredientWords.includes(lowerUnhealthy) || 
          lowerUnhealthy.includes(lowerIngredient) // allow slight flexibility
        ) {
          return unhealthyIngredient;
        }
      }
    }
    return null;
  };

  const handleIngredientPress = (ingredient: string) => {
    const matched = findUnhealthyIngredient(ingredient);
    if (matched) {
      navigation.navigate("HealthySubstitutes", { ingredientName: matched });
    }
  };

  if (loading) {
    return (
      <View style={[styles.loaderContainer, { backgroundColor: backgroundColor }]}>
        <ActivityIndicator size="large" color={accentColor} />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <Text style={{ color: textColor }}>Recipe not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: backgroundColor }]}>
      {recipe.image && <Image source={{ uri: recipe.image }} style={styles.image} />}

      <Text style={[styles.title, { color: textColor }]}>{recipe.title}</Text>

      <Text style={[styles.sectionHeader, { color: accentColor }]}>Ingredients</Text>
      {recipe.extendedIngredients && recipe.extendedIngredients.map((ingredient: any, index: number) => {
        const matched = findUnhealthyIngredient(ingredient.original);
        const isUnhealthy = matched !== null;
        return (
          <TouchableOpacity key={index} onPress={() => handleIngredientPress(ingredient.original)}>
            <Text
              style={[
                styles.ingredient,
                isUnhealthy && styles.unhealthyIngredient
              ]}
            >
              {ingredient.original}
            </Text>
          </TouchableOpacity>
        );
      })}

      <Text style={[styles.sectionHeader, { color: accentColor }]}>Instructions</Text>
      {recipe.instructions ? (
        <Text style={[styles.instructions, { color: textColor }]}>
          {recipe.instructions.replace(/<[^>]+>/g, '')} {/* Clean any HTML tags */}
        </Text>
      ) : (
        <Text style={[styles.instructions, { color: textColor }]}>No instructions available.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 200 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginVertical: 10 },
  sectionHeader: { fontSize: 20, fontWeight: "bold", marginLeft: 10, marginVertical: 10 },
  ingredient: { fontSize: 16, marginLeft: 15, marginBottom: 8 },
  unhealthyIngredient: { color: "red", fontWeight: "bold" },
  instructions: { fontSize: 16, paddingHorizontal: 15, marginBottom: 20 },
});

