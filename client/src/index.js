import '@elastic/eui/dist/eui_theme_light.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import createCache from '@emotion/cache';
import { EuiProvider } from '@elastic/eui';
import { fetchUsers } from './features/users/usersSlice';

const cache = createCache({
  key: 'codesandbox',
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
