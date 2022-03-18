import { EuiProvider } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';
import createCache from '@emotion/cache';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { fetchUsers } from './features/users/usersSlice';
// import { getToken } from './utils/HelperFunctions';

const cache = createCache({
  key: 'social-app',
  container: document.querySelector('meta[name="global-styles"]'),
});

store.dispatch(fetchUsers());

ReactDOM.render(
  <React.StrictMode>
    <EuiProvider cache={cache}>
      <Provider store={store}>
        <App />
      </Provider>
    </EuiProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
