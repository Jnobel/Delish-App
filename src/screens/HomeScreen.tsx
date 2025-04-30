import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image, StyleSheet } from "react-native";

const SPOONACULAR_API_KEY = "98affbdf667c43edad241add2a4be640"; // ✅ Your real API key

export default function HomeScreen({ navigation }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [topPicks, setTopPicks] = useState([]);

  const backgroundColor = "#2E3A24";
  const cardBackground = "#4A5E3D";
  const accentColor = "#6B8E23";
  const textColor = "#F0F3F4";

  const cuisines = [
    "Mexican", "American", "French", "Italian", "Indian",
    "Chinese", "Japanese", "Thai", "Spanish", "Greek",
    "Korean", "Vietnamese", "Caribbean", "Middle Eastern", "African",
    "Brazilian", "German", "Turkish", "Russian", "Mediterranean"
  ];

  const dietaryPreferences = [
    { label: "Gluten-Free", type: "diet", value: "gluten free" },
    { label: "Keto", type: "diet", value: "ketogenic" },
    { label: "Vegan", type: "diet", value: "vegan" },
    { label: "Vegetarian", type: "diet", value: "vegetarian" },
    { label: "Paleo", type: "diet", value: "paleo" },
    { label: "Low-Carb", type: "diet", value: "low carb" },
    { label: "Whole30", type: "diet", value: "whole30" },
    { label: "Dairy-Free", type: "intolerance", value: "dairy" },
    { label: "Anti-Inflammatory", type: "query", value: "anti-inflammatory" },
    { label: "Heart-Healthy", type: "query", value: "heart healthy" },
  ];

  useEffect(() => {
    fetchDailyInspiration();
    fetchTopPicks();
  }, []);

  const fetchDailyInspiration = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=healthy&number=10&addRecipeInformation=true&apiKey=${SPOONACULAR_API_KEY}`
      );
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error("Error fetching daily inspiration:", error);
    }
  };

  const fetchTopPicks = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?sort=popularity&number=10&addRecipeInformation=true&apiKey=${SPOONACULAR_API_KEY}`
      );
      const data = await response.json();
      setTopPicks(data.results);
    } catch (error) {
      console.error("Error fetching top picks:", error);
    }
  };

  const handleManualSearch = async () => {
    if (!searchTerm.trim()) return;
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=10&addRecipeInformation=true&apiKey=${SPOONACULAR_API_KEY}`
      );
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error("Error manual search:", error);
    }
  };

  const handleDietarySearch = async (diet: any) => {
    try {
      let url = `https://api.spoonacular.com/recipes/complexSearch?number=10&addRecipeInformation=true&apiKey=${SPOONACULAR_API_KEY}`;
      
      if (diet.type === "diet") {
        url += `&diet=${encodeURIComponent(diet.value)}`;
      } else if (diet.type === "intolerance") {
        url += `&intolerances=${encodeURIComponent(diet.value)}`;
      } else if (diet.type === "query") {
        url += `&query=${encodeURIComponent(diet.value)}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error("Error dietary search:", error);
    }
  };

  const handleCuisineSearch = async (cuisine: string) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&number=10&addRecipeInformation=true&apiKey=${SPOONACULAR_API_KEY}`
      );
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error("Error cuisine search:", error);
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
      {/* Header */}
      <Text style={[styles.header, { color: textColor }]}>Delish </Text>

      {/* Manual Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: "#A9DFBF", color: "#2d3436" }]}
          placeholder="Search any recipe..."
          placeholderTextColor="#888"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={[styles.searchButton, { backgroundColor: accentColor }]} onPress={handleManualSearch}>
          <Text style={{ color: "#fff" }}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Daily Inspiration */}
      <Text style={[styles.subHeader, { color: textColor }]}>Daily Inspiration</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRecipe}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 10 }}
      />

      {/* Top Picks */}
      <Text style={[styles.subHeader, { color: textColor }]}>Top Picks</Text>
      <FlatList
        data={topPicks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRecipe}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 10 }}
      />

      {/* Dietary Preferences */}
      <Text style={[styles.subHeader, { color: textColor }]}>Dietary Preferences</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickSearchContainer}>
        {dietaryPreferences.map((diet, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.quickButton, { backgroundColor: accentColor }]}
            onPress={() => handleDietarySearch(diet)}
          >
            <Text style={{ color: "#fff" }}>{diet.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Global Cuisines */}
      <Text style={[styles.subHeader, { color: textColor }]}>Global Cuisines</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickSearchContainer}>
        {cuisines.map((cuisine, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.quickButton, { backgroundColor: accentColor }]}
            onPress={() => handleCuisineSearch(cuisine)}
          >
            <Text style={{ color: "#fff" }}>{cuisine}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginVertical: 10 },
  searchContainer: { flexDirection: "row", paddingHorizontal: 10, marginBottom: 10 },
  searchInput: { flex: 1, borderRadius: 8, paddingHorizontal: 10, marginRight: 10 },
  searchButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, justifyContent: "center", alignItems: "center" },
  subHeader: { fontSize: 20, fontWeight: "bold", marginLeft: 10, marginVertical: 10 },
  recipeCard: { width: 150, marginHorizontal: 10, borderRadius: 8, overflow: "hidden" },
  recipeImage: { width: "100%", height: 100, borderRadius: 8 },
  recipeTitle: { width: 120, textAlign: "center", fontSize: 12, marginTop: 5 },
  quickSearchContainer: { flexDirection: "row", paddingHorizontal: 10, marginBottom: 10 },
  quickButton: { padding: 10, marginRight: 10, borderRadius: 20 },
});


