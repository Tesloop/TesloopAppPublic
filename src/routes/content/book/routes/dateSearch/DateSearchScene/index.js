'use strict';

import React, { DatePickerIOS, Platform, Text, TouchableHighlight, View } from 'react-native';
import Spinner from 'react-native-spinkit';
import _ from 'lodash';
import moment from 'moment-timezone';

import lokkaClient from 'Tesloop/src/lokkaClient';
import NativeButton from 'Tesloop/src/components/NativeButton';
import Toolbar from 'Tesloop/src/components/Toolbar';

import { colors, fonts } from 'Tesloop/src/settings';

class DateSearchScene extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedDate: null,
			possibleTrips: null,
			possibleTripDates: null,
			minimumDate: null,
			maximumDate: null,
		};
	};
	componentWillMount() {
		let currentRoutes  = this.props.navigator.getCurrentRoutes();
		let currentRoute   = currentRoutes[ currentRoutes.length - 1 ];
		let tripType       = currentRoute.type;
		let departureDate  = currentRoute.departureDate;
		let returnDate     = currentRoute.returnDate;
		let origin, destination;
		if ( tripType === 'departure' ) {
			origin         = currentRoute.origin;
			destination    = currentRoute.destination;
		}
		if ( tripType === 'return' ) {
			origin         = currentRoute.destination;
			destination    = currentRoute.origin;
		}
		// Find the possible trip dates
		// Can be optimized by setting a beforeDate for departures,
		// and an afterDate for returns
		console.log('hello');
		console.log(lokkaClient);
		lokkaClient.query(`{
			possibleTrips(
				originLatitude: ${origin.location.latitude},
				originLongitude: ${origin.location.longitude},
				destinationLatitude: ${destination.location.latitude},
				destinationLongitude: ${destination.location.longitude},
			) {
				id,
				startDatetime
			}
		}`).then(
			(result) => {
				let possibleTrips = result.possibleTrips;
				let possibleTripDates  = possibleTrips.map(
					(possibleTrip) => {
						return moment(possibleTrip.startDatetime)
							.tz(origin.timezone)
							.format('YYYY-MM-DD');
					}
				);
				let minimumDate, maximumDate;
				if ( tripType === 'departure' ) {
					minimumDate = new Date();
					maximumDate = returnDate ? returnDate : possibleTripDates[possibleTripDates.length - 1];
					if ( departureDate ) {
						this.setState({
							selectedDate: departureDate
						});
					}
				}
				if ( tripType === 'return' ) {
					minimumDate = departureDate ? departureDate : new Date();
					maximumDate = possibleTripDates[possibleTripDates.length - 1];
					if ( returnDate ) {
						this.setState({
							selectedDate: returnDate
						});
					}
				}
				if ( !this.state.selectedDate ) {
					let earliestPossibleTripDate;
					possibleTripDates.forEach(
						(possibleTripDate) => {
							if ( !earliestPossibleTripDate ) {
								if ( moment(possibleTripDate) > moment(minimumDate) ) {
									earliestPossibleTripDate = possibleTripDate;
								}
							}
						}
					)
					if ( earliestPossibleTripDate ){
						this.setState({
							selectedDate: earliestPossibleTripDate
						});
					} else {
						this.setState({
							error: {
								reason: "No trips available after minimum date"
							}
						});
					}
				}
				this.setState({
					possibleTrips: possibleTrips,
					possibleTripDates: possibleTripDates,
					minimumDate: minimumDate,
					maximumDate: maximumDate,
				});
			}
		)
	};
	render() {
		console.log('DateSearchScene: Render()');
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
		let possibleTripDates = this.state.possibleTripDates;
		if ( !possibleTrips ) {
			// If the trips haven't loaded, show loading
			return (
				<View style={{ flex: 1, backgroundColor: 'white', }}>
					<Toolbar
						navigator={ this.props.navigator }
						title={`Loading Dates`} />
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
		let tripType       = currentRoute.type;
		let onDateChange   = currentRoute.onDateChange;
		let departureDate  = currentRoute.departureDate;
		let returnDate     = currentRoute.returnDate;
		let datePicker, tripDate;
		if ( tripType === 'departure' ) {
			tripDate = departureDate;
		}
		if ( tripType === 'return' ) {
			tripDate = returnDate;
		}
		if ( Platform.OS === 'ios' ) {
			datePicker = (
				<DatePickerIOS
					date={ moment(this.state.selectedDate).toDate() }
					minimumDate={ moment(this.state.minimumDate).toDate() }
					maximumDate={ moment(this.state.maximumDate).toDate() }
					mode='date'
					onDateChange={(datetime) => {
						let date = moment(datetime).format('YYYY-MM-DD');
						if ( possibleTripDates.indexOf(date) === -1 ) {
							// Move to closest available date
							let closestDateFound = false;
							console.log(possibleTripDates);
							possibleTripDates.forEach(
								(possibleTripDate) => {
									if ( !closestDateFound ){
										if ( moment(possibleTripDate) > moment(date) ) {
											closestDateFound = true;
											this.setState({
												selectedDate: possibleTripDate
											});
										}
									}
								}
							)
						} else {
							// Set the date if it is available
							this.setState({selectedDate: date});
						}
					}}
				/>
			)
		} else {
			// Render Android Component
		}
		return (
			<View style={{ flex: 1, backgroundColor: 'white', }}>
				<Toolbar
					navigator={ this.props.navigator }
					title={`Select a ${tripType.capitalize()} Date`} />
				<View style={{ flex: 1, justifyContent: 'center', paddingBottom: 40, }}>
					{ datePicker }
				</View>
				{(() => { if ( this.state.selectedDate !== tripDate ) { return (
				<NativeButton
					color='gray'
					onPress={ () => {
						this.props.navigator.pop();
						onDateChange(this.state.selectedDate);
					}}>
					<View style={{ height: 56, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ color: 'white', fontFamily: fonts.light, fontSize: 20 }}> Set Date </Text>
					</View>
				</NativeButton>
				)}})()}
			</View>
		);
	}
}

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

export default DateSearchScene;
