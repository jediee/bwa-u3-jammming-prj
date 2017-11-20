import React from 'react';
import {TrackList} from '../TrackList/TrackList.js'
import './SearchResults.css';

const isRemoval=false;

class SearchResults extends React.Component {



  render(){
console.log(this.props)
    return(
      <div className="SearchResults">
        <h2>Results</h2>

          <TrackList tracks={this.props.SearchResults} addTrack={this.props.addTrack} isRemoval={isRemoval}/>
        </div>
        );
      }
    }
export default SearchResults;
