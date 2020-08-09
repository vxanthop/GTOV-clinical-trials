import React, { useState, useEffect } from 'react';
import './App.css';
import StudySearch from './components/StudySearch/StudySearch'
import Study from './components/Study/Study'

function App() {
    const [ studies, setStudies ] = useState([]);

    useEffect(() => {
        fetch('/api/studies')
            .then(res => res.json())
            .then(res => setStudies(res))
    }, []);

    const updateStudies = value => {
        const encoded_uri = encodeURI(`/api/studies/${value}`)
        fetch(encoded_uri)
            .then(res => res.json())
            .then(res => setStudies(res))
    };

    return (
    <div className="app">
        <header>
            <h1>Clinical Trials Gov</h1>
        </header>
        <StudySearch updateStudies={ updateStudies } />
        <div className="study-list">
            {studies.map((study, index) => (
                <Study key={index} index={index} study={study} />
            ))}
        </div>
    </div>
    );
}

export default App;
