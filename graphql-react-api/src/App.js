import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useQuery
} from "@apollo/client";
import "./styles.css";

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql",
  cache
});

const GET_NAME_RATE = gql`
  query {
    launchesPast(limit: 5) {
      ships {
        name
        home_port
        image
        image
        id
        status
      }
    }
  }
`;
function ExchangeRates() {
  const { loading, error, data } = useQuery(GET_NAME_RATE);
  if (loading) return <p>Loading...</p>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return data.launchesPast.map((ship) =>
    ship.ships.map((s) => {
      return (
        <div className="img-container">
          <div className="name">
            <h3>Name: </h3> <span>{s.name}</span>
          </div>
          <img src={s.image} alt={s.name} />
        </div>
      );
    })
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <h1 className="App">Spacex launch ships</h1>
      <div className="App">
        <ExchangeRates />
      </div>
    </ApolloProvider>
  );
}
