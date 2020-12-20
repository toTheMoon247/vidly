import React, {Component} from "react";
import { getMovies } from "../services/fakeMovieService";


class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = movie => {

  };

  render(){
    return(
      <table className="table ml-3">
        <thead>
            <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th></th>
          </tr>
        </thead>
       <tbody>
            {this.state.movies.map(movie => (
              <tr>
              <th scope="row">1</th>
              <td>{movie.title}</td>
              <td>{movie.genre}</td>
              <td>{movie.dailyRentalRate}</td>
              <td><button onClick={this.handleDelete} className="btn btn-outline-danger btn-sm">Delete</button></td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

export default Movies;
