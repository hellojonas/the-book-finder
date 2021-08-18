import React from 'react';
import styles from './Home.module.css';

export interface IHomeProps {}

const Home: React.FC<IHomeProps> = props => {
  return <div className={styles.home}></div>;
};

export default Home;
