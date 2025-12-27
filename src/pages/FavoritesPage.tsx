import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div>
        <h1>Favorites</h1>
        <p>You have no favorites yet. Go to the home page and add some.</p>
        <Link to="/">Go to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Favorites</h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {favorites.map((meal) => (
          <li
            key={meal.idMeal}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width={64}
              height={64}
              style={{ borderRadius: 8, objectFit: "cover" }}
            />

            <div style={{ flex: 1 }}>
              <Link to={`/recipe/${meal.idMeal}`}>{meal.strMeal}</Link>
            </div>

            <button onClick={() => removeFavorite(meal.idMeal)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


