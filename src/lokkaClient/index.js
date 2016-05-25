let Lokka = require('lokka').Lokka;
let Transport = require('lokka-transport-http').Transport;
import config from 'Tesloop/src/config';

// Create a lokka client against SWAPI GraphQL API
let client = new Lokka({
	transport: new Transport(`${config.serverURL}graphql`)
});

export default client;
