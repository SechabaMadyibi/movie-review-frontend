import React, { useState, useEffect } from 'react'
import MovieDataService from '../services/movies'
import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Media from 'react-bootstrap/Media';
import moment from 'moment'

const Movie = props => {
    //We have a movie state variable to hold the specific movie we are currently showing in the Movie
    // component. We set its initial values to null, empty strings (“”) or an empty array   
    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: []
    })
    //The getMovie method calls get() of MovieDataService (refer to chapter 16) which in turn calls the API route
    const getMovie = id => {
        MovieDataService.get(id)
            .then(response => {
                setMovie(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }
    //  we provide
    //  props.match.params.id into the second argument array. This means that useEffect should be called
    //  when the component first renders, and also each time the value of props.match.params.id (which
    //  holds that movie id) changes.
    useEffect(() => {
        getMovie(props.match.params.id)
    }, [props.match.params.id])
    console.log(props)

    // In the callback, we get the reviews array in the current state. We then provide the index of the review to
    // be deleted to the splice method to remove that review. We then set the updated reviews array as the state.
      
    const deleteReview = (reviewId, index) => {
        MovieDataService.deleteReview(reviewId, props.user.id)
            .then(response => {
                setMovie((currState) => {
                    currState.reviews.splice(index, 1)
                    return ({
                        ...currState
                    })
                })
            })

            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image src={movie.poster + "/100px250"} fluid />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {movie.plot}
                                </Card.Text>
                                {/* In the Card component, if the user is logged in, i.e. props.user is true, we include a link to ‘Add Review’
which we will implement later. Next, let’s implement the listing of reviews   */}
                                {props.user &&
                                    <Link to={"/movies/" + props.match.params.id + "/review"}>
                                        Add Review
                                    </Link>}
                            </Card.Body>
                        </Card>
                        <br></br>
                        <h2>Reviews</h2>
                        <br></br>
                        {movie.reviews.map((review, index) => {
                            return (
                                <Media key={index}>
                                    <Media.Body>
                                        <h5>{review.name + " reviewed on "}
                                            {moment(review.date).format("Do MMMM YYYY")}</h5>
                                        <p>{review.review}</p>
                                        {/* A user can only delete reviews they have posted. They can’t delete/edit other’s reviews. Thus, we first
check to see if a user is logged in (props.user is true). And only if the logged in user id is the same as
the review user id */}
                                        {props.user && props.user.id === review.user_id &&
                                            <Row>
                                                <Col><Link to={{
                                                    pathname: "/movies/" +
                                                        props.match.params.id +
                                                        "/review",
                                                    state: { currentReview: review }

                                                }}>Edit</Link>
                                                </Col>
{/* In the delete button, we pass in the review id and the index we got from the movie.reviews.map function
into deleteReview */}
                                                <Col><Button variant="link" onClick={() => deleteReview(review._id, index)}>
                                                    Delete</Button></Col>
                                            </Row>
                                        }
                                    </Media.Body>
                                </Media>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default Movie;
