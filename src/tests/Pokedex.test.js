import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const POKEMON_TYPES_NUMBER = 7;
const FILTER_BTN_TESTID = 'pokemon-type-button';
const POKEMON_NAME_TESTID = 'pokemon-name';
const POKEMON_TYPE_TESTID = 'pokemon-type';
const NEXT_BTN_TESTID = 'next-pokemon';

describe('Teste o componente <Pokedex.js />', () => {
  // tive que pegar a saída da função "setIsPokemonFavoriteById" no App.js para simular a prop que o componente Pokedex recebe.
  const isPokemonFavoriteById = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };
  beforeEach(() => renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  ));

  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const pokeText = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(pokeText).toBeInTheDocument();
  });

  it('Testa o botão Próximo pokémon.', () => {
    const nextBtn = screen.getByTestId(NEXT_BTN_TESTID);
    expect(nextBtn).toHaveTextContent('Próximo pokémon');

    for (let i = 1; i <= pokemons.length; i += 1) {
      const screenPokemon = screen.getByTestId(POKEMON_NAME_TESTID);
      if (i === pokemons.length) {
        const crrPokemon = pokemons[0];
        userEvent.click(nextBtn);
        expect(screenPokemon).toHaveTextContent(crrPokemon.name);
      } else {
        const crrPokemon = pokemons[i];
        userEvent.click(nextBtn);
        expect(screenPokemon).toHaveTextContent(crrPokemon.name);
      }
    }
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    const screenPokemon = screen.getAllByTestId(POKEMON_NAME_TESTID);
    expect(screenPokemon).toHaveLength(1);
  });

  // Consultei o repositório da Marina Ficsher para resolução deste teste.
  it('Teste se a Pokédex tem os botões de filtro', () => {
    const filterBtns = screen.getAllByTestId(FILTER_BTN_TESTID);
    expect(filterBtns).toHaveLength(POKEMON_TYPES_NUMBER);
    expect(filterBtns[0]).toHaveTextContent('Electric');
    expect(filterBtns[1]).toHaveTextContent('Fire');
    expect(filterBtns[2]).toHaveTextContent('Bug');
    expect(filterBtns[3]).toHaveTextContent('Poison');
    expect(filterBtns[4]).toHaveTextContent('Psychic');
    expect(filterBtns[5]).toHaveTextContent('Normal');
    expect(filterBtns[6]).toHaveTextContent('Dragon');
  });

  it('testa os botões de filtro', () => {
    const filterBtns = screen.getAllByTestId(FILTER_BTN_TESTID);

    filterBtns.forEach((btn) => {
      const btnType = btn.textContent;
      userEvent.click(btn);
      const btnAll = screen.getByRole('button', { name: /All/i });
      const pokemonTypeOnScreen = screen.getByTestId(POKEMON_TYPE_TESTID);
      expect(pokemonTypeOnScreen).toHaveTextContent(btnType);
      expect(btnAll).toBeInTheDocument();
      expect(btnAll).not.toHaveAttribute('disabled');
      userEvent.click(btnAll);
    });
  });

  it('testa o botão de remover filtros "All', () => {
    const btnAll = screen.getByRole('button', { name: /All/i });
    const filterBtns = screen.getAllByTestId(FILTER_BTN_TESTID);
    const nextBtn = screen.getByTestId(NEXT_BTN_TESTID);

    filterBtns.forEach((btn) => {
      userEvent.click(btn);
      userEvent.click(btnAll);
      for (let i = 1; i <= pokemons.length; i += 1) {
        const screenPokemon = screen.getByTestId(POKEMON_NAME_TESTID);
        if (i === pokemons.length) {
          const crrPokemon = pokemons[0];
          userEvent.click(nextBtn);
          expect(screenPokemon).toHaveTextContent(crrPokemon.name);
        } else {
          const crrPokemon = pokemons[i];
          userEvent.click(nextBtn);
          expect(screenPokemon).toHaveTextContent(crrPokemon.name);
        }
      }
    });
  });
});
