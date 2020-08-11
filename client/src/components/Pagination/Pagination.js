import React from 'react';

function Pagination({ pages, paginate, currentPage }) {
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className='pagination center'>
            <li onClick={() => paginate(currentPage - 1)} className={currentPage === 1 ? "disabled": ""}>
                <a href="/#"><i className="material-icons">chevron_left</i></a>
            </li>
            {pageNumbers.map(number => (
                <li key={number} className={currentPage === number ? "active": ""}>
                    <a href="/#" className="page-link" onClick={() => paginate(number)}>
                        {number}
                    </a>
                </li>
            ))}
            <li onClick={() => paginate(currentPage + 1)} className={currentPage === pageNumbers[pageNumbers.length - 1] ? "disabled": ""}>
                <a href="/#"><i className="material-icons">chevron_right</i></a>
            </li>
        </ul>
    );
};

export default Pagination;
