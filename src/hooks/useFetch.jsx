import { useState, useEffect } from "react";

const useFetch = (endpoint, options = {}) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint, JSON.stringify(options)]);
  return { data, loading, error };
};

export default useFetch;
