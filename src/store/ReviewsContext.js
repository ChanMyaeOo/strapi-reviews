import { createContext, useState } from "react";
import { useQuery, gql } from "@apollo/client";

const REVIEWS = gql`
    query GetReviews($pageSize: Int!, $page: Int!) {
        reviews(pagination: { limit: $pageSize, start: $page }) {
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
`;

export const ReviewsContext = createContext();

const ReviewsContextProvider = ({ children }) => {
    const PAGE_SIZE = 2;
    const [page, setPage] = useState(0);
    const { loading, error, data } = useQuery(REVIEWS, {
        variables: {
            pageSize: PAGE_SIZE,
            page: page * PAGE_SIZE,
        },
    });

    const getNextPage = () => {
        console.log(data);
        setPage((prev) => prev + 1);
    };

    const getPrevPage = () => {
        setPage((prev) => prev - 1);
    };

    const value = {
        loading: loading,
        error: error,
        data: data,
        getNextPage: getNextPage,
        getPrevPage: getPrevPage,
        page: page,
        paginationResult: data?.reviews.data.length,
    };
    return (
        <ReviewsContext.Provider value={value}>
            {children}
        </ReviewsContext.Provider>
    );
};

export default ReviewsContextProvider;
