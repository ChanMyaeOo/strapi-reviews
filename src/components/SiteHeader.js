import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
    const [searchTerm, setSearchTerm] = useState("");

    const history = useHistory();
    if (loading) return <p>Loading Categories...</p>;
    if (error) return <p>Error for fetching categories!</p>;

    const searchResultHandler = (e) => {
        if (e.key === "Enter") {
            history.push({
                pathname: "/search",
                searchText: searchTerm,
            });
        }
    };

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="site-header">
            <div>
                <Link to="/">
                    <h1>Ninja Reviews</h1>
                </Link>

                <input
                    type="text"
                    placeholder="Search"
                    onKeyPress={searchResultHandler}
                    value={searchTerm}
                    onChange={handleOnChange}
                />
            </div>

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
