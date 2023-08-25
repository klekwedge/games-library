import { lazy, Suspense } from 'react';
import { Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from '../Header/Header';
// import Spinner from '../Spinner/Spinner';

const MainPage = lazy(() => import('../../pages/MainPage/MainPage'));
const GamePage = lazy(() => import('../../pages/GamePage/GamePage'));
const Page404 = lazy(() => import('../../pages/Page404/Page404'));

function App() {
  return (
    <Router>
      <Flex justifyContent="center" flexDir="column" m="0 auto" maxWidth="1400px" p="20px">
        {/* <Header /> */}
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/:gameId" element={<GamePage />} />
            <Route path="*" element={<Page404 />} /> 
          </Routes>
        </Suspense>
      </Flex>
    </Router>
  );
}

export default App;
