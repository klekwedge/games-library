import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './components/App/App';
import './main.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <MantineProvider>
      <App />
    </MantineProvider>
  </Provider>,
);
