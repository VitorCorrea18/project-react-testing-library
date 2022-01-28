import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { NotFound } from '../components';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found 😭;',
    () => {
      renderWithRouter(<NotFound />);
      const title = screen.getByRole('heading', { name: /Page requested not found/i });
      expect(title).toBeInTheDocument();
    });

  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(image).toBeInTheDocument();
  });
});
