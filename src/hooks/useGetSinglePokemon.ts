import gql from 'graphql-tag';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { Pokemon } from './useGetPokemons';

export interface SinglePokemonDetails extends Pokemon {
  classification: string;
  weaknesses: string[];
  resistant: string[];
}

export const GET_SINGLE_POKEMON = gql`
  query pokemon($id: String, $name: String){
    pokemon(id: $id, name: $name){
      id
      number
      name
      weight{
        minimum
        maximum
      }
      height{
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetSinglePokemon = () => {
  const [searchParams] = useSearchParams();
  
  const id = searchParams.get('id');
  const { data, loading, ...queryRes } = useQuery(GET_SINGLE_POKEMON, {
    variables: {
      id
    },

  });

  const pokemon: SinglePokemonDetails = useMemo(() => data?.pokemon || {}, [data]);

  return {
    pokemon,
    loading,
    ...queryRes
  }
}