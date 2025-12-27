import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export type FavoriteMeal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type FavoritesContextValue = {
  favorites: FavoriteMeal[];
  addFavorite: (meal: FavoriteMeal) => void;
  removeFavorite: (idMeal: string) => void;
  isFavorite: (idMeal: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<FavoriteMeal[]>(
    "favorites",
    []
  );

  function addFavorite(meal: FavoriteMeal) {
    setFavorites((prev) => {
      const already = prev.some((m) => m.idMeal === meal.idMeal);
      if (already) return prev;
      return [...prev, meal];
    });
  }

  function removeFavorite(idMeal: string) {
    setFavorites((prev) => prev.filter((m) => m.idMeal !== idMeal));
  }

  function isFavorite(idMeal: string) {
    return favorites.some((m) => m.idMeal === idMeal);
  }

  const value: FavoritesContextValue = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }
  return ctx;
}
