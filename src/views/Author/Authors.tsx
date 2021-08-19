import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import Container from '../../components/Container/Container';
import Spinner from '../../components/Spinner/Spinner';
import { Body2, Title1, Title2 } from '../../components/Typography/Typhograpy';
import useFetchData from '../../modules/useFetchData';
import { IAuthorResult, IAuthorWorks } from '../../types';
import {
  DescriptionItem,
  LongTextDescription,
  UsefulLinks,
} from '../Books/Books';
import styles from './Author.module.css';

export interface IAuthorProps {}

export const BookByAuthor = (props: {
  books?: IAuthorWorks;
  authorName: string;
}) => {
  const history = useHistory();
  const handleClick = (key: string) => {
    history.push(`/books/${key}`);
  };

  const booksList = props.books?.entries?.map(book => {
    return (
      <div
        className={styles.bookItem}
        key={book.key}
        onClick={() => {
          handleClick(book.key.split('/')[2]);
        }}
      >
        <div className={styles.bookCoverWrapper}>
          {book?.covers && (
            <img
              src={`${process.env.REACT_APP_OL_COVER}/b/id/${book?.covers[0]}-M.jpg`}
              alt=""
              className={styles.bookCover}
            />
          )}
        </div>
        <div className={styles.booksCaption}>
          <Body2>
            <span className={styles.booksTitle} title={book.title}>
              {book.title}
            </span>
          </Body2>
        </div>
      </div>
    );
  });

  return (
    <section className={styles.books}>
      <div className={styles.booksSectionTitle}>
        <Title2>
          <h2>Books by {props.authorName}</h2>
        </Title2>
      </div>
      <div className={styles.booksList}>{booksList}</div>
    </section>
  );
};

const Author: React.FC<IAuthorProps> = props => {
  const [loading, setLoading] = useState(false);
  const params = useParams<{ id: string }>();
  const key = params.id;

  const { data: author, loading: loadingAuthors } = useFetchData<IAuthorResult>(
    `${process.env.REACT_APP_OL_API}/authors/${key}.json`
  );

  const { data: books, loading: loadingBooks } = useFetchData<IAuthorWorks>(
    `${process.env.REACT_APP_OL_API}/authors/${key}/works.json`
  );

  useEffect(() => {
    setLoading(loadingBooks || loadingAuthors);
  }, [loadingAuthors, loadingBooks]);

  return !loading ? (
    <Container>
      <div className={styles.authors}>
        <header className={styles.header}>
          <Title1>
            <span className={styles.authorName}>{author?.name}</span>
          </Title1>
        </header>

        <div className={styles.descriptionWrapper}>
          <div className={styles.left}>
            {author?.key && (
              <div className={styles.coverWrapper}>
                <img
                  src={`${process.env.REACT_APP_OL_COVER}/a/olid/${
                    author?.key.split('/')[2]
                  }-M.jpg`}
                  alt=""
                  className={styles.cover}
                />
              </div>
            )}
            <DescriptionItem title="Birth date" value={author?.birth_date} />

            {author?.death_date && (
              <DescriptionItem
                title="Death date"
                value={author?.death_date}
              ></DescriptionItem>
            )}
          </div>

          <div className={styles.right}>
            <LongTextDescription
              title="Biography"
              text={author?.bio?.value || 'This author has no bio yet.'}
            />
          </div>
        </div>

        {books?.entries && books.entries.length > 0 ? (
          <BookByAuthor books={books} authorName={author?.name!} />
        ) : null}

        {author?.links && (
          <section>
            <UsefulLinks links={author?.links} />
          </section>
        )}
      </div>
    </Container>
  ) : (
    <div className={styles.spinner}>
      <Spinner></Spinner>
    </div>
  );
};

export default Author;
