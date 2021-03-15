import React, {useState, useEffect} from "react";
import './App.css';
import './pages/MovieReviews/MovieReviews'
import MovieReviews from "./pages/MovieReviews/MovieReviews";

function App() {
  return (
    <div className="App" style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL + '/logo192.png'})`,
      backgroundColor: "aqua"
    }}>
      <MovieReviews/> 
    </div>
  );
}

export default App;
