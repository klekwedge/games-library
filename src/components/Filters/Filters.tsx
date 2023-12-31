import { useEffect, useState } from 'react';
import { Button, Flex, Select } from '@mantine/core';
import { genres, platforms, sorting } from '../../filters';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import {
  clearFilters,
  fetchGames,
  incAttemptsGetGames,
  setGenre,
  setPage,
  setPlatform,
  setSort,
} from '../../slices/gamesSlice';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function Filters() {
  const { genre, platform, sort, gamesLoadingStatus, attemptsGetGames } = useAppSelector((state) => state.games);
  const dispatch = useAppDispatch();

  const isButtonVisible = genre || platform || sort;

  const clear = () => {
    dispatch(clearFilters());
  };

  const request = () => {
    dispatch(incAttemptsGetGames());
    dispatch(setPage(1));
    dispatch(
      fetchGames({
        genre,
        platform,
        sort,
      }),
    );
  };

  useEffect(() => {
    request();
  }, [genre, platform, sort]);

  if (gamesLoadingStatus === 'error') {
    return <ErrorMessage attempts={attemptsGetGames} reRequest={request} />;
  }

  return (
    <Flex gap="20px" wrap="wrap" mb="20px">
      <Select
        searchable
        value={genre}
        onChange={(value) => dispatch(setGenre(value))}
        data={genres}
        size="xl"
        placeholder="Choose genre"
      />
      <Select
        searchable
        value={platform}
        onChange={(value) => dispatch(setPlatform(value))}
        data={platforms}
        size="xl"
        placeholder="Choose platform"
      />
      <Select
        searchable
        value={sort}
        onChange={(value) => dispatch(setSort(value))}
        data={sorting}
        size="xl"
        placeholder="Sort by"
      />
      {isButtonVisible && (
        <Button onClick={clear} size="xl">
          Clear filters
        </Button>
      )}
    </Flex>
  );
}

export default Filters;
