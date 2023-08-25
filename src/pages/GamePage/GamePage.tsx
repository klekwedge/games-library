import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

  return (
    <>
      <Helmet>
        {/* <meta name="description" content={`${currentGame ? currentGame.name : 'Current Game'} - Game Shop`} /> */}
        {/* <title>{currentGame ? currentGame.name : 'Current Game'}- Game Shop</title> */}
      </Helmet>
      <main>fff</main>
    </>
  );
}

export default GamePage;
