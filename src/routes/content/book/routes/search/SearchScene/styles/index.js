import {
	Platform,
	StyleSheet
} from 'react-native';

import { colors, fonts } from 'Tesloop/src/settings';

let styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		flex: 1,
		paddingHorizontal: 15,
		backgroundColor: '#EDEDED',
	},
	placeContainer: {
		backgroundColor: 'white',
		borderRadius: 2,
		elevation: 1,
		marginVertical: 5,
		padding: 15,
		paddingLeft: 45,
	},
	placeText: {
		fontFamily: fonts.light,
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
});

if ( Platform.OS === 'ios' ){
// IOS Platform
} else {
// Android Platform
}

export default styles;
