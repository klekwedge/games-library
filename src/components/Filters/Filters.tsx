import { useEffect, useState } from 'react';
import { Button, Flex, Select } from '@mantine/core';
import { genres, platforms, sorting } from '../../filters';
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
    <Flex gap="20px" wrap="wrap" mb="20px">
      <Select searchable value={genre} onChange={setGenre} data={genres} size="xl" placeholder="Choose genre" />
      <Select
        searchable
        value={platform}
        onChange={setPlatform}
        data={platforms}
        size="xl"
        placeholder="Choose platform"
      />
      <Select searchable value={sort} onChange={setSort} data={sorting} size="xl" placeholder="Sort by" />
      {isButtonVisible && (
        <Button onClick={clearFilters} size="xl">
          Clear filters
        </Button>
      )}
    </Flex>
  );
}

export default Filters;
