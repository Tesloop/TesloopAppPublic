'use strict';
/* eslint-disable */

let React = require('react-native');
let Lokka = require('lokka').Lokka;
let Transport = require('lokka-transport-http').Transport;

// Create a lokka client against SWAPI GraphQL API
let client = new Lokka({
  transport: new Transport('http://graphql-swapi.parseapp.com/')
});

let {
  ScrollView,
  StyleSheet,
  Text,
  View,
} = React;

let MovieListView = React.createClass({
  getInitialState() {
    return {movies: []}
  },
  componentDidMount() {
    // query when we mount the view
    client.query(`
        {
          allFilms {
            films {
              title
            }
          }
        }
    `).then(result => {
      this.setState({movies: result.allFilms.films});
    }).catch(error => {
      this.setState({error});
    });
  },
  render: function() {
    let {movies} = this.state;
    return (
      <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          "Star Wars" Movies
        </Text>
        {(movies.length > 0)? this.renderMovies(movies) : this.renderLoading()}
        {(movies.length > 0)? this.renderMovies(movies) : this.renderLoading()}
        {(movies.length > 0)? this.renderMovies(movies) : this.renderLoading()}
        {(movies.length > 0)? this.renderMovies(movies) : this.renderLoading()}
        {(movies.length > 0)? this.renderMovies(movies) : this.renderLoading()}
        {(movies.length > 0)? this.renderMovies(movies) : this.renderLoading()}
        {(movies.length > 0)? this.renderMovies(movies) : this.renderLoading()}
        {(movies.length > 0)? this.renderMovies(movies) : this.renderLoading()}
        {(movies.length > 0)? this.renderMovies(movies) : this.renderLoading()}
      </ScrollView>
    );
  },
  renderMovies(movies) {
    return (
      <View>
        {movies.map(movie => (
          <Text key={movie.title} style={styles.movies}>
            {movie.title}
          </Text>
        ))}
      </View>
    );
  },
  renderLoading() {
    let {error} = this.state;
    if(error) {
      return (
        <View>
          <Text>Oops..</Text>
          <Text>{error.message}</Text>
        </View>
      );
    } else {
      return (<Text>loading...</Text>);
    }
  }
});

let styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
  },
  movies: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = MovieListView;
