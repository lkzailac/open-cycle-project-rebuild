import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { UserModalProvider } from './context/UserModal';
// import EditProdModal from './components/EditProdModal';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <UserModalProvider>
          <App />
        </UserModalProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
