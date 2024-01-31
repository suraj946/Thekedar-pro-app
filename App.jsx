import React from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import {danger, theme_primary, theme_secondary} from './src/styles/colors';
import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/redux/store';
import { Provider } from 'react-redux'

const theme = {
  ...DefaultTheme,
  colors: {
      ...DefaultTheme.colors,
      primary: theme_primary,
      secondary: theme_secondary,
      error: danger,
  },
};

function App(){
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
}

export default App;
