import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

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

        {/* Badges */}
        <View style={styles.badgesContainer}>
          {recipe.glutenFree && <Text style={[styles.badge, { backgroundColor: "#81ecec" }]}>Gluten-Free</Text>}
          {recipe.dairyFree && <Text style={[styles.badge, { backgroundColor: "#fab1a0" }]}>Dairy-Free</Text>}
          {recipe.vegan && <Text style={[styles.badge, { backgroundColor: "#55efc4" }]}>Vegan</Text>}
          {recipe.veryHealthy && <Text style={[styles.badge, { backgroundColor: "#74b9ff" }]}>Very Healthy</Text>}
          {isAntiInflammatory && <Text style={[styles.badge, { backgroundColor: "#ffeaa7" }]}>Anti-Inflammatory</Text>} {/* ✅ New Badge */}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10
  },
  content: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  badge: {
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 5,
    marginTop: 5,
    color: "#2d3436"
  }
});

