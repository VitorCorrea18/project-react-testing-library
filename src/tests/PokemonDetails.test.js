import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';
import { updateFavoritePokemons } from '../services/pokedexService';
import App from '../App';

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

const TESTED_POKEMON_OBJ = pokemons[1];
const NEXT_BTN_TESTID = 'next-pokemon';
const { name, id, summary, foundAt } = TESTED_POKEMON_OBJ;

// consultei o repositório da Marina Fischer para resolver este teste.
describe('Testa o componente <PokemonDetails.js />', () => {
  it('Testa se as informações do Pokémon são mostradas na tela.', () => {
    renderWithRouter(<PokemonDetails
      match={ { params: { id: id.toString() } } }
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
      onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
        updateFavoritePokemons(pokemonId, isFavorite)
      ) }
    />);

    const title = screen.getByRole('heading', { level: 2, name: `${name} Details` });
    expect(title).toBeDefined();

    const link = screen.queryByRole('link', { name: 'More details' });
    expect(link).toBe(null);

    const sumary = screen.getByRole('heading', { name: /Summary/i });
    expect(sumary).toBeInTheDocument();

    const details = screen.getByText(summary);
    expect(details).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com mapas contendo as localizações do pokémon',
    () => {
      renderWithRouter(<PokemonDetails
        match={ { params: { id: id.toString() } } }
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
        onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
          updateFavoritePokemons(pokemonId, isFavorite)
        ) }
      />);

      const title = screen.getByRole('heading', {
        level: 2, name: `Game Locations of ${name}`,
      });
      expect(title).toBeInTheDocument();

      foundAt.forEach(({ location }) => {
        const locationText = screen.getByText(location);
        expect(locationText).toBeInTheDocument();
      });

      const mapIMG = screen.getAllByAltText(`${name} location`);
      expect(mapIMG).toHaveLength(foundAt.length);
      expect(mapIMG[0]).toHaveAttribute('src', foundAt[0].map);
      expect(mapIMG[0]).toHaveAttribute('alt', `${name} location`);
    });

  it('Testa se o botão favoritar da página de detalhes', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByTestId(NEXT_BTN_TESTID);
    userEvent.click(nextBtn);

    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);

    const favoriteCheckbox = screen.findByRole('checkbox');
    expect(favoriteCheckbox).toBeDefined();

    const favoriteLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteLabel).toBeInTheDocument();

    userEvent.click(favoriteLabel);
    let starImage = screen.getByAltText(`${name} is marked as favorite`);
    expect(starImage).toBeInTheDocument();

    userEvent.click(favoriteLabel);
    starImage = screen.queryByRole('img', { name: `${name} is marked as favorite` });
    expect(starImage).toBe(null);
  });
});
