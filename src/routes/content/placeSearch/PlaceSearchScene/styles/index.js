import {
	Platform,
	StyleSheet
} from 'react-native';

import { colors } from 'Tesloop/src/settings';

let styles = StyleSheet.create({
	container: {

	},
	resultContainer: {

	},
	resultDescription: {
		fontSize: 16,
		height: 24,
	},
	searchInput: {
		color: 'black',
		flex: 1,
		fontSize: 18,
		marginLeft: 0,
		marginRight: 0,
		marginTop: 0,
		paddingHorizontal: 15,
		paddingVertical: 10,
		textDecorationLine: 'none',
	},
	searchInputContainer: {
	},
});


if ( Platform.OS === 'ios' ){
	// IOS Platform
} else {
	// Android Platform
}

export default styles;
