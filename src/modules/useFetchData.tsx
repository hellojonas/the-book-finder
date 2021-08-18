import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const useFetchData = <T,>(url: string) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (url === '') {
      return;
    }

    setLoading(true);
    setError(null);
    axios
      .get(url)
      .then(res => {
        if (res.statusText !== 'OK') {
          throw new Error(`Failded to fetch from '${url}'`);
        }

        setData(res.data);
        setLoading(false);
        setError(null);
      })
      .catch(e => {
        setError(e);
      });
  }, [url]);

  return { data, error, loading };
};

export default useFetchData;
