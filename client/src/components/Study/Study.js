import React from 'react';
import './Study.css';

function Study({ index, study }) {
  return (
    <div className='study'>
      <p>study number {index}: {study.a}, {study.b} </p>
    </div>
  );
}

export default Study;
