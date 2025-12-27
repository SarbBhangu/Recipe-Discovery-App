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

      <ul className="card-list">
        {favorites.map((meal) => (
          <li key={meal.idMeal} className="card">
            <img src={meal.strMealThumb} alt={meal.strMeal} width={64} height={64} />

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


