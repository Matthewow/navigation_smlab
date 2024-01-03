/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './app/pages/HomeScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapScreen from './app/pages/MapScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isMapDisplayed, setIsMapDisplayed] = React.useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {isMapDisplayed ? (
            <MapScreen />
          ) : (
            <HomeScreen setIsMapDisplayed={setIsMapDisplayed} />
          )}
        </View>
      </>
    </SafeAreaView>
  );
}

export default App;
