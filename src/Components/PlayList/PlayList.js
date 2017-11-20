import React from 'react';
import {TrackList} from '../TrackList/TrackList.js';
import './PlayList.css';


const isRemoval=true;

class PlayList extends React.Component {

constructor(props){
  super(props)

  this.handleNameChange = this.handleNameChange.bind(this);
  this.handleSave = this.handleSave.bind(this);

}

handleNameChange(event){

this.props.updatePlaylistName(event.target.value);

}

handleSave(){

this.props.savePlaylist();

}

  render(){
    return(
      <div className="Playlist">
        <input defaultValue={this.props.playlistName} onChange={this.handleNameChange}/>
        <TrackList tracks={this.props.playlistTracks} removeTrack={this.props.removeTrack} addTrack={this.props.addTrack} isRemoval={isRemoval}/>
        <a className="Playlist-save" onClick={this.handleSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}


export default PlayList;
