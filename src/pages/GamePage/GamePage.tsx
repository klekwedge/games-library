import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Box, Text, Title, Image } from '@mantine/core';
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
            <Title order={1}>{currentGame.title}</Title>
            <Flex justify="space-between" gap="50px">
              <Image src={currentGame.thumbnail} alt={currentGame.title} fit="cover" w="100%" h="100%" />
              <Box p="10px 0px">
                <Title order={2}>About</Title>
                <Text fz="xl">{currentGame.description}</Text>
              </Box>
            </Flex>
            <Flex justify="space-between">
              <Box>
                <Title order={3}>Genre: {currentGame.genre}</Title>
                <Title order={3}>Publisher: {currentGame.publisher}</Title>
                <Title order={3}>Developer: {currentGame.developer}</Title>
                <Title order={3}>Release date: {currentGame.release_date}</Title>
              </Box>
              <Box>
                <Title order={3}> Requirements:</Title>
                {Object.entries(currentGame.minimum_system_requirements).map((requirement) => (
                  <Title order={4} key={requirement[0]}>
                    {requirement[0][0].toUpperCase() + requirement[0].slice(1)}: {requirement[1]}
                  </Title>
                ))}
              </Box>
            </Flex>
            <Flex wrap="wrap" gap="20px" align="center">
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
