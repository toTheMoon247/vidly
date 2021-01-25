import React, {Component} from "react";
import { Link } from 'react-router-dom';
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup"
import MoviesTable from "./moviesTable"
import { paginate } from '../utils/paginate';
import _ from 'lodash';
import SearchBox from './searchbox';



class Movies extends Component {
  state = {
    // We initialise it to an empty array in order to make sure that
    // they are defined, until the data recieved from the backend call
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc'}
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
    const genres = [ {_id: '', name: 'All genres'}, ...getGenres() ];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handlePageChange = page => {
    this.setState({currentPage: page});
  }

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1  });
  };

  handleGenreSelect = genre => {
    this.setState( {selectedGenre: genre, searchQuery:"" ,currentPage: 1} );
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;
    // Filter Movies according to genre
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    // Sorting
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  }

  render(){
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0)
      return <p className="pl-3">There are no movies in the Database.</p>;

    const { totalCount, data: movies } = this.getPageData();
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
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20}}
          >
            New Movie
          </Link>
          <p className="pl-3">Showing {totalCount} movies in the Database.</p>

          <SearchBox value={searchQuery} onChange={this.handleSearch}/>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
         <Pagination
            itemsCount={totalCount}
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
