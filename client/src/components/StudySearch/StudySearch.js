import React, { useState, useRef } from 'react';
import './StudySearch.css';

function StudySearch({ updateStudies }) {
    const [ value, setValue ] = useState([]);
    const [ items, setitems ] = useState([]); // Items for autocomplete
    const formElem = useRef(null);

	const handleSubmit = e => {
        e.preventDefault();
		updateStudies(value);
        setitems([]);
    };
    
    const extractData = input => input.map(obj => obj["drugs"]).flat().filter(item => item.toLowerCase().startsWith(value.toLowerCase()))

    const prettify = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const removeDuplicates = arr => {
        const newArr = arr.map(item => prettify(item))
        return [...(new Set(newArr))]
    }

    const handleChange = async e => {
        setValue(e.target.value)
        const encoded_uri = `/api/drugs/` + encodeURIComponent(e.target.value);
        if(value.length > 0) {
            fetch(encoded_uri)
                .then(res => res.json())
                .then(res => extractData(res))
                .then(res => removeDuplicates(res))
                .then(res => setitems(res))
        } else {
            setitems([]);
        }
    };

    const handleClick = async e => {
        await setValue(e.target.id);
        formElem.current.dispatchEvent(new Event('submit'));        
    };

	return (
        <div>
            <form ref={formElem} onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className="input" 
                    value={value}
                    placeholder="Filter studies..." 
                    onChange={handleChange} 
                />
            </form>
            <ul>
                {items.map(item => <li key={item} id={item} onMouseDown={handleClick}>{item}</li>)}
            </ul>
        </div>
	);
}

export default StudySearch;
