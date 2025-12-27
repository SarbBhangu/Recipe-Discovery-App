import useFetch from "../hooks/useFetch";
import { useFavorites } from "../context/FavoritesContext";

type CategoryResponse = {
  categories: { strCategory: string }[];
};

export default function HomePage() {
  const { addFavorite } = useFavorites();

  const { data, loading, error } = useFetch<CategoryResponse>(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Categories</h1>

      <ul>
        {data?.categories.map((cat) => (
          <li key={cat.strCategory} style={{ marginBottom: 8 }}>
            {cat.strCategory}{" "}
            <button
              onClick={() =>
                addFavorite({
                  idMeal: cat.strCategory, // temporary id
                  strMeal: `Demo: ${cat.strCategory}`,
                  strMealThumb:
                    "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
                })
              }
            >
              Add to Favorites (demo)
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

