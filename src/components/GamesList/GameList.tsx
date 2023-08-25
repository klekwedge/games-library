import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Flex, Skeleton, Heading, List, ListItem, Image } from '@chakra-ui/react';
import { fetchGames } from '../../slices/gamesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import './GameList.scss';

function GameList() {
  const { games, gamesLoadingStatus } = useAppSelector((state) => state.games);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGames());
  }, []);

  const gameOnClick = (id: number) => {
    navigate(`/${id}`);
  };

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
      {/* <Heading as="h2" fontSize="48px" textTransform="capitalize" mb="8px" fontWeight="700">
        {genre ? `${genre} games` : mainTitle}
      </Heading> */}
      {/* {currentGenre && <Heading as="h3" fontSize="16px" mb="32px" dangerouslySetInnerHTML={defineDescription()} />} */}
      {games.length && (
        <Flex gap="70px" flexDirection="column">
          <AnimatePresence>
            <List display="flex" gap="20px" flexWrap="wrap">
              {games.map((game) => (
                <ListItem
                  onClick={() => gameOnClick(game.id)}
                  as={motion.li}
                  className="game-item"
                  key={game.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: '1' }}
                >
                  <Image
                    src={game.thumbnail}
                    alt={game.title}
                    objectFit="cover"
                    maxW="100%"
                    maxH="160px"
                    w="100%"
                    h="100%"
                  />
                  <Flex p="10px" flexDir="column" gap="5px" w="100%">
                    <Heading as="h4" fontWeight="500" fontSize="20px" transition="all 0.3s ease" color="#d4d4d4">
                      {game.title}
                    </Heading>
                    <Heading as="h4" fontWeight="500" fontSize="16px" color="#d4d4d4">
                      Genre: {game.genre}
                    </Heading>
                    <Heading as="h4" fontWeight="500" fontSize="16px" color="#d4d4d4">
                      Publisher: {game.publisher}
                    </Heading>
                    <Heading as="h4" fontWeight="500" fontSize="16px" color="#d4d4d4">
                      Release date: {game.release_date}
                    </Heading>
                  </Flex>
                </ListItem>
              ))}
            </List>
          </AnimatePresence>
        </Flex>
      )}
    </section>
  );
}

export default GameList;
