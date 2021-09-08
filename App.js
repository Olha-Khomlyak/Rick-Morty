import React from 'react';
import Navigator from './src/navigation/Navigator'
import { Provider } from 'react-redux';
import store from './src/appstate/store';


const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

export default App;