import * as SQLite from "expo-sqlite";

// Open or create the database
const db = SQLite.openDatabase("delish.db");

// Initialize tables
export const initDatabase = () => {
  return new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
      // Create SavedRecipes table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS SavedRecipes (
          id INTEGER PRIMARY KEY, -- Spoonacular recipe ID
          title TEXT,
          image TEXT
        );`,
        [],
        () => console.log("✅ SavedRecipes table ready."),
        (_, error) => {
          console.error("❌ Error creating SavedRecipes table:", error);
          reject(error);
          return false;
        }
      );

      // Create ShoppingList table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ShoppingList (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          ingredient TEXT NOT NULL,
          isChecked INTEGER DEFAULT 0
        );`,
        [],
        () => console.log("✅ ShoppingList table ready."),
        (_, error) => {
          console.error("❌ Error creating ShoppingList table:", error);
          reject(error);
          return false;
        }
      );

      // Create Preferences table (optional)
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Preferences (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          glutenFree INTEGER DEFAULT 0,
          dairyFree INTEGER DEFAULT 0,
          sugarFree INTEGER DEFAULT 0
        );`,
        [],
        () => console.log("✅ Preferences table ready."),
        (_, error) => {
          console.error("❌ Error creating Preferences table:", error);
          reject(error);
          return false;
        }
      );

      resolve();
    });
  });
};

// Export the db object for queries
export default db;