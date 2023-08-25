import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Flex, Select } from '@mantine/core';
import GameList from '../../components/GamesList/GameList';
// import GameList from '../../components/GameList/GameList';
import { tags } from '../../data';
import { useAppDispatch } from '../../hooks/useRedux';
import { fetchGames } from '../../slices/gamesSlice';

function MainPage() {
  const [tag, setTag] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tag) {
      dispatch(fetchGames(tag));
    }
  }, [tag]);

  return (
    <>
      <Helmet>
        <meta name="description" content="Game Shop" />
        <title>Games Library</title>
      </Helmet>
      <Flex m="0 auto" justify="space-between" align="flex-start" direction="column">
        <Select value={tag} onChange={setTag} data={[...tags]} size="xl" mb='40px' placeholder="Choose game genre" />
        <GameList />
      </Flex>
    </>
  );
}

export default MainPage;
