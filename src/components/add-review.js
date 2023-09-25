import React, { useState } from 'react'
import MovieDataService from "../services/movies"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//The editing Boolean variable will be set to true if the component is in ‘Editing’ mode. False means we are
//adding a review
const AddReview = props => {
    console.log(props)
    let editing = false

    let initialReviewState = ""
    //We first check if a state is passed into AddReview. If you recall in movie.js, we pass in a state in the link to
    //edit    
    if (props.location.state && props.location.state.currentReview) {
        editing = true
        initialReviewState = props.location.state.currentReview.review
    }

    //We have a review state variable set to initialReviewState. In edit mode, initialReviewState
    //will be set to the existing review text  
    
    const [review, setReview] = useState(initialReviewState)
    // keeps track if review is submitted
    const [submitted, setSubmitted] = useState(false)

    //The onChangeReview keeps track of the user-entered review value in the field
    const onChangeReview = e => {
        const review = e.target.value
        setReview(review);
    }
    // In saveReview, we first create a 
    // data object containing the review’s properties, e.g. the review text, user name etc

    // We get name and user_id from props as this is passed into the AddReview component back in App.js:
    const saveReview = () => {
        var data = {
            review: review,
            name: props.user.name,
            user_id: props.user.id,
            movie_id: props.match.params.id // get movie id direct from url
        }

        if (editing) {
            // get existing review id
            data.review_id = props.location.state.currentReview._id
            MovieDataService.updateReview(data)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e);
                })
        }

        else {
            MovieDataService.createReview(data)
                .then(response => {
                    setSubmitted(true)
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    return (
        <div>
            {submitted ? (
                <div>
                    <h4>Review submitted successfully</h4>
                    <Link to={"/movies/" + props.match.params.id}>
                        Back to Movie
                    </Link>
                </div>
            ) : (
                <Form>
                    <Form.Group>
                        <Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={review}
                            onChange={onChangeReview}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={saveReview}>
                        Submit
                    </Button>
                </Form>
            )}
        </div>
    )
}
export default AddReview;


