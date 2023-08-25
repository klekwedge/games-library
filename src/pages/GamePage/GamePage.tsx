import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Box, Image } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchGame } from '../../slices/gamesSlice';

function GamePage() {
  const dispatch = useAppDispatch();
  const { currentGame } = useAppSelector((state) => state.games);
  const { gameId } = useParams();

  useEffect(() => {
    if (gameId) {
      dispatch(fetchGame(+gameId));
    }
  }, []);

  console.log(currentGame);

  // картинка/постер
  // карусель скриншотов
  // системные требования

  return (
    <>
      <Helmet>
        {/* <meta name="description" content={`${currentGame ? currentGame.name : 'Current Game'} - Game Shop`} /> */}
        {/* <title>{currentGame ? currentGame.name : 'Current Game'}- Game Shop</title> */}
      </Helmet>
      <main>
        {currentGame && (
          <Box>
            <h1>{currentGame.title}</h1>
            <Flex justifyContent="space-between" gap="50px">
              <Image
                src={currentGame.thumbnail}
                alt={currentGame.title}
                objectFit="cover"
                flex="1 1 50%"
                w="100%"
                h="100%"
                borderRadius="20px"
              />

              <Box flex="1 1 50%" p="10px 0px">
                <h2>About</h2>
                <p>{currentGame.description}</p>
              </Box>
            </Flex>
            <Flex justifyContent="space-between">
              <Box>
                <h3>Genre: {currentGame.genre}</h3>
                <h3> Publisher: {currentGame.publisher}</h3>
                <h3> Developer: {currentGame.developer}</h3>
                <h3> Release date: {currentGame.release_date}</h3>
              </Box>
              <Box>
                Requirements:
                {Object.entries(currentGame.minimum_system_requirements).map((requirement) => (
                  <h3 key={requirement[0]}>
                    {requirement[0][0].toUpperCase() + requirement[0].slice(1)}: {requirement[1]}
                  </h3>
                ))}
              </Box>
            </Flex>
            <Flex flexWrap="wrap" gap="20px" alignItems="center">
              {currentGame.screenshots.map((screenshot) => (
                <Image key={screenshot.id} src={screenshot.image} alt={currentGame.title} />
              ))}
            </Flex>
          </Box>
        )}
      </main>
    </>
  );
}

export default GamePage;
