import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchMusic from './pages/SearchMusic';
import SavedMusic from './pages/SavedMusic';
import Navbar from './components/Navbar';


function App() {
    return (
        <Router>
            <h1>hello</h1>
            <>
            <Navbar />
            <Routes>
                <Route 
                path='/'
                elements={<SearchMusic />}
                />
                <Route 
                path='/saved'
                elements={<SavedMusic />}
                />
            </Routes>
            </>
        </Router>
    )
}

export default App;