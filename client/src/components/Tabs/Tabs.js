import React from 'react';
import StudyList from '../StudyList/StudyList'

function Tabs({ all_studies, e_studies, b_studies, eb_studies }) {
    return (
        <div className="row">
            <div className="col s12">
                <ul className="tabs tabs-fixed-width swipeable">
                    <li className="tab col s3">
                        <a className="active" href="#a">
                            All<span className="grey-text res-count"> ({all_studies.length})</span>
                        </a>
                    </li>
                    <li className="tab col s3">
                        <a href="#e">
                            Eligibility<span className="grey-text res-count"> ({e_studies.length})</span>
                        </a>
                    </li>
                    <li className="tab col s3">
                        <a href="#b">
                            Brief Summary<span className="grey-text res-count"> ({b_studies.length})</span>
                        </a>
                    </li>
                    <li className="tab col s3">
                        <a href="#eb">
                            Eligibility & Brief Summary<span className="grey-text res-count"> ({eb_studies.length})</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div id="a" className="col s12">
                <StudyList studies={all_studies} pick="a" />    
            </div>
            <div id="e" className="col s12">
                <StudyList studies={e_studies} pick="e" />  
            </div>
            <div id="b" className="col s12">
                <StudyList studies={b_studies} pick="b" />  
            </div> 
            <div id="eb" className="col s12">
                <StudyList studies={eb_studies} pick="eb" /> 
            </div>
        </div>
    );
}

export default Tabs;