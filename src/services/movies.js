// We use a library called axios for sending get, post, put and delete request
import axios from "axios";
class MovieDataService {

    // getAll returns all the movies for a particular page (default page request is 0)
    getAll(page = 0) {
        return axios.get(`http://localhost:5000/api/v1/movies?page=${page}`)
    }
    // get(id) gets the specific movie with the supplied id
    get(id) {
        return axios.get(`http://localhost:5000/api/v1/movies/id/${id}`)
    }

// find() connects to the same endpoint as getAll except that it has query which consists of the user-entered
// search title, ratings (e.g. ‘G’) and page number
    find(query, by = "title", page = 0) {
        return axios.get(
            `http://localhost:5000/api/v1/movies?${by}=${query}&page=${page}`
        )
    }
    // The remaining four methods are for creating, updating and deleting a review and to get all ratings
    createReview(data) {
        return axios.post("http://localhost:5000/api/v1/movies/review", data)
    }
    updateReview(data) {
        return axios.put("http://localhost:5000/api/v1/movies/review", data)
    }
    deleteReview(id, userId) {
        return axios.delete(
            "http://localhost:5000/api/v1/movies/review",
            { data: { review_id: id, user_id: userId } }
        )
    }
    getRatings() {
        return axios.get("http://localhost:5000/api/v1/movies/ratings")
    }
}
export default new MovieDataService()