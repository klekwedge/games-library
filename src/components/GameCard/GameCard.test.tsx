import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GameCard from './GameCard';

const mockGame = {
  id: 540,
  title: 'Overwatch 2',
  thumbnail: 'https://www.freetogame.com/g/540/thumbnail.jpg',
  short_description: 'A hero-focused first-person team shooter from Blizzard Entertainment.',
  game_url: 'https://www.freetogame.com/open/overwatch-2',
  genre: 'Shooter',
  platform: 'PC (Windows)',
  publisher: 'Activision Blizzard',
  developer: 'Blizzard Entertainment',
  release_date: '2022-10-04',
  freetogame_profile_url: 'https://www.freetogame.com/overwatch-2',
};

describe('GameCard Component', () => {
  it('renders game details correctly', () => {
    render(
      <MemoryRouter>
        <GameCard game={mockGame} />
      </MemoryRouter>,
    );

    const titleElement = screen.getByText('Overwatch 2');
    expect(titleElement).toBeInTheDocument();

    const genreElement = screen.getByText('Genre: Shooter');
    expect(genreElement).toBeInTheDocument();

    const publisherElement = screen.getByText('Publisher: Activision Blizzard');
    expect(publisherElement).toBeInTheDocument();

    const releaseDateElement = screen.getByText('Release date: 04.10.2022');
    expect(releaseDateElement).toBeInTheDocument();

    const imageElement = screen.getByRole('img', { name: 'Overwatch 2' });
    expect(imageElement).toBeInTheDocument();
  });
});
