import React from 'react';

function Pagination() {
    return (
        <ul className="pagination center">
            <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
            <li><a href="#!">1</a></li>
            <li><a href="#!">2</a></li>
            <li><a href="#!">3</a></li>
            <li><a href="#!">4</a></li>
            <li><a href="#!">5</a></li>
            <li><a href="#!"><i className="material-icons">chevron_right</i></a></li>
        </ul>
    )
};

export default Pagination;
