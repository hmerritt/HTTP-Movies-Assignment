import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";

function UpdateMovie() {
    const [movie, setMovie] = useState(null);
    const match = useRouteMatch();

    const fetchMovie = id => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err.response));
    };

    useEffect(() => {
        fetchMovie(match.params.id);
    }, [match.params.id]);

    if (!movie) {
        return <div>Loading movie information...</div>;
    }

    return (
        <div className="update-movie">
            <h3>Update Movie</h3>

            <form></form>
        </div>
    );
}

export default UpdateMovie;
