import React from 'react';
import styles from './App.module.css';
import { Route, Switch } from 'react-router-dom';
import Home from './views/Home/Home';
import Container from './components/Container/Container';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.navbar}>
        <Container>
          <NavBar />
        </Container>
      </div>

      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
