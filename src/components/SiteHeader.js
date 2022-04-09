import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORIES = gql`
    query GetCategories {
        categories {
            data {
                id
                attributes {
                    name
                }
            }
        }
    }
`;

export default function SiteHeader() {
    const { loading, error, data } = useQuery(CATEGORIES);
    if (loading) return <p>Loading Categories...</p>;
    if (error) return <p>Error for fetching categories!</p>;

    return (
        <div className="site-header">
            <Link to="/">
                <h1>Ninja Reviews</h1>
            </Link>

            <div className="cat-wrap">
                <span className="cat-title">Filter reviews by category</span>
                {data.categories.data.map((category) => (
                    <div key={category.id}>
                        <Link
                            to={`/category/${category.id}`}
                            className="cat-name"
                        >
                            {category.attributes.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
