import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Flex, Skeleton, Title, Image, Pagination } from '@mantine/core';
import { useAppSelector } from '../../hooks/useRedux';
import './GameList.scss';


function GameList() {
  const [page, setPage] = useState(1);
  const { games, gamesLoadingStatus } = useAppSelector((state) => state.games);
  const navigate = useNavigate();

  const gameOnClick = (id: number) => {
    navigate(`/${id}`);
  };

  if (gamesLoadingStatus === 'loading') {
    return (
      <Flex gap="20px" wrap="wrap">
        {[...Array(20).keys()].map(() => (
          <Skeleton key={uuidv4()} width="256px" h="200px" radius="10px" />
        ))}
      </Flex>
    );
  }

  //   if (gamesLoadingStatus === 'error') {
  //     return <ErrorMessage />;
  //   }

  return (
    <section>
      {games.length && (
        <Flex gap="70px" direction="column" align="center" p="20px 0px">
          <Flex display="flex" gap="20px" wrap="wrap">
            {games.slice((page - 1) * 20, page * 20).map((game) => (
              <Flex onClick={() => gameOnClick(game.id)} className="game-item" key={game.id}>
                <Image src={game.thumbnail} alt={game.title} fit="cover" maw="100%" mah="160px" w="100%" h="100%" />
                <Flex p="20px" direction="column" gap="5px" w="100%">
                  <Title order={4} fw="500" fz="20px" color="#d4d4d4">
                    {game.title}
                  </Title>
                  <Title order={4} fw="500" fz="16px" color="#d4d4d4">
                    Genre: {game.genre}
                  </Title>
                  <Title order={4} fw="500" fz="16px" color="#d4d4d4">
                    Publisher: {game.publisher}
                  </Title>
                  <Title order={4} fw="500" fz="16px" color="#d4d4d4">
                    Release date: {game.release_date}
                  </Title>
                </Flex>
              </Flex>
            ))}
          </Flex>
          <Pagination
            onChange={(value) => setPage(value)}
            value={page}
            total={Math.ceil(games.length / 20)}
            size="xl"
          />
        </Flex>
      )}
    </section>
  );
}

export default GameList;
