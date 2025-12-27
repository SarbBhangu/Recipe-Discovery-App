import useLocalStorage from "../hooks/useLocalStorage";

export default function FavoritesPage() {
  const [count, setCount] = useLocalStorage<number>("demo_count", 0);

  return (
    <div>
      <h1>Favorites Page</h1>
      <p>Demo count (saved in localStorage): {count}</p>

      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(0)} style={{ marginLeft: 8 }}>
        Reset
      </button>

      <p style={{ marginTop: 12 }}>
        Refresh the page — the number should stay the same.
      </p>
    </div>
  );
}

