import React from 'react';
import styles from './App.module.css';
import { Route, Switch, useHistory } from 'react-router-dom';
import Home from './views/Home/Home';
import Container from './components/Container/Container';
import NavBar, { IResultItem } from './components/NavBar/NavBar';
import { useEffect } from 'react';
import { useState } from 'react';
import Books from './views/Books/Books';
import Author from './views/Author/Authors';

function App() {
  const [item, setItem] = useState<IResultItem>();
  const history = useHistory();

  useEffect(() => {
    if (!item?.key) {
      return;
    }

    const key = item?.text.type === 'Book' ? item.key.split('/')[2] : item?.key;

    history.push(`/${item.text.type.toLowerCase()}s/${key}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const handleItemClick = (item: IResultItem) => {
    setItem(item);
  };

  return (
    <div className={styles.app}>
      <div className={styles.navbar}>
        <Container>
          <NavBar handleClick={handleItemClick} />
        </Container>
      </div>

      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/books/:id">
          <Books />
        </Route>
        <Route path="/authors/:id">
          <Author />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
