import { Helmet } from 'react-helmet';
import { Flex } from '@chakra-ui/react';
// import GameList from '../../components/GameList/GameList';

function MainPage() {
  return (
    <>
      <Helmet>
        <meta name="description" content="Game Shop" />
        <title>Games Library</title>
      </Helmet>
      Games Library
      <Flex as="main" margin="0 auto" justifyContent="space-between" alignItems="flex-start" gap="96px">
        {/* <GameList mainTitle="games" /> */}
      </Flex>
    </>
  );
}

export default MainPage;
