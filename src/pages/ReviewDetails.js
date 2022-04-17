import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";

const REVIEW = gql`
    query GetReview($id: ID!) {
        review(id: $id) {
            data {
                id
                attributes {
                    name
                    body
                    rating
                    image {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
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
`;

export default function ReviewDetails() {
    const { id } = useParams();
    const baseUrl = "http://localhost:1337";
    const { loading, error, data } = useQuery(REVIEW, {
        variables: {
            id: id,
        },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log(data.review.data.attributes.image.data.attributes.url);

    return (
        <div className="review-card">
            <div className="rating">{data.review.data.attributes.rating}</div>
            <h2>{data.review.data.attributes.name}</h2>

            {data.review.data.attributes.categories.data.map((c) => (
                <small key={c.id}>{c.attributes.name}</small>
            ))}

            <ReactMarkdown>{data.review.data.attributes.body}</ReactMarkdown>

            <img
                src={`${baseUrl}${data.review.data.attributes.image.data.attributes.url}`}
                alt="review"
            />
        </div>
    );
}
