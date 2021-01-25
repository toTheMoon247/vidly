import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {

  state = {
    data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
    genres: [],
    errors: {}
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().required().min(0).max(100).label("Number in stock"),
    dailyRentalRate: Joi.number().required().min(0).max(100).label("Daily rental rate"),
  };

  // Populate the form with details of the movie.
  // If the movie is a new movie we will just return, nothing to populate

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === 'new')
      return;

    console.log(movieId);
    const movie = getMovie(movieId);

    if (!movie)
      return this.props.history.replace('/not-found');

    // We will fetch the movie data and convert it to a model view
    // The RESTful API that we get from the server is for general purposes
    // It's not built for specific page. Now it's time to convert it to our
    // needs. We will do it with calling to mapToViewModel
    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {

    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    }
  }

  // When the form is submitted we will cal  this method
  doSubmit = () => {
    // Call the server, in our case fakeMovieService
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  }


  render() {
    return(
      <div>
        <h1>Movie Form </h1>
        <form onSubmit={this.handleSubmit}>
            {this.renderInput('title', 'Title')}
            {this.renderSelect('genreId', 'Genre', this.state.genres)}
            {this.renderInput('numberInStock', 'number in stock', "number")}
            {this.renderInput('dailyRentalRate', 'Rate')}
            {this.renderButton('Add Movie')}
          </form>
      </div>
    );
  }

}

export default MovieForm
