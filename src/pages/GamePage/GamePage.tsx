import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { AiFillInfoCircle } from 'react-icons/ai';
import { BsFillCpuFill } from 'react-icons/bs';
import { FaGamepad, FaMemory } from 'react-icons/fa';
import { FiHardDrive } from 'react-icons/fi';
import { SiNvidia } from 'react-icons/si';
import { Flex, Box, Text, Title, Image, createStyles, Group, Paper, SimpleGrid, rem, Skeleton } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { Helmet } from 'react-helmet';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchGame } from '../../slices/gamesSlice';
import './GamePage.scss';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const useStyles = createStyles((theme) => ({
  root: {
    marginBottom: '40px',
  },

  value: {
    fontSize: rem(22),
    fontWeight: 700,
    lineHeight: 1,
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    fontSize: rem(24),
  },
}));

const icons = {
  genre: AiFillInfoCircle,
  publisher: AiFillInfoCircle,
  developer: AiFillInfoCircle,
  releaseDate: AiFillInfoCircle,
  os: FaGamepad,
  processor: BsFillCpuFill,
  graphics: SiNvidia,
  memory: FaMemory,
  storage: FiHardDrive,
};

interface StatsGrid {
  title: string;
  icon: keyof typeof icons;
  value: string;
}

function GamePage() {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const { gameId } = useParams();
  const { currentGame, currentGameLoadingStatus } = useAppSelector((state) => state.games);

  console.log(currentGameLoadingStatus);

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

  const stats = info.map((stat) => {
    const Icon = icons[stat.icon];

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" />
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
        </Group>
      </Paper>
    );
  });

  const minRequirements = requirements.map((stat) => {
    const Icon = icons[stat.icon];

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" />
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
        </Group>
      </Paper>
    );
  });

  return (
    <>
      <Helmet>
        <meta name="description" content={`${currentGame ? currentGame.title : 'Game Library'}`} />
        <title>{currentGame ? currentGame.title : 'Game Library'}</title>
      </Helmet>
      <main>
        {currentGame && (
          <Box>
            <Skeleton visible={currentGameLoadingStatus === 'loading'} maw="200px" height="40px" mb="30px" ml="auto">
              <Title order={1} align="right" fz="38px" mb="30px">
                {currentGame.title}
              </Title>
            </Skeleton>
            <Flex justify="space-between" gap="50px" mb="30px">
              <Skeleton visible={currentGameLoadingStatus === 'loading'} maw="900px">
                <Image
                  className="game__image"
                  src={currentGame.thumbnail}
                  alt={currentGame.title}
                  fit="cover"
                  w="100%"
                  h="100%"
                />
              </Skeleton>

              <Skeleton visible={currentGameLoadingStatus === 'loading'} maw="400px" height="100%">
                <Text fz="xl" className="game__descr">
                  {currentGame.description}
                </Text>
              </Skeleton>
            </Flex>

            <div className={classes.root}>
              <Skeleton visible={currentGameLoadingStatus === 'loading'}>
                <SimpleGrid
                  cols={4}
                  breakpoints={[
                    { maxWidth: 'md', cols: 2 },
                    { maxWidth: 'xs', cols: 1 },
                  ]}
                >
                  {stats}
                </SimpleGrid>
              </Skeleton>
            </div>
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
                  <Title order={3} fz="30px" mb="20px">
                    Requirements:
                  </Title>
                )}

                <SimpleGrid
                  cols={5}
                  breakpoints={[
                    { maxWidth: 'md', cols: 2 },
                    { maxWidth: 'xs', cols: 1 },
                  ]}
                >
                  {minRequirements}
                </SimpleGrid>
              </Skeleton>
            </Box>
          </Box>
        )}
      </main>
    </>
  );
}

export default GamePage;
