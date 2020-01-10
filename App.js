import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';




class App extends React.Component {
  state = {
    route: null,
    coords: [],
  };


  componentDidMount = () => {
    const mode = 'driving'; // 'walking';
    const origin = 'Puppet, Portland';
    const destination = 'Pioneer Courthouse, Portland';
    const APIKEY = 'AIzaSyDApoxd20oQKzx3PzWr_sACWsQ0HRGGLN0';
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.routes.length) {
          this.setState({
            coords: this.decode(responseJson.routes[0].overview_polyline.points)
          })
        }
      }).catch(e => console.warn(e))
  }

 decode (t, e) {
    for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0,
         a = null, c = Math.pow(10, e || 5) ;
         u < t.length
         ;
        ) {

        a = null, h = 0, i = 0

        do
            a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5;
        while (a >= 32)

        n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0

        do
            a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5;
        while (a >= 32)

        o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o,
            d.push([l / c, r / c])
    }
    return d.map(
               function (t) {
                   return {latitude: t[0], longitude: t[1]}
               })
}

renderRoute (coords, i) {
  return (
    <MapView.Polyline
          key={i}
          coordinates={coords}
          strokeWidth={4}
        />
  );
}

  render() {
    return (
    <View style={styles.container}>
      <MapView
        showsUserLocation
        followsUserLocation
        loadingEnabled
        initialRegion={{
          latitude: 45.5289487,
          longitude: -122.6983163,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={MapView.PROVIDER_GOOGLE}
        style={styles.mapStyle}
        >
        <MapView.Polyline
  coordinates={[...this.state.coords]}
  strokeWidth={4}
/>
        </MapView>
    </View>
  );
  }

}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
