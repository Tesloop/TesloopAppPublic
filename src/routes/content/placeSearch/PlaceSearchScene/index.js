'use strict';

import React, { Image, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PlaceSearchSceneStyles from './styles';

import NativeButton from 'Tesloop/src/components/NativeButton';
import Toolbar from 'Tesloop/src/components/Toolbar';

import config from 'Tesloop/src/config';

class PlaceSearchScene extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		console.log('PlaceSearchScene: Render()');
		let currentRoutes  = this.props.navigator.getCurrentRoutes();
		let currentRoute   = currentRoutes[ currentRoutes.length - 1 ];
		let searchType     = currentRoute.searchType;
		let searchCallback = currentRoute.placeSearchCallback;
		let title          = null;
		if ( searchType === 'origin' ) {
			title = 'Enter your origin';
		} else {
			title = 'Enter your destination';
		}
		return (
			<View style={ PlaceSearchSceneStyles.container }>
				<Toolbar title={ title } navigator={ this.props.navigator } />
				<GooglePlacesAutocomplete
					placeholder='Search'
					minLength={ 2 }
					autoFocus={ true }
					currentLocation={ true }
					fetchDetails={ true }
					query={{
						key: config.google.key,
						language: 'en',
						types: 'geocode',
					}}
					nearbyPlacesAPI='GoogleReverseGeocoding'
					GoogleReverseGeocodingQuery={{
						result_type: 'street_address'
					}}
					onPress={ (data, details) => {
						let place = {
							id: data.id,
							name: details.name,
							address: details.formatted_address,
							location: {
								latitude: details.geometry.location.lat,
								longitude: details.geometry.location.lng,
							},
						};
						searchCallback(place);
						this.props.navigator.pop();
					}}
					styles={{
						description: PlaceSearchSceneStyles.resultDescription,
						row: PlaceSearchSceneStyles.resultContainer,
						textInputContainer: PlaceSearchSceneStyles.searchInputContainer,
						textInput: PlaceSearchSceneStyles.searchInput
					}}
				/>
			</View>
		);
	}
}

export default PlaceSearchScene;
