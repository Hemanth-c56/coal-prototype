import React, { useState } from 'react';

import './smp.css';

function Smp() {
  const [selectedHazard, setSelectedHazard] = useState('');
  const [controlPlanContent, setControlPlanContent] = useState('');
  const [workPlanContent, setWorkPlanContent] = useState('');

  const hazards = ['Fire Hazard', 'Electrical Leakage', 'Machinery Hazard'];
  const controlPlanOptions = [
    'Control Plan Option 1: Regular Inspections',
    'Control Plan Option 2: Safety Drills',
    'Control Plan Option 3: Emergency Procedures'
  ];

  const workPlanOptions = [
    'Work Plan Option 1: Equipment Maintenance',
    'Work Plan Option 2: Staff Training',
    'Work Plan Option 3: Hazard Mitigation'
  ];

  const handleHazardClick = (hazard) => {
    setSelectedHazard(hazard === selectedHazard ? '' : hazard); // Toggle selection
  };

  const handleControlPlanChange = (event) => {
    setControlPlanContent(event.target.value);
  };

  const handleWorkPlanChange = (event) => {
    setWorkPlanContent(event.target.value);
  };

  return (
    <div>
      <h1>SMP Portal</h1>

      <div className="hazards-container">
        {hazards.map((hazard, index) => (
          <div 
            key={index} 
            className="hazard-card" 
            onClick={() => handleHazardClick(hazard)}
          >
            <h2>{hazard}</h2>
          </div>
        ))}
      </div>

      {selectedHazard && (
        <div className="details-container">
          <div className="responsible-person">
            <h3>Person Responsible: John Doe</h3>
          </div>

          <div className="plans-container">
            <div className="card">
              <h2>Control Plan</h2>
              <select style={{width: "250px"}} value={controlPlanContent} onChange={handleControlPlanChange}>
                <option value="">--Select Control Plan--</option>
                {controlPlanOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              {controlPlanContent && <p>{controlPlanContent}</p>}
            </div>
            <div className="card">
              <h2>Work Plan</h2>
              <select style={{width: "250px"}} value={workPlanContent} onChange={handleWorkPlanChange}>
                <option value="">--Select Work Plan--</option>
                {workPlanOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              {workPlanContent && <p>{workPlanContent}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Smp;
