import React, { Component } from 'react';
import axios from 'axios';


export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    // change this line to grab the id passed on the URL
    //component did mount is not going to run again in this architecture because 
    //constructor also only runs once during mounting, hence why movie doesn't switch to null on re render
    //the movie component does not unmount between NavLink clicks in SaveList and mount only runs on first time
    //therefore you need a function to set state again with id
    const id = this.props.match.params.id;
    this.fetchMovie(id);
    console.log('movie did mount');
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        this.setState(() => ({ movie: response.data }));
      })
      .catch(error => {
        console.error(error);
      });
  };
  // Uncomment this code when you're ready for the stretch problems
  componentWillUpdate(newProps){
    if(this.props.match.params.id !== newProps.match.params.id){
      this.fetchMovie(newProps.match.params.id);
      console.log('movie component will update function firing');
    }
  }

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie)
  }

  render() {
    console.log('movie rendering')
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
    

    const { title, director, metascore, stars } = this.state.movie;
    return (
      <div className="save-wrapper">
        <div className="movie-card">
          <h2>{title}</h2>
          <div className="movie-director">
            Director: <em>{director}</em>
          </div>
          <div className="movie-metascore">
            Metascore: <strong>{metascore}</strong>
          </div>
          <h3>Actors</h3>

          {stars.map(star => (
            <div key={star} className="movie-star">
              {star}
            </div>
          ))}
        </div>
        <div className="save-button" onClick={this.saveMovie}>Save</div>
        <div className="remove-button" onClick={()=>{this.props.removeSaved(this.state.movie.id)}}>Remove</div>
      </div>
    );
  }
}
