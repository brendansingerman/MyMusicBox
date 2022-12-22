import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchMusic from './pages/SearchMusic';
import SavedMusic from './pages/SavedMusic';
import Navbar from './components/Navbar';


function App() {
    return (
        <Router>
            <>
            <Navbar />
            <Routes>
                <Route 
                path='/'
                elements={<SearchMusic />}
                />
                <Route 
                path='/saved'
                elements={<SearchMusic />}
                />
            </Routes>
            </>
        </Router>
    )
}

export default App;