import React, {useState, useEffect} from "react";
import './App.css';
import Axios from "axios";

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewId, setMovieReviewId] = useState('');
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
    //alert(movieReviewId)
    if(!movieReviewId) {
      Axios.post("http://localhost:3001/api/movieReviews", {
        movieName: movieName, 
        movieReview: review
      }).then((response)=>{
          console.log(response.data);
          const reviewId = response.data.insertId;
          setMovieReviewsList([...movieReviewsList, {id: reviewId, movie_name: movieName, movie_review: review}]);
          setMovieName('');
          setReview('');
          alert("Review Added");
      });
    }else{
      Axios.put("http://localhost:3001/api/movieReviews", {
        movieId: movieReviewId,
        movieName: movieName, 
        movieReview: review
      }).then((response)=>{
          console.log(response.data);
          // const reviewId = response.data.insertId;
          // setMovieReviewsList([...movieReviewsList, {id: reviewId, movie_name: movieName, movie_review: review}]);
          // setMovieName('');
          // setReview('');
          const elementsIndex = movieReviewsList.findIndex(element => element.id == movieReviewId );
          let updatedMovieReviewsList = [...movieReviewsList]
          updatedMovieReviewsList[elementsIndex] = {...updatedMovieReviewsList[elementsIndex], movie_name: movieName}
          updatedMovieReviewsList[elementsIndex] = {...updatedMovieReviewsList[elementsIndex], movie_review: review}
          setMovieReviewsList([...updatedMovieReviewsList]);
          setMovieName('');
          setReview('');
          setMovieReviewId('')
          alert("Review Updated");
      });
    }
  };

  const editReview = (data)=>{
    const editMovieReview = movieReviewsList.filter(x => x.id === data);
    //alert(JSON.stringify(editMovieReview));
    setMovieName(editMovieReview[0].movie_name);
    setReview(editMovieReview[0].movie_review);
    setMovieReviewId(editMovieReview[0].id);
  }

  const deleteReview = (data)=>{
    //alert(data)
    Axios.delete("http://localhost:3001/api/movieReviews/"+data);
    setMovieReviewsList([...movieReviewsList.filter(x => x.id !== data)]);
  }

  return (
    <div className="App" style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL + '/logo192.png'})`,
      backgroundColor: "aqua"
    }}>
      <h1>MOVIE REVIEWS APP</h1>
      <div className="form" >
        <label>Movie Name:</label>
        <input type="text" id="input_movieName" value={movieName} name="movieName" onChange={(e)=> {
          setMovieName(e.target.value)
        }} />
        <label>Review:</label>
        <input type="text" id="input_review" value={review} name="review" onChange={(e)=> {
          setReview(e.target.value)
        }} />
        <input type="hidden" name="movieReviewId" value={movieReviewId} onChange={(e)=> {
          setMovieReviewId(e.target.value)
        }} />
        
        <button onClick={submitReview}>Submit</button>
        {movieReviewsList.map((val)=>{
          return (
            <div className='card'>
              <h2>{val.movie_name}</h2>
              <p>{val.movie_review}</p>
              <button onClick={(e)=> {
                editReview(val.id)
              }}>Edit</button>
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
