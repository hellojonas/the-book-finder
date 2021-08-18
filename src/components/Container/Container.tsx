import React from 'react';
import styles from './Container.module.css';

export interface IContainerProps {}

const Container: React.FC<IContainerProps> = props => {
  return <div className={styles.container}>{props.children}</div>;
};

export default Container;
