import {
	Platform,
	StyleSheet
} from 'react-native';

import { colors, fonts } from 'Tesloop/src/settings';

let styles = StyleSheet.create({
	container: {

	},
	profilePicture: {
		height: 50,
		width: 50,
		borderRadius: 25,
		borderWidth: 2,
		borderColor: 'white',
	},
	locationNavigator: {
		height: 20,
		width: 20,
	},
	locationNavigatorButton: {
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 25,
		elevation: 2,
		height: 50,
		justifyContent: 'center',
		width: 50,
	},
	locationNavigatorContainer: {
		height: 50,
		marginBottom: 5,
		flex: 1,
		alignItems: 'flex-end',
		marginRight: 20,
	},
	routeContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	},
	indicator: {
		position: 'absolute',
		left: 20,
		top: 18,
		height: 14,
		width: 14,
		borderRadius: 7,
		borderWidth: 1,
	},
	originIndicator: {
		borderColor: colors.primary,
	},
	destinationIndicator: {
		borderColor: colors.accent,
	},
	placeContainer: {
		marginVertical: 5,
		marginHorizontal: 20,
		backgroundColor: 'white',
		elevation: 1,
		borderRadius: 2,
	},
	placeButton: {
		padding: 15,
		paddingLeft: 45,
	},
	placeText: {
		color: 'black',
		fontFamily: fonts.light,
		flex: 1,
	},
	bookContainer: {
		backgroundColor: colors.primary,
		marginBottom: 10,
	},
	bookButton: {
		paddingLeft: 0,
	},
	bookText: {
		color: 'white',
		flex: 1,
		textAlign: 'center',
		fontSize: 18,
	},
});

// IOS Platform
if ( Platform.OS === 'ios' ){
	styles.profilePictureContainer = {
		height: 50,
		width: 50,
		position: 'absolute',
		top: 30,
		left: 15,
	};
// Android Platform
} else {
	styles.profilePictureContainer = {
		height: 50,
		width: 50,
		position: 'absolute',
		top: 15,
		left: 15,
	};
}

export default styles;
