import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Flex, Skeleton } from '@chakra-ui/react';
import './GameList.scss';
import { fetchGames } from '../../slices/gamesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

function GameList() {
  const { games, gamesLoadingStatus } = useAppSelector((state) => state.games);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchGames('https://www.freetogame.com/api/games'));
  }, []);

  if (gamesLoadingStatus === 'loading') {
    return (
      <Flex gap="20px" flexWrap="wrap">
        {[...Array(20).keys()].map(() => (
          <Skeleton key={uuidv4()} width="256px" h="200px" flex="1 1 20%" borderRadius="10px" />
        ))}
      </Flex>
    );
  }

//   if (gamesLoadingStatus === 'error') {
//     return <ErrorMessage />;
//   }


  return (
    <section>
     fff
    </section>
  );
}

export default GameList;
