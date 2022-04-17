import React, { useContext } from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { ReviewsContext } from "../store/ReviewsContext";

// const REVIEWS = gql`
//     query GetReviews {
//         reviews {
//             data {
//                 id
//                 attributes {
//                     name
//                     body
//                     rating
//                     categories {
//                         data {
//                             id
//                             attributes {
//                                 name
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// `;

export default function Homepage() {
    // const { loading, error, data } = useQuery(REVIEWS);
    const { loading, error, data } = useContext(ReviewsContext);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            {data.reviews.data.map((review) => (
                <div key={review.id} className="review-card">
                    <div className="rating">{review.attributes.rating}</div>
                    <h2>{review.attributes.name}</h2>

                    {review.attributes.categories.data.map((c) => (
                        <small key={c.id}>{c.attributes.name}</small>
                    ))}

                    <p>{review.attributes.body.substring(0, 200)}...</p>
                    <Link to={`/details/${review.id}`}>Read more</Link>
                </div>
            ))}
        </div>
    );
}
