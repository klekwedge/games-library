import { render, screen } from '@testing-library/react';
import GameInfo, { StatsGrid } from './GameInfo';

const mockData: StatsGrid[] = [
  {
    title: 'Genre',
    icon: 'genre',
    value: 'Action',
  },
  {
    title: 'Processor',
    icon: 'processor',
    value: 'Intel Core i7',
  },
  {
    title: 'Graphics',
    icon: 'graphics',
    value: 'NVIDIA GeForce RTX 3080',
  },
];

describe('GameInfo component', () => {
  it('renders game information correctly', () => {
    render(<GameInfo data={mockData} cols={2} />);

    const genreElement = screen.getByText('Genre');
    const processorElement = screen.getByText('Processor');
    const graphicsElement = screen.getByText('Graphics');

    expect(genreElement).toBeInTheDocument();
    expect(processorElement).toBeInTheDocument();
    expect(graphicsElement).toBeInTheDocument();

    const genreValueElement = screen.getByText('Action');
    const processorValueElement = screen.getByText('Intel Core i7');
    const graphicsValueElement = screen.getByText('NVIDIA GeForce RTX 3080');

    expect(genreValueElement).toBeInTheDocument();
    expect(processorValueElement).toBeInTheDocument();
    expect(graphicsValueElement).toBeInTheDocument();
  });
});
