import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillInfoCircle } from 'react-icons/ai';
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
};

interface StatsGrid {
  title: string;
  icon: keyof typeof icons;
  value: string;
  diff: number;
}

function GamePage() {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const { gameId } = useParams();
  const { currentGame } = useAppSelector((state) => state.games);

  const [data, setData] = useState<StatsGrid[]>([]);

  const stats = data.map((stat) => {
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
      setData([
        { title: 'Genre', icon: 'genre', value: currentGame.genre, diff: 5 },
        { title: 'Publisher', icon: 'publisher', value: currentGame.publisher, diff: 5 },
        { title: 'Developer', icon: 'developer', value: currentGame.developer, diff: 5 },
        { title: 'Release date', icon: 'releaseDate', value: currentGame.release_date, diff: 5 },
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
                <Carousel.Slide key={screenshot.id}>
                  <Image src={screenshot.image} alt={currentGame.title} />
                </Carousel.Slide>
              ))}
            </Carousel>
            <Box>
              <Title order={3}> Requirements:</Title>
              {Object.entries(currentGame.minimum_system_requirements).map((requirement) => (
                <Title order={4} key={requirement[0]}>
                  {requirement[0][0].toUpperCase() + requirement[0].slice(1)}: {requirement[1]}
                </Title>
              ))}
            </Box>
          </Box>
        )}
      </main>
    </>
  );
}

export default GamePage;
