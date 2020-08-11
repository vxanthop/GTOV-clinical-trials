import React, { useState, useEffect, useRef } from 'react';
import M from 'materialize-css';
import './StudySearch.css';

function StudySearch({ updateStudies }) {
    const [ value, setValue ] = useState([]);
    const [ items, setitems ] = useState({}); // Items for autocomplete

    const formElem = useRef(null);
    const inputElem = useRef(null);

    useEffect(() => {
        M.Autocomplete.init(inputElem.current, {
            onAutocomplete: handleClick,
            limit: 10,
            minLength: 0
        });
    }, []);
    
    useEffect(() => {
        M.Autocomplete.getInstance(inputElem.current).options.data = items;
    }, [items]);


    const extractData = input => input.map(obj => obj["drugs"]).flat().filter(item => item.toLowerCase().startsWith(value.toLowerCase()))
    const prettify = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    
    // prettify before filtering to handle case insensitive case
    const removeDuplicates = arr => [...(new Set(arr.map(el => prettify(el))))]; 
    const format = arr => {
        const res = {}
        arr.forEach(element => {
            res[element] = null;
        });
        return res
    }

	const handleSubmit = e => {
        e.preventDefault();
		updateStudies(value);
        setitems([]);
    };
    
    const handleChange = async e => {
        setValue(e.target.value)
        const encoded_uri = `/api/drugs/` + encodeURIComponent(e.target.value);
        if(value.length > 0) {
            fetch(encoded_uri)
            .then(res => res.json())
            .then(res => extractData(res))
            .then(res => removeDuplicates(res))
            .then(res => format(res))
            .then(res => setitems(res))
        } else {
            setitems([]);
        }
    };
    
    const handleClick = () => {
        setValue(inputElem.current.value);
        formElem.current.dispatchEvent(new Event('submit'));    
    };

    return (
        <div className="row">
            <div className="col s12">
                <div className="row">
                <form ref={formElem} onSubmit={handleSubmit}>
                    <div className="input-field col s12">
                        <i className="material-icons prefix">search</i>
                        <i className="prefix"></i>
                        <input 
                            type="text" 
                            autoComplete="off" //disable default browser autocomplete
                            id="autocomplete-input" 
                            className="autocomplete"
                            onChange={handleChange}
                            ref={inputElem}
                        />
                        <label htmlFor="autocomplete-input">Search...</label>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}

export default StudySearch;
