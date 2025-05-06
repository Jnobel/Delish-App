import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ScrollView
} from "react-native";
import colors from "../../theme/colors"; // ✅ use centralized palette

const "OBTAIN_API_KEY_FROM https://spoonacular.com/food-api";;

export default function SearchScreen({ navigation }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);

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
    <TouchableOpacity
      style={[styles.recipeCard, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate("RecipeDetail", { recipeId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <Text style={[styles.recipeTitle, { color: colors.text }]}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Search Recipes</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: colors.searchBar, color: colors.text }]}
          placeholder="Enter ingredient or recipe..."
          placeholderTextColor="#888"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity
          style={[styles.searchButton, { backgroundColor: colors.accent }]}
          onPress={handleSearch}
        >
          <Text style={{ color: "#fff" }}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={recipes}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={renderRecipe}
        style={{ marginTop: 10 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginBottom: 10
  },
  searchInput: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10
  },
  searchButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  recipeCard: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "500",
    flexShrink: 1
  }
});
