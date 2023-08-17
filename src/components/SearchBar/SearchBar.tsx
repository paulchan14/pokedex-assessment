import { relative } from 'path';
import React, { useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdClear } from 'react-icons/md';
import { createUseStyles } from 'react-jss';
import { colors } from '../../utils/colors';
import { ClearButton } from '../ClearButton/ClearButton';

export interface SearchBarProps {
  setFilter: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ setFilter }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value);
    setFilter(e.currentTarget.value);
  };

  const handleClear = () => {
    setInputValue('');
    setFilter('');
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  };

  const classes = useStyles();

  const clearButtonStyles = inputValue
    ? classes.clearInput
    : classes.clearInput + ' ' + classes.invisible;

  return (
    <form className={classes.formStyles}>
      <BsSearch size="3em" />
      <input
        placeholder="Search for Pokemon"
        className={classes.inputStyles}
        type="text"
        name="search-pokemon"
        onChange={handleInput}
        value={inputValue}
        ref={inputRef}
      />
      <ClearButton onClick={handleClear} styles={clearButtonStyles} />
    </form>
  );
};

const useStyles = createUseStyles({
  formStyles: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '70%',
    padding: '20px',
    '& svg': {
      marginRight: '20px',
    },
  },

  inputStyles: {
    color: colors.background,
    width: '100%',
    minWidth: '250px',
    paddingLeft: '10px',
    fontSize: '1.2em',
    border: 'none',
    borderRadius: '25px',
  },

  clearInput: {
    position: 'relative',
    right: '45px',
    transition: 'opacity 0.3s ease',
  },

  invisible: {
    opacity: '0',
  },
});
