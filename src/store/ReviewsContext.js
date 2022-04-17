import { createContext } from "react";
import { useQuery, gql } from "@apollo/client";

const REVIEWS = gql`
    query GetReviews {
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
`;

export const ReviewsContext = createContext();

const ReviewsContextProvider = ({ children }) => {
    const { loading, error, data } = useQuery(REVIEWS);

    const value = {
        loading: loading,
        error: error,
        data: data,
    };
    return (
        <ReviewsContext.Provider value={value}>
            {children}
        </ReviewsContext.Provider>
    );
};

export default ReviewsContextProvider;
