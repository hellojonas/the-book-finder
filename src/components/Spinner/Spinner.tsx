import React from 'react';
import styles from './Spinner.module.css';

export interface ISpinnerProps {}

const Spinner: React.FC<ISpinnerProps> = props => {
  return (
    <div className={styles.spinner}>
      <div></div>
    </div>
  );
};

export default Spinner;
