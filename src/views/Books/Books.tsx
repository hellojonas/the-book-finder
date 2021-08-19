import React, { ReactNode, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import Container from '../../components/Container/Container';
import Spinner from '../../components/Spinner/Spinner';
import {
  Body1,
  Body2,
  Title1,
  Title2,
} from '../../components/Typography/Typhograpy';
import { useFetchAuthors } from '../../modules/useFetchAuthors';
import useFetchData from '../../modules/useFetchData';
import { IBookResult } from '../../types';
import styles from './Books.module.css';

export interface IBooksProps {}

export const LongTextDescription = (props: {
  title: string;
  text?: string;
}) => {
  return (
    <div className={styles.description}>
      <div className={styles.descriptionTitle}>
        <Body1>
          <span className={styles.descriptionTitleText}>{props.title}</span>
        </Body1>
      </div>
      <div className={styles.valueWrapper}>
        <div className={styles.descriptionValue}>
          <Body2>
            <span className={styles.descriptionText}>{props.text}</span>
          </Body2>
        </div>
      </div>
    </div>
  );
};

export const UsefulLinks = (props: {
  links?: { url: string; title: string }[];
}) => {
  const linksList = props.links?.map(link => {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noreferrer"
        className={styles.linkItem}
        key={link.title}
      >
        {link.title}
      </a>
    );
  });

  return (
    <div className={styles.links}>
      <Title2>
        <h2 className={styles.linksHeader}>Useful links</h2>
      </Title2>
      {linksList}
    </div>
  );
};

export const DescriptionItem = (props: {
  title: string;
  value?: string;
  children?: ReactNode;
}) => {
  return (
    <div className={styles.item}>
      <div className={styles.itemLabel}>
        <Body1>
          <span className={styles.itemLabelText}>{props.title}</span>
        </Body1>
      </div>
      <div className={styles.itemValue}>
        <Body2>
          {props.value ? (
            <span className={styles.valueText}>{props.value}</span>
          ) : (
            props.children
          )}
        </Body2>
      </div>
    </div>
  );
};

export const Cover = (props: { url: string }) => {
  return props.url ? (
    <div className={styles.coverWrapper}>
      <img src={props.url} alt="" className={styles.cover} />
    </div>
  ) : null;
};

const Books: React.FC<IBooksProps> = props => {
  const [loading, setLoading] = useState(false);
  const params = useParams<{ id: string }>();
  const url = `${process.env.REACT_APP_OL_API}/works/${params.id}.json`;

  const { data: book, loading: loadingBooks } = useFetchData<IBookResult>(url);
  const { authors, loading: loadingAuthors } = useFetchAuthors(book?.authors);

  const authorsList = authors?.map(author => {
    return (
      <div className={styles.authorItem} key={author.key}>
        {author.name}
      </div>
    );
  });

  useEffect(() => {
    setLoading(loadingBooks || loadingAuthors);
  }, [loadingAuthors, loadingBooks]);

  return !loading ? (
    <Container>
      <div className={styles.books}>
        <header className={styles.header}>
          <Title1>
            <span className={styles.bookTitle}>{book?.title}</span>
          </Title1>
        </header>

        <div className={styles.descriptionWrapper}>
          <div className={styles.left}>
            {book?.covers && (
              <Cover
                url={`${process.env.REACT_APP_OL_COVER}/b/id/${book?.covers[0]}-M.jpg`}
              />
            )}

            <DescriptionItem
              title="Published"
              value={book?.first_publish_date}
            />
            <DescriptionItem title="Authors">{authorsList}</DescriptionItem>
          </div>

          <div className={styles.right}>
            <LongTextDescription
              title="Description"
              text={
                book?.description?.value || 'This book has no description yet.'
              }
            />
          </div>
        </div>

        {book?.links && (
          <section>
            <UsefulLinks links={book?.links} />
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

export default Books;
