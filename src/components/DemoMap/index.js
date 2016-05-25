
import React, { Component, StyleSheet, View } from 'react-native';
import Mapbox from 'react-native-mapbox-gl';
import config from 'Tesloop/src/config';

import DemoMapStyles from './styles';

class DemoMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			center: {
				latitude: 40.7223,
				longitude: -73.9878
			},
		};
	};
	componentWillMount() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				let latitude = position.coords.latitude;
				let longitude = position.coords.longitude;
				this.setState({center: {latitude: latitude, longitude: longitude}});
			}
		)
	};
	render() {
		return (
			<View style={ DemoMapStyles.container }>
				<Mapbox
					annotations={ this.props.annotations }
					accessToken={ config.mapbox.accessToken }
					centerCoordinate={ this.state.center }
					debugActive={ false }
					direction={ 0 }
					ref={ 'map' }
					rotateEnabled={ false }
					scrollEnabled={ true }
					showsUserLocation={ true }
					style={ DemoMapStyles.mapContainer }
					styleURL={ config.mapbox.styleURL }
					zoomEnabled={ true }
					zoomLevel={ 10 }
					compassIsHidden={ true }
				/>
			</View>
		)
	}
}

export default DemoMap;
