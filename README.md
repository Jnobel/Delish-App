# 🥦 Delish App - Anti-Inflammatory Meal Plan Recipe Manager

## 📱 Overview

**Delish** is a mobile application designed to help users discover, manage, and organize anti-inflammatory recipes with ease. Built using **React Native (Expo)**, Delish emphasizes clean eating by filtering out processed foods, artificial dyes, and ingredients that trigger inflammation.

The app allows users to:
- Search and browse healthy recipes
- Set and save dietary preferences
- View detailed nutritional info
- Create dynamic shopping lists
- Learn more about the anti-inflammatory lifestyle

Whether you're managing chronic inflammation, switching to a healthier diet, or just looking to cook clean meals, Delish is your all-in-one tool for smart meal planning.

---

## 🚧 Project Scope

The Delish app was developed as a semester-long team project with the following objectives:

### 🎯 Core Goals
- Promote an anti-inflammatory lifestyle through education and meal planning
- Build a fully functional cross-platform mobile app
- Store recipes, user preferences, and shopping lists locally
- Provide nutrition data from external sources (API integration)
- Follow best practices in UI/UX and code modularity

### ✅ Key Requirements
- Four distinct activities/screens:  
  `Main`, `Preferences`, `Recipe Details`, and `Help`
- Fragments and components for reusable UI
- Persistent data using SQLite and AsyncStorage
- Live search and real-time filtering
- Integration with a nutrition API (Spoonacular)
- Support for both Android and iOS

---

## ✨ Features

### 📋 Main Activity (Home Screen)
- Displays a list of saved recipes
- Search bar and filter toggle
- Buttons for adding new recipes, accessing preferences, and help

### ⚙️ Preferences Activity
- Users can:
  - Enable/disable ingredient exclusions (e.g., dairy, gluten)
  - Set default meal types (e.g., Breakfast, Dinner)
  - Save these settings across sessions
- Preferences impact search results and filters in the main screen

### 🍲 Secondary Activity (Recipe Detail View)
- Recipe name, image, ingredients, step-by-step instructions
- Nutritional data including calories, omega-3, antioxidants
- Button to “Add to Shopping List”

### 🛒 Shopping List (coming soon)
- Dynamic checklist of ingredients pulled from recipes
- Option to mark ingredients as acquired

### ❓ Help Activity
- Overview of how to use the app
- Description of anti-inflammatory principles
- Explanation of how preferences affect user experience

---

## 🧠 Architecture & Tech Stack

| Layer            | Technology                  |
|------------------|-----------------------------|
| **Frontend**     | React Native (Expo)         |
| **Navigation**   | React Navigation            |
| **State Storage**| React Hooks (`useState`, `useEffect`) |
| **Local DB**     | `expo-sqlite`               |
| **Preferences**  | `@react-native-async-storage/async-storage` |
| **API**          | Spoonacular (nutrition/recipes) |
| **Components**   | Custom: RecipeCard, RecipeDetailModal, ShoppingListView |

---

## 🛠 Installation & Setup

### 🔄 Prerequisites
- Node.js (v16 or later)
- Expo CLI (`npm install -g expo-cli`)
- Git
- Expo Go app (on mobile for testing)

### 🧰 Steps to Run the Project

1. **Clone the Repository**
bash
git clone https://github.com/Jnobel/Delish-App.git
cd Delish-App

2. Install Project Dependencies
npm install

3. Start the Development Server
npx expo start

4. Run the App

On your phone: Scan the QR code using Expo Go

On Android emulator:
npx expo run:android

On iOS simulator:
npx expo run:ios


API Integration
Spoonacular API

Used to fetch calorie count, macro breakdown, and ingredient substitutions

axios handles the HTTP requests

API key stored securely (e.g., .env)

Testing Strategy
✔ Manual Testing
Tested on physical Android and iOS devices using Expo Go

Cross-device compatibility for layout and functionality

✔ Scenarios Covered
Preference filters dynamically impact search results

SQLite stores and updates recipes without duplication

Shopping list updates reflect selections from recipe details

Edge case handling for empty inputs, long ingredient names, and missing data

Future Roadmap
🔐 Firebase integration for login/sync across devices

📅 Drag-and-drop meal planner

📊 Nutrition dashboard with trends

🌙 Dark mode toggle

🗣 Voice input for recipe addition

📷 Scan ingredients from photo (OCR)

Authors & Acknowledgements
Project Lead: Joshua Nobel
https://github.com/Jnobel/Delish-App
Thanks to the Mobile App Development course for the structure and support.




