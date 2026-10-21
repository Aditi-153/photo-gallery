import { useEffect, useState } from "react";

function useFetchPhotoes() {
  const [photos, setPhotos] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
}
