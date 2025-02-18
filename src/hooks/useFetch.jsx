import { useEffect, useState } from "react";

const useFetch = (fetchURL) => {
  const [data, setData] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (fetchURL) {
      fetch(fetchURL)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setIsFetched(true);
          setIsLoading(false);
        });
    }
  }, [fetchURL]);

  return { data, isFetched, isLoading };
};

export default useFetch;
