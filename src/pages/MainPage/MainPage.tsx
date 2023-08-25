import { Helmet } from 'react-helmet';
import { Flex } from '@mantine/core';
import GameList from '../../components/GamesList/GameList';
// import GameList from '../../components/GameList/GameList';

function MainPage() {
  return (
    <>
      <Helmet>
        <meta name="description" content="Game Shop" />
        <title>Games Library</title>
      </Helmet>
      <Flex m="0 auto" justify="space-between" align="flex-start">
        <GameList />
      </Flex>
    </>
  );
}

export default MainPage;
