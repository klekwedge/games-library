import { Helmet } from 'react-helmet';
import { Flex } from '@mantine/core';
import GameList from '../../components/GamesList/GameList';
import Filters from '../../components/Filters/Filters';
import { useAppSelector } from '../../hooks/useRedux';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function MainPage() {
  const { gamesLoadingStatus } = useAppSelector((state) => state.games);

  if (gamesLoadingStatus === 'error') {
    return <ErrorMessage />;
  }

  return (
    <>
      <Helmet>
        <meta name="description" content="Game Shop" />
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
