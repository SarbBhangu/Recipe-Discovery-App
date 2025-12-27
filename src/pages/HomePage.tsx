import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

type CategoryResponse = {
  categories: { strCategory: string }[];
};

export default function HomePage() {
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
            <Link to={`/category/${encodeURIComponent(cat.strCategory)}`}>
              {cat.strCategory}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


