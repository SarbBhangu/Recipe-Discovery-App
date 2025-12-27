import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

type MealsByCategoryResponse = {
  meals: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  }[] | null;
};

export default function CategoryPage() {
  const { name } = useParams();

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
    name ?? ""
  )}`;

  const { data, loading, error } = useFetch<MealsByCategoryResponse>(url);

  if (!name) return <p>Missing category name.</p>;
  if (loading) return <p>Loading meals...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data?.meals) return <p>No meals found for this category.</p>;

  return (
    <div>
      <h1>Category: {name}</h1>

      <ul className="card-list">
        {data.meals.map((meal) => (
          <li key={meal.idMeal} className="card">
            <Link
              to={`/recipe/${meal.idMeal}`}
              style={{ display: "flex", gap: 12, alignItems: "center" }}
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} width={80} height={80} />
              <span>{meal.strMeal}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

