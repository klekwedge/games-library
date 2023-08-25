import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image } from '@chakra-ui/react';
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

  // картинка/постер
  // карусель скриншотов
  // системные требования

  return (
    <>
      <Helmet>
        {/* <meta name="description" content={`${currentGame ? currentGame.name : 'Current Game'} - Game Shop`} /> */}
        {/* <title>{currentGame ? currentGame.name : 'Current Game'}- Game Shop</title> */}
      </Helmet>
      <main>
        {currentGame && (
          <>
            <div className="flex justify-between items-center mb-8">
              <Image
                src={currentGame.thumbnail}
                alt={currentGame.title}
                objectFit="cover"
                maxW="100%"
                maxH="160px"
                w="100%"
                h="100%"
              />
              <Box alignSelf="flex-end" display="flex" gap="15px" flexDirection="column" alignItems="flex-end">
                <h1 className="text-5xl mb-4 text-right">{currentGame.title}</h1>
                <Box display="inline-flex" gap="20px" alignItems="center" justifyContent="flex-end">
                  {currentGame.genre}
                </Box>
                <Box display="inline-flex" gap="20px" alignItems="center" justifyContent="flex-end">
                  {currentGame.publisher}
                </Box>
                <Box display="inline-flex" gap="20px" alignItems="center" justifyContent="flex-end">
                  {currentGame.developer}
                </Box>
                <Box display="inline-flex" gap="20px" alignItems="center" justifyContent="flex-end">
                  {currentGame.release_date}
                </Box>
                <Box display="inline-flex" gap="20px" alignItems="center" justifyContent="flex-end">
                  {Object.entries(currentGame.minimum_system_requirements).map((requirement) => (
                    <h3 key={requirement[0]}>
                      {requirement[0][0].toUpperCase() + requirement[0].slice(1)}: {requirement[1]}
                    </h3>
                  ))}
                </Box>
              </Box>
            </div>

            <div className="flex gap-10 mb-20">
              <p className="bg-zinc-800 p-10 rounded-lg max-w-xl">{currentGame.description}</p>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default GamePage;
