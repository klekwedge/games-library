import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Flex, Skeleton, Title, Image } from '@mantine/core';
import { useAppSelector } from '../../hooks/useRedux';
import './GameList.scss';

function GameList() {
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
      {/* <Heading as="h2" fontSize="48px" textTransform="capitalize" mb="8px" fontWeight="700">
        {genre ? `${genre} games` : mainTitle}
      </Heading> */}
      {/* {currentGenre && <Heading as="h3" fontSize="16px" mb="32px" dangerouslySetInnerHTML={defineDescription()} />} */}
      {games.length && (
        <Flex gap="70px" direction="column">
          <Flex display="flex" gap="20px" wrap="wrap">
            {games.map((game) => (
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
        </Flex>
      )}
    </section>
  );
}

export default GameList;
