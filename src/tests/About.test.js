import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

describe('Testa o componente <About.js />', () => {
  beforeEach(() => renderWithRouter(<About />));
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const title = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(title).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const pokeText = screen.getAllByText(/pokémon/i);
    expect(pokeText).toHaveLength(2);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toHaveAttribute('alt', 'Pokédex');
  });
});
