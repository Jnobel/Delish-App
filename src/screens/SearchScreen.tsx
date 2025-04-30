import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, ScrollView } from "react-native";

const SPOONACULAR_API_KEY = "98affbdf667c43edad241add2a4be640"; // ✅ Your real API key

export default function SearchScreen({ navigation }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);

  const backgroundColor = "#2E3A24";
  const cardBackground = "#4A5E3D";
  const accentColor = "#6B8E23";
  const textColor = "#F0F3F4";

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=10&addRecipeInformation=true&apiKey=${SPOONACULAR_API_KEY}`
      );
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error("Error searching recipes:", error);
    }
  };

  const renderRecipe = ({ item }: any) => (
    <TouchableOpacity style={[styles.recipeCard, { backgroundColor: cardBackground }]} onPress={() => navigation.navigate("RecipeDetail", { recipeId: item.id })}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <Text style={[styles.recipeTitle, { color: textColor }]}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={[styles.header, { color: textColor }]}>Search Recipes</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: "#A9DFBF", color: "#2d3436" }]}
          placeholder="Enter ingredient or recipe..."
          placeholderTextColor="#888"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={[styles.searchButton, { backgroundColor: accentColor }]} onPress={handleSearch}>
          <Text style={{ color: "#fff" }}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRecipe}
        style={{ marginTop: 10 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginVertical: 10 },
  searchContainer: { flexDirection: "row", paddingHorizontal: 10, marginBottom: 10 },
  searchInput: { flex: 1, borderRadius: 8, paddingHorizontal: 10, marginRight: 10 },
  searchButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, justifyContent: "center", alignItems: "center" },
  recipeCard: { flexDirection: "row", padding: 10, alignItems: "center", marginBottom: 10, borderRadius: 10 },
  recipeImage: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  recipeTitle: { fontSize: 16, flexShrink: 1 }
});
