import {
	Platform,
	StyleSheet
} from 'react-native';

import { colors, fonts } from 'Tesloop/src/settings';

let styles = StyleSheet.create({
	leftButton: {
		paddingHorizontal: 16,
		paddingVertical: 15,
		marginRight: 10
	},
	title: {
		color: 'black',
		fontFamily: fonts.light,
		fontSize: 20,
	}
});

// IOS Platform
if ( Platform.OS === 'ios' ){
	styles.container = {
		paddingTop: 20,
		height: 76,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#EDEDED', //'#333c4e',
	};
// Android Platform
} else {
	styles.container = {
		height: 56,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.background.light, //'#333c4e',
	};
}

export default styles;
