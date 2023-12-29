import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import MapboxGL from '@rnmapbox/maps';
import {navigationPost} from './utils/http';
import {TouchableOpacity} from 'react-native';
import {Image} from '@rneui/base';

Mapbox.setAccessToken(
  'pk.eyJ1IjoibWF0dGp3YW5nIiwiYSI6ImNsaXB5NDN1cTAzMnAza28xaG54ZWRrMzgifQ.cUju1vqjuW7XmAuO2iEZmg',
);

const hongKongCenter = {
  lng: 114.173355,
  lat: 22.320048,
};

const MapScreen = () => {
  const [lineString, setLineString] = React.useState({
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: [],
    },
  });

  const [currentLocation, setCurrentLocation] = React.useState([
    hongKongCenter.lng,
    hongKongCenter.lat,
  ]);

  const refreshRoute = () => {
    navigationPost(`${hongKongCenter.lat}_${hongKongCenter.lng}`).then(
      newRoute => {
        setLineString({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: newRoute || [],
          },
        });
      },
    );
  };

  useEffect(() => {
    refreshRoute();
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera
            zoomLevel={16}
            centerCoordinate={currentLocation}
            animationMode={'flyTo'}
            animationDuration={10}
          />
          <MapboxGL.ShapeSource id="line1" shape={lineString}>
            <MapboxGL.LineLayer
              id="linelayer1"
              style={{lineWidth: 5, lineColor: '#477bd6'}}
            />
          </MapboxGL.ShapeSource>
          <MapboxGL.PointAnnotation
            id="default-marker"
            coordinate={currentLocation}>
            <View style={styles.markerImage} />
          </MapboxGL.PointAnnotation>
        </MapboxGL.MapView>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => refreshRoute()}>
          <Text style={styles.buttonText}>Refresh Route</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
  markerImage: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 40,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#193685',
  },
  button: {
    position: 'absolute',
    marginHorizontal: 8,
    width: '40%',
    bottom: 32,
    backgroundColor: '#3ead5c',
    padding: 10,
    borderRadius: 20,
    zIndex: 999,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
