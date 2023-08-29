import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage'; // Подставьте путь к вашему компоненту

describe('ErrorMessage component', () => {
  it('ErrorMessage renders without errors', () => {
    render(<ErrorMessage />);
    const errorMessageElement = screen.getByTestId('error-message');
    expect(errorMessageElement).toBeInTheDocument();
  });

  it('ErrorMessage has the correct title', () => {
    render(<ErrorMessage />);
    const titleElement = screen.getByText('Woops! Something went wrong');
    expect(titleElement).toBeInTheDocument();
  });

  it('ErrorMessage contains an SVG element', () => {
    render(<ErrorMessage />);
    const svgElement = screen.getByTestId('error-svg');
    expect(svgElement).toBeInTheDocument();
  });
});
