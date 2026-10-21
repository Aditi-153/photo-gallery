import { useReducer, useEffect, useState, useCallback, useMemo } from "react";

import useFetchPhotos from "./Hooks/useFetchPhotoes.js";
import { favoritesReducer } from "./Reducers/favorites.Reducer.js";

function Gallery() {
  const { photos, loading, error } = useFetchPhotos();

  const [favorites, dispatch] = useReducer(favoritesReducer, [], () => {
    try {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const [search, setSearch] = useState("");

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase()),
    );
  }, [photos, search]);

  const toggleFavorite = (photo) => {
    dispatch({
      type: "TOGGLE_FAVORITE",
      payload: photo,
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <div
          role="status"
          aria-label="Loading photos"
          className="h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-700"
        />
        <p className="text-lg font-semibold text-gray-700">Loading photos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 sm:p-8">
      <h1 className="mb-6 text-3xl font-bold text-purple-700">Photo Gallery</h1>

      <input
        type="text"
        placeholder="Search by author name..."
        value={search}
        onChange={handleSearch}
        className="mb-6 w-full rounded-lg border border-gray-300 bg-white p-3 sm:max-w-md"
      />

      <p className="mb-4 text-gray-600">
        Showing {filteredPhotos.length} photos · {favorites.length} favourites
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filteredPhotos.map((photo) => {
          const isFavorite = favorites.some(
            (favorite) => favorite.id === photo.id,
          );

          return (
            <article
              key={photo.id}
              className="overflow-hidden rounded-lg bg-white shadow"
            >
              <img
                src={photo.download_url}
                alt={`Photo by ${photo.author}`}
                className="h-56 w-full object-cover"
              />

              <div className="flex items-center justify-between p-3">
                <p className="font-medium">{photo.author}</p>

                <button
                  type="button"
                  onClick={() => toggleFavorite(photo)}
                  aria-label={
                    isFavorite ? "Remove from favourites" : "Add to favourites"
                  }
                  aria-pressed={isFavorite}
                  className={`text-2xl ${
                    isFavorite ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  {isFavorite ? "♥" : "♡"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

export default Gallery;
