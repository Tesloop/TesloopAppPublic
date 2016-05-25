'use strict';

import React, { Image, Text, View } from 'react-native';
import Mapbox from 'react-native-mapbox-gl';
import geolib from 'geolib';
import polyline from 'polyline';
import MapSearchSceneStyles from './styles';

import DemoMap from 'Tesloop/src/components/DemoMap';
import NativeButton from 'Tesloop/src/components/NativeButton';

import bookRoute from 'Tesloop/src/routes/content/book';
import placeSearchRoute from 'Tesloop/src/routes/content/placeSearch';
import { colors } from 'Tesloop/src/settings';
import config from 'Tesloop/src/config';

import lokkaClient from 'Tesloop/src/lokkaClient';

let mapReference = 'map';

class MapSearchScene extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			origin: {
				name: 'Where are you coming from?'
			},
			pickup: null,
			destination: {
				name: 'Where are you going?'
			},
			dropoff: null,
			routeCenter: {
				latitude: 40.7223,
				longitude: -73.9878,
				zoom: 10,
			},
			directionsPolyline: [],
		}
	};
	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				let latitude = position.coords.latitude;
				let longitude = position.coords.longitude;
				setTimeout(( () => {
					this.setState({
						routeCenter: {
							latitude: latitude,
							longitude: longitude,
							zoom: 6,
						}
					});
					this.goToRouteCenter();
				}), 2000)
			}
		)
	};
	/**
	 * This is where all changes to origin and destination are handled
	 * @param  {string} searchType specify 'origin' or 'destination'
	 * @return {undefined}         sets component state
	 */
	goToWaypointSearch = (searchType) => {
		this.props.navigator.push(Object.assign({}, placeSearchRoute, {
			searchType: searchType,
			placeSearchCallback: (place) => {
				// Find the closest Waypoint
				lokkaClient.query(`{
					closestWaypoint(
						latitude: ${place.location.latitude},
						longitude: ${place.location.longitude}
					) {
						name,
						id,
						latitude,
						longitude,
						timezone
					}
				}`).then( (result) => {
					let waypoint   = result.closestWaypoint;
					place.timezone = waypoint.timezone;
					if ( searchType === 'origin' ){
						this.setState({
							origin: place,
							pickup: waypoint
						});
					} else {
						this.setState({
							destination: place,
							dropoff: waypoint
						});
					};
					if ( this.state.origin.location && !this.state.destination.location ) {
						// Origin is defined, but not Destination
						this.setState({
							routeCenter: {
								latitude: this.state.origin.location.latitude,
								longitude: this.state.origin.location.longitude,
								zoom: 8,
							}
						});
						this.setState({
							directionsPolyline: []
						});
						this.goToRouteCenter();
					} else if ( !this.state.origin.location && this.state.destination.location ) {
						// Destination is defined, but not Origin
						this.setState({
							routeCenter: {
								latitude: this.state.destination.location.latitude,
								longitude: this.state.destination.location.longitude,
								zoom: 8,
							}
						});
						this.setState({
							directionsPolyline: []
						});
						this.goToRouteCenter();
					} else if ( this.state.origin.location && this.state.destination.location  ) {
						// Origin and Destination are defined
						fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${JSON.stringify(this.state.origin.address)}&destination=${JSON.stringify(this.state.destination.address)}&key=${config.google.key}`, {
							method: 'GET'
						}).then(
							(data) => {
								let directionData = JSON.parse(data._bodyText);
								let directionsPolyline = polyline.decode(directionData.routes[0].overview_polyline.points);
								this.setState({directionsPolyline: directionsPolyline});
							}
						);
						let routeCenter = geolib.getCenter([
							{
								latitude: this.state.origin.location.latitude,
								longitude: this.state.origin.location.longitude,
							},
							{
								latitude: this.state.destination.location.latitude,
								longitude: this.state.destination.location.longitude,
							},
						]);
						this.setState({
							routeCenter: {
								latitude: Number(routeCenter.latitude),
								longitude: Number(routeCenter.longitude),
								zoom: 5,
							}
						});
						this.goToRouteCenter();
					}
				})
			},
		}));
	};
	/**
	 * Moves the map to the center of the route
	 * @return {undefined} sets component state
	 */
	goToRouteCenter = () => {
		Mapbox.Mixin.setCenterCoordinateZoomLevelAnimated.apply(this, [
			mapReference,
			this.state.routeCenter.latitude,
			this.state.routeCenter.longitude,
			this.state.routeCenter.zoom,
		]);
	};
	render = () => {
		console.log('MapSearchScene: Render()');
		let annotations = [];
		// Render the origin point
		if ( this.state.origin.location ){
			annotations.push({
				type: 'point',
				title: 'Your Origin',
				coordinates: [this.state.origin.location.latitude, this.state.origin.location.longitude],
				subtitle: this.state.origin.name,
				id: 'origin',
			});
		}
		// Render the closest pickup point
		if ( this.state.pickup && this.state.pickup.latitude ){
			annotations.push({
				type: 'point',
				title: 'Closest Possible Pickup',
				coordinates: [this.state.pickup.latitude, this.state.pickup.longitude],
				subtitle: this.state.pickup.name,
				id: 'pickup',
			});
		}
		// Render the closest dropoff point
		if ( this.state.dropoff && this.state.dropoff.latitude ){
			annotations.push({
				type: 'point',
				title: 'Closest Possible Dropoff',
				coordinates: [this.state.dropoff.latitude, this.state.dropoff.longitude],
				subtitle: this.state.dropoff.name,
				id: 'dropoff',
			});
		}
		// Render the destination point
		if ( this.state.destination.location ){
			annotations.push({
				type: 'point',
				title: 'Your Destination',
				coordinates: [this.state.destination.location.latitude, this.state.destination.location.longitude],
				subtitle: this.state.destination.name,
				id: 'destination',
			});
		}
		// Render the Directions Polyline
		if ( this.state.directionsPolyline.length > 0 ){
			annotations.push({
				type: 'polyline',
				coordinates: this.state.directionsPolyline,
				strokeColor: colors.background.dark,
				strokeWidth: 6,
				alpha: 0.7,
				id: 'directionsPolyline',
			});
		}
		let locationButton = null;
		if ( this.state.origin.location || this.state.destination.location ) {
			locationButton = (
				<View style={ MapSearchSceneStyles.locationNavigatorContainer }>
					<NativeButton
						color='gainsboro'
						onPress={ this.goToRouteCenter }>
						<View style={ MapSearchSceneStyles.locationNavigatorButton }>
							<Image
								style={ MapSearchSceneStyles.locationNavigator }
								source={ require('Tesloop/resources/images/ic_map_black.png') }
							/>
						</View>
					</NativeButton>
				</View>
			);
		}
		let bookButton = null;
		if ( this.state.origin.location && this.state.destination.location ) {
			bookButton = (
				<View
					style={[
						MapSearchSceneStyles.placeContainer,
						MapSearchSceneStyles.bookContainer,
					]}>
					<NativeButton
						color='#009278'
						onPress={ () => {
							this.props.navigator.push(Object.assign({},
								bookRoute,
								{
									origin: this.state.origin,
									destination: this.state.destination,
								}
							));
						}}>
						<View
							style={[
								MapSearchSceneStyles.placeButton,
								MapSearchSceneStyles.bookButton,
							]}>
							<Text
								numberOfLines={ 1 }
								style={[
									MapSearchSceneStyles.placeText,
									MapSearchSceneStyles.bookText,
								]}>
								Book your Trip
							</Text>
						</View>
					</NativeButton>
				</View>
			)
		} else {
			bookButton = (
				<View style={{height: 35}}></View>
			);
		}
		return (
			<View style={{ flex: 1 }}>
				<Mapbox
					accessToken={ config.mapbox.accessToken }
					annotations={ annotations }
					centerCoordinate={{
						latitude: 37.09024,
						longitude: -95.712891,
					}}
					compassIsHidden={ true }
					debugActive={ false }
					direction={ 0 }
					ref={ mapReference }
					rotateEnabled={ false }
					scrollEnabled={ true }
					showsUserLocation={ true }
					style={{ flex: 1 }}
					styleURL={ config.mapbox.styleURL }
					userTrackingMode={ 0 }
					zoomEnabled={ true }
					zoomLevel={ 2 }
				/>
				<View style={ MapSearchSceneStyles.profilePictureContainer }>
					<NativeButton
						color='white'
						onPress={ this.props.navigator.props.openDrawer }>
						<View>
							<Image
								style={ MapSearchSceneStyles.profilePicture }
								source={ require('Tesloop/resources/images/default_profile_picture.png') }
							/>
						</View>
					</NativeButton>
				</View>
				<View style={ MapSearchSceneStyles.routeContainer }>
					{ locationButton }
					<View style={ MapSearchSceneStyles.placeContainer }>
						<NativeButton
							color='gainsboro'
							onPress={ () => this.goToWaypointSearch('origin') }>
							<View style={ MapSearchSceneStyles.placeButton }>
								<View
									style={[
										MapSearchSceneStyles.indicator,
										MapSearchSceneStyles.originIndicator
									]}
								/>
								<Text
									numberOfLines={ 1 }
									style={ MapSearchSceneStyles.placeText }>
									{ this.state.origin.name }
								</Text>
							</View>
						</NativeButton>
					</View>
					<View style={ MapSearchSceneStyles.placeContainer }>
						<NativeButton
							color='gainsboro'
							onPress={ () => this.goToWaypointSearch('destination') }>
							<View style={ MapSearchSceneStyles.placeButton }>
								<View
									style={[
										MapSearchSceneStyles.indicator,
										MapSearchSceneStyles.destinationIndicator
									]}
								/>
								<Text
									numberOfLines={ 1 }
									style={ MapSearchSceneStyles.placeText }>
									{ this.state.destination.name }
								</Text>
							</View>
						</NativeButton>
					</View>
					{ bookButton }
				</View>
			</View>
		);
	};
}

export default MapSearchScene;
