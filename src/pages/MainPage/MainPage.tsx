import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Flex } from '@mantine/core';
import GameList from '../../components/GamesList/GameList';
import Filters from '../../components/Filters/Filters';
import { useAppDispatch } from '../../hooks/useRedux';
import { resetCurrentGame } from '../../slices/gamesSlice';

function MainPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetCurrentGame());
  }, []);

  return (
    <>
      <Helmet>
        <meta name="description" content="Game Library" />
        <title>Games Library</title>
      </Helmet>
      <Flex m="0 auto" justify="space-between" align="flex-start" direction="column">
        <Filters />
        <GameList />
      </Flex>
    </>
  );
}

export default MainPage;
