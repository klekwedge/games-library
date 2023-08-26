import { Helmet } from 'react-helmet';
import { Flex } from '@mantine/core';
import GameList from '../../components/GamesList/GameList';
import Filters from '../../components/Filters/Filters';

function MainPage() {
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
