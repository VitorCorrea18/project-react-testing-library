import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';
import App from '../App';

const POKEMON_NAME_TESTID = 'pokemon-name';
const TESTED_POKEMON = pokemons[0];

describe('Testa o componente <FavoritePokemons.js />', () => {
  it('Teste a mensagem No favorite pokemon found, se não tiver pokémons favoritos',
    () => {
      renderWithRouter(<FavoritePokemons />);
      const noFavoriteText = screen.getByText('No favorite pokemon found');
      expect(noFavoriteText).toBeInTheDocument();
    });

  it('Testa se é exibidos os cards dos pokemon favoritados', () => {
    renderWithRouter(<App />);
    const detailLink = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(detailLink);

    const favoriteLabel = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteLabel);

    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);

    const favoritePokemon = screen.getByTestId(POKEMON_NAME_TESTID);
    expect(favoritePokemon).toHaveTextContent(TESTED_POKEMON.name);
  });
});
