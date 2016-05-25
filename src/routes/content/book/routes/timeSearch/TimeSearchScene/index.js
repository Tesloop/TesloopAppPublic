'use strict';
// Receives Day and RouteId and Shows Times
// Calls onTimeChange passing in the TripId and Time

import React, { ScrollView, Text, TouchableHighlight, View } from 'react-native';
import Spinner from 'react-native-spinkit';
import moment from 'moment';
import _ from 'lodash';

import lokkaClient from 'Tesloop/src/lokkaClient';
import NativeButton from 'Tesloop/src/components/NativeButton';
import Toolbar from 'Tesloop/src/components/Toolbar';

import { colors, fonts } from 'Tesloop/src/settings';

class TimeSearchScene extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			possibleTrips: {},
			selectedTripId: null,
		}
	};
	componentWillMount() {
		let currentRoutes  = this.props.navigator.getCurrentRoutes();
		let currentRoute   = currentRoutes[ currentRoutes.length - 1 ];
		let tripDate       = currentRoute.date;
		let tripType       = currentRoute.type;
		let origin, destination;
		if ( tripType === 'departure' ) {
			origin         = currentRoute.origin;
			destination    = currentRoute.destination;
		}
		if ( tripType === 'return' ) {
			origin         = currentRoute.destination;
			destination    = currentRoute.origin;
		}
		this.setState({
			selectedTripId: currentRoute.tripId
		})
		// Find the possibleTrips for the given date
		lokkaClient.query(`{
			possibleTrips(
				originLatitude: ${origin.location.latitude},
				originLongitude: ${origin.location.longitude},
				destinationLatitude: ${destination.location.latitude},
				destinationLongitude: ${destination.location.longitude},
				date: "${tripDate}"
			) {
				id,
				startDatetime,
				closestOriginWaypoint {
					id,
					latitude,
					longitude,
					timezone,
					city,
					name
				},
				closestDestinationWaypoint {
					id,
					latitude,
					longitude,
					timezone,
					city,
					name
				}
			},
		}`).then(
			(result) => {
				let possibleTrips         = result.possibleTrips;
				/*
				// Don't think I need this....
				let possibleTripDateTimes = possibleTrips.map(
					(possibleTrip) => {
						return moment(possibleTrip.startDatetime).toDate();
					}
				);
				*/
				this.setState({
					possibleTrips: possibleTrips
				});
			}
		)
	};
	render() {
		console.log('TimeSearchScene: Render()');
		if ( this.state.error ) {
			let error = this.state.error;
			return (
				<View style={{ flex: 1, backgroundColor: 'white' }}>
					<Toolbar
						navigator={ this.props.navigator }
						title={`Error`} />
					<Text>{ error.reason }</Text>
				</View>
			)
		}
		let possibleTrips     = this.state.possibleTrips;
		if ( _.isEmpty(possibleTrips) ) {
			// If the trips haven't loaded, show loading
			return (
				<View style={{ flex: 1, backgroundColor: 'white', }}>
					<Toolbar
						navigator={ this.props.navigator }
						title={`Loading Times`} />
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<Spinner
							size={ 60 }
							style={{ marginBottom: 30 }}
							type={ 'Bounce' }
						/>
					</View>
				</View>
			)
		}
		let currentRoutes  = this.props.navigator.getCurrentRoutes();
		let currentRoute   = currentRoutes[ currentRoutes.length - 1 ];
		let onTimeChange   = currentRoute.onTimeChange;
		let tripType       = currentRoute.type;
		return (
			<View style={{ flex: 1, backgroundColor: 'white', }}>
				<Toolbar
					navigator={ this.props.navigator }
					title={`Select a ${tripType.capitalize()} Time`} />
				<ScrollView style={{ flex: 1, paddingVertical: 10 }}>
					{possibleTrips.map( trip  => { return (
						<View
							key={`trip-${trip.id}`}
							style={{
								marginVertical: 10,
								marginHorizontal: 15,
							}}>
							<NativeButton
								color='gainsboro'
								onPress={() => {
									this.props.navigator.pop();
									onTimeChange(trip);
								}}>
								<View
									key={`trip-${trip.id}-time`}
									style={{
										height: 56,
										paddingVertical: 10,
										paddingHorizontal: 15,
									}}>
									<View
										style={{
											alignItems: 'center',
											justifyContent: 'center',
											paddingVertical: 15,
										}}>
										<View
											style={{
												flexDirection: 'row',
												alignItems: 'flex-end'
											}}>
											<Text
												style={{
													fontFamily: fonts.light,
													fontSize: 20
												}}>{
												moment(trip.startDatetime)
													.tz(trip.closestOriginWaypoint.timezone)
													.format('h:ma')
											}</Text>
											<Text
												style={{
													fontSize: 16,
													fontWeight: 'bold'
												}}>{
												' ' + moment(trip.startDatetime)
													.tz(trip.closestOriginWaypoint.timezone)
													.format('z')
											}</Text>
										</View>
									</View>
									<View
										style={{
											flexDirection: 'row',
											paddingTop: 5
										}}>
										<Text
											style={{
												fontFamily: fonts.light,
												color: colors.primary,
											}}>{
											`Pickup is `
										}</Text>
										<Text
											style={{
												fontFamily: fonts.light,
												color: 'black',
												fontWeight: 'bold'
											}}>
											{ 5 }
										</Text>
										<Text
											style={{
												fontFamily: fonts.light,
												color: colors.primary,
											}}>{
											` miles from your origin`
										}</Text>
									</View>
									<View
										style={{
											flexDirection: 'row',
											paddingTop: 5
										}}>
										<Text
											style={{
												fontFamily: fonts.light,
												color: colors.accent,
											}}>{
											`Dropoff is `
										}</Text>
										<Text
											style={{
												fontFamily: fonts.light,
												color: 'black',
												fontWeight: 'bold'
											}}>
											{ 4 }
										</Text>
										<Text
											style={{
												fontFamily: fonts.light,
												color: colors.accent,
											}}>{
											` miles from your destination`
										}</Text>
									</View>
								</View>
							</NativeButton>
						</View>
					)})}
				</ScrollView>
			</View>
		);
	}
}

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

export default TimeSearchScene;
