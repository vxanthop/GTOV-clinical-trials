import React from 'react';
import Study from '../Study/Study';

function StudyList({ studies }) {
    return (
        <table className="highlight responsive-table centered">
            <thead>
                <tr>
                    <th>Study ID</th>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Interventions</th>
                    <th>Conditions</th>
                    <th>Included in Eligibility Criteria</th>
                    <th>Included in Brief Summary</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {studies.length > 0 && studies.map(study => <Study key={study.study_id} study={study} />)}
            </tbody>
        </table>
    );
}

export default StudyList
