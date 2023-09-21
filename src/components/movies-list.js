import React, { useState, useEffect } from 'react'
import MovieDataService from "../services/movies"
import { Link } from "react-router-dom"

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const MoviesList = props => {
    //The searchTitle and searchRating state variables
    //keep track of what a user has entered into the search form fields in the Movies List page.

    const [movies, setMovies] = useState([])
    const [searchTitle, setSearchTitle] = useState("")
    const [searchRating, setSearchRating] = useState("")
    const [ratings, setRatings] = useState(["All Ratings"])

    //  The useEffect hook is called after the component renders. So if we want to tell the component to perform
    // some code after rendering, we include it here

    // *Note that it is important that we specify an empty array in the second argument of useEffect. When we
    // do so, useEffect is called only once when the component first renders
    useEffect(() => {
        retrieveMovies()
        retrieveRatings()
    }, [])

    //getAll returns a promise with the movies retrieved from the database and we set it to the movies state
    // variable with setMovies(response.data.movies).

    const retrieveMovies = () => {
        MovieDataService.getAll()
            .then(response => {
                console.log(response.data)
                setMovies(response.data.movies)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const retrieveRatings = () => {
        MovieDataService.getRatings()
            .then(response => {
                console.log(response.data)
                //start with 'All ratings' if user doesn't specify any ratings
                setRatings(["All Ratings"].concat(response.data))
            })
            .catch(e => {
                console.log(e)
            })
    }

    // onChangeSearchTitle will be called whenever a user types into the search title field. onChangeSearchTitle will
    // then take the entered value and set it to the component state. onChangeSearchRating works in the same
    // fashion
    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value
        setSearchTitle(searchTitle);
    }
    const onChangeSearchRating = e => {
        const searchRating = e.target.value
        setSearchRating(searchRating);
    }
    // The find function is supported by the findByTitle and findByRating methods. find simply provides the search
    // query value entered by the user and by which field to search (i.e. title or rated) to MovieDataService.find
    //find() in turn calls the backend API.
    const find =(query, by) =>{
        MovieDataService.find(query,by)
        .then(response =>{
        console.log(response.data)
        setMovies(response.data.movies)
        })
        .catch(e =>{
        console.log(e)
        })
        }

// findByTitle is called by the ‘Search by title’s search button. It provides the title value to be searched 
//  to find() and tells it to search by ‘title’.

        const findByTitle = () => {
        find(searchTitle, "title")
        }

// findByRating is called by the ‘Search by rating’s search button. It provides the rating value to be searched
// to find() and tells it to search by ‘rated’.

        const findByRating = () => {
        if(searchRating === "All Ratings"){
        retrieveMovies()
        }
        else{
        find(searchRating, "rated")
        }
    }

    return (
        <div className="App">
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by title"
                                    value={searchTitle}
                                    onChange={onChangeSearchTitle}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={findByTitle}
                            >
                                Search
                            </Button>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    as="select" onChange={onChangeSearchRating} >
                                    {ratings.map(rating => {
                                        return (
                                            <option value={rating}>{rating}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={findByRating}
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    {movies.map((movie) => {
                        return (
                            <Col>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img src={movie.poster + "/100px180"} />
                                    <Card.Body>
                                        <Card.Title>{movie.title}</Card.Title>
                                        <Card.Text>
                                            Rating: {movie.rated}
                                        </Card.Text>
                                        <Card.Text>{movie.plot}</Card.Text>
                                        <Link to={"/movies/" + movie._id} >View Reviews</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    );
}
export default MoviesList;