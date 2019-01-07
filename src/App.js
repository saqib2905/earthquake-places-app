import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import PlacesList from './components/PlacesList';

class App extends Component {
   api =
      'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02';
   initialPlacesData = [];
   state = {
      places: [],
      magniType: '',
      mag: '',
      isLoading: true
   };

   componentDidMount() {
      axios
         .get(this.api)
         .then(res => {
            const initialPlacesData = res.data.features.map(feature => ({
               ...feature,
               mag: feature.properties.mag,
               magType: feature.properties.magType
            }));
            console.log('new data', initialPlacesData);
            this.initialPlacesData = initialPlacesData;
            this.setState({
               places: initialPlacesData
            });
         })
         .catch(error => {
            console.log('Error Fetching and parsing data', error);
         });
   }

   handleTogglePlacesList = e => {
      this.setState({ isLoading: !this.state.isLoading });
   };

   handleMag = e => {
      this.setState({
         mag: e.target.value
      });
   };
   handleMagType = e => {
      this.setState({
         magniType: e.target.value
      });
   };
   handleSearch = e => {
      e.preventDefault();
      let newPlaces = this.initialPlacesData;
      const { mag, magniType } = this.state;
      if (!mag && !magniType) {
         return this.setState({ places: newPlaces });
      }
      if (mag) {
         newPlaces = newPlaces.filter(place => place.mag === parseFloat(mag));
      }
      if (magniType) {
         newPlaces = newPlaces.filter(place => place.magType === magniType);
      }
      this.setState({ places: newPlaces });
   };

   render() {
      const { isLoading, places } = this.state;
      return (
         <div className="App">
            <header className="App-header">
               <p>EarthQuake Places List App</p>
            </header>
            <div className="App-content">
               <h2>Filter your search By Magnitude OR Magnitude type</h2>
               <form>
                  <input
                     type="search"
                     onChange={this.handleMag}
                     name="searchhmag"
                     placeholder="Search mag..."
                  />
                  <button name="magSearchBtn" onClick={this.handleSearch}>
                     Submit
                  </button>

                  <input
                     type="search"
                     onChange={this.handleMagType}
                     name="searchmagtype"
                     placeholder="Search magtype..."
                  />
                  <button name="magTypeSearchBtn" onClick={this.handleSearch}>
                     Submit
                  </button>
               </form>

               <label className="label-text">To See List Of Earthquake Places:</label>
               <button onClick={this.handleTogglePlacesList}>
                  {isLoading ? 'Show List' : 'Hide List'}
               </button>

               {isLoading ? (
                  <h1>Click on Show List Button to see lists of EarthQuake Places....</h1>
               ) : (
                  <PlacesList data={places} />
               )}
               {!isLoading && !places.length && <p> No places found</p>}
            </div>
         </div>
      );
   }
}

export default App;
