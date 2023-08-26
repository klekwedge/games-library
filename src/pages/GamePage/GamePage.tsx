import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillInfoCircle } from 'react-icons/ai';
import { BsFillCpuFill } from 'react-icons/bs';
import { FaGamepad, FaMemory } from 'react-icons/fa';
import { FiHardDrive } from 'react-icons/fi';
import { SiNvidia } from 'react-icons/si';
import { Flex, Box, Text, Title, Image, createStyles, Group, Paper, SimpleGrid, rem } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { Helmet } from 'react-helmet';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchGame } from '../../slices/gamesSlice';
import './GamePage.scss';

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
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
  const { currentGame } = useAppSelector((state) => state.games);

  const [info, setInfo] = useState<StatsGrid[]>([]);
  const [requirements, setRequirements] = useState<StatsGrid[]>([]);

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

      setRequirements([
        { title: 'OS', icon: 'os', value: currentGame.minimum_system_requirements.os },
        { title: 'Processor', icon: 'processor', value: currentGame.minimum_system_requirements.processor },
        { title: 'Graphics', icon: 'graphics', value: currentGame.minimum_system_requirements.graphics },
        { title: 'Memory', icon: 'memory', value: currentGame.minimum_system_requirements.memory },
        { title: 'Storage', icon: 'storage', value: currentGame.minimum_system_requirements.storage },
      ]);
    }
  }, [currentGame]);

  return (
    <>
      <Helmet>
        <meta name="description" content={`${currentGame ? currentGame.title : 'Game Library'}`} />
        <title>{currentGame ? currentGame.title : 'Game Library'}</title>
      </Helmet>
      <main>
        {currentGame && (
          <Box>
            <Title order={1} align="right" fz="38px" mb="30px">
              {currentGame.title}
            </Title>
            <Flex justify="space-between" gap="50px">
              <Image
                className="game__image"
                src={currentGame.thumbnail}
                alt={currentGame.title}
                fit="cover"
                w="100%"
                h="100%"
              />

              <Text fz="xl" className="game__descr">
                {currentGame.description}
              </Text>
            </Flex>

            <div className={classes.root}>
              <SimpleGrid
                cols={4}
                breakpoints={[
                  { maxWidth: 'md', cols: 2 },
                  { maxWidth: 'xs', cols: 1 },
                ]}
              >
                {stats}
              </SimpleGrid>
            </div>
            <Carousel maw="100%" mx="auto" withIndicators>
              {currentGame.screenshots.map((screenshot) => (
                <Carousel.Slide key={screenshot.id} h="100%" mah="600px">
                  <Image src={screenshot.image} alt={currentGame.title} />
                </Carousel.Slide>
              ))}
            </Carousel>
            <Box p="40px 0px">
              <Title order={3} fz="30px" mb="20px">
                {' '}
                Requirements:
              </Title>
              <SimpleGrid
                cols={5}
                breakpoints={[
                  { maxWidth: 'md', cols: 2 },
                  { maxWidth: 'xs', cols: 1 },
                ]}
              >
                {minRequirements}
              </SimpleGrid>
            </Box>
          </Box>
        )}
      </main>
    </>
  );
}

export default GamePage;
