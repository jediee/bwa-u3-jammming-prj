
const clientID = "db903e150ff348feb5e119023aea80e9";

const redirectUri = "http://localhost:3000";
let authURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&scope=user-library-read playlist-modify-public&response_type=token`;
let searchURL = `http://api.spotify.com/v1/search?q=`;
let accessToken;
let expirationToken;
let tracksArray = [];


let Spotify = {



initialize(){



  if(accessToken){
    return true;
  }else if(window.location.href.search("access_token") >= 0) {

  accessToken = window.location.href.match("access_token=([^&]*)");
  expirationToken = window.location.href.match("expiration_in=([^&]*)");


  return true;
}else{

  //No accessToken available
  return false;
}


},

  getUserID(){


  return(fetch(`https://api.spotify.com/v1/me`, {

      headers: {"Authorization": `Bearer ${accessToken[1]}`}

    }).then(response => {


      if(response.ok){
        return response.json()
      }

    }).then(jsonResponse => {

      console.log(jsonResponse);
      return jsonResponse;

    }));

},

   getAccessToken(){

    try {


    if(accessToken){
      return accessToken
    }else if(window.location.href.search("access_token") >= 0) {

    accessToken = window.location.href.match("access_token=([^&]*)");
    expirationToken = window.location.href.match("expiration_in=([^&]*)");



  }else {
        location.assign(authURL);
    }

  } catch (error){
    console.log(error);
  }
},

  spotifySearch(term){

    Spotify.getAccessToken();

    if(accessToken){
    return (fetch(`http://localhost:8080/${searchURL}${term}&type=track`,{

      headers: {Authorization: `Bearer ${accessToken[1]}`}

    }).then(response => {

      if(response.ok){
        return response.json();
      }


    }).then(jsonResponse =>  {

        tracksArray = jsonResponse.tracks.items.map(track => {
        return {id: track.id, name: track.name, artist: track.artists[0].name, album: track.album.name, uri: track.uri};
      });

      return tracksArray;

    }));
  }},


savePlaylist(playlistName, trackURIS){



  fetch(`https://api.spotify.com/v1/me`, {

    headers: {"Authorization": `Bearer ${accessToken[1]}`}

  }).then(response => {


    if(response.ok){
      return response.json()
    }

  }).then(jsonResponse => {

    return jsonResponse;

  }).then(displayName => {

    let userID = displayName.id;

    let data = new FormData();
    data.append('json', JSON.stringify({name: playlistName}));

    fetch(`http://localhost:8080/https://api.spotify.com/v1/users/${userID}/playlists`, {

      method: `POST`,
      headers: {
        "Authorization": `Bearer ${accessToken[1]}`,
        "Content-Type": "application/json"
        },

      body: JSON.stringify({name: playlistName})


    }).then(createPlaylistResponse => {

      if(createPlaylistResponse.ok){
        return createPlaylistResponse.json()

      }
    }).then(jsonResponse => {

      return jsonResponse;
    }).then(playlist => {

      let url = `http://localhost:8080/https://api.spotify.com/v1/users/${userID}/playlists/${playlist.id}/tracks?uris=`;
      trackURIS.forEach(track => {

          url += track+",";
      })

      fetch(url,{

        method: `POST`,
        headers: {
          "Authorization": `Bearer ${accessToken[1]}`,
          "Content-Type": "application/json",
          body: {uris: trackURIS}

          },

      }).then(response => {


        if(response.ok){
          return response.json();
        }

      }).then(jsonResponse => {

        console.log(jsonResponse);
      })
    })
  })

  console.log(playlistName, trackURIS)


},



NewestByCountrySearch(CountryCode){


  return(fetch(`http://localhost:8080/https://api.spotify.com/v1/browse/new-releases?country=${CountryCode}`, {

    headers: {"Authorization": `Bearer ${accessToken[1]}`}



  }).then(response => {

    if(response.ok){

      return response.json();
    }

  }).then(jsonResponse => {
    
      return jsonResponse;
  })
);


}




}


export default Spotify;
