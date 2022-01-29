import logo from "./logo.png";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import Launches from "./components/Launches";
import Launch from "./components/Launch";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <img
            src={logo}
            alt=""
            style={{ width: 300, display: "block", margin: "auto" }}
          />
          <Routes>
            <Route exact path="/" element={<Launches />} />
            <Route exact path="/launch/:flight_number" element={<Launch />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
