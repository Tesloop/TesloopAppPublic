
import geolib from 'geolib';

export default function( options ) {
	let routeCenter = geolib.getCenter([
		{
			latitude: options.origin.latitude,
			longitude: options.origin.longitude,
		},
		{
			latitude: options.destination.latitude,
			longitude: options.destination.longitude,
		},
	]);
	let mapString = `https://api.mapbox.com/v4/jordangarside.nle5pj6b/pin-l-a+607D8B(${options.origin.longitude},${options.origin.latitude}),pin-l-b+00B796(${options.destination.longitude},${options.destination.latitude})/${routeCenter.longitude},${routeCenter.latitude},${options.zoom}/${options.width}x250@2x.png?access_token=pk.eyJ1Ijoiam9yZGFuZ2Fyc2lkZSIsImEiOiJjaWZpd3Y3bGFjMm5scnlseHl3NHM4ZWc1In0.5clIBRNdc4THWZmUx9yswg`;
	console.log(mapString);
	return mapString;
}
