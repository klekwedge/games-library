import { lazy, Suspense, useState } from 'react';
import { MantineProvider, ColorSchemeProvider, AppShell, ColorScheme } from '@mantine/core';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import Spinner from '../Spinner/Spinner';

const MainPage = lazy(() => import('../../pages/MainPage/MainPage'));
const GamePage = lazy(() => import('../../pages/GamePage/GamePage'));
const Page404 = lazy(() => import('../../pages/Page404/Page404'));

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Router>
          <AppShell p="0px 10px" header={<Header />} maw="1400px" m="0 auto">
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/:gameId" element={<GamePage />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </Suspense>
          </AppShell>
        </Router>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
