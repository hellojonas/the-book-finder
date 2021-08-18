import React, { FormEvent, MouseEvent } from 'react';
import { useState } from 'react';
import styles from './NavBar.module.css';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { Body1, Body2 } from '../Typography/Typhograpy';
import { IAuthorSearchResult, IBookSearchResult } from '../../types';
import { useEffect } from 'react';
import { useClickAway } from 'react-use';
import { useRef } from 'react';
import useFetchData from '../../modules/useFetchData';

export interface INavBarProps {
  handleClick?: (item: IResultItem) => any;
}

export interface ISeachInputProps {
  handleClick?: (item: IResultItem) => any;
}

export type searchType = 'Book' | 'Author';
export interface IResultItem {
  text: {
    type: searchType;
    value: string;
  };
  key: string;
}

export const SearchInput = ({ handleClick }: ISeachInputProps) => {
  const [search, setSearch] = useState<searchType>('Book');
  const [suggest, setSuggest] = useState(false);
  const [value, setValue] = useState('');
  const [results, setResults] = useState<
    IAuthorSearchResult | IBookSearchResult
  >();
  const [focus, setFocus] = useState(false);
  const [url, setUrl] = useState('');
  const inputRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const [lastTimeout, setLastTimeout] = useState<number | NodeJS.Timeout>();
  const [select, setSelect] = useState(false);

  const _handleClick = (item: IResultItem) => {
    setFocus(false);
    setValue(item.text.value);
    handleClick && handleClick(item);
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleSelect = (e: MouseEvent<HTMLDivElement>, sType: searchType) => {
    setSearch(sType);
    setSelect(false);
    e.stopPropagation();
  };

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    setValue((e.target as HTMLInputElement).value);
    if (value.length < 4) {
      lastTimeout && clearTimeout(lastTimeout as number);
      return;
    }

    if (lastTimeout) {
      clearTimeout(lastTimeout as number);
    }

    const timeout = setTimeout(() => {
      if (search === 'Book') {
        setUrl(
          `${process.env.REACT_APP_OL_API}/search.json?&limit=5&title=${value
            .replaceAll(/\\/g, '')
            .replaceAll(/\s/g, '+')}`
        );
      } else {
        setUrl(
          `${process.env.REACT_APP_OL_API}/search/authors.json?limit=5&q=${value
            .replaceAll(/\\/g, '')
            .replaceAll(/\s/g, '+')}`
        );
      }
    }, 3000);

    setLastTimeout(timeout);
  };

  useClickAway(inputRef, e => {
    setFocus(false);
  });

  useClickAway(selectRef, e => {
    setSelect(false);
  });

  useEffect(() => {
    if (focus && value.length > 0) {
      setSuggest(true);
    } else if (value.length === 0) {
      setResults(undefined);
    } else {
      setSuggest(false);
    }
  }, [focus, value]);

  const { data } = useFetchData<IAuthorSearchResult | IBookSearchResult>(url);

  useEffect(() => {
    setResults(data);
  }, [data]);

  const resultList = results?.docs.map(res => {
    const item: IResultItem = {
      key: res.key,
      text: { type: search, value: 'title' in res ? res.title : res.name },
    };
    return (
      <div
        key={res.key}
        onClick={() => {
          _handleClick(item);
        }}
      >
        <Body2>
          <div className={styles.resultItem}>
            {'title' in res ? res.title : res.name}
          </div>
        </Body2>
      </div>
    );
  });

  return (
    <div className={styles.search}>
      <div className={styles.inputWrapper} ref={inputRef}>
        <input
          type="text"
          placeholder="Search"
          value={value}
          className={styles.input}
          onFocus={handleFocus}
          onInput={handleInput}
        />
        {suggest && <div className={styles.results}>{resultList}</div>}
      </div>
      <div className={styles.inputButton} onClick={() => setSelect(!select)}>
        <div className={styles.buttonText}>{search}</div>
        <div className={styles.searchIcon}>
          {!select ? <MdExpandMore /> : <MdExpandLess />}
        </div>
        {select && (
          <div className={styles.searchTypeList} ref={selectRef}>
            <div
              className={styles.searchType}
              onClick={e => handleSelect(e, 'Book')}
            >
              Book
            </div>
            <div
              className={styles.searchType}
              onClick={e => handleSelect(e, 'Author')}
            >
              Author
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NavBar: React.FC<INavBarProps> = props => {
  return (
    <div className={styles.navbar}>
      <div className={styles.brand}>
        <Body1>
          <div className={styles.brandText}>TheBookFinder</div>
        </Body1>
      </div>
      <div className={styles.searchWrapper}>
        <SearchInput handleClick={props.handleClick} />
      </div>
    </div>
  );
};

export default NavBar;
