
let Router = {}
let Routes = {};
let navigator = null;

let registerRoute = (routeName, route, newNavigator) => {
	navigator = newNavigator;
	Routes[routeName] = route;
}

let registerBackButtonRoute = {};

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

export { registerRoute, registerBackButtonRoute };
export default Router;
