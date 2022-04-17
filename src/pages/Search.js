import React, { useContext, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ReviewsContext } from "../store/ReviewsContext";

const Search = () => {
    const reviewsCtx = useContext(ReviewsContext);
    const location = useLocation();

    // console.log(location.searchText);

    const searchResults = reviewsCtx.data.reviews.data.filter((review) =>
        review.attributes.name
            .toLowerCase()
            .includes(location.searchText.toLowerCase())
    );
    console.log(searchResults);
    return (
        <div>
            {searchResults.map((result) => (
                <div key={result.id} className="review-card">
                    <div className="rating">{result.attributes.rating}</div>
                    <h2>{result.attributes.name}</h2>

                    {result.attributes.categories.data.map((c) => (
                        <small key={c.id}>{c.attributes.name}</small>
                    ))}

                    <p>{result.attributes.body.substring(0, 200)}...</p>
                    <Link to={`/details/${result.id}`}>Read more</Link>
                </div>
            ))}
        </div>
    );
};

export default Search;
