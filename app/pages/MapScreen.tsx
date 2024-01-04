import React, {useEffect} from 'react';
import {StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import MapboxGL from '@rnmapbox/maps';
import {navigationPost} from './utils/http';
import {TouchableOpacity} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission granted');
      // Now you can use the location services
    } else {
      console.log('Location permission denied');
      // Handle the case when the user denies the permission
    }
  } catch (err) {
    console.warn(err);
  }
}

Mapbox.setAccessToken(
  'pk.eyJ1IjoibWF0dGp3YW5nIiwiYSI6ImNsaXB5NDN1cTAzMnAza28xaG54ZWRrMzgifQ.cUju1vqjuW7XmAuO2iEZmg',
);

const hongKongCenter = {
  lng: 114.173355,
  lat: 22.320048,
};

const MapScreen = () => {
  const [lineString, setLineString] = React.useState(undefined);

  const [currentLocation, setCurrentLocation] = React.useState([
    hongKongCenter.lng,
    hongKongCenter.lat,
  ]);
  const [currentZoomLevel, setCurrentZoomLevel] = React.useState(16);

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
    requestLocationPermission();
    refreshRoute();
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera
            zoomLevel={currentZoomLevel}
            centerCoordinate={currentLocation}
            animationMode={'flyTo'}
            animationDuration={10}
          />
          <MapboxGL.UserLocation
            androidRenderMode="normal"
            animated={true}
            showsUserHeadingIndicator={true}
          />
          {lineString ? (
            <MapboxGL.ShapeSource id="line1" shape={lineString}>
              <MapboxGL.LineLayer
                id="linelayer1"
                style={{lineWidth: 5, lineColor: '#477bd6'}}
              />
            </MapboxGL.ShapeSource>
          ) : null}
        </MapboxGL.MapView>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => refreshRoute()}>
          <Text style={styles.buttonText}>Refresh Route</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonRight}
          activeOpacity={0.8}
          onPress={() => {
            setCurrentZoomLevel(16);
            Geolocation.getCurrentPosition(info => {
              setCurrentLocation([info.coords.longitude, info.coords.latitude]);

              console.log(info, currentLocation, currentZoomLevel);
            });
          }}>
          <Text style={styles.buttonText}>Recenter</Text>
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
    marginHorizontal: 5,
    width: '45%',
    bottom: 5,
    backgroundColor: '#3ead5c',
    padding: 10,
    borderRadius: 18,
    zIndex: 999,
  },
  buttonRight: {
    position: 'absolute',
    marginHorizontal: 5,
    width: '45%',
    bottom: 5,
    right: 0,
    backgroundColor: '#3ead5c',
    padding: 10,
    borderRadius: 18,
    zIndex: 999,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
