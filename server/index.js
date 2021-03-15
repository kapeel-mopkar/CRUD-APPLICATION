const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = mysql.createPool({
    host: 'localhost',
    user: 'kapeel',
    password:'password',
    database:'CRUDDB'
})

app.use(express.json())

app.use(cors())

app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req,res)=>{
    res.send('Hello All')
})

app.get('/api/movieReviews', (req,res)=>{
    const sqlSelect = "select * from movie_reviews";
    db.query(sqlSelect, (err, result)=> {
        console.log(result);
        res.send(result)
    });
})

app.post('/api/movieReviews', (req,res)=>{
    
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT into movie_reviews(movie_name, movie_review) values (?, ?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result)=> {
        console.log(result);
        res.send(result);
    });
})

app.put('/api/movieReviews', (req,res)=>{
    
    const movieId = req.body.movieId;
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlUpdate = "UPDATE movie_reviews set movie_name=?, movie_review=? where id=?";
    db.query(sqlUpdate, [movieName, movieReview, movieId], (err, result)=> {
        console.log(result);
        res.send(result);
    });
})

app.delete('/api/movieReviews/:id', (req,res)=>{
    const id = req.params.id;
    const sqlDelete = "DELETE from movie_reviews where id=?";
    db.query(sqlDelete, [id], (err, result)=> {
        console.log(result);
        res.send('Record Deleted '+ result);
    });
});

app.get('/testReviews', (req,res)=>{
    const sqlInsert = "INSERT into movie_reviews(movie_name, movie_review) values ('Inception 2010', 'Good Movie!!')"
    db.query(sqlInsert, (err, result)=> {
        res.send('Record added '+result)
    });
})

app.listen(3001, () =>{
    console.log("running on port 3001")
})