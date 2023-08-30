import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

const mockFunc = () => {};
const mockAttempts = 2;

describe('ErrorMessage component', () => {
  it('ErrorMessage renders without errors', () => {
    render(<ErrorMessage attempts={mockAttempts} reRequest={mockFunc} />);
    const errorMessageElement = screen.getByTestId('error-message');
    expect(errorMessageElement).toBeInTheDocument();
  });

  it('ErrorMessage has the correct title', () => {
    render(<ErrorMessage attempts={mockAttempts} reRequest={mockFunc} />);
    const titleElement = screen.getByText('Woops! Something went wrong');
    expect(titleElement).toBeInTheDocument();
  });

  it('ErrorMessage contains an SVG element', () => {
    render(<ErrorMessage attempts={mockAttempts} reRequest={mockFunc} />);
    const svgElement = screen.getByTestId('error-svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('renders the error message with the number of attempts', () => {
    render(<ErrorMessage reRequest={mockFunc} attempts={mockAttempts} />);

    const retryButton = screen.getByText('Request again');
    expect(retryButton).toBeInTheDocument();

    const attemptsText = screen.getByText(`Remaining attempts: ${4 - mockAttempts}`);
    expect(attemptsText).toBeInTheDocument();
  });
});
