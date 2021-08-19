import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { IAuthorResult } from '../types';

export interface IAuthors {
  type: {
    key: string;
  };
  author: {
    key: string;
  };
}

export const useFetchAuthors = (authors?: IAuthors[]) => {
  const [_authors, setAuthors] = useState<IAuthorResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (!authors) {
      return;
    }

    setLoading(true);

    const authorPromises = authors.map(author => {
      return axios.get<IAuthorResult>(
        `${process.env.REACT_APP_OL_API}${author.author.key}.json`
      );
    });

    Promise.all(authorPromises)
      .then(res => {
        const authorsArray: IAuthorResult[] = [];

        res.forEach(r => {
          if (r.statusText !== 'OK') {
            throw new Error('Failed to fetch authors');
          }

          authorsArray.push(r.data);
        });

        setAuthors(authorsArray);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authors]);

  return { authors: _authors, loading, error };
};
