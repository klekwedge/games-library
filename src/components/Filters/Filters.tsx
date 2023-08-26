import { useEffect, useState } from 'react';
import { Button, Flex, Select } from '@mantine/core';
import { genres, platforms, sorting } from '../../data';
import { useAppDispatch } from '../../hooks/useRedux';
import { fetchGames } from '../../slices/gamesSlice';

function Filters() {
  const [genre, setGenre] = useState<string | null>(null);
  const [platform, setPlatform] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const isButtonVisible = genre || platform || sort;

  const clearFilters = () => {
    setGenre(null);
    setPlatform(null);
    setSort(null);
  };

  useEffect(() => {
    dispatch(
      fetchGames({
        genre,
        platform,
        sort,
      }),
    );
  }, [genre, platform, sort]);

  return (
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
      <Select value={sort} onChange={setSort} data={[...sorting]} size="xl" mb="40px" placeholder="Sort by" />
      {isButtonVisible && (
        <Button onClick={clearFilters} size="xl">
          Clear filters
        </Button>
      )}
    </Flex>
  );
}

export default Filters;
