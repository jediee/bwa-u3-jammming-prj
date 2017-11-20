import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {

constructor(props){
  super(props);
  this.state = {searchTerm: "Enter A Song, Album, or Artist"
                }

  this.handleSearch = this.handleSearch.bind(this);
  this.updateSearchTerm = this.updateSearchTerm.bind(this);
  this.handleLoginClick = this.handleLoginClick.bind(this);
  this.handleNewestByCountryClick = this.handleNewestByCountryClick.bind(this);


}

updateSearchTerm(event){

this.setState({'searchTerm': event.target.value})

}

handleSearch(){

if(this.props.loginstatus){
  this.props.spotifySearch(this.state.searchTerm);
}else{
  //highlight login button
  console.log(this.props);
}

}

handleNewestByCountryClick(event){


  this.props.NewestByCountry(event.target.hreflang);
  console.log(event.target.hreflang);

}

handleLoginClick(){

if(this.props.loginstatus){

}else{
  this.props.login();
}

}

handleLoginText(){

  if(this.props.loginstatus){
    return `Welcome ${this.props.UserID}`;
  }else{
    return `Login`
  }

}

styleLogin(){

if(this.props.loginstatus){
  return "LoggedIn";
}else{
  return "Login";
}

}



dropDownHighlight(){
  var x = document.getElementById("dropdowndiv");
      if (x.className.indexOf("w3-show") == -1) {
          x.className += " w3-show";
      } else {
          x.className = x.className.replace(" w3-show", "");
      }

}


/*
<div id="country" className="w3-dropdown-click">
  <button onClick={this.dropDownHighlight} className="w3-button">Latest Playlists By Country</button>
  <div id="dropdowndiv" className="w3-dropdown-content w3-bar-block w3-animate-zoom">
    <a id="dropdownlink" onClick={this.handleNewestByCountryClick} hreflang="CN" className="w3-bar-item w3-button">China</a>
    <a id="dropdownlink" onClick={this.handleNewestByCountryClick} hreflang="ZA" className="w3-bar-item w3-button">South Africa</a>
    <a id="dropdownlink" onClick={this.handleNewestByCountryClick} hreflang="SE" className="w3-bar-item w3-button">Sweden</a>
  </div>
</div>
*/


  render(){
    return (
      <div>


    <div className="SearchBar">

      <input onChange={this.updateSearchTerm} placeholder={this.state.searchTerm}/>
      <a onClick={this.handleSearch}>SEARCH</a>
      <a id="Login" onClick={this.handleLoginClick} onChange={this.handleLoginText}>{this.handleLoginText()}</a>


    </div>

    </div>

  );
  }
}

export default SearchBar;
