import React from 'react';
import styles from './Typography.module.css';

export interface ITypographyProps {}

export const Title1: React.FC<ITypographyProps> = props => {
  return <div className={styles.title1}>{props.children}</div>;
};

export const Title2: React.FC<ITypographyProps> = props => {
  return <div className={styles.title2}>{props.children}</div>;
};

export const Body1: React.FC<ITypographyProps> = props => {
  return <div className={styles.body1}>{props.children}</div>;
};

export const Body2: React.FC<ITypographyProps> = props => {
  return <div className={styles.body2}>{props.children}</div>;
};

export const Caption: React.FC<ITypographyProps> = props => {
  return <div className={styles.caption}>{props.children}</div>;
};
