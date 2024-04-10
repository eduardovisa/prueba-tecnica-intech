import { useState } from 'react';

export const useFetch = ({ body, headers, params = '' }) => {
  // contants
  const API_KEY = 'fcd492e73eaf5db3fc46164916b00df9';
  // states
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = fetch(
        `http://ws.audioscrobbler.com/2.0/?api_key=${API_KEY}&${params}&format=json&limit=5`,
        {
          method: 'GET',
          body: JSON.stringify(body),
          headers: {
            Accept: 'application/json',
            api_key: API_KEY,
            format: 'json',
            ...headers,
          },
        }
      );

      const data = (await response).json();
      data.then((result) => {
        setData(result);
      });
      setData(data);
      setIsLoading(false);
    } catch (error) {
      setIsError(error);
      setIsLoading(false);
    }
  };

  return { data, isLoading, isError, fetchData };
};
