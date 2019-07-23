import React, { Component } from 'react';
import MovieList from './MovieList';
import {Link} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import Movie from './Movie';

export default class SavedList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('saved list rendering')
    return (
      <div className="saved-list">
        <h3>Saved Movies:</h3>
        {this.props.list.map(movie => (
          <NavLink exact to={`/movies/${movie.id}`} component={Movie}>
            <span className="saved-movie">{movie.title}</span>
          </NavLink>
        ))}
        <Link className='homebtn' to='/' component={MovieList}>
          <div className="home-button">Home</div>
        </Link>
      </div>
    );
  }
}
