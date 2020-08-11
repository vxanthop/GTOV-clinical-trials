import React from 'react';
import Modal from '../Modal/Modal';
import './Study.css';

function Study({ study, pick }) {
    return (
        <tr className="study z-depth-1">
            <td>{study.study_id}</td>
            <td>{study.date}</td>
            <td><a href={study.url} className="blur-text" target="_blank" rel="noopener noreferrer">{study.brief_title}</a></td>
            <td>{study.drugs.map(drug => <li key={study.study_id + drug}>{drug}</li>)}</td>
            <td>{study.conditions.map(condition => <li key={study.study_id + condition}>{condition}</li>)}</td>
            <td><Modal type={(study.e) ? "done" : "clear"} text={study.eligibility_criteria} title="Eligibility Criteria" pick={pick} /></td>
            <td><Modal type={(study.b) ? "done" : "clear"} text={study.brief_summary} title="Brief Summary" pick={pick} /></td>
            <td className={(study.status === "Completed" || study.status === "Terminated") ? study.status : "Other"}>{study.status}</td>
        </tr>
    );
}

export default Study;
