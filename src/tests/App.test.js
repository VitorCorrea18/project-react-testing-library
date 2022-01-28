import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe(
  'Testa se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    it('Testa se o link "Home" funciona corretamente', () => {
      const { history } = renderWithRouter(<App />);

      const link = screen.getByRole('link', { name: /home/i });
      expect(link).toBeInTheDocument();
      userEvent.click(link);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/'); // testa se a rota é root '/'.

      const button = screen.getByRole('button', { name: /pokémon/i });
      expect(button).toBeInTheDocument(); // testa se há um componente exclusivo da página Home na tela.
    });

    it('Testa se o link "About" funciona corretamente', () => {
      const { history } = renderWithRouter(<App />);

      const link = screen.getByRole('link', { name: /about/i });
      expect(link).toBeInTheDocument();
      userEvent.click(link);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/about');

      const title = screen.getByRole('heading', { name: /about/i });
      expect(title).toBeInTheDocument();
    });

    it('Testa se o link "Favorite Pokémons" funciona corretamente', () => {
      const { history } = renderWithRouter(<App />);

      const link = screen.getByRole('link', { name: /favorite/i });
      expect(link).toBeInTheDocument();
      userEvent.click(link);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');

      const title = screen.getByRole('heading', { name: /favorite/i });
      expect(title).toBeInTheDocument();
    });

    it('Testa a página Not Found ao entrar em uma URL desconhecida.', () => {
      const { history } = renderWithRouter(<App />);
      history.push('xablauzinho');
      const title = screen.getByRole('heading', { name: /not found/i });
      expect(title).toBeInTheDocument();
    });
  },
);
