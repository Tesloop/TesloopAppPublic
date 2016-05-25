'use strict';
// Receives Day and RouteId and Shows Times
// Calls onTimeChange passing in the TripId and Time

import React, { Text, TextInput, TouchableHighlight, View } from 'react-native';
import DropDown, { Select, Option, OptionList,} from 'react-native-selectme';

import NativeButton from 'Tesloop/src/components/NativeButton';
import Toolbar from 'Tesloop/src/components/Toolbar';
import lokkaClient from 'Tesloop/src/lokkaClient';

import { colors, fonts } from 'Tesloop/src/settings';
import config from 'Tesloop/src/config';
import _styles from './styles';

class PayScene extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	componentWillMount() {
		lokkaClient.query(`{
			myProfile{
				id,
				firstName,
				creditCards {
					lastFour,
					brand
				}
			}
		}`).then(
			(result) => {
				console.log(result);
			}
		);
	};
	_getOptionList = () => {
		return this.refs['OPTION_LIST'];
	};
	render() {
		console.log('PayScene: Render()');
		return (
			<View style={ _styles.container }>
				<Toolbar
					navigator={ this.props.navigator }
					title={`Payment`} />
				<View style={ _styles.contentContainer }>
					<View style={{ flex: 1, padding: 15 }}>
						<View
							style={{flexDirection: 'column'}}>
							<Text> Departure </Text>
							<View style={{flexDirection: 'row'}}>
								<View style={{flex: 1}}><Text> 2 Seats ($85) </Text></View>
								<View style={{flex: 1}}><Text style={{textAlign: 'right'}}> $160 </Text></View>
							</View>
							<Text> Return </Text>
							<View style={{flexDirection: 'row'}}>
								<View style={{flex: 1}}><Text> 2 Seats ($85) </Text></View>
								<View style={{flex: 1}}><Text style={{textAlign: 'right'}}> $160 </Text></View>
							</View>
						</View>
						<TextInput
							placeholder='Coupond Code'
							maxLength={20}
							style={{borderBottomColor: 'black', borderBottomWidth: 1}}
						/>

						<Text>Add a Credit Card</Text>
						<Text>Credit Card Number</Text>
						<View
							style={{flexDirection: 'row'}}>
							<TextInput
								style={{flex: 1, height: 40, borderColor: 'gray', borderWidth: 1,}}
								keyboardType='numeric'
								maxLength={4}
								placeholder='1111'
							/>
							<TextInput
								style={{flex: 1, height: 40, borderColor: 'gray', borderWidth: 1,}}
								keyboardType='numeric'
								maxLength={4}
								placeholder='2222'
							/>
							<TextInput
								style={{flex: 1, height: 40, borderColor: 'gray', borderWidth: 1,}}
								keyboardType='numeric'
								maxLength={4}
								placeholder='3333'
							/>
							<TextInput
								style={{flex: 1, height: 40, borderColor: 'gray', borderWidth: 1,}}
								keyboardType='numeric'
								maxLength={4}
								placeholder='4444'
							/>
						</View>
						<Text>CVC</Text>
						<TextInput
							style={{width: 80, height: 40, borderColor: 'gray', borderWidth: 1,}}
							keyboardType='numeric'
							maxLength={4}
							placeholder='123'
						/>
						<Text>Expiration</Text>
						<Text>Month</Text>
						<TextInput
							style={{height: 40, borderColor: 'gray', borderWidth: 1,}}
							keyboardType='numeric'
							maxLength={2}
							placeholder='01'
						/>
						<Text>Year</Text>
						<TextInput
							style={{height: 40, borderColor: 'gray', borderWidth: 1,}}
							keyboardType='numeric'
							maxLength={4}
							placeholder='2020'
						/>
						<Text>Existing Cards</Text>
						<Select
							ref="CARD_SELECTOR"
							optionListRef={this._getOptionList}
							width={250}>
							<Option>Visa        - 0681</Option>
							<Option>MasterCard  - 5621</Option>
							<Option>MasterCard  - 5621</Option>
							<Option>MasterCard  - 5621</Option>
						</Select>
						<OptionList ref="OPTION_LIST" />
					</View>
					<NativeButton
						color='gray'
						onPress={ () => {
							console.log('Process Order....');
						}}>
						<View style={{ height: 56, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
							<Text style={{ color: 'white', fontFamily: fonts.light, fontSize: 20 }}> Book </Text>
						</View>
					</NativeButton>
				</View>
			</View>
		);
	}
}

export default PayScene;
