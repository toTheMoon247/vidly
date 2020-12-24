import React, {Component} from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup"
import { paginate } from '../utils/paginate';



class Movies extends Component {
  state = {
    // We initialise it to an empty array in order to make sure that
    // they are defined, until the data recieved from the backend call
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: false
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({movies: movies});
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movie};
    movies[index].liked = !movies[index].liked;
    this.setState({movies});
  }

  // Create a backend calls
  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handlePageChange = (page) => {
    this.setState({currentPage: page});
  }

  handleGenreSelect = genre => {
    this.setState( {selectedGenre: genre} );
  };

  render(){
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies, selectedGenre } = this.state;
     if (count === 0)
      return <p className="pl-3">There are no movies in the Database.</p>;

    // Filter Movies according to genre
    const filtered = selectedGenre
    ? allMovies.filter(m => m.genre._id === selectedGenre._id)
    : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);

    return(
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
            // textProperty="name"  // ListGroup already has it as a defauly values
            // valueProperty="_id"
          />
        </div>
        <div className="col">
          <p className="pl-3">Showing {filtered.length} movies in the Database.</p>
          <table className="table ml-3">
            <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>Rate</th>
                  <th></th>
                  <th></th>
              </tr>
            </thead>
           <tbody>
                {movies.map(movie => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)}/></td>
                    <td>
                      <button onClick={() => this.handleDelete(movie)} className="btn btn-outline-danger btn-sm">Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
         </table>
         <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
      </div>
    </div>
    );
  }
}

export default Movies;
