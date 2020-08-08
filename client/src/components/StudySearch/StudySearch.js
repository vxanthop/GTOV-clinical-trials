import React, { useState } from 'react';
import './StudySearch.css';

function StudySearch({ updateStudies }) {
	const [ value, setValue ] = useState([]);

	const handleSubmit = e => {
		e.preventDefault();
		if(!value) return;
		updateStudies(value);
		setValue('');
	}

	return (
		<form onSubmit={handleSubmit}>
			<input 
				type="text" 
				className="input" 
				value={value}
				placeholder="Filter studies..." 
				onChange={e => setValue(e.target.value)} 
		    />
		</form>
	);
}

export default StudySearch;
