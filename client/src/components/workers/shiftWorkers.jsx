import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

import "./shiftWorkers.css";

function WorkersForm() {
  const shiftId = useParams().sid;
  const [operators, setOperators] = useState([]);
  const [addedOperatorsId, setAddedOperatorsId] = useState([]);
  const [addWorkers, setAddWorkers] = useState(false);
  const [shiftOperators, setShiftOperatos] = useState([]);
  const [description, setDescription] = useState();
  const [shiftDescription, setShiftDescription] = useState();
  const navigate = useNavigate();

  const fetchShift = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/v1/shifts/operators/${shiftId}`
    );
    setShiftOperatos(response.data.shift.operators);
    setShiftDescription(response.data.shift.description)
  };

  const fetchOperators = async () => {
    const response = await axios.get("http://localhost:5000/api/v1/operators");
    setOperators(response.data.operators);
  };

  useEffect(() => {
    fetchOperators();
    fetchShift();
  }, []);

  const doneHandler = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/v1/shifts/${shiftId}/operators`,
        {
          operators: addedOperatorsId,
        }
      );
    } catch (error) {
      console.error("Error adding operators to shift:", error);
    }
    setAddWorkers(false);
    navigate("/supervisor");
  };

  const addOperator = (operatorId) => {
    setAddedOperatorsId((prevState) => [...prevState, operatorId]);
  };

  const descriptionSubmitHandler = async ()=>{
    try {
      const response = await axios.patch(`http://localhost:5000/api/v1/shifts/${shiftId}/updateDesc`, {
        description,
      });
      fetchShift();

    } catch (error) {
      console.error("Failed to update description:", error);
    }
  }

  const setTextAreaValue = (event)=>{
    event.target.value = shiftDescription
  }

  return (
    <React.Fragment>
      <header className="sup-op-header">
        <h1>Mine - RG-0</h1>
      </header>
      <section className="sup-op-section">
        <div className="shifts-container">
          {addWorkers ? (
            <React.Fragment>
              <h1>Workers Of the Mine</h1>
              {operators.map((operator, index) => {
                return (
                  <div key={index} className="workers-card">
                    <div>
                      <h2>{operator.name}</h2> <h3>{operator.category}</h3>
                    </div>
                    <div>
                      <button onClick={() => addOperator(operator._id)}>
                        add
                      </button>
                    </div>
                  </div>
                );
              })}
              <button onClick={doneHandler}>Done</button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h1>Shift Detals</h1>
              <div className="shift-details-container">
                <div className="shift-description-container">
                  <div className="description-container">
                    <h2>Description Box</h2>
                    <form action="" onSubmit={descriptionSubmitHandler}>
                      <textarea onClick={setTextAreaValue} value={description} onChange={(e)=>{setDescription(e.target.value)}}
                        placeholder="Enter the Description"
                      ></textarea>
                      <input type="submit" value={"Update"} />
                    </form>
                    <div className="description-card">
                     {!shiftDescription ? "Todays Description Below" : shiftDescription}
                    </div>
                  </div>
                </div>
                <div className="shift-workers-container">
                  <h2 className="shift-workers-h2">Workers</h2>
                  {shiftOperators.map((operator, index) => {
                    return (
                      <div key={index} className="workers-card">
                        <div>
                          <h2>{operator.name}</h2>
                        </div>
                        <div>
                          <h3>{operator.category}</h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </React.Fragment>
          )}
          <button
            style={addWorkers ? { display: "none" } : null}
            onClick={() => {
              setAddWorkers(true);
            }}
          >
            Add Workers
          </button>
        </div>
      </section>
    </React.Fragment>
  );
}

export default WorkersForm;

{
  /* <h1>Shift Detals</h1>

<div className="description-container">
  <h2>Description Box</h2>
  <form action="">
  <textarea name="" id="" placeholder="Enter the Description"></textarea>
  <input type="submit" value={'Update'} />
  </form>
</div>

{shiftOperators.map((operator,index)=>{
  return (
    <div key={index} className="workers-card">
      <div><h2>{operator.name}</h2></div>
      <div><h3>{operator.category}</h3></div>
    </div>
  )
})} */
}
