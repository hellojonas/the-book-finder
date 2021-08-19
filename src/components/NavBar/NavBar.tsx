import React, { FormEvent, MouseEvent, ReactNode } from 'react';
import { useState } from 'react';
import styles from './NavBar.module.css';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { Body1, Body2 } from '../Typography/Typhograpy';
import { IAuthorSearchResult, IBookSearchResult } from '../../types';
import { useEffect } from 'react';
import { useClickAway } from 'react-use';
import { useRef } from 'react';
import useFetchData from '../../modules/useFetchData';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';

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

export interface ISearchResults {
  handleClick?: (item: IResultItem) => any;
  results?: IAuthorSearchResult | IBookSearchResult;
  type: searchType;
  loading?: boolean;
}

export const ResultMessage = (props: { children?: ReactNode }) => {
  return (
    <div className={styles.message}>
      <Body2>
        <span className={styles.messageText}>{props.children}</span>
      </Body2>
    </div>
  );
};

export const SearchResults = ({
  handleClick,
  results,
  type,
  loading,
}: ISearchResults) => {
  const resultList = results?.docs.map(res => {
    const item: IResultItem = {
      key: res.key,
      text: { type, value: 'title' in res ? res.title : res.name },
    };
    return (
      <div
        key={res.key}
        onClick={() => {
          handleClick && handleClick(item);
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

  let show;

  if (results?.docs.length === 0 && !loading) {
    show = <ResultMessage>{`No ${type} Found.`}</ResultMessage>;
  } else if (loading) {
    show = (
      <ResultMessage>
        <Spinner />
      </ResultMessage>
    );
  } else if (!loading && !results) {
    show = <ResultMessage>type at least 4 characters</ResultMessage>;
  } else if (!loading && results && results?.docs.length > 0) {
    show = resultList;
  }

  return <div className={styles.results}>{show}</div>;
};

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
    setResults(undefined);
    e.stopPropagation();
  };

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    setValue((e.target as HTMLInputElement).value);
    if (value.length < 3) {
      lastTimeout && clearTimeout(lastTimeout as number);
      return;
    }

    if (lastTimeout) {
      clearTimeout(lastTimeout as number);
    }

    const timeout = setTimeout(() => {
      if (search === 'Book') {
        setUrl(
          `${
            process.env.REACT_APP_OL_API
          }/search.json?&limit=5&title=${encodeURIComponent(value)
            .replaceAll(/\\/g, '')
            .replaceAll(/\s/g, '+')}`
        );
      } else {
        setUrl(
          `${
            process.env.REACT_APP_OL_API
          }/search/authors.json?limit=5&q=${encodeURIComponent(value)
            .replaceAll(/\\/g, '')
            .replaceAll(/\s/g, '+')}`
        );
      }
    }, 200);

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
      setSuggest(false);
    } else {
      setSuggest(false);
    }
  }, [focus, value]);

  const { data, loading } = useFetchData<
    IAuthorSearchResult | IBookSearchResult
  >(url);

  useEffect(() => {
    setResults(data);
  }, [data]);

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
        {suggest && (
          <SearchResults
            handleClick={_handleClick}
            type={search}
            results={results}
            loading={loading}
          />
        )}
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
          <Link to="/" className={styles.brandText}>
            TheBookFinder
          </Link>
        </Body1>
      </div>

      <div className={styles.searchWrapper}>
        <SearchInput handleClick={props.handleClick} />
      </div>
    </div>
  );
};

export default NavBar;
