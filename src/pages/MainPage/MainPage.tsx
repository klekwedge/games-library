import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Flex, Select } from '@mantine/core';
import GameList from '../../components/GamesList/GameList';
// import GameList from '../../components/GameList/GameList';
import { genres, platforms, sorting } from '../../data';
import { useAppDispatch } from '../../hooks/useRedux';
import { fetchGames } from '../../slices/gamesSlice';

function MainPage() {
  const [genre, setGenre] = useState<string | null>(null);
  const [platform, setPlatform] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchGames({
        genre,
        platform,
        sort
      }),
    );
  }, [genre, platform, sort]);

  return (
    <>
      <Helmet>
        <meta name="description" content="Game Shop" />
        <title>Games Library</title>
      </Helmet>
      <Flex m="0 auto" justify="space-between" align="flex-start" direction="column">
        <Flex gap="20px">
          <Select
            value={genre}
            onChange={setGenre}
            data={[...genres]}
            size="xl"
            mb="40px"
            placeholder="Choose game genre"
          />
          <Select
            value={platform}
            onChange={setPlatform}
            data={[...platforms]}
            size="xl"
            mb="40px"
            placeholder="Choose game platform"
          />
          <Select
            value={sort}
            onChange={setSort}
            data={[...sorting]}
            size="xl"
            mb="40px"
            placeholder="Sort by"
          />
        </Flex>

        <GameList />
      </Flex>
    </>
  );
}

export default MainPage;
