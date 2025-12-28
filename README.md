# Recipe Discovery App

## Overview
The Recipe Discovery App is a client-side React application that allows users to browse recipes by category, search for recipes by name, view detailed recipe information, and save favorite recipes for later.

---

## Skills Demonstrated
This project demonstrates the following skills:

- React functional components
- React Router (dynamic and static routing)
- State management with `useState` and `useEffect`
- Creating and using custom hooks
- Global state management using the Context API
- Persisting data with `localStorage`
- Fetching and displaying data from a public API
- Handling loading and error states
- Basic responsive UI styling

---

## Technologies Used
- React
- TypeScript
- React Router DOM
- TheMealDB Public API
- Vite
- CSS

---

## Project Structure
```text
src/
├── components/
│   └── Layout.tsx
├── context/
│   └── FavoritesContext.tsx
├── hooks/
│   ├── useFetch.ts
│   └── useLocalStorage.ts
├── pages/
│   ├── HomePage.tsx
│   ├── CategoryPage.tsx
│   ├── RecipeDetailPage.tsx
│   ├── FavoritesPage.tsx
│   └── SearchResultsPage.tsx
├── App.tsx
├── main.tsx
└── index.css

