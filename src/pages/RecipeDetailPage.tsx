import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useFavorites } from "../context/FavoritesContext";

type MealDetail = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string | null;
  strYoutube: string | null;
  [key: string]: unknown;
};

type MealDetailResponse = {
  meals: MealDetail[] | null;
};

function getIngredients(meal: MealDetail) {
  const items: { ingredient: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    const ing = String(meal[`strIngredient${i}`] ?? "").trim();
    const meas = String(meal[`strMeasure${i}`] ?? "").trim();

    if (ing) {
      items.push({ ingredient: ing, measure: meas });
    }
  }

  return items;
}

export default function RecipeDetailPage() {
  const { id } = useParams();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (!id) return <p>Missing recipe id.</p>;

  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(
    id
  )}`;

  const { data, loading, error } = useFetch<MealDetailResponse>(url);

  if (loading) return <p>Loading recipe...</p>;
  if (error) return <p>Error: {error}</p>;

  const meal = data?.meals?.[0];
  if (!meal) return <p>Recipe not found.</p>;

  const fav = isFavorite(meal.idMeal);
  const ingredients = getIngredients(meal);

  return (
    <div>
      <h1>{meal.strMeal}</h1>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        width={320}
        style={{ borderRadius: 12, objectFit: "cover" }}
      />

      <p style={{ marginTop: 8 }}>
        <strong>Category:</strong> {meal.strCategory ?? "N/A"}{" "}
        <strong style={{ marginLeft: 12 }}>Area:</strong> {meal.strArea ?? "N/A"}
      </p>

      <button
        onClick={() => {
          if (fav) {
            removeFavorite(meal.idMeal);
          } else {
            addFavorite({
              idMeal: meal.idMeal,
              strMeal: meal.strMeal,
              strMealThumb: meal.strMealThumb,
            });
          }
        }}
        style={{ marginTop: 8 }}
      >
        {fav ? "Remove from Favorites" : "Add to Favorites"}
      </button>

      <h2 style={{ marginTop: 18 }}>Ingredients</h2>
      <ul>
        {ingredients.map((item, idx) => (
          <li key={idx}>
            {item.measure ? `${item.measure} ` : ""}
            {item.ingredient}
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: 18 }}>Instructions</h2>
      <p style={{ whiteSpace: "pre-wrap" }}>{meal.strInstructions ?? ""}</p>

      {meal.strYoutube ? (
        <p style={{ marginTop: 12 }}>
          <a href={meal.strYoutube} target="_blank" rel="noreferrer">
            Watch on YouTube
          </a>
        </p>
      ) : null}
    </div>
  );
}

