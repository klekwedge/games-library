import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'; // Предполагая, что вы используете Redux
import GameList from './GameList';
import store from '../../store/store'; // Замените на вашу конфигурацию Redux Store

describe('GameList', () => {
  it('renders loading skeleton when games are loading', () => {
    render(
      <Provider store={store}>
        <GameList />
      </Provider>,
    );

    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons).toHaveLength(20);
  });
});
