import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import colors from "../../theme/colors"; // ✅ centralized color palette

const antiInflammatorySuperfoods = [
  "turmeric",
  "ginger",
  "salmon",
  "spinach",
  "avocado",
  "blueberries",
  "broccoli",
  "chia seeds",
  "olive oil",
  "almonds",
  "walnuts",
  "sweet potatoes"
];

export interface Recipe {
  id: number;
  title: string;
  image: string;
  glutenFree?: boolean;
  dairyFree?: boolean;
  vegan?: boolean;
  veryHealthy?: boolean;
}

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
}

export default function RecipeCard({ recipe, onPress }: RecipeCardProps) {
  const isAntiInflammatory = antiInflammatorySuperfoods.some(food =>
    recipe.title.toLowerCase().includes(food)
  );

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>

        <View style={styles.badgesContainer}>
          {recipe.glutenFree && (
            <Text style={[styles.badge, { backgroundColor: colors.badge1 }]}>
              Gluten-Free
            </Text>
          )}
          {recipe.dairyFree && (
            <Text style={[styles.badge, { backgroundColor: colors.badge2 }]}>
              Dairy-Free
            </Text>
          )}
          {recipe.vegan && (
            <Text style={[styles.badge, { backgroundColor: colors.badge3 }]}>
              Vegan
            </Text>
          )}
          {recipe.veryHealthy && (
            <Text style={[styles.badge, { backgroundColor: colors.badge4 }]}>
              Very Healthy
            </Text>
          )}
          {isAntiInflammatory && (
            <Text style={[styles.badge, { backgroundColor: colors.badge5 }]}>
              Anti-Inflammatory
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: colors.card,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12
  },
  content: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: colors.text
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  badge: {
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 6,
    marginTop: 4,
    color: colors.text
  }
});
