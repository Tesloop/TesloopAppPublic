
let Router = {}
let Routes = {};
let navigator = null;

Router.go = (routeName) => {
	let currentRoutes     = navigator.getCurrentRoutes();
	let currentRouteNames = currentRoutes.map((currentRoute) => currentRoute.name);
	let lastRoute         = currentRoutes[currentRoutes.length - 1];
	let route             = Routes[routeName];
	if (route.name !== lastRoute.name){
		if (currentRouteNames.indexOf(route.name) !== -1){
			navigator.popToRoute(route);
		} else {
			navigator.push(route);
		}
	}
}
Router.registerRoute = (routeName, route, newNavigator) => {
	navigator = newNavigator;
	Routes[routeName] = route;
}
Router.registerBackButtonRoute = {};

export default Router;
