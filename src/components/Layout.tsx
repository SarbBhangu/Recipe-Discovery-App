import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Layout() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
  }

  return (
    <div style={{ padding: 16 }}>
      <nav
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>

        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </nav>

      <Outlet />
    </div>
  );
}

