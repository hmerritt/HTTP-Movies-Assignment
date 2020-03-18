import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, movieList, setMovieList }) {
    const [movie, setMovie] = useState(null);
    const match = useRouteMatch();
    const history = useHistory();

    const fetchMovie = id => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err.response));
    };

    const saveMovie = () => {
        addToSavedList(movie);
    };

    useEffect(() => {
        fetchMovie(match.params.id);
    }, [match.params.id]);

    if (!movie) {
        return <div>Loading movie information...</div>;
    }

    //  Delete movie
    const deleteMovie = () => {
        //  Movie idea
        const id = match.params.id;

        //
        axios
            .delete(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                //  Remove movie from movieList
                setMovieList(movieList.filter((movie) => movie.id !== Number(id)));

                //  Route the user to /movies
                history.push('/');
            })
            .catch(err => {
                console.log("[MovieCard] Error deleting movie:", err);
            })
    }

    return (
        <div className="save-wrapper">
            <MovieCard movie={movie} />

            {/* Delete movie */}
            <div className="delete-button" onClick={deleteMovie}>
                Delete
            </div>

            <div className="save-button" onClick={saveMovie}>
                Save
            </div>
        </div>
    );
}

export default Movie;
