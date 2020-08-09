import React from 'react';
import './Study.css';

function Study({ index, study }) {
  return (
    <div className='study'>
      <p>
        study_id: {study.study_id} <br/>        
        status: {study.status} <br/>
        date: {study.date} <br/>
        brief_title: {study.brief_title} <br/>
        url: <a href={study.url} target="_blank" rel="noopener noreferrer">{study.url}</a> <br/>
        drugs: {study.drugs} <br/>
        {/* brief_summary: {study.brief_summary} <br/> */}
        {/* eligibility_criteria: {study.eligibility_criteria} <br/> */}
        conditions: {study.conditions}          
      </p>
    </div>
  );
}

export default Study;
