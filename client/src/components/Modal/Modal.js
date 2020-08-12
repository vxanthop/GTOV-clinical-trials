import React, { useEffect, useRef } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

function Modal({ type, text, title, pick, study_id }) {
    const modalElem = useRef(null);

    useEffect(() => {
        M.Modal.init(modalElem.current, {
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            startingTop: "4%",
            endingTop: "10%"
        });    
    }, [])

    return (
        <>
            <a
                href="#!" className={`btn modal-trigger ${(type === 'done') ? "" : "red"}`}
                data-target={`modal-${study_id}-${pick}`}
            >
            <i className="material-icons prefix">{type}</i>
            </a>

            <div ref={modalElem} id={`modal-${study_id}-${pick}`} className="modal">
                <div className="modal-content">
                    <h4 style={{marginBottom: "50px"}}>{title}</h4>
                    <p>{text}</p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close btn-flat">
                        OK
                    </a>
                </div>
            </div>
        </>
    );
}

export default Modal;
