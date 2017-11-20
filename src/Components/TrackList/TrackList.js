import React from 'react';
import Track from '../Track/Track.js';
import './TrackList.css';



export class TrackList extends React.Component {


  render(){
    console.log(this.props)
    return(

      <div className="TrackList">

      {this.props.tracks.map(track => {

      return  <Track key={track.id} track={track} removeTrack={this.props.removeTrack} addTrack={this.props.addTrack} isRemoval={this.props.isRemoval}/>;

      })}

      </div>
  );
  }
}

//export default TrackList;
