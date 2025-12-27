import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

type SearchResponse = {
  meals:
    | {
        idMeal: string;
        strMeal: string;
        strMealThumb: string;
      }[]
    | null;
};

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const q = (params.get("q") ?? "").trim();

  const url = q
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
        q
      )}`
    : "";

  const { data, loading, error } = useFetch<SearchResponse>(
    url || "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );

  return (
    <div>
      <h1>Search</h1>

      {!q ? (
        <p>Type something in the search box in the URL like: /search?q=chicken</p>
      ) : null}

      {loading ? <p>Loading...</p> : null}
      {error ? <p>Error: {error}</p> : null}

      {!loading && !error && q && (!data?.meals || data.meals.length === 0) ? (
        <p>No results for: {q}</p>
      ) : null}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {data?.meals?.map((meal) => (
          <li key={meal.idMeal} style={{ marginBottom: 14 }}>
            <Link
              to={`/recipe/${meal.idMeal}`}
              style={{ display: "flex", gap: 12, alignItems: "center" }}
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width={80}
                height={80}
                style={{ borderRadius: 8, objectFit: "cover" }}
              />
              <span>{meal.strMeal}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


