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
		backgroundColor: '#EDEDED',
	},
});

if ( Platform.OS === 'ios' ){
// IOS Platform
} else {
// Android Platform
}

export default styles;
