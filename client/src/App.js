import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchMusic from './pages/SearchMusic';
import SavedMusic from './pages/SavedMusic';
import Navbar from './components/Navbar';

// import Apollo Provider to work with Apollo Server
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
console.log(process.env.REACT_APP_APIKEY)
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

 // execute authLink 
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route 
            path='/' 
            element={<SearchMusic />} 
          />
          <Route 
            path='/saved' 
            element={<SavedMusic />} 
          />
          <Route 
            path='*'
            element={<h1 className='display-2'>Wrong page!</h1>}
          />
        </Routes>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
