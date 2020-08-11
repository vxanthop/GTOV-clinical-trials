import React, { useState, useEffect } from 'react';
import Study from '../Study/Study';
import Pagination from '../Pagination/Pagination';


function StudyList({ studies, pick }) {
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ studyPage, setStudyPage ] = useState([]);
    const [ studiesPerPage ] = useState(10);

    const pages = Math.ceil(studies.length / studiesPerPage);

    // Change page
    const paginate = pageNumber => {
        if(pageNumber < 1)
            pageNumber = 1;
        if(pageNumber > pages)
            pageNumber = pages;
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        const indexOfLastStudy = currentPage * studiesPerPage;
        const indexOfFirstStudy = indexOfLastStudy - studiesPerPage;
        setStudyPage(studies.slice(indexOfFirstStudy, indexOfLastStudy));
    }, [currentPage, studiesPerPage, studies])

    return (
        <>
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
                {(studyPage.length > 0) && studyPage.map(study => <Study key={study.study_id} study={study} pick={pick} />)}
            </tbody>
        </table>
        {(pages > 0) ? <Pagination pages={pages} paginate={paginate} currentPage={currentPage} /> : ""}
        </>
    );
}

export default StudyList
