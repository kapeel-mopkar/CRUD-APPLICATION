import React, {useState, useEffect} from "react";
import './App.css';
import Axios from "axios";

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewsList, setMovieReviewsList] = useState([]);

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/movieReviews").then((response)=>{
      console.log(response.data)
      setMovieReviewsList(response.data)
    })
  },[]);

  const submitReview = ()=>{
    if(!movieName || !review){
      alert('Please add required data');
      return;
    }
    Axios.post("http://localhost:3001/api/movieReviews", {
      movieName: movieName, 
      movieReview: review
    }).then((response)=>{
      console.log(response.data);
      const reviewId = response.data.insertId;
      setMovieReviewsList([...movieReviewsList, {id: reviewId, movie_name: movieName, movie_review: review}]);
      setMovieName('');
      setReview('');
      alert("Review added");
    });
  };

  const deleteReview = (data)=>{
    //alert(data)
    Axios.delete("http://localhost:3001/api/movieReviews/"+data);
    setMovieReviewsList([...movieReviewsList.filter(x => x.id !== data)]);
  }

  return (
    <div className="App">
      <h1>MOVIE REVIEWS APP</h1>
      <div className="form" >
        <label>Movie Name:</label>
        <input type="text" name="movieName" onChange={(e)=> {
          setMovieName(e.target.value)
        }} />
        <label>Review:</label>
        <input type="text" name="review" onChange={(e)=> {
          setReview(e.target.value)
        }} />
        
        <button onClick={submitReview}>Submit</button>
        {movieReviewsList.map((val)=>{
          return (
            <div className='card'>
              <h2>{val.movie_name}</h2>
              <p>{val.movie_review}</p>
              <button onClick={(e)=> {
                deleteReview(val.id)
              }}>Delete</button>
            </div>);
      })}
      </div>
      
    </div>
  );
}

export default App;
