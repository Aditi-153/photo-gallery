import useFetchPhotos from "./Hooks/useFetchPhotoes";

function App() {
  const { photos, loading, error } = useFetchPhotos();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading photos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold text-purple-700">Photo Gallery</h1>

      <p className="mb-4">Total photos fetched: {photos.length}</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="overflow-hidden rounded-lg bg-white shadow"
          >
            <img
              src={photo.download_url}
              alt={`Photo by ${photo.author}`}
              className="h-56 w-full object-cover"
            />

            <p className="p-3 font-medium">{photo.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
