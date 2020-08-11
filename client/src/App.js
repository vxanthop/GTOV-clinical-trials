import React, { useState } from 'react';
import StudySearch from './components/StudySearch/StudySearch';
import StudyList from './components/StudyList/StudyList';
import Navbar from './components/Navbar/Navbar';

import './App.css';

function App() {
    const [ studies, setStudies ] = useState([]);

    const prettify = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    const removeDuplicates = study => {
        study.drugs = [...(new Set(study.drugs.map(drug => prettify(drug))))];
        study.conditions = [...(new Set(study.conditions.map(condition => prettify(condition))))];
        return study;
    };

    const updateStudies = value => {
        const encoded_uri = `/api/studies/` + encodeURIComponent(value);
        fetch(encoded_uri)
            .then(res => res.json())
            .then(res => res.map(study => removeDuplicates(study)))
            .then(res => createFiltered(res, value))
            .then(res => setStudies(res))
        };
        
    const createFiltered = (studies, value) => {
        studies.forEach(study => {
            study.e = (study.eligibility_criteria === undefined) ? false: study.eligibility_criteria.toLowerCase().includes(value.toLowerCase())
            study.b = study.brief_summary.toLowerCase().includes(value.toLowerCase())
        });
        return studies
    }

    return (
        <div className="app">
            <Navbar />
            <StudySearch updateStudies={ updateStudies } />
            <div className="row">
                <div className="col s12">
                    <ul className="tabs tabs-fixed-width swipeable">
                        <li className="tab col s3"><a className="active" href="#a">All</a></li>
                        <li className="tab col s3"><a href="#e">Eligibility</a></li>
                        <li className="tab col s3"><a href="#b">Brief Summary</a></li>
                        <li className="tab col s3"><a href="#eb">Eligibility & Brief Summary</a></li>
                    </ul>
                </div>
                <div id="a" className="col s12">  <StudyList studies={ studies } pick="a" />    </div>
                <div id="e" className="col s12">  <StudyList studies={ studies.filter(study => study.e) } pick="e" />  </div>
                <div id="b" className="col s12">  <StudyList studies={ studies.filter(study => study.b) } pick="b" />  </div> 
                <div id="eb" className="col s12"> <StudyList studies={ studies.filter(study => study.e && study.b) } pick="eb" /> </div>
            </div>
        </div>
    );
}

export default App;
