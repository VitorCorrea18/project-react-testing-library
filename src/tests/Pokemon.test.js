import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import App from '../App';

const TESTED_POKEMON_OBJ = pokemons[1];
const POKEMON_NAME_TESTID = 'pokemon-name';
const POKEMON_TYPE_TESTID = 'pokemon-type';
const POKEMON_WEIGHT_TESTID = 'pokemon-weight';
const IS_FAVORITE = true;

describe('Testa o componente <Pokemon.js />', () => {
  const {
    name, type, averageWeight: { value, measurementUnit }, image, id,
  } = TESTED_POKEMON_OBJ;

  it('Testa se é renderizado um card com informações corretas do pokemon', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ TESTED_POKEMON_OBJ }
        isFavorite={ false }
      />,
    );
    const pokemonName = screen.getByTestId(POKEMON_NAME_TESTID);
    const pokemonType = screen.getByTestId(POKEMON_TYPE_TESTID);
    const pokemonWeight = screen.getByTestId(POKEMON_WEIGHT_TESTID);
    const pokemonImage = screen.getByRole('img', { src: image });
    expect(pokemonName).toHaveTextContent(name);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonWeight).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
    expect(pokemonImage).toHaveAttribute('src', image);
    expect(pokemonImage).toHaveAttribute('alt', `${name} sprite`);
  });

  it('Testa se há um link no card do pokemon para detalhes', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ TESTED_POKEMON_OBJ }
        isFavorite={ false }
      />,
    );
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveProperty('href', `http://localhost/pokemons/${id}`);
  });

  it('Testa se é feito o redirecionamento a pokemon details ao clicar no link', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    const pokemonName = screen.getByTestId(POKEMON_NAME_TESTID);
    userEvent.click(link);

    const title = screen.getByRole(
      'heading', { name: `${pokemonName.textContent} Details` },
    );
    expect(title).toBeInTheDocument();
  });

  it('Testa se a url exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ TESTED_POKEMON_OBJ }
        isFavorite={ false }
      />,
    );
    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ TESTED_POKEMON_OBJ }
        isFavorite={ IS_FAVORITE }
      />,
    );
    const starImage = screen.getByAltText(`${name} is marked as favorite`);
    expect(starImage).toBeInTheDocument();
    expect(starImage).toHaveAttribute('src', '/star-icon.svg');
  });
});
