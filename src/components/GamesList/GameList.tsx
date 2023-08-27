import { v4 as uuidv4 } from 'uuid';
import { Flex, Pagination, Skeleton } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import GameCard from '../GameCard/GameCard';
import { setPage } from '../../slices/gamesSlice';

function GameList() {
  const dispatch = useAppDispatch();
  const { gamesLoadingStatus, games, page } = useAppSelector((state) => state.games);

  if (gamesLoadingStatus === 'loading') {
    return (
      <Flex gap="20px" wrap="wrap">
        {[...Array(20).keys()].map(() => (
          <Skeleton key={uuidv4()} miw="220px" style={{ flex: '1 1 23%' }} h="200px" radius="10px" />
        ))}
      </Flex>
    );
  }

  return (
    <section>
      {games.length ? (
        <Flex gap="70px" direction="column" align="center" p="20px 0px">
          <Flex display="flex" gap="20px" wrap="wrap">
            {games.slice((page - 1) * 20, page * 20).map((game) => (
              <GameCard game={game} key={game.id} />
            ))}
          </Flex>
          <Pagination
            onChange={(value) => dispatch(setPage(value))}
            value={page}
            total={Math.ceil(games.length / 20)}
            size="xl"
          />
        </Flex>
      ) : null}
    </section>
  );
}

export default GameList;
