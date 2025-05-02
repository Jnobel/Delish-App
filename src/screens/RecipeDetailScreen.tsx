import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { customSubstitutions } from "../constants/customSubstitutions";
import colors from "../../theme/colors"; // ✅ import centralized theme

const SPOONACULAR_API_KEY = "98affbdf667c43edad241add2a4be640";

export default function RecipeDetailScreen({ route, navigation }: any) {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    const lowerIngredient = ingredient.toLowerCase().trim();
  
    for (const categoryKey in customSubstitutions) {
      const category = customSubstitutions[categoryKey as keyof typeof customSubstitutions];
  
      for (const key in category.ingredients) {
        const lowerKey = key.toLowerCase().trim();
  
        if (
          lowerIngredient.includes(lowerKey) || // ✅ match inside ingredient line
          lowerKey.includes(lowerIngredient)    // ✅ inverse match for short entries like "dye"
        ) {
          return key;
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
      <View style={[styles.loaderContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Recipe not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {recipe.image && <Image source={{ uri: recipe.image }} style={styles.image} />}

      <Text style={[styles.title, { color: colors.text }]}>{recipe.title}</Text>

      <Text style={[styles.sectionHeader, { color: colors.accent }]}>Ingredients</Text>
      {recipe.extendedIngredients &&
        recipe.extendedIngredients.map((ingredient: any, index: number) => {
          const matched = findUnhealthyIngredient(ingredient.original);
          const isUnhealthy = matched !== null;

          return (
            <TouchableOpacity key={index} onPress={() => handleIngredientPress(ingredient.original)}>
              <Text
                style={[
                  styles.ingredient,
                  isUnhealthy ? { color: colors.error } : { color: colors.text }
                ]}
              >
                {ingredient.original}
              </Text>
            </TouchableOpacity>
          );
        })}

      <Text style={[styles.sectionHeader, { color: colors.accent }]}>Instructions</Text>
      {recipe.instructions ? (
        <Text style={[styles.instructions, { color: colors.text }]}>
          {recipe.instructions.replace(/<[^>]+>/g, '')}
        </Text>
      ) : (
        <Text style={[styles.instructions, { color: colors.text }]}>
          No instructions available.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginVertical: 10
  },
  ingredient: {
    fontSize: 16,
    marginLeft: 15,
    marginBottom: 8
  },
  unhealthyIngredient: {
    fontWeight: "bold"
  },
  instructions: {
    fontSize: 16,
    paddingHorizontal: 15,
    marginBottom: 20
  }
});
