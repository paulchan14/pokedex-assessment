import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import { Pokemon } from '../../hooks/useGetPokemons';
import { createUseStyles } from 'react-jss';
import { colors } from '../../utils/colors';
import { useGetSinglePokemon } from '../../hooks/useGetSinglePokemon';
import { ClearButton } from '../ClearButton/ClearButton';

export interface PokeDetailsProps {
  open: boolean;
  onClose: () => void;
}

export const PokeDetailsDialog: React.FC<PokeDetailsProps> = ({
  open,
  onClose,
}) => {
  const { pokemon, loading } = useGetSinglePokemon();

  const { name, classification, weaknesses, resistant, image } = pokemon;
  const classes = useStyles();

  const displayWeakness = Array.isArray(weaknesses)
    ? weaknesses.join(', ')
    : weaknesses;
  const displayResistant = Array.isArray(resistant)
    ? resistant.join(', ')
    : resistant;

  return (
    <Dialog open={loading ? false : true} onClose={onClose}>
      <aside className={classes.dialogStyles}>
        <ClearButton onClick={onClose} styles={classes.closeButton} />
        <h1 className={classes.titleStyles}>{name}</h1>
        <img className={classes.pokemonImage} src={image} alt={name} />
        <h3 className={classes.textStyles}>{classification}</h3>
        <h4 className={classes.textStyles}>Weak Against:</h4>
        <p className={classes.textStyles}>{displayWeakness}</p>
        <h4 className={classes.textStyles}>Strong Against:</h4>
        <p className={classes.textStyles}>{displayResistant}</p>
      </aside>
    </Dialog>
  );
};

const useStyles = createUseStyles({
  dialogStyles: {
    border: '20px solid #FF0000',
    padding: '30px',
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& *': {
      margin: '5px',
    },
  },

  textStyles: {
    color: colors.background,
  },

  titleStyles: {
    color: colors.background,
    fontFamily: 'PokemonSolid',
    fontSize: '3em',
    letterSpacing: '0.15em',
  },

  pokemonImage: {
    width: '50%',
  },

  closeButton: {
    position: 'absolute',
    right: '20px',
    top: '20px',
  },
});
