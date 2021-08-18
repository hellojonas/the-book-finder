import React from 'react';
import Container from '../../components/Container/Container';
import styles from './Home.module.css';
import bookImage from '../../assets/image-book.png';
import { Body1, Body2 } from '../../components/Typography/Typhograpy';
import { MdArrowForward } from 'react-icons/md';

export interface IHomeProps {}

const Home: React.FC<IHomeProps> = props => {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1 className={styles.heroText}>
          The joy of book in
          <br />a single place
        </h1>
        <div className={styles.cta}>
          <button className={styles.button}>Find a Book</button>
        </div>
      </section>
      <Container>
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <img src={bookImage} alt="" className={styles.image} />
          </div>
          <div className={styles.content}>
            <div className={styles.textContent}>
              <Body1>
                <span>Find the books you want in a single place</span>
              </Body1>
              <Body2>
                <span>Powered by openlibray</span>
              </Body2>
            </div>

            <div className={styles.textButtonWrapper}>
              <div className={styles.textButton}>
                Find a Book
                <div className={styles.buttonIcon}>
                  <MdArrowForward />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
