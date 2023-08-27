import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { Flex, Box, Text, Title, Image, Skeleton } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { Helmet } from 'react-helmet';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchGame } from '../../slices/gamesSlice';
import './GamePage.scss';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import GameCard, { StatsGrid } from '../../components/GameCard/GameCard';

function GamePage() {
  const dispatch = useAppDispatch();
  const { gameId } = useParams();
  const { currentGame, currentGameLoadingStatus } = useAppSelector((state) => state.games);

  const [info, setInfo] = useState<StatsGrid[]>([]);
  const [requirements, setRequirements] = useState<StatsGrid[]>([]);

  useEffect(() => {
    if (gameId) {
      dispatch(fetchGame(+gameId));
    }
  }, []);

  useEffect(() => {
    if (currentGame) {
      setInfo([
        { title: 'Genre', icon: 'genre', value: currentGame.genre },
        { title: 'Publisher', icon: 'publisher', value: currentGame.publisher },
        { title: 'Developer', icon: 'developer', value: currentGame.developer },
        { title: 'Release date', icon: 'releaseDate', value: new Date(currentGame.release_date).toLocaleDateString() },
      ]);

      if (currentGame.minimum_system_requirements) {
        setRequirements([
          { title: 'OS', icon: 'os', value: currentGame.minimum_system_requirements.os },
          { title: 'Processor', icon: 'processor', value: currentGame.minimum_system_requirements.processor },
          { title: 'Graphics', icon: 'graphics', value: currentGame.minimum_system_requirements.graphics },
          { title: 'Memory', icon: 'memory', value: currentGame.minimum_system_requirements.memory },
          { title: 'Storage', icon: 'storage', value: currentGame.minimum_system_requirements.storage },
        ]);
      }
    }
  }, [currentGame]);

  if (currentGameLoadingStatus === 'error') {
    return <ErrorMessage />;
  }

  // useEffect(() => {
  //   // const currentDate = new Date();

  //   // localStorage.setItem(
  //   //   'games',
  //   //   JSON.stringify([
  //   //     {
  //   //       fff: 12,
  //   //       f: 'fefw',
  //   //     },
  //   //   ]),
  //   // );

  //   // const games = localStorage.getItem('games');

  //   // if (games) {
  //   //   console.log(JSON.parse(games));
  //   // }

  //   // const interval = setInterval(() => {
  //   //   const date = new Date();

  //   //   const diff = (date.getTime() - currentDate.getTime()) / 1000 / 60;

  //   //   console.log(Math.abs(Math.round(diff)));
  //   // }, 60000);
  //   // return () => clearInterval(interval);
  // }, []);

  return (
    <>
      <Helmet>
        <meta name="description" content={`${currentGame ? currentGame.title : 'Game Library'}`} />
        <title>{currentGame ? currentGame.title : 'Game Library'}</title>
      </Helmet>
      <main>
        {currentGame && (
          <Box>
            <Title order={2} fz="24px" mb='10px'>
              <Link to="/" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BsArrowLeft size="50px" />
                Go back to the main page
              </Link>
            </Title>

            <Skeleton visible={currentGameLoadingStatus === 'loading'} height="40px" mb="30px" ml="auto">
              <Title order={1} align="right" fz="38px" mb="30px">
                {currentGame.title}
              </Title>
            </Skeleton>
            <Flex className="game__main" justify="space-between" gap="50px" mb="30px">
              <Skeleton className="game__image" visible={currentGameLoadingStatus === 'loading'} maw="900px">
                <Image src={currentGame.thumbnail} alt={currentGame.title} fit="cover" w="100%" />
              </Skeleton>

              <Skeleton className="game__descr" visible={currentGameLoadingStatus === 'loading'} maw="400px">
                <Text fz="xl">{currentGame.description}</Text>
              </Skeleton>
            </Flex>
            <Skeleton visible={currentGameLoadingStatus === 'loading'}>
              <GameCard data={info} cols={4} />
            </Skeleton>
            <Skeleton visible={currentGameLoadingStatus === 'loading'}>
              <Carousel maw="100%" mx="auto" withIndicators>
                {currentGame.screenshots.map((screenshot) => (
                  <Carousel.Slide key={screenshot.id} h="100%" mah="600px">
                    <Image src={screenshot.image} alt={currentGame.title} />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Skeleton>

            <Box p="40px 0px">
              <Skeleton visible={currentGameLoadingStatus === 'loading'}>
                {currentGame.minimum_system_requirements && (
                  <>
                    <Title order={3} fz="30px" mb="20px">
                      Requirements:
                    </Title>
                    <GameCard data={requirements} cols={5} />
                  </>
                )}
              </Skeleton>
            </Box>
          </Box>
        )}
      </main>
    </>
  );
}

export default GamePage;
