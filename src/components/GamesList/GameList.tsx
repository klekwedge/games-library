import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Flex, Title, Image, Pagination, Skeleton, Card } from '@mantine/core';
import { useAppSelector } from '../../hooks/useRedux';
import './GameList.scss';

function GameList() {
  const [page, setPage] = useState(1);
  const { gamesLoadingStatus, games } = useAppSelector((state) => state.games);
  const navigate = useNavigate();

  const gameOnClick = (id: number) => {
    navigate(`/${id}`);
  };

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
              <Card
                shadow="sm"
                radius="md"
                p="0"
                withBorder
                onClick={() => gameOnClick(game.id)}
                className="game__item"
                key={game.id}
              >
                <Image src={game.thumbnail} alt={game.title} fit="cover" maw="100%" w="100%" />
                <Flex p="10px 20px 20px" direction="column" gap="5px" w="100%">
                  <Title order={4} fw="500" fz="20px">
                    {game.title}
                  </Title>
                  <Title order={4} fw="500" fz="16px">
                    Genre: {game.genre}
                  </Title>
                  <Title order={4} fw="500" fz="16px">
                    Publisher: {game.publisher}
                  </Title>
                  <Title order={4} fw="500" fz="16px">
                    Release date: {new Date(game.release_date).toLocaleDateString()}
                  </Title>
                </Flex>
              </Card>
            ))}
          </Flex>
          <Pagination
            onChange={(value) => setPage(value)}
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
