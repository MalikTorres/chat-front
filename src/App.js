import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux/socketApi'; // Import your root reducer
import SocketConnection from './components/socketRequest';

const store = configureStore({
  reducer: rootReducer,
});

function App() {
  return (
    <Provider store={store}>
      <div>
        <SocketConnection />
      </div>
    </Provider>
  );
}

export default App;
