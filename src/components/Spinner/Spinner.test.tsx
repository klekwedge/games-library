/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner component', () => {
  it('должен рендериться без ошибок', () => {
    const { container } = render(<Spinner />);
    expect(container).toBeInTheDocument();
  });

  it('должен содержать элемент Flex с корректными свойствами', () => {
    const { getByTestId } = render(<Spinner />);
    const flexElement = getByTestId('spinner-flex');
    expect(flexElement).toBeInTheDocument();
    expect(flexElement).toHaveStyle('margin: 0 auto');
    expect(flexElement).toHaveStyle('width: 100%');
    expect(flexElement).toHaveStyle('align-items: center');
    expect(flexElement).toHaveStyle('padding: 50px 0px');
  });

  it('должен содержать компонент Loader с корректными свойствами', () => {
    const { getByTestId } = render(<Spinner />);
    const loaderComponent = getByTestId('spinner-loader');
    expect(loaderComponent).toBeInTheDocument();
    expect(loaderComponent).toHaveStyle('margin: 0 auto');
  });
});
