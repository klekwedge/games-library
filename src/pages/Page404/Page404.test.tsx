import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Page404 from './Page404';

describe('Page404 component', () => {
  it('renders the "Page not found" message', () => {
    render(
      <MemoryRouter>
        <Page404 />
      </MemoryRouter>,
    );

    const messageElement = screen.getByText('Page not found');
    expect(messageElement).toBeInTheDocument();
  });

  it('renders a link to the Home Page', () => {
    render(
      <MemoryRouter>
        <Page404 />
      </MemoryRouter>,
    );

    const linkElement = screen.getByRole('link', { name: /Home Page/i });
    expect(linkElement).toBeInTheDocument();

    fireEvent.click(linkElement);
  });

  it('renders an SVG image', () => {
    render(
      <MemoryRouter>
        <Page404 />
      </MemoryRouter>,
    );

    const svgElement = screen.getByTestId('page404-svg');
    expect(svgElement).toBeInTheDocument();
  });
});
