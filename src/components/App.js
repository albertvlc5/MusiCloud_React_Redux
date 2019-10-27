import React, { Component } from 'react';
import './App.css';
import Grid from './Grid'
import MusicBar from './MusicBar'

import { connect } from "react-redux"
import {fetchTracks} from "../actions/actions_tracks"


class App extends Component {
  constructor(props) {
    super(props);
    //this.props.fetchTracks("Eminem");
    //this.props.fetchTracks("") El que añada sera el que me saldra por defecto al cargar la pagina
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }


 /*  state = {
    searchText:'',
  }; */
  
  
  render() {
    return (
      
      <div>
        <div>
            &#127926; <input type="search" name="busqueda" placeholder="Introduzca el artista.."  value={this.state.value} onChange={this.handleChange}/>
            <button type="submit" onClick={() => this.props.fetchTracks(this.state.value)}>Buscar</button>
        </div>
        
        <div className="loader" style={{ display:(this.props.tracksObj.fetching)?'block': 'none' }}>
          <img alt="" src="/img/loading.gif"></img>
        </div>

        <div style={{display:(this.props.tracksObj.fetched)?'block': 'none'}}>
          {
            this.props.tracksObj.tracks.map((track, key) => {
              return <Grid track={track} key={key} />;
            })
          }
          <MusicBar/>
        </div>

      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return({
    fetchTracks: (id) => {dispatch(fetchTracks(id))}
  })
}


function mapStateToProps(store){
  return {
    tracksObj : store.tracksReducer
  }
}

export default connect( mapStateToProps, mapDispatchToProps  )(App);
