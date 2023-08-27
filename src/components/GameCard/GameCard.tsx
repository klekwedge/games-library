import { useNavigate } from 'react-router-dom';
import { Flex, Title, Image, Card } from '@mantine/core';
import './GameCard.scss';
import { IGame } from '../../types';

function GameCard({ game }: { game: IGame }) {
  const navigate = useNavigate();

  const gameOnClick = (id: number) => {
    navigate(`/${id}`);
  };

  return (
    <Card shadow="sm" radius="md" withBorder onClick={() => gameOnClick(game.id)} className="game__item" key={game.id}>
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
  );
}

export default GameCard;
