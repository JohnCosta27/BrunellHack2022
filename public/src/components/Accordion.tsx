import React, { useState } from 'react';

const Accordion = ({ message,timestamp,location}) => {
  const [isActive, setIsActive] = useState(false);

  return (

    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div className="truncate">{message}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div className="accordion-content"><div>{message}</div><div>{timestamp}</div><div>{location}</div></div>}
    </div>
  );
};

export default Accordion;