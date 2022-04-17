import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// page & layout imports
import Homepage from "./pages/Homepage";
import ReviewDetails from "./pages/ReviewDetails";
import Category from "./pages/Category";
import SiteHeader from "./components/SiteHeader";
import ReviewsContextProvider from "./store/ReviewsContext";
import Search from "./pages/Search";

const client = new ApolloClient({
    uri: "http://localhost:1337/graphql",
    cache: new InMemoryCache(),
});

function App() {
    return (
        <Router>
            <ApolloProvider client={client}>
                <ReviewsContextProvider>
                    <div className="App">
                        <SiteHeader />
                        <Switch>
                            <Route exact path="/">
                                <Homepage />
                            </Route>
                            <Route path="/details/:id">
                                <ReviewDetails />
                            </Route>
                            <Route path="/category/:id">
                                <Category />
                            </Route>
                            <Route path="/search">
                                <Search />
                            </Route>
                        </Switch>
                    </div>
                </ReviewsContextProvider>
            </ApolloProvider>
        </Router>
    );
}

export default App;
