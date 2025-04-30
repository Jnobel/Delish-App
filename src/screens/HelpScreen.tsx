import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";

const SPOONACULAR_API_KEY = "YOUR_API_KEY"; // Replace with your real API Key

export default function HomeScreen({ navigation }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [inspirationRecipes, setInspirationRecipes] = useState([]);

  const ingredientQuickSearch = ["Mint", "Butter", "Corn", "Coconut", "Lemon", "Acai", "Apple", "Chicken"];

  useEffect(() => {
    fetchDailyInspiration();
  }, []);

  const fetchDailyInspiration = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=anti-inflammatory&number=10&apiKey=${SPOONACULAR_API_KEY}`
      );
      const data = await response.json();
      setInspirationRecipes(data.results);
    } catch (error) {
      console.error("Error fetching daily inspiration:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=10&apiKey=${SPOONACULAR_API_KEY}`
      );
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error("Error searching recipes:", error);
    }
  };

  const handleQuickSearch = async (ingredient: string) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${ingredient}&number=10&apiKey=${SPOONACULAR_API_KEY}`
      );
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error("Error quick searching:", error);
    }
  };

  const renderRecipe = ({ item }: any) => (
    <TouchableOpacity style={styles.recipeCard} onPress={() => navigation.navigate("RecipeDetail", { recipeId: item.id })}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Delish - Anti-Inflammatory Meals</Text>

      {/* Search Section */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      {/* Daily Inspiration */}
      <Text style={styles.subHeader}>Daily Inspiration</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {inspirationRecipes.map((recipe: any) => (
          <TouchableOpacity
            key={recipe.id}
            style={styles.inspirationCard}
            onPress={() => navigation.navigate("RecipeDetail", { recipeId: recipe.id })}
          >
            <Image source={{ uri: recipe.image }} style={styles.inspirationImage} />
            <Text style={styles.inspirationTitle}>{recipe.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Quick Ingredient Search */}
      <Text style={styles.subHeader}>Quick Search by Ingredients</Text>
      <View style={styles.quickSearchContainer}>
        {ingredientQuickSearch.map((ingredient, index) => (
          <TouchableOpacity
            key={index}
            style={styles.ingredientButton}
            onPress={() => handleQuickSearch(ingredient)}
          >
            <Text style={styles.ingredientText}>{ingredient}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Results */}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRecipe}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginVertical: 10 },
  searchContainer: { flexDirection: "row", paddingHorizontal: 10, marginBottom: 10 },
  searchInput: { flex: 1, borderColor: "#ccc", borderWidth: 1, marginRight: 10, paddingHorizontal: 10, borderRadius: 8 },
  subHeader: { fontSize: 20, fontWeight: "bold", marginLeft: 10, marginVertical: 10 },
  inspirationCard: { marginHorizontal: 10, alignItems: "center" },
  inspirationImage: { width: 120, height: 120, borderRadius: 8 },
  inspirationTitle: { width: 120, textAlign: "center", fontSize: 12, marginTop: 5 },
  quickSearchContainer: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 10, justifyContent: "center" },
  ingredientButton: { backgroundColor: "#eee", padding: 10, margin: 5, borderRadius: 20 },
  ingredientText: { fontSize: 14 },
  recipeCard: { flexDirection: "row", padding: 10, alignItems: "center" },
  recipeImage: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  recipeTitle: { fontSize: 16, flexShrink: 1 },
});
