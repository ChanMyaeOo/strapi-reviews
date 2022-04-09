import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORY = gql`
    query GetCategory($id: ID!) {
        category(id: $id) {
            data {
                id
                attributes {
                    name
                    reviews {
                        data {
                            id
                            attributes {
                                name
                                body
                                rating
                                categories {
                                    data {
                                        id
                                        attributes {
                                            name
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default function Category() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(CATEGORY, {
        variables: {
            id: id,
        },
    });

    if (loading) return <p>Loading ...</p>;

    if (error) return <p>Error :(</p>;

    return (
        <div>
            <span
                style={{
                    backgroundColor: "white",
                    padding: 5,
                    fontSize: "90%",
                }}
            >
                {data.category.data.attributes.name}
            </span>

            {data.category.data.attributes.reviews.data.map((review) => (
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
