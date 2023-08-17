import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSearchParams } from 'react-router-dom';

import { useGetPokemons } from '../../hooks/useGetPokemons';
import { removeLeadingZeroes } from '../../utils/text-utils';
import { Pokeball } from '../Pokeball/Pokeball';
import { PokeDetailsDialog } from '../PokeDetailsDialog/PokeDetailsDialog';
import { SearchBar } from '../SearchBar/SearchBar';

export const PokemonList = () => {
  const [filter, setFilter] = useState<string>('');
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [, setSearchParams] = useSearchParams();

  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSearchParams('');
  };

  return (
    <article className={classes.listContainer}>
      {showDialog && (
        <PokeDetailsDialog open={showDialog} onClose={handleCloseDialog} />
      )}
      <SearchBar setFilter={setFilter} />
      <ul className={classes.root}>
        {loading && <div>Loading...</div>}
        {pokemons
          .filter(
            (pkmn) =>
              pkmn.name.toUpperCase().includes(filter.toUpperCase()) ||
              removeLeadingZeroes(pkmn.number).includes(filter)
          )
          .map((pkmn) => {
            const { id, name, number, types, image } = pkmn;
            return (
              <Pokeball
                key={id}
                id={id}
                number={number}
                types={types}
                name={name}
                image={image}
                openDialog={() => setShowDialog(true)}
              />
            );
          })}
      </ul>
    </article>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },

    listContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  { name: 'PokemonList' }
);
