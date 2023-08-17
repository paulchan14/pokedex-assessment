import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { Pokemon } from '../../hooks/useGetPokemons';

import pokeballImage from '../../assets/pokeball.png';

import { colors } from '../../utils/colors';
import { removeLeadingZeroes } from '../../utils/text-utils';

export interface PokeballProps extends Pokemon {
  openDialog: () => void;
}

export const Pokeball: React.FC<PokeballProps> = ({
  id,
  number,
  name,
  types,
  image,
  openDialog,
}) => {
  const [, setSearchParams] = useSearchParams();
  const classes = useStyles();

  const handleOpenDialog = () => {
    setSearchParams({ id });
    openDialog();
  };

  const typeLabel = types.length > 1 ? 'Types' : 'Type';

  const pokeNumber = removeLeadingZeroes(number);
  return (
    <li className={classes.pokemonCard} onClick={handleOpenDialog} tabIndex={0}>
      <span id="cover-info" className={classes.coverInfo}>
        <span className={classes.coverNumber}>#{pokeNumber}</span>
        <span className={classes.coverName}>{name}</span>
      </span>
      <img
        src={pokeballImage}
        className={classes.pokeballClosedImage}
        alt="Closed pokeball; Credit: vecteezy.com"
        id="closed-pokeball"
      />
      <span className={classes.pokemonInfo}>
        <img className={classes.pokeballOpenImage} src={image} alt={name} />
        <span className={classes.pokemonStats}>
          <p
            className={classes.pokemonInfoText}
          >{`#${pokeNumber} - ${name}`}</p>
          <p className={classes.pokemonInfoText}>
            {typeLabel}: {types.join(', ')}
          </p>
        </span>
      </span>
    </li>
  );
};

const useStyles = createUseStyles(
  {
    pokemonCard: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'all 0.5s ease',
      minWidth: '250px',
      width: '250px',
      height: '250px',
      backgroundColor: '#FFFFFF',
      margin: '20px',
      borderRadius: '50%',
      '&:hover': {
        boxShadow: `0 0 10px 6px ${colors.grey}`,
        '& > #cover-info, & > #closed-pokeball': {
          opacity: '0',
        },
      },
    },

    pokeballClosedImage: {
      position: 'absolute',
      height: '108%',
      width: '108%',
      opacity: '1',
      transition: 'opacity 0.5s ease',
      zIndex: '1',
    },

    coverInfo: {
      fontSize: '1.2em',
      height: '180px',
      transition: 'opacity 0.5s ease',
      opacity: '1',
      position: 'absolute',
      zIndex: '2',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      letterSpacing: '0.15em',
    },

    pokemonInfoText: {
      color: colors.background,
    },

    coverNumber: {
      fontFamily: 'PokemonSolid',
    },

    coverName: {
      fontFamily: 'PokemonSolid',
      color: colors.background,
    },

    pokeballOpenImage: {
      height: '100px',
    },

    pokemonInfo: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: colors.background,
    },

    pokemonStats: {
      borderRadius: '3px',
      padding: '2px',
    },
  },
  { name: 'Pokeball' }
);
