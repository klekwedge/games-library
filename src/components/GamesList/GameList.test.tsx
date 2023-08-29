import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import GameList from './GameList';
import store from '../../store/store';

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
