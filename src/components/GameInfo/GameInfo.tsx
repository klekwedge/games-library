import { AiFillInfoCircle } from 'react-icons/ai';
import { BsFillCpuFill } from 'react-icons/bs';
import { FaGamepad, FaMemory } from 'react-icons/fa';
import { FiHardDrive } from 'react-icons/fi';
import { SiNvidia } from 'react-icons/si';
import { Text, createStyles, Group, Paper, SimpleGrid, rem } from '@mantine/core';

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

export interface StatsGrid {
  title: string;
  icon: keyof typeof icons;
  value: string;
}

function GameInfo({ data, cols }: { data: StatsGrid[]; cols: number }) {
  const { classes } = useStyles();

  const cards = data.map((stat) => {
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
    <div className={classes.root}>
        <SimpleGrid
          cols={cols}
          breakpoints={[
            { maxWidth: 'md', cols: 2 },
            { maxWidth: 'xs', cols: 1 },
          ]}
        >
          {cards}
        </SimpleGrid>
    </div>
  );
}

export default GameInfo;
