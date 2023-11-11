import {Button} from '@rneui/themed';
import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';

const HomeScreen = () => (
  <View style={styles.container}>
    <ImageBackground
      source={require('../assets/home-background-image.jpg')}
      style={styles.image}>
      <View style={styles.overlay} />
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>HKU SMLAB Navigation</Text>
        <View style={styles.buttonContainer}>
          <Button
            type="solid"
            color="#2b406e"
            radius="10"
            title="Get Started"
            onPress={() => console.log('Get Started Pressed')}
          />
        </View>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 900,
    justifyContent: 'space-between',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 20,
  },
});

export default HomeScreen;
