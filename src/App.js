import React from 'react';
import SearchBar from './Components/SearchBar/SearchBar.js';
import SearchResults from './Components/SearchResults/SearchResults.js';
import PlayList from './Components/PlayList/PlayList.js';
import Spotify from './Components/util/Spotify.js';

import './App.css';



class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
            SearchResults: [],
            playlistName:"Playlist Title",
            login: false,
            UserID: "UserID",
            playlistTracks: []
    }



    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.spotifySearch = this.spotifySearch.bind(this);
    this.login = this.login.bind(this);
    this.initialPageLoad = this.initialPageLoad.bind(this);
    this.NewestByCountry = this.NewestByCountry.bind(this);
    this.initialPageLoad();

  }

initialPageLoad(){

console.log(Spotify.initialize());

if(Spotify.initialize()){
  Spotify.getUserID().then(userPromise => {
    this.setState({UserID: userPromise.id})
    this.setState({'login': true});

  })

 }

}

login(){
if(!this.state.login){
    Spotify.getAccessToken();
  }
}

spotifySearch(term){


  let newsearchResults = [];
  Spotify.spotifySearch(term).then(searchPromise => {

    newsearchResults = searchPromise.map(track => {

        return track;
    })


    this.setState({'SearchResults': newsearchResults});


  });

console.log(this.state.SearchResults);
}

NewestByCountry(CountryCode){


let NewestByCountryResults = []
Spotify.NewestByCountrySearch(CountryCode).then(results => {

  NewestByCountryResults = results.albums.items.map(item => {

    return item;

  });

  this.setState({'SearchResults': NewestByCountryResults});
  console.log(NewestByCountryResults);
})

}

savePlaylist(){
//Generates an array of uri values called trackURIs from the playlistTracks property.
let uriValues = this.state.playlistTracks.map(track => {

  return track.uri;

});

console.log(uriValues)

Spotify.savePlaylist(this.state.playlistName, uriValues);


}

updatePlaylistName(name){

  this.setState({'playlistName': name});

}

addTrack(track){

//logic could be cleaner here:
  if(this.state.playlistTracks.some(playlistObject => track.id === playlistObject.id)){
    console.log("addTrack(): track id already exists!");
  }else{
    let newPlayListTrack = this.state.playlistTracks.map (playListTrack => {
      return playListTrack;
    })
    newPlayListTrack.push(track);

     this.setState({'playlistTracks': newPlayListTrack});
  }


}

removeTrack(track){

  let newPlaylistTracks = this.state.playlistTracks.filter(oldTrackObject => {

    if(track.id !== oldTrackObject.id){
      return oldTrackObject;
    }
  });

   this.setState({'playlistTracks': newPlaylistTracks});
}



  render() {


    return (
      <div>

      <div className="banner">

        <h1>Ja<span className="highlight">mmm</span>ing </h1>

      </div>
        <div className="App">

         <SearchBar spotifySearch={this.spotifySearch} login={this.login} NewestByCountry={this.NewestByCountry} loginstatus={this.state.login} UserID={this.state.UserID}/>

          <div className="App-playlist">
          <SearchResults SearchResults={this.state.SearchResults} addTrack={this.addTrack}/>


           <PlayList playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            removeTrack={this.removeTrack}
            addTrack={this.addTrack}
            updatePlaylistName={this.updatePlaylistName}
            savePlaylist={this.savePlaylist}/>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
