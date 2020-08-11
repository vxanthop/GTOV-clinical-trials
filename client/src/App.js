import React, { useState } from 'react';
import StudySearch from './components/StudySearch/StudySearch';
import StudyList from './components/StudyList/StudyList';
import Navbar from './components/Navbar/Navbar';
import Pagination from './components/Pagination/Pagination';

import './App.css';

function App() {
    const [ studies, setStudies ] = useState([]);

    const prettify = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    const format = study => {
        study.drugs = study.drugs.map(drug => prettify(drug))
        study.conditions = study.conditions.map(condition => prettify(condition))
        return study;
    };
    const removeDuplicates = study => {
        study.drugs = [...(new Set(study.drugs))];
        study.conditions = [...(new Set(study.conditions))];
        return study;
    };

    const updateStudies = value => {
        const encoded_uri = `/api/studies/` + encodeURIComponent(value);
        fetch(encoded_uri)
            .then(res => res.json())
            .then(res => res.map(study => removeDuplicates(study)))
            .then(res => res.map(study => format(study)))
            .then(res => createFiltered(res, value))
            .then(res => setStudies(res))
        };
        
    const createFiltered = (studies, value) => {
        studies.forEach(study => {
            study.e = study.eligibility_criteria.toLowerCase().includes(value.toLowerCase())
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
                <div id="a" className="col s12">  <StudyList studies={ studies } />    </div>
                <div id="e" className="col s12">  <StudyList studies={ studies.filter(study => study.e) } />  </div>
                <div id="b" className="col s12">  <StudyList studies={ studies.filter(study => study.b) } />  </div> 
                <div id="eb" className="col s12"> <StudyList studies={ studies.filter(study => study.e && study.b) } /> </div>
            </div>
            <Pagination />     
        </div>
    );
}

export default App;
